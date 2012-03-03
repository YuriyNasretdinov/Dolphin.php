<?
/* this file manages only FTP support */

/**
 * This function returns the list of files, fsizes and folders (array(files => ..., dirs => ..., fsizes => ...))
 *
 * @param string $dir
 * @param bool $nocache
 * @return array/bool
 */
function d_ftplist($dir,$nocache=false)
{
	static $cache=array();
	if($nocache==='flush') { $cache=array(); return true;}
	$dir = abs_path($dir,false);
	if(!empty($cache[$dir]) && !$nocache) return $cache[$dir];
	
	if(!$f = d_ftpchdir($dir)) return d_error('Cannot change directory to "'.$dir.'".');
	if(($res = ftp_rawlist(FTP_LINK,''))===false) return d_error('Could not get raw list.');
	
	//echo 'FTP in: '.$dir."\n";
	
	$dirs=$files=$fsizes=$rights=array();
	
	foreach($res as $v)
	{
		$p = split("[ ]+",$v,9);
		
		//echo '<pre>',var_dump($p),'</pre>';
		
		switch($v[0])
		{
		case 'd':
			if($p[8]!='.' && $p[8]!='..')
			{
				$dirs[]=$dir.'/'.$p[8];
				$fsizes[$dir.'/'.$p[8]]=$p[4];
				$rights[$dir.'/'.$p[8]]=$p[0];
			}
			break;
		case 'l': break; // it's a link, actually, don't know what to do
		case '-': // file
			$files[]=$dir.'/'.$p[8];
			$fsizes[$dir.'/'.$p[8]]=$p[4];
			$rights[$dir.'/'.$p[8]]=$p[0];
			break;
		case '+':
			$eplf=explode(",",implode(" ",$p),5);
			if($eplf[2] == "r")
			{
				$files[]=$dir.'/'.trim($eplf[4]);
				$fsizes[$dir.'/'.trim($eplf[4])]=substr($eplf[3],1);
			}else if($eplf[2] == "/") $dirs[]=$dir.'/'.trim($eplf[3]);
			break;
		}
	}
	
	//print_r($rights);
	
	return ($cache[$dir]=array('files'=>$files,'dirs'=>$dirs,'fsizes'=>$fsizes,'rights'=>$rights));
}

/**
 * The function changes the directory to the specified (the directory should be the directory on the server)
 *
 * @param string $dir
 * @return bool
 */
function d_ftpchdir($dir)
{
	global $CFG;
	static $last = false;
	
	if(!$CFG['ftp']) return d_error('Cannot use FTP: no suitable FTP configuration found (see config.php).');
	
	$home = abs_path($CFG['ftp']['dir'],false);
	$dir = abs_path($dir,false);
	
	if($last !== false && $dir == $last) return true; // you do not need to change the folder if you are already there
	
	if(substr($home,0,strlen($home))!=substr($dir,0,strlen($home))) return d_error('Cannot change directory via FTP: You can only go into the subdirectories of "'.$home.'"'); // you cannot change the directory, which is upper than home
	
	$ftp_dir = str_replace('\\','/',substr($dir,strlen($home)));
	
	if(!defined('FTP_LINK'))
	{
		//print_r($CFG);
		if(!$ftp = ftp_connect($CFG['ftp']['host'])) return d_error('Could not connect to FTP server');
		
		if(!ftp_login($ftp,$CFG['ftp']['login'],$CFG['ftp']['password'])) return d_error('FTP login failed');
		define('FTP_LINK',$ftp);
		
		register_shutdown_function(create_function('','ftp_close(FTP_LINK);'));
	}
	
	if(!$ftp_dir) $ftp_dir='/';
	
	if(!@ftp_chdir(FTP_LINK,$ftp_dir)) return d_error('FTP ERROR: could not change directory');
	$last = $dir;
	return true;
}



/* executes copy, rename (cut), unlink, rmdir, get_contents, put_contents, mkdir in FTP manner (use $what parameter)
   $file1, $file2 -- file paths for function (they are translated)
   $add           -- a non-modified parameter for function
*/

//////
//$FTPLOG = false;
//////

function d_ftpcom($what, $file1=false, $file2=false, $add=false)
{
	global $CFG;
	if(!$CFG['ftp']) return false;
	
	///////
	//global $FTPLOG;
	//if(!$FTPLOG)
	//{
	//	$FTPLOG=fopen(ROOT.'/ftplog.txt','a');
	//	fputs($FTPLOG,"--------------------\n");
	//}
	//fputs($FTPLOG, "$what $file1 $file2 $add\n");
	///////
	
	if(!function_exists($what='d_ftp'.$what)) return d_error('Cannot use FTP: command '.substr($what,5).' is not implemented.');
	
	$home=abs_path($CFG['ftp']['dir'],false);
	if($home[strlen($home)-1]!='/') $home.='/';
	d_ftpchdir($home);
	
	/* As $file1 (or $file2) must look like "$home/$relative_path",
	   the "$home" itself will not be considered as correct path.
	   So, a little trick is used: "$home" is translated to "$home/."
	   and everything works (I hope so :)) */
	
	foreach(array('file1','file2') as $v)
	{
		$$v=abs_path($$v,false);
		if($$v.'/' == $home) $$v .= '/.';
	}
	
	if($file1 && substr($file1,0,strlen($home))!=$home || $file2 && substr($file2,0,strlen($home))!=$home)
	{
		if(!($what=='d_ftpcopy' && is_readable($file1))) return d_error('Cannot use FTP: files are out of the working directory.');
	}
	   
	/* function $what($relpath1, $fullpath1, $relpath2, $fullpath2, $add); */
	return @$what(substr($file1,strlen($home)),$file1,substr($file2,strlen($home)),$file2,$add) || d_error('FTP command failed: '.substr($what,5));
}

/* the following _*() functions are for use only inside d_ftp*() functions! */

/* generates filename for writable file; it is automatically deleted when script finishes work */

function _tmpname()
{
	if(!$tdir = get_tmp_dir()) return false;
	$fname = $tdir.'/ftp_'.uniqid(rand()).'.dolphin'; // temporal file name
	register_shutdown_function(create_function('','unlink(base64_decode("'.base64_encode($fname).'"));'));
	
	return $fname;
}

/* downloads file from FTP to temp dir and returns it's path */
function _download_from_ftp($s/*rel path */)
{
	if(!$fname=_tmpname()) return false;
	
	if(!ftp_get(FTP_LINK,$fname,$s,FTP_BINARY)) return d_error('Could not download file from FTP');
	
	return $fname;
}

function d_ftpcopy($s, $src, $d, $dest)
{	
	if(is_readable($src))
	{
		$fname=$src;
	}else if(!$fname=_download_from_ftp($s))
	{
		return false;
	}

	/* echo '$d = '.$d.'<br>$fname = '.$fname.'<br>'; */
	
	return ftp_put(FTP_LINK,$d,$fname,FTP_BINARY);
}

function d_ftpmkdir($d)
{
	return ftp_mkdir(FTP_LINK,$d);
}

function d_ftpget_contents($f)
{
	if(!$nam = _download_from_ftp($f)) return false;
	
	return file_get_contents($nam);
}

function d_ftpput_contents($f, $file, $_, $__, $contents)
{
	if(!$fname = _tmpname()) return false;
	
	if(!$fp = fopen($fname, 'wb')) return d_error('Cannot create file in temp directory.');
	fputs($fp, $contents);
	fclose($fp);

	return ftp_put(FTP_LINK,$f,$fname,FTP_BINARY);
}

function d_ftprename($f, $from, $t, $to)
{
	return ftp_rename(FTP_LINK, $f, $t);
}

function d_ftpchmod($f, $file, $_, $__, $mod)
{
	return ftp_site(FTP_LINK,'CHMOD '.$mod.' '.$f);
}

function d_ftpunlink($f)
{
	return ftp_delete(FTP_LINK, $f);
}

function d_ftprmdir($f)
{
	return ftp_rmdir(FTP_LINK, $f);
}
?>