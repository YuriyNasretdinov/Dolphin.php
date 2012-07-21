<?
/* this file contains almost all functions, that Dolphin.php uses

functions with "d_" prefix are the enhanced functions, that automatically CHMOD files if it is needed, CHMODs of files are set to the initial values at the end. The "d_" functions can operate entirely via FTP, though. Usually they do not perform heavy operations via FTP, just CHMOD.

You should be aware that they are much slower in some cases, than the same function without that prefix, so you should not use the "d_*" function if you're completely sure that you have the corresponding permissions

*/


if($CFG['ftp'] && $CFG['ftp']['fix_rights']) define('FIX', true);
else define('FIX', false);

include(dirname(__FILE__).'/ftp.php');

if(!function_exists('ob_get_clean') /* this will mean PHP version less than 4.3 */)
{
	function ob_get_clean()
	{
		ob_end_clean();
		return ob_get_contents();
	}
	
	function file_get_contents($file)
	{
		if(!$fp = fopen($file, 'rb')) return false;
		$buf = fread($fp, filesize($file));
		fclose($file); /* please note, that closing file is essential (in case you want to read a lot of files) */
		
		return $buf;
	}
}

/**
 * Shows size of $f file or folder like "1023.53 Kb". If $format=false, it returns just filesize in bytes, and fills $GLOBALS['show_size_files'] and $GLOBALS['show_size_dirs'] with values. If $size is not false, the function will just format $size value, but not count the size of directory again.
 *
 * @param string $f
 * @param bool $format
 * @return string/int
 */
function show_size($f,$format=true,$size=false)
{
	if($format || $size!==false)
	{
		if($size===false) $size=show_size($f,false);
		if(!empty($GLOBALS['TIMED_OUT'])) $p = '>';
		else $p = '';
		if($size == 1) return $p.'1 byte';
		else if($size<=1024) return $p.$size.' bytes';
		else if($size<=1048576) return $p.round($size/1024,2).' Kb';
		else if($size<=1073741824) return $p.round($size/1048576,2).' Mb';
		else if($size<=1099511627776) return $p.round($size/1073741824,2).' Gb';
		else if($size<=1125899906842624) return $p.round($size/1099511627776,2).' Tb';
		else return $p.round($size/1125899906842624,2).' Pb';
	}else
	{
		if(d_is_file($f))
		{
			$GLOBALS['show_size_files'] = 1;
			$GLOBALS['show_size_dirs'] = 0;
			
			return d_filesize($f);
		}
		
		if(!d_file_exists($f))
		{
			return 0;
		}
		
		$size=0;
		setreadable($f,true);
		$dh=opendir($f);
		$fs=$ds=0;
		
		if($dh)
		{
			while(($file=readdir($dh))!==false)
			{
				if($file=='.' || $file=='..') continue;
				// delete the next lines if you don't want any limits
				if(!defined('NOLIMIT') && array_sum(explode(' ',microtime()))-START_TIME>DIRSIZE_LIMIT)
				{
					$GLOBALS['TIMED_OUT'] = true;
					break;
				}

				if(d_is_file($f.'/'.$file))
				{
					$size+=d_filesize($f.'/'.$file);
					$fs++;
				}else
				{
					$size+=show_size($f.'/'.$file,false,false);
					$ds+=$GLOBALS['show_size_dirs'];
					$fs+=$GLOBALS['show_size_files'];
				}
			}
			closedir($dh);
		}
		
		
		
		$GLOBALS['show_size_files'] = $fs;
		$GLOBALS['show_size_dirs'] = 1+$ds;
		return $size+d_filesize($f); // +d_filesize($f) for *nix directories
	}
}

/* convert "rwxrwxrwx" format to "777" format for file rights */

function rwx2777($rwx)
{
	//echo $rwx.'<br>';
	if(strlen($rwx) != 9) $rwx = substr(trim($rwx), -9);
	for($mod=$i=0;$i<9;$i++) if($rwx[$i]!='-') $mod+=pow(2, 8-$i);
	return /*$rwx.' '.*/sprintf('%03d', decoct($mod));
}

function d_get_rights($file, $oct=true)
{	
	global $__perms;
	
	$f = abs_path($file);
	
	@$s=lstat($f);
	@$p=$s['mode'];
	
	if(!empty($__perms[$f]))
	{
		/* show correct rights for files and folders, which CHMOD will be changed back on the end of script work */
		$p -= $p & 511;
		return get_rights($f, $oct, $p + octdec($__perms[$f]));
	}
	
	if($p) return get_rights($f,$oct,$p);
	
	$t = d_filelist_fast(dirname($f));
	
	if(empty($t['rights'][$f])) return false;
	
	if(!$oct) return $t['rights'][$f];
	return rwx2777($t['rights'][$f]);
}

/* get permissions of file. If $oct is set to false,
   it will return the string like "drwxrwxrwx"
   instead of returning something like 777
*/
function get_rights($file, $oct=true, $p=false)
{
	static $s='rwxrwxrwx',$t='upcudubu-ulusuwu';
	
	if(!$p)
	{
		$l=lstat($file);
		$p=$l['mode'];
	}
	
	if(!$oct)
	{
		$m=sprintf('%09b',$p&511);
		for($i=0;$i<9;$i++)$m[$i]=$m[$i]?$s[$i]:'-';
		
		return $t[($p&61440)>>12].$m;
	}else
	{
		return sprintf("%03d",decoct($p&511));
	}
}

/**
 * Gets owner of $file. Returns empty string on failure.
 *
 * @param string $file
 * @return string
 */
function get_owner($file)
{
	static $owners = array();
	
	if(function_exists('fileowner') && function_exists('posix_getpwuid'))
	{
		$owner_uid = fileowner($file);
		if(!isset($owners[$owner_uid]))
		{
			@$tmp=posix_getpwuid($owner_uid);
			$owners[$owner_uid] = $tmp['name'];
		}
		
		return $owners[$owner_uid];
	}
	return '';
}

/**
 * Gets group, which the $file owner belongs to. Returns empty string on failure.
 *
 * @param string $file
 * @return string
 */
function get_group($file)
{
	static $groups = array();
	
	if(function_exists('fileowner') && function_exists('posix_getgrgid'))
	{
		$owner_grid = fileowner($file);
		if(!isset($groups[$owner_grid]))
		{
			@$tmp=posix_getgrgid($owner_grid);
			$groups[$owner_grid] = $tmp['name'];
		}
		
		return $groups[$owner_grid];
	}
	
	return '';
}

if(getenv('COMSPEC') /* Windows */)
{
	
	function abs_path($path)
	{
		if(@$path[1]!=':') /* relative path */
			$path = (!empty($_SESSION['DIR'])?$_SESSION['DIR']:getcwd()).'/'.$path;
		
		$chunks = explode('/',str_replace('\\','/',strtoupper($path[0]).substr($path,1)));
		$tmp = array();
		
		for($i=0;$i<sizeof($chunks);$i++)
		{
			$k=$chunks[$i];
			if($k=='' || $k=='.') continue;
			if($k=='..'&&sizeof($tmp)>1 /* we must not touch the disk name! */) array_pop($tmp);
			else if($k!='..') $tmp[]=$k;
		}
		
		if(sizeof($tmp)==1) $tmp[]=''; /* add last slash to disk name */
		
		return implode('/',$tmp);
	}
	
}else if(is_callable('readlink') /* UNIX */)
{
	function abs_path($path,$nolinks=true)
	{
		if($path[0]!='/') /* relative path */
			$path = (!empty($_SESSION['DIR'])?$_SESSION['DIR']:getcwd()).'/'.$path;
		
		$c=explode('/',$path);
		$l=sizeof($c);
		
		for($i=1,$k=$c[1],$tmp=array();$i<$l;@$k=$c[++$i])
		{
			if(empty($k)||$k=='.') continue;
			if($k=='..') array_pop($tmp); /* if $tmp is empty, this will not result to error! */
			else if($k!='') $tmp[]=$k;
		}
		
		array_unshift($tmp,'');
		if($nolinks) return (sizeof($tmp)>1?implode('/',$tmp):'/');
		
		$path='';
		foreach($tmp as $v)
		{
			$path.=$v.'/';
			$p = $path!='/' ? substr($path,0,-1) : $path; /* in my FreeBSD 6.2 is_link() was sensitive to the last slash (there should be no slash) */
			
			if(file_exists($p)&&is_link($p))
			{
				$path=readlink($p).'/';
				if($path[0]!='/') $path=($d=dirname($p)).($d=='/'?'':'/').$path;
			}
		}
		
		return abs_path($path,true); /* symlinks' address can contain different things like "." and ".." */
	}
	
}else /* unknown */
{
	function abs_path($name)
	{
		return realpath($name);
	}
}

/**
 * Cleans path and checks if the $path is allowed
 *
 * @param string $path
 * @return string
 */
function clean($path,$nolinks=false)
{
	$r=abs_path($path,$nolinks);
	
	return $r;
	
	/*$h = abs_path(HOMEDIR);
	if(substr($h,0,strlen($h))!=substr($r,0,strlen($h))) return $h.'/'.basename($r);
	else return $r;
	*/
}

/**
 * Function returns string with image (directory or file) and filename.
 *
 * @param string $f
 * @param string $dir
 * @return string
 */
function show_file($f,$dir=false)
{
	if($dir===false) $dir=(@d_is_dir($f) ? 'dir' : 'file');
	return '<img src="images/'.$dir.'.png" width="16" height="16">&nbsp;<b>'.htmlspecialchars(basename($f)).'</b>';
}

/**
 * Function removes $dir directory, or $dir file.
 *
 * @param string $dir
 * @return bool
 */
function d_remove($dir)
{
	if(!$dir) return false; /* this is very destructive function and must be protected from stupid errors */
	$dir = abs_path($dir);
	setwritable(dirname($dir),true); /* UNIX */
	setwritable($dir,true); /* Windows */
	
	if(d_is_file($dir) || @is_link($dir)) return d_unlink($dir);
	
	$t = d_filelist_fast($dir);

	foreach(array_merge($t['files'],$t['dirs']) as $v) d_remove($v);
	
	return d_rmdir($dir);
}

/**
 * Function safely creates folder (em... it's about safe_mode On)
 *
 * @param string $dir
 * @param int $mode
 * @return bool
 */
function safe_mkdir($dir,$mode=0777)
{
	umask(0);
	return mkdir($dir,$mode);
}

/**
 * Copy not only files, but folders too. See copy() description for details
 *
 * @param string $src
 * @param string $dest
 * @return bool
 */
function d_copy($src,$dest)
{
	if(!$src||!$dest) return false; /* this is very important function and must be protected from stupid errors */
	$src = abs_path($src,false);
	$dest = abs_path($dest,false);
	
	setwritable(dirname($dest),true);
	setreadable($src,true); /* we need to have read permissions! */
	
	if(d_is_file($src)) return (!FIX && @copy($src,$dest)) || @d_ftpcom('copy',$src,$dest);
	
	if(!d_is_dir($src)) return d_error($src.' does not exist');
	
	$dest.='/';
	$src .='/';
	if(substr($dest,0,strlen($src))==$src) return d_error('Cannot copy the directory inside itself.');
	
	if(!d_is_dir($dest) && !d_mkdir($dest)) return false;
	
	$t = d_filelist_fast($src);
	
	foreach(array_merge($t['files'],$t['dirs']) as $f) if(!d_copy($src.basename($f),$dest.basename($f))) $error=true;
	
	return !isset($error);
}

$__d_fopen_data=array();
// the function is a replacement for standard fopen() function, but it does not support 'a' mode through FTP.
function d_fopen($file,$mod)
{
	global $__d_fopen_data;
	
	//echo ''.$mod;
	
	if(
	(strpos($mod,'w')!==false && ($GLOBALS['CFG']['ftp']['fix_rights']) || !@fopen($file,$mod)) || 
	(strpos($mod,'r')!==false && !@fopen($file,$mod))
	){
		if(!$tmp=get_tmp_dir()) return d_error('Could not get temp directory');
		$f = $tmp.'/'.uniqid(rand()).'.dolphin.tmp';
		//echo $f.'<br>';
		
		if(strpos($mod,'r')!==false)
		{
			if(!d_copy(abs_path($file),$f)) return d_error('Could not write the contents to temp file'); // if there is a memory limit, this won't work for big files...
		}
		
		if(!$fp=fopen($f,$mod)) d_error('System error. Something is wrong with d_copy() function.');
		$__d_fopen_data[$file.'***'.$f.'***'.$mod]=$fp;
		
		//echo 'all is ok for file "'.$file.'" ('.file_get_contents($f).')<br>';
		
		return $fp;
	}
	
	return fopen($file,$mod);
}

function d_fclose($fp)
{
	global $__d_fopen_data;
	
	if(!$key=array_search($fp,$__d_fopen_data)) return fclose($fp);
	
	//echo 'fclose<br>';
	
	list($file,$f,$mod) = explode('***',$key,3);
	
	fclose($fp);
	unset($GLOBALS['__d_fopen_data'][$key]);
	
	if(strpos($mod,'r')!==false) unlink($f);
	
	if(strpos($mod,'w')!==false)
	{
		if(!d_copy($f,$file)) return d_error('Could not write the contents to file.');
		unlink($f);
	}
	
	return true;
}

$__d_opendir_data=array();
// the replacement for opendir(). Please note that it DOES NOT RETURN THE NORMAL DIRECTORY RESOURSE!
function d_opendir($dir)
{
	global $__d_opendir_data;
	$dir = abs_path($dir);
	
	if(isset($__d_opendir_data[$dir])) return $dir;
	
	$dirs=$files=$fsizes=array();
	if(!$res=d_filelist_fast($dir)) return false;
	extract($res);
	
	$items = array_merge(array('.','..'),$files,$dirs);
	foreach($items as $k=>$v) $items[$k] = basename($v);
	$items[0] = '.';
	$items[1] = '..';
	$__d_opendir_data[$dir] = array('items' => $items, 'position' => 0, 'last' => sizeof($items)-1);
	
	return $dir;
}

function d_readdir($dh)
{
	global $__d_opendir_data;
	if(!isset($__d_opendir_data[$dh])) return d_error('Invalid handle!');
	if($__d_opendir_data[$dh]['position'] > $__d_opendir_data[$dh]['last']) return false;
	
	return $__d_opendir_data[$dh]['items'][$__d_opendir_data[$dh]['position']++];
}

function d_closedir($dh)
{
	global $__d_opendir_data;
	unset($__d_opendir_data[$dh]);
	return true;
}

/**
 * @desc This function sends to the browser thumbnail of image $fullpath, and, if you want, you can point $width and $height for this thumbnail. default is 80x60. If $resample is set to TRUE, the quality resize algorithm will be used.
 *
 * @author Nasretdinov Yuriy <n a s r e t d i n o v [all-known-symbol] g m a i l . c o m>
 * @version 0.9.3
 * @param string $fullpath
 * @param int $width
 * @param int $height
 * @param bool $resample
 * @return bool
 */

define('UNSUPP', 'Unsupported image type. Maybe, invalid extension?');
define('NOMEMORY', 'Memory limit exceeded');
define('NOGD', 'GD not found: ither imagecreate() or imagecopyresized() do not exist.');

function send_thumbnail($fullpath,$width=80,$height=60,$resample=-1)
{
	$fullpath=abs_path($fullpath);
	setreadable($fullpath,true);
	if(!is_readable($fullpath))
	{
		if(!$tmp=get_tmp_dir()) return d_error('Could not read file');
		
		$f=$tmp.'/'.uniqid('img_',rand()).'.'.basename($fullpath);
		
		if(!d_copy($fullpath,$f)) return d_error('Could not read file, could not copy');
		
		$fullpath = $f;
		
		register_shutdown_function(create_function('','unlink(base64_decode("'.base64_encode($f).'"));'));
	}
	
    @$w = getimagesize($fullpath);
    if (!$w) return d_error(UNSUPP);
    
    $c = 2; /* coefficient for fast image resampling */
    
    if ( (@$lim = return_bytes(ini_get('memory_limit'))) > 0)
    {
        $sz = ( $w[0]*$w[1] + max(1,($w[0]>$c*$width||$w[1]>$c*$height?$c*$c:0))*$width*$height ) * 5 + (function_exists('memory_get_usage') ? memory_get_usage() : 0); // approximate size of image in memory (yes, 5 bytes per pixel!!)
        if ($sz >= $lim) return d_error(NOMEMORY);
    }
   
    if ($w[0] <= $width && $w[1] <= $height)
    {
            header('Content-type: '.$w['mime']);
            readfile($fullpath);
            return true;
    }
   
    if (!function_exists('imagecreate') || !function_exists('imagecopyresized')) return d_error(NOGD);

    $p = pathinfo($fullpath);
    @$ext = strtolower($p['extension']);
    if (in_array($ext,array('jpeg','jpe','jpg'))) $ext = 'jpeg';

    if (function_exists($func = 'imagecreatefrom'.$ext)) $src = $func($fullpath);
    else return d_error(UNSUPP);
   
    header('Content-type: image/jpeg');
   
    //proportions
    $new_width = round(($height/$w[1])*$w[0]);
    $new_height = round(($width/$w[0])*$w[1]);
    if ($new_width>$width) $new_width = $width;
    if ($new_height>$height) $new_height = $height;
   
    if (!function_exists($cfunc = 'imagecreatetruecolor')) $cfunc='imagecreate';
    $thumb = $cfunc($new_width,$new_height);
    
    imagefill($thumb, 0, 0, imagecolorallocate($thumb, 255, 255, 255)); // set white background (instead of default black)
   
    $func = (($resample===-1 && defined('USE_RESAMPLE') && USE_RESAMPLE) || $resample===true) && function_exists('imagecopyresampled') ? 'imagecopyresampled' : 'imagecopyresized';
   
    // optimizations for big images
    if ($func != 'imagecopyresized' && ($w[0] > $c*$new_width || $w[1] > $c*$new_height))
    {
        $thumb_c = $cfunc($c*$new_width,$c*$new_height);
        imagecopyresized($thumb_c,$src,0,0,0,0,$c*$new_width,$c*$new_height,$w[0],$w[1]);
        imagedestroy($src);
        $src = $thumb_c;
        list($w[0],$w[1]) = array($c*$new_width,$c*$new_height);
    }
   
    $func($thumb,$src,0,0,0,0,$new_width,$new_height,$w[0],$w[1]);

    imagedestroy($src);
    imagejpeg($thumb);
    imagedestroy($thumb);

    return true;
}

/**
 * The function authorizes you and shows login screen
 *
 */
function auth()
{
	global $CFG;
	
	$ajax = false;

	/* the workaround code for Safari's bug with <select> */
	
	if(!empty($_REQUEST['version_hid']) && $_REQUEST['version_hid']!=$_REQUEST['version'] && $_REQUEST['version_hid']=='full') $_REQUEST['version'] = 'full';
	
	if(!empty($_REQUEST['JsHttpRequest']))
	{
		$ajax = true;
		ajax_start_transfer();
		if(empty($_REQUEST['version'])) $_REQUEST['version']='full';
		else if($_REQUEST['version']!='full' /*light?*/) define('VER', 'full');
	}
	
	
	
	if(@$_REQUEST['login']==$CFG['login'] && @$_REQUEST['pass']==$CFG['password'])
	{
		$_SESSION['logined']=true;
		$_SESSION['login']=$CFG['login'];
		$_SESSION['pass']=$CFG['password'];
		switch(@$_REQUEST['version'])
		{
		default:
		case 'light':
			$_SESSION['version']='light';
			break;
		case 'full':
			$_SESSION['version']='full';
			break;
		case 'uploader':
			$_SESSION['version']='uploader';
			break;
		}
		
		if(!empty($_REQUEST['DIR'])) $_SESSION['DIR'] = clean($_REQUEST['DIR']);
		
		if(!$ajax)
		{
			header('location: index.php?DIR=.&'.SID);
			die();
		}else
		{
			return; /* handle our query properly */
		}
	}
	
	if(empty($_SESSION['logined']) || $_SESSION['login']!=$CFG['login'] || $_SESSION['pass']!=$CFG['password'])
	{
		$_SESSION['savedreq'] = array($_REQUEST, $_GET, $_POST);
		
		if(!$ajax)
		{
			include(ROOT.'/system/login.html');
		}else
		{	
			echo '--error-login-required';
		}
		die();
	}
}

function ajax_start_transfer()
{
	if(!class_exists('JsHttpRequest'))
	{
		//$old = $_SERVER['REQUEST_URI'];
		
		include_once(ROOT.'/system/libs/JsHttpRequest.php');
		$GLOBALS['__JsHttpRequest_object'] = new JsHttpRequest(USERCHARSET);
		$GLOBALS['NOHANDLER']=true;
		
		//echo $old;
		
		//echo USERCHARSET;
	}
}

/**
 * The function logs out and redirects you to the beginning
 *
 */
function logout()
{
	session_destroy();
	header('location: .');
}

/**
 * Function shows statistics (e.g. generation time)
 *
 */
function stats($echo=true)
{
	global $files,$dirs;
	
	if(!defined('FILES')) define('FILES',0);
	if(!defined('DIRS')) define('DIRS',0);
	
	if($echo)
	{
	 ?><div id="stats" align="center"><font color="#d0d0d0">gentime <b id="seconds"><?=round(array_sum(explode(' ',microtime()))-START_TIME,4)?></b>sec<?=(isset($GLOBALS['files']) ? '; <b id="objects">'.(FILES+DIRS).'</b> obj'.(FILES+DIRS!=sizeof($files)+sizeof($dirs) ? '; <b id="objects_current">'.(sizeof($files)+sizeof($dirs)).'</b> current obj' : '') : '')?><? if(defined('FTP_LINK')) echo '; <b>FTP</b> active'; ?></font><br>&lt;<a href="index.php?act=logout">log out</a><?if(VER=='light') echo '<span class="desktop"> | <a href="index.php?version=full&amp;DIR=.">switch to full version</a></span>'; if(VER=='full') echo ' | <a href="index.php?version=light&amp;DIR=.">switch to light version</a>';?>&gt;</div><?
	 return true;
	}else
	{
		return array(
		 'seconds' => round(array_sum(explode(' ',microtime()))-START_TIME,4),
		 'objects' => isset($GLOBALS['files']) ? FILES+DIRS : false,
		 );
	}
}

/**
 * The function returns an array with logical drives
 * it uses an external "volumes.exe" (compiled volumes.c)
 *
 */
function get_logical_drives()
{
	if(!getenv('COMSPEC')) return false;
	
	if(!exec(ROOT.'/full/volumes.exe',$data)) return false;
	
	static $types=array(
	2 => 'removable', // diskettes (A:\ and B:\), flash..
	3 => 'hdd',
	4 => 'smb', // yes, SMB mounted drive
	5 => 'cd',
	6 => 'ramdrive',
	);
	
	$drives=array();
	
	foreach($data as $v)
	{
		if(empty($v)) continue;
		
		list($name,$type,$fs,$label)=explode('|',trim($v),4);
		
		if($name[0]!='a' && $name[0]!='b') $type = (empty($types[$type]) ? 'unknown' : $types[$type]);
		else $type='diskette';
		
		$drives[] = array( 'name' => $name, 'type' => $type, 'label' => $label, 'fs' => $fs);
	}
	
	//echo '<pre>',!print_r($drives),'</pre>';
	
	return $drives;
}

function read_directory()
{
	global $php_errormsg;
	
	if(empty($_SESSION['DIR'])) $_SESSION['DIR']=abs_path(HOMEDIR);
	
	if(!empty($_REQUEST['DIR']) && $_REQUEST['DIR'][0]=='~') $_REQUEST['DIR']=HOMEDIR.substr($_REQUEST['DIR'],1);
	if(!empty($_REQUEST['DIR']) && $_REQUEST['DIR'] == '.' && !empty($_SESSION['DIR'])) $_REQUEST['DIR']=$_SESSION['DIR']; // especially to save current directory state with refreshes in full version

	$dir=!empty($_REQUEST['dir']) ? clean($_SESSION['DIR'].'/'.$_REQUEST['dir'],true) : $_SESSION['DIR'];
	if(!empty($_REQUEST['DIR'])) $dir=clean($_REQUEST['DIR'],true);
	else $_REQUEST['DIR']=HOMEDIR;
	
	//$_REQUEST['DIR']=abs_path($_REQUEST['DIR']);
	//echo $_REQUEST['DIR'];
	
	
	$c = lang('My computer');
	
	$r = $_REQUEST['DIR'];
	$l = strlen($r);
	
	if(getenv('COMSPEC') &&  ($l==5 || $l==6) && substr($r,-2)=='..' /* A:/.. || A://.. */ && (abs_path($r)) == substr($r,0,2).'/') $_REQUEST['DIR'] = $c;

    $dh = opendir($dir);
    if (!$dh) return d_error("Cannot open $dir");
    $_SESSION['DIR']=$dir;
    session_write_close();

    $res = d_filelist_simple($dh);
	closedir($dh);

	if(abs_path($_SESSION['DIR']) == '/') $up = false;
    else $up = dirname($_SESSION['DIR']);
	$res['up'] = $up;

    return $res;
}

/**
 * Dolphin.php chmod function - works like chmod() - but NOTE, THAT RIGHTS SHOULD BE DECIMAL (777 instead of 0777)!
 * 
 * uses FTP or SHELL to perform operations
 *
 * @param string $f
 * @param int $mod
 */
function d_chmod($f,$mod)
{
	$f = abs_path($f);
	umask(0);
	if(@chmod($f,octdec($mod))) return true;
	if(@exec('chmod '.escapeshellarg($mod).' '.escapeshellarg($f))) return true;
	return d_ftpcom('chmod', $f, false, $mod);
}

function d_chmod_recursive($dir,$mod)
{
	$list = d_filelist_all($dir);
	if(!$list) return d_error('Could not list of files for '.$dir.'. Probably, chmodding file?');
	
	extract($list);
	
	foreach(array_merge($files,$dirs,array($dir)) as $v) if(!d_chmod($v,$mod)) $err = true;
	
	return !isset($err);
}

function d_rename($from,$to)
{
	$from = abs_path($from,false);
	$to = abs_path($to,false);
	
	/* please note, that in UNIX rename to an existing file replaces it atomically
	*/
	//if(d_file_exists($to)) return d_error('Cannot rename file: file already exists');
	
	setwritable(dirname($from), true); /* UNIX */
	
	$__perms[$to] = get_rights($to); /* WINDOWS */
	setwritable($from, true);
	
	return @rename($from,$to) || d_ftpcom('rename', $from, $to);
}

function d_unlink($file)
{
	$file = abs_path($file);
	setwritable(dirname($file), true);
	setwritable($file,true);
	
	return @unlink($file) || d_ftpcom('unlink', $file);
}

function d_rmdir($file)
{
	$file = abs_path($file);
	setwritable(dirname($file), true);
	setwritable($file,true);
	
	return @rmdir($file) || d_ftpcom('rmdir', $file);
}

$__perms = array();
/* $rem -- remember rights and return them at the end of script work? */
function setwritable($file, $rem = false)
{	
	if(is_writeable($file)) return true;
	if(set_rights($file,777,$rem)) return true;
	//if(d_filesize($file) <= 100*1024 && d_file_put_contents($file, d_file_get_contents($file,false),false)) return true;
	
	return false;
}

function setreadable($file, $rem = false)
{
	if(is_readable($file) && is_executable($file) /* directories require both r and x flags be set to become readable */) return true;
	if(set_rights($file,755,$rem)) return true;
	//if(d_filesize($file) < 100*1024 && d_file_get_contents($file)!==false) return true;
	
	return false;
}

function d_chmod_deep($file, $mod = 777)
{
	/* function should CHMOD all parent directories if it's required to get the $mod permission useful */
	
	/* but in reality it will only check for r and x flags for "all" */
	
	$parts = explode('/',abs_path($file, true));
	
	$base = '';
	
	@d_chmod($file, $mod);
	
	if(is_readable($file)) return true;
	
	foreach($parts as $k=>$v)
	{
		$base .= $v.'/';
		
		$r = get_rights($base);
		if(!($r & 4) || !($r & 1)) set_rights($base, $mod, true, false);
	}
	
	return d_chmod($file, $mod);
}

/* set decimal $mod to $file
   $rem -- remember CHMOD value and return them to initial state at the end of script work?
   $deep -- CHMOD deeply, so that your permissions will work
*/

function set_rights($file,$mod,$rem = false, $deep = false)
{
	if(!file_exists($file)) return false;
	
	$file=abs_path($file);
	
	global $__perms;
	$perm = get_rights($file);
	
	$func = $deep ? 'd_chmod_deep' : 'd_chmod';
	
	if(!$func($file, $mod)) return false;
	else if(!$rem) return true;
	
	$__perms[$file] = $perm;
	
	return true;
}

function restore_all_permissions()
{
	foreach($GLOBALS['__perms'] as $k=>$v) restore_permissions($k);
	
	return true;
}

register_shutdown_function('restore_all_permissions');

function restore_permissions($file)
{
	global $__perms;
	
	if(empty($__perms[$file])) return true;
	
	return d_chmod($file, $__perms[$file]);
}

/* MOD should be decimal (e.g. 777 instead of 0777) */

function d_mkdir($file, $mod = 755)
{
	$file = abs_path($file);
	setwritable(dirname($file),true);
	
	if((!FIX && @safe_mkdir($file,octdec($mod))) || d_ftpcom('mkdir', $file))
	{
		d_ftplist('','flush');
		@d_chmod($file,$mod);
		
		return true;
	}
	
	return false;
}

// there are three functions for speed optimization (though they do not work very fast...)

function d_clearstatcache()
{
	clearstatcache();
	d_ftplist('','flush');
	return true;
}

function d_is_file($file)
{
	setreadable(dirname($file),true);
	if(file_exists($file)||file_exists(dirname($file))) return is_file($file);
	if(abs_path($file,false)==abs_path($GLOBALS['CFG']['ftp']['dir'],false)) return false;
	if(!$info = d_ftplist(dirname($file))) return d_error('Cannot get filelist');
	return in_array(abs_path($file),$info['files']);
}

function d_is_dir($file)
{
	setreadable(dirname($file),true);
	if(file_exists($file)||file_exists(dirname($file))) return is_dir($file); /* good for newly created files */
	if(abs_path($file,false)==abs_path($GLOBALS['CFG']['ftp']['dir'],false)) return true; // for root directory
	//echo dirname($file)."\n";
	if(!$info = d_ftplist(dirname($file))) return d_error('Cannot get filelist');
	//array_display($info);
	//print_r($info);
	return in_array(abs_path($file,false),$info['dirs']);
}

function d_file_exists($file)
{
	setreadable(dirname($file),true);
	if(file_exists($file)) return true;
	if(abs_path($file,false)==abs_path($GLOBALS['CFG']['ftp']['dir'],false)) return true; // for root directory
	if(!$info = d_ftplist(dirname($file))) return false;
	return in_array(abs_path($file,false),$info['dirs']) || in_array(abs_path($file),$info['files']);
}

// the function to log errors. If $error_text is set to 'all', the function returns an array of all error messages.
// If $error_text is not set, the function returns the last error message. if $error_text==NODEBUG, the name of function will be removed if it was present (in the beginning)
// Else it logs the error message and returns false.
//
// example of usage: if(false) return d_error('You have set "false" in "if" condition');
define('NODEBUG',1);
function d_error($error_text = 0)
{
	static $errors = array();
	
	if($error_text === NODEBUG && !function_exists('debug_backtrace')) $error_text = 0;
	
	if($error_text === 'all') return $errors;
	if($error_text === 0) return (sizeof($errors)>0 ? $errors[sizeof($errors)-1] : '');
	if($error_text === NODEBUG)
	{
		if(sizeof($errors)==0) return '';
		$p = explode(' ', $errors[sizeof($errors)-1],2);
		return $p[1];
	}
	
	if(function_exists('debug_backtrace'))
	{
		$tr = debug_backtrace();
		$error_text = '['.$tr[1]['function'].'] '.$error_text;
	}
	
	$errors[]=$error_text;
	return false;
}

// gets the address of temporary directory
function get_tmp_dir()
{
	global $CFG;
	static $tmpdir = 0;
	
	if($tmpdir!==0) return $tmpdir;
	
	if(!empty($CFG['tmpdir']))
	{
		if(is_writable($CFG['tmpdir'])) return ($tmpdir=$CFG['tmpdir']);
		return ($tmpdir=d_error('Temp directory "'.$CFG['tmpdir'].'" (see config.php) is not writable!"'));
	}
	
	$temp_dirs = array(session_save_path(), ini_get('upload_tmp_dir'), HOMEDIR, dirname(HOMEDIR), dirname(dirname(HOMEDIR)));
	
	foreach($temp_dirs as $v) if(is_writable($v)) return ($tmpdir=$v);
	return ($tmpdir=d_error('Could not find any writable directories. Create a directory, writable for all users (with CHMOD 777) and set its\' value in config.php.'));
}

function d_file_get_contents($f,$setr=true) /* $setr is for setwritable/setreadable functions, as they use this function :) */
{
	if($setr) setreadable(abs_path($f), true);
	return false!==(@$cont=file_get_contents(abs_path($f))) ? $cont : d_ftpcom('get_contents',$f);
}

/* write $contents to _existing_ file $f */

function d_file_put_contents($f,$contents,$setw=true)
{
	$f = abs_path($f);
	if($setw) setwritable($f, true);
	
	if(!FIX && @$fp = fopen($f, 'wb'))
	{
		fputs($fp, $contents);
		fclose($fp);
		
		return true;
	}
	
	return d_ftpcom('put_contents',$f,false,$contents);
}

function d_filesize($f)
{
	if(file_exists($f) && ($sz = filesize($f))!==false) return ($sz>=0 ? $sz : sprintf("%u", $sz)); // damn PHP bug with filesizes > 2Gb and <= 4 Gb... If the filesize is even greater, only 64bit compilations of PHP should give correct result
	$f = abs_path($f);
	
	$t = d_filelist_fast(dirname($f));
	
	if(!empty($t['fsizes'][$f])) return $t['fsizes'][$f];
	
	return false;
}

function get_files_info($files, $dir = null) {
    if (!count($files)) return array();

    if (!isset($dir)) $dir = $_SESSION['DIR'];
    $old_dir = getcwd();
    if (!chdir($dir)) return d_error('Cannot change directory');
    $result = array();
    $sizes = array();
    // a more reliable way of computing size
    if (is_callable('exec') && in_array(php_uname('s'), array('Linux', 'FreeBSD', 'Darwin'))) {
        $filepaths = array();
        foreach ($files as $f) $filepaths[] = escapeshellarg('./' . $f);
        exec("stat -f '%z' " . implode(' ', $filepaths), $out, $retval);
        if ($retval == 0 && count($out) == count($files)) {
            foreach ($out as $i => $sz) {
                $sizes[$files[$i]] = $sz;
            }
        }
    }

    foreach ($files as $f) {
        $result[$f] = array(
            'modified' => human_date(filemtime($f)),
            'size'     => show_size($f, true, isset($sizes[$f]) ? $sizes[$f] : filesize($f)),
            'type'     => is_dir($f) ? 'dir' : 'file',
        );
    }
    chdir($old_dir);
    return $result;
}

/**
 * The function returns the type of file $f (for example, JPEG File)
 *
 * @param string $f
 * @return string
 */
function get_type($f)
{
	global $desc;
	
	if(empty($desc)) include(ROOT.'/system/types.php');
	$ext=pathinfo($f);
	@$ext=strtolower($ext['extension']);
	if(!empty($desc[$ext])) return $desc[$ext];
	if(empty($ext)) return false;
	else return false;
}

/**
 * Function returns the string that contains the string "Reason: the reason of error" or empty string, if the reason could not be determinated
 *
 * @return string
 */
function reason()
{
	global $php_errormsg;
	
	if(!error_reporting()) return '';
	
	$reasons=array();
	if(!empty($php_errormsg) && !preg_match('/undefined|deprecated/i',$php_errormsg)) $reasons[]=$php_errormsg;
	$errors=d_error('all');
	if(sizeof($errors)>0) foreach($errors as $v) $reasons[]=$v;
	
	$reasons = array_unique($reasons);
	
	if(sizeof($reasons)==0) return '';
	else
	{
		foreach($reasons as $k=>$v) if($v[strlen($v)-1] == '.') $reasons[$k] = trim(substr($v,0,strlen($v)-1));
		return "\nReason".(sizeof($reasons)==1?'':'s').': '.implode(".\n",$reasons).'.';
	}
}

function gen_copy_name($dir, $file)
{
	if(abs_path(dirname($file)) != abs_path($dir) ) return $dir.'/'.basename($file);

	$v = $file;
	
	$dir=dirname($v);                 // write to $f the name of file, to $ext - it's full extension
	$fname=explode('.',basename($v));
	
	$f=$fname[0];
	unset($fname[0]);
	
	@$ext=implode('.',$fname);
	if(!empty($ext)) $ext='.'.$ext;
	
	$i=0;
	if(d_file_exists($name=$dir.'/'.$f.'-copy'.$ext)) while(d_file_exists($name=$dir.'/'.$f.'-copy'.(++$i).$ext));
	
	return $name;
}

/**
 * This function realizes the procedure of pasting files, that is common for all the versions of Dolphin.php . The $func_print parameter is used to specify some function for printing messages.
 *
 * @param string $func_print
 * @return bool
 */
function paste($func_print)
{
	if(!empty($_SESSION['copy']))
	{
		if(!empty($_GET['dir'])) $_SESSION['DIR']=clean($_GET['dir']);
		
		$error=false;
		if(abs_path($_SESSION['DIR'])==abs_path(dirname($_SESSION['copy'][0]))) // if it's the same dir, modify $_SESSION['copy'] to make the copies of files
		{
			foreach($_SESSION['copy'] as $k=>$v)
			{
				$name = gen_copy_name($_SESSION['DIR'], $v);
				//echo $v.' - '.$name;
				if(!d_copy($v,$name)) $error=true;
			}
		}else foreach($_SESSION['copy'] as $v) if(!d_copy($v,$_SESSION['DIR'].'/'.basename($v))) $error=true;

		$_SESSION['copy']=array();
		if(!$error)
		{
			$func_print('All files were copied successfully');
			return true;
		}else
		{
			$func_print('There were problems while copying files. '.reason());
			return false;
		}
	}
	if(!empty($_SESSION['cut']))
	{
		if(!empty($_GET['dir'])) $_SESSION['DIR']=clean($_GET['dir']);

		$error=false;

		if(abs_path($_SESSION['DIR'])!=abs_path(dirname($_SESSION['cut'][0])))
		{
			foreach($_SESSION['cut'] as $v)
			{
				if(!@d_rename($v,$_SESSION['DIR'].'/'.basename($v)) &&
				   !(@d_copy($v,$_SESSION['DIR'].'/'.basename($v)) && @d_remove($v))
				  )
				{
					$error=true;
				}
			}
		}

		$_SESSION['cut']=array();
		if(!$error)
		{
			$func_print('All files were cut successfully.');
			return true;
		}else
		{
			$func_print('There were some problems while cutting files. '.reason());
		}
		
		return false;
	}
}

define('NEED_UPLOAD', -1);
/**
 * update_dolphin is a system function for Dolphin.php . You need to specify the function to print errors, if they happen. update_dolphin requires $_REQUEST['act'] to be set to 'upload-new' or 'download-new', and returns NEED_UPLOAD if it needs to show the upload form (it happens if it cannot download the archive from site). The upload form must contain an input field with name "files[]". If all is ok, returns TRUE, otherwise returns string, containing error description or special NEED_UPLOAD. You need to check for TRUE using === operator.
 *
 * @param string $print_err_func
 * @return mixed
 */
function update_dolphin($print_err_func)
{
	if(IS_DEVELOPER) return 'This operation is not permitted for you';
	
	ini_set('display_errors', 'On');
		
	/* disable attempts to download the archive with Dolphin.php by itself */
	if(!CAN_SELFUPDATE) $_REQUEST['act'] = 'upload-new';

	$tmp  =get_tmp_dir();
	if(!$tmp) return 'No suitable temp directory found';
	$tmp = abs_path($tmp);
	$root = abs_path(ROOT);
			
	if(!$tmp || $tmp == $root || substr($tmp, 0, strlen($root)) == $root)
	{
		/* TODO: write normal answer if $tmp is ROOT or subdirectory of ROOT */
		return 'Update is impossible. '.reason();
	}
	
	chdir($tmp);
	
	if(empty($_FILES['files']) && $_REQUEST['act']!='download-new')
	{
		return NEED_UPLOAD;
	}
	
	if($_REQUEST['act']!='download-new') upload_files($tmp);
	else
	{
		$build = file_get_contents(MASTER_SITE.'files/dolphin-build.txt');
		
		$errtext = 'It seems that your server does not allow outgoing connections for PHP scripts, or '.MASTER_SITE.' is down. Try to upload archive with '.SNAME.' manually.';
		
		if(!$build) return NEED_UPLOAD;
		
		if(BUILD >= $build) return 'Your build is up-to-date';
		
		$dolphin = file_get_contents(MASTER_SITE.'files/dolphin-current.zip');
		
		if(!$dolphin) return NEED_UPLOAD;
		
		if(!d_file_put_contents($tmp.'/dolphin-current.zip', $dolphin)) return 'Cannot write '.show_file($tmp.'/dolphin-current.zip','file').' ('.$tmp.'/dolphin-current.zip).'.reason();
	}
	
	$f = $tmp.'/dolphin-current.zip';
	if(!file_exists($f)) return '<b>dolphin-current.zip</b> was not found';
	d_copy(ROOT.'/config.php',$cfg_old=$tmp.'/dolphin_config.php');
	
	require_once(ROOT.'/system/libs/pclzip.php');

	umask(0);
	/* note, that we check if extracting is possible _before_ deleting ROOT */
	$e=new PclZip($f);
	
	//echo '<!--';
	//echo 'file: '.$f.'<br>';
	
	// some hosters require PHP files and folders with PHP scripts to have special rights, so we need to
	// save rights for some essensial files
	
	$tochmod = array('','system','index.php','system/download.php','system/preview.php');
	$rights = array();
	foreach($tochmod as $v) $rights[ROOT.'/'.$v] = get_rights(ROOT.'/'.$v);
	
	d_remove(ROOT);
	//echo 'Removed ROOT.<br>';
	d_mkdir(ROOT,777);
	setwritable(ROOT);
	//echo 'Created ROOT.<br>';
	//echo 'ROOT is writable: '.(is_writable(ROOT) ? 'true' : 'false').'<br>';
	chdir(ROOT);
	//echo 'Changed directory to ROOT.<br>';
	//echo '-->';
	
	if(!$e->extract('.')) return '<b>dolphin-current.zip</b> could not be extracted. Upload the new version <b>via FTP</b>. Here are the contents of your <b>config.php</b>:<pre>'.htmlspecialchars(d_file_get_contents($cfg_old)).'</pre>';
	
	foreach($rights as $k=>$v) d_chmod($k,$v);
	
	if(!empty($_POST['save-login']) || $_REQUEST['act']=='download-new')
	{	
		/* delete BUILD, VERSION and NAME from config.php, they are now in core.php for compatibilty */
		$conf = d_file_get_contents($cfg_old);
		$conf = preg_replace('/define\\(\'(BUILD|VERSION|NAME)\'.*\\)\\;/sU','',$conf);
		d_file_put_contents(ROOT.'/config.php', $conf);
		
		$core = d_file_get_contents(ROOT.'/system/core.php');
		if(!$core)
		{
			$build = "undefined";
		}else
		{
			preg_match("/define\\('BUILD'\\,([0-9]+)\\)/is", $core, $m);
			$build = $m[1];
		}
		
		//echo '<!--Writing new information about build: '.$build.' and '.$version.'<br>-->';
	}
	
	d_unlink($f);
	//echo '<!-- Deleting archive<br> -->';
	
	if($build!='undefined' && $build > BUILD)
	{
		d_unlink($cfg_old);
		return true;
	}
	
	return 'Update did not complete successfully. Please upload the new version <b>via FTP</b>. Here are the contents of your previous <b>config.php</b>:<pre>'.htmlspecialchars(d_file_get_contents($cfg_old)).'</pre>';
}

/* returns the contents of compressed JS */
function compress_js()
{
	// a hack for MAMP
	putenv("DYLD_LIBRARY_PATH=");
	
	$old = getcwd();
	// FULL VERSION
	
	// Dolphin.php Javascript (the sequence is important!)
	$f[]='grid.js';
	$f[]='render.js';
	$f[]='engine.js';
	$f[]='left_menu.js';
	$f[]='interface.js';
	// dolphin.js MUST be included last
	$f[]='dolphin.js';
	
	// JsHttpRequest AJAX Library (Dmitry Koterov)
	$f[]='../system/libs/JsHttpRequest.js';
	
	chdir(ROOT.'/f/');
	
	// compile library and disable cache by versioning
	// jscmp is my script which uses Dojo Toolkit to compress js files.
	exec('rm all*');
	
	include_once(ROOT.'/full/full_func.php');
	include_once(ROOT.'/light/light_func.php');
	
	$contents = "";
	foreach($f as $v)
	{
		$cont = file_get_contents($v);
		
		if(basename($v) != 'jquery.js' && basename($v) != 'gggr.js')
		{
			foreach(get_defined_constants() as $k=>$v)
			{
				$reg = '/([^\w])'.preg_quote($k).'([^\w])/s';

				if(strpos($cont, $k) !== false && preg_match($reg, $cont))
				{	
					$cont = preg_replace($reg, '${1}'.$v.'${2}', $cont);
				}
			}
		}
		
		$contents .= $cont."\n\n";
	}

	// CSS versioning
	
	@exec('mv overall.'.(BUILD-1).'.css overall.'.FVER.'.css');
	@exec('mv i/overall.'.(BUILD-1).'.png i/overall.'.FVER.'.png');
	
	// LIGHT VERSION
	
	chdir(ROOT.'/light/');
	
	@exec('mv light.'.(BUILD-1).'.css light.'.FVER.'.css');
	@exec('mv light.'.(BUILD-1).'.js light.'.FVER.'.js');
	
	chdir($old);

    return $contents;
}

/* returns smth like "~/music/" instead of "/home/yourock/music/" */
function getcwd_short()
{
	return ( substr($_SESSION['DIR'],0,strlen(abs_path(HOMEDIR))) == abs_path(HOMEDIR) ? '~'.substr($_SESSION['DIR'],strlen(abs_path(HOMEDIR))) : $_SESSION['DIR'] );
}

/**
 *
 * @param    string  $url
 * @param    string  $arg
 * @param    string  $value
 * @return   string
 * @author   Nasibullin Rinat <rin at starlink ru>
 * @charset  ANSI
 * @version  1.0.5
 */
function urlReplaceArg($url, $arg, $value)
{
	if (preg_match('/([?&]' . preg_quote($arg, '/') . '=)[^&]*/s', $url, $m))
	{
		$v = is_null($value) ? '' : $m[1] . urlencode($value);
		return str_replace($m[0], $v, $url);
	}
	if (is_null($value))
	{
		return $url;
	}
	$div = strpos($url, '?') !== false ? '&' : '?';
	return $url . $div . $arg . '=' . urlencode($value);
}

/**
 * The function from PHP manual that returns size in bytes of PHP.INI sizes: e.g. 4K , 5M , 10G
 *
 * @param string $val
 * @return int
 */
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val{strlen($val)-1});
    switch($last) {
        // The 'G' modifier is available since PHP 5.1.0
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }

    return $val;
}

/**
 * This function shows links for sorting ( for example, <a href="sort_link&sort=$param&order=desc">$name &uparr;</a> ). Depending on $ver ( light or full ), it will use different design for links
 *
 * @param string $name
 * @param string $param
 * @param string $ver
 */
function show_sort($name,$param,$ver)
{
	if(@$_GET['sort']!=$param) $order='asc';
	else if(@$_GET['order']!='asc') $order='asc';
	else $order='desc';
	$url=urlReplaceArg($_SERVER['REQUEST_URI'],'order',$order);
	$url=urlReplaceArg($url,'sort',$param);
	
	switch($ver)
	{
	case 'light':
	    if(@$_GET['sort']!=$param) $order='';
	    else $order=' <font color="black"><b>'.($order=='asc' ? 'v' : '^').'</b></font>';
	    
		echo '<nobr><a href="'.str_replace('&','&amp;',$url).'" class="sort">'.$name.$order.'</a></nobr>';
		break;
	}
}

/**
 * The function uploads the files to $dir (or $_SESSION['DIR'] if $dir is not set).
 * returns TRUE if everything is ok, FALSE otherwise
 */
function upload_files($dir=false)
{
	global $error;
	if($dir===false) $dir = $_SESSION['DIR'];
	
	$error=false;
	foreach($_FILES['files']['name'] as $i=>$value)
	{
		if(empty($_FILES['files']['tmp_name'][$i]) /* error happened */) continue;
		
		$f = clean($dir).'/'.basename($value);
		if(file_exists($f)) $f = clean(gen_copy_name($dir, basename($value)));
		//if(!@is_writable($dir)) d_chmod($dir);
		
		if(!@d_copy($_FILES['files']['tmp_name'][$i],$f)) $error=true;
	}
	return !$error;
}

/**
 * The function returns the current language string for $str
 *
 * @param string $str
 */
function lang($str)
{
	return $str;
}

/* debug function to display array contents recursively*/
function array_display($array)
{
	echo "<table border=1 cellpadding=2 cellspacing=2><tr><td colspan=2 style='text-align:center;'><b>array</b></td></tr>";
	
	foreach($array as $key=>$value)
	{
		if(!is_array($value))
		{
			echo "<tr><td width=100><i>".$key."</i></td><td>".$value."</td></tr>";
		}else
		{
			echo "<tr><td width=100><i><b style='color:red;'>".$key."</b></i></td><td>";
			array_display($value);
			echo "</td></tr>";
		}
	}

	echo "</table>";
}

/* returns array( path directories list, extensions list (with dots) ); */
function get_path_dirs()
{
	if(getenv('PATHEXT')) /* Windows... */
	{	
		return array(array_merge(explode(';', getenv('PATH')), array('.')), array_merge(array(""), explode(';', getenv('PATHEXT'))));
	}else
	{
		return array(array_merge(explode(':', getenv('PATH')), array('.')), array(""));
	}
}

function exec_split($out, $col=80)
{
	static $hyphen = "<img src='f/i/hyphen.png' width='13' height='9' title='string is too long' alt=''>";
	static $sep = false, $l = false, $unistr;
	
	if($sep === false)
	{
		$unistr = md5(uniqid(''));
		$sep = $hyphen.'<br>';
		$l = -strlen($unistr);
	}
	
	$out = explode("\n", $out);
	$res = '';
	
	foreach($out as $k=>$v)
	{
		$v = str_replace("\t", '    ', $v);
		$v = substr(chunk_split($v,$col,$unistr),0,$l);
		$res .= str_replace(array(' ', $unistr), array('&nbsp;', $sep), htmlspecialchars($v)).'<br>';
	}
	
	return substr($res,0,-4);
}

/* executes command $cmd, lines separated each $col symbols
   returns array ('startdir' => ..., 'output' => ..., 'dir' => ..., 'cmd' => ...) */

function exec_command($command, $col=80)
{	
	chdir($_SESSION['DIR']);
	//echo $_SESSION['DIR']."\n";
	
	$_RESULT['startdir'] = getcwd_short();
	
	$out = array();
	$ret = false;
	
	$command = ltrim($command);
	if(substr($command,0,3) == 'cd ' || substr($command,0,6) == 'chdir ')
	{
		if(substr($command,0,3) == 'cd ') $folder = trim(substr($command,3));
		else $folder = trim(substr($command,6));
		
		if($folder[0] == '"')
		{
			if($folder[strlen($folder)-1] == '"') $folder = stripcslashes(substr($folder, 1, strlen($folder)-2));
			else $folder = stripcslashes(substr($folder,1));
		}else
		{
			$folder = str_replace('\\ ', ' ', $folder);
		}
		
		if($folder[0]=='~') $folder = HOMEDIR.'/'.substr($folder,1);
		
		if(@chdir($folder))
		{
			$_SESSION['DIR'] = abs_path($folder);
			//echo $_SESSION['DIR'];
			$_RESULT['output']='';
		}else
		{
			$_RESULT['output']='cd: cannot change directory';
		}

	}else if(trim($command) == 'exit' || trim($command) == 'quit')
	{
		$_RESULT['exit'] = true;
	}else if(trim($command) == 'pwd')
	{
		$_RESULT['output'] = getcwd();
	}else
	{
		$tmp = explode(' ', $command);
		$cmd = $tmp[0];
		
		$ex = false; /* exists ? */
		list($dirs, $exts) = get_path_dirs();
		
		foreach($dirs as $dir)
		{
			foreach($exts as $ext)
			{
				if(file_exists($dir.'/'.$cmd.$ext))
				{
					$ex = true;
					break(2);
				}
			}
		}
		
		
		/*if(!$ex)
		{
			$out[] = 'command not found';
		}else
		{*/
		
		#if(is_callable('proc_open'))
		#{
			$ret = -1;
			
			#if(is_callable('putenv'))
			#{
				// for ls 
				putenv('ROWS=24');
				putenv('COLUMNS='.$col);
			#}

            $separator = uniqid();

//            $command .= '; echo '.$separator.' $?';

//            $command .= '; echo '.$separator.'; set; echo '.$separator.'; /bin/pwd';
			
			// code is taken from PHP Shell
			if($p = proc_open($command, array(1 => array('pipe', 'w'), 2 => array('pipe', 'w')), $io))
			{
				$out = array('');
				$out[0] .= stream_get_contents($io[1]).stream_get_contents($io[2]);
				
				fclose($io[1]);
	            fclose($io[2]);
	            $ret = proc_close($p);
			}
		
		#}else
		#{
		#	exec('('.$command.') 2>&1 <"'.(file_exists('/dev/null') ? '/dev/null' : 'nul').'"', $out, $ret);
		#}
		
		if($ret!=0 && !$ex) $out = array(GREET.': '.$cmd.': command not found');
		/*}*/
		
		//$fp = popen($command.' 2>&1')
		$_RESULT['output'] = implode("\n", $out);
	}
	
	$add = GREET.'$ ';
	
	$_RESULT['output'] = exec_split($_RESULT['output'], $col);
	$_RESULT['cmd'] = exec_split($add.$command, $col);
	$_RESULT['cmd'] = substr($_RESULT['cmd'],strlen($add)+strlen('&nbsp;')-1);
	
	$_RESULT['dir'] = getcwd_short();
	
	return $_RESULT;
}

function add_to_zip($files)
{
	@set_time_limit(0);
	if(sizeof($files)>1) $name=$_SESSION['DIR'].'/'.basename($_SESSION['DIR']);
	else $name=$_SESSION['DIR'].'/'.substr($n=basename($files[0]),0,($p=strrpos($n,'.'))===false ? strlen($n) : $p);
	if(file_exists($name.'.zip')) $name.='-'.time();
	$name.='.zip';
	
	
	require_once(ROOT.'/system/libs/pclzip.php');
	$arc=new PclZip($name);
	
	setwritable($_SESSION['DIR'], true);
	foreach($files as $k=>$v)
	{
		setreadable($v, true);
		$files[$k]=basename($v);
	}
	$old = getcwd();
	@chdir($_SESSION['DIR']);
	
	$res = $arc->create($files) or d_error($arc->errorInfo(true));
	@chdir($old);
	
	return $res;
}

/* extract $files
   $mode - either 'extract' (each archive is extracted to it's own folder)
   or 'extract_here' (all is extracted to current directory) */

function unzip_files($files, $mode)
{
	@set_time_limit(0);
	$old = getcwd();
	setwritable($_SESSION['DIR'], true);
	if(!@chdir($_SESSION['DIR'])) return d_error('Cannot change directory to "'.$_SESSION['DIR'].'".');
	
	require_once(ROOT.'/system/libs/pclzip.php');

	$extract=array();
	foreach($files as $k=>$v)
	{
		setreadable($v,true);
		$extract[$v]=new PclZip(basename(clean($v)));
	}
	
	if($mode=='extract')
	{
		foreach($extract as $k=>$v)
		{
			if(!$v->extract(PCLZIP_OPT_PATH,substr($n=basename($k),0,($p=strrpos($n,'.'))===false ? strlen($n) : $p)))
				$error=!d_error($v->errorInfo(true));
		}
	}else/* if($mode=='extract_here')*/
	{
		foreach($extract as $k=>$v)
		{
			if(!$v->extract('.')) $error=!d_error($v->errorInfo(true));
		}
	}
	
	@chdir($old);
	return !isset($error);
}

function have_time()
{
	static $start = false;
	if($start === false) $start = time();
	
	return (time()-$start) < (isset($GLOBALS['MAX_MULTIPART_TIME']) ? $GLOBALS['MAX_MULTIPART_TIME'] : MAX_MULTIPART_TIME);
}

/*
 * function, that begins multipart operation
 * 
 * PARAMS: array $params
 * 
 * array $params -- see possible keys in the beginning of function
 * 
 * RETURN:
 * 
 * array $cache -- an array (you should not know it's structure) with data
 *                 for multipart_cont() 
 */

function multipart_begin($params)
{
	$files = array(); // initial array of files & folders to process
	$data  = array(); // any information your functions may need to run
	$basedir = isset($_SESSION['DIR']) ? $_SESSION['DIR'] : getcwd();
	
	/* $processors is array of function names to process file
	 * ($filename -- name of file or directory):

		begin($filename, $data)

		  'begin' is name of function to start processing file.
		  function must return FALSE on failure and $resumedata array for cont() or
		  TRUE if you will not use cont(), with cont() being a continue function
		  described below.

	   the next two are not obligatory:

		cont($filename, $data, $resumedata):
		
		  function that continues the processing (should not work too long),
		  it should return TRUE on successfull finish, FALSE on error and
		  $resumedata array for temporary information, which is saved between
		  multipart_cont() calls. If function does not need resume data, please
		  return empty array instead of something else (because of strict 
		  comparison with bool TRUE and FALSE in multipart_cont() ).

		stop($filename, $data, $successful):

		  function to be executed on successful (or not) end of operation
	*/

	$processors = array('begin','cont','stop');
	
	/*
	
	$dircall: 
	 when to call processor for directory? before calling
	 file processors ('before'), after calling on all files in dir ('after')
	 
	 HINT: 'before' is for copying, 'after' -- for deleting items

	*/
	
	$dircall = 'before';
	
	extract($params, EXTR_OVERWRITE);
	
	/* "mark" all files as being of unknown type (see multipart_cont()) */
	foreach($files as $k=>$v) $files[$k] = 'n'.$v;
	
	if(sizeof($processors) == 1)
	{
		$processors = array($processors[0], false, false);
	}else if(sizeof($processors) == 2)
	{
		$processors = array($processors[0], $processors[1], false);
	}else if(sizeof($processors) != 3)
	{
		return d_error('Invalid processors: only from 1 to 3 processors supported');
	}
	
	return array(
		'data' => $data,
		'basedir' => $basedir,
		'processors' => $processors,
		'dircall' => $dircall,
		
		'files' => $files, /* files left for processing */
		 
		'curfile' => false, /* the name of processed file, if script was stopped at cont() function */
		'resume_data' => array(),
	);
}

/*
 * function to continue the processing of files
 * 
 * PARAMS: $cache -- obligatory parameter with function cache
 * 
 * RETURN:
 * 
 * TRUE on success (process finished successfully)
 * FALSE on error
 * array $cache if operation is to be continued
*/

function multipart_cont($cache)
{
	if(is_bool($cache)) return $cache; /* this line should be here */
	
	$keys = array_keys($cache);
	
	extract($cache);
	$cache = array();
	
	list($b,$c,$s) = $processors;
	
	if($c == 'cont') $c = false;
	if($s == 'stop') $s = false;
	
	if($curfile) $files[] = 'i'.$curfile;
	
	/*
	 * first symbol filename of $files will tell, what to do with file:
	 * 
	 * i -- intermediate file, which needs continue processing (w/$resume_data)
	 * n -- new file with unknown type: use all actions
	 * d -- directory which should not be expanded, just execute processors
	 *      (needed for $dircall = 'after' and 'before')
	 */

	//echo "before hello world\n";

	if(!@chdir($basedir)) return d_error('Cannot change directory to current');
	
	//echo 'hello world';
	
	while($it = array_pop($files))
	{
		$a    = $it[0]; /* action */
		$name = substr($it, 1);
		$curfile = false;
		
		if(!have_time())
		{
			$files[] = $it;
			
			foreach($keys as $key) $cache[$key] = $$key;
			return $cache;
		}
		
		if(is_file($name) || is_link($name) || $a == 'd' || $a == 'i')/*only execute processors*/ 
		{
			/* for intermediate files we already have $resume_data from cache */
			/* TODO: do not just skip errors at begin function */
			if($a != 'i' && ($resume_data=$b($name, $data)) === false) continue;
			
			if($c)
			{
				$have = true; /* for case when $resume_data = true */
				$curfile = $name;
				
				while(is_array($resume_data) && ($have=have_time()))
				{
					$resume_data = $c($name, $data, $resume_data);
				}
				
				if(!$have)
				{
					foreach($keys as $key) $cache[$key] = $$key;
					return $cache;
				}
				
				if($have && $s)
				{
					$s($name, $data, $resume_data);
				}
			}
		}else if(is_dir($name))
		{
			setreadable($name, true);
			if(!@$dh = opendir($name)) continue;
			
			if(/*$dircall == 'both' || */$dircall == 'after')  $files[] = 'd'.$name;
			
			/*
			 * we just get a list of files (even without determining type)
			 * because stat() (or is_file() or is_dir()) consumes much time.
			 * it is important if directory is huge (5000-50000 files)
			 */
			
			while(false!==($f=readdir($dh)))
			{
				if($f=='.'||$f=='..') continue;
				$files[] = 'n'.$name.'/'.$f;
			}
			
			closedir($dh);
			
			if(/*$dircall == 'both' || */$dircall == 'before') $files[] = 'd'.$name;
		}
	}
	
	return true;
}

/* multipart handlers */

function remove($name)
{
	$_SESSION['TOTAL_BYTES'] += filesize($name);
	
	echo $name;
	echo ' - '.print_r(is_link($name));
	
	if(is_dir($name))
	{
		$_SESSION['DIRS']++;
		
		if(!@rmdir($name))
		{
			setwritable(dirname(getcwd().'/'.$name), true);
			setwritable(getcwd().'/'.$name, true);
			return rmdir($name);
		}
	}else
	{
		$_SESSION['FILES']++;
		
		if(!@unlink($name))
		{
			setwritable(dirname(getcwd().'/'.$name), true);
			setwritable(getcwd().'/'.$name, true);
			return unlink($name);
		}
	}
	
	return true;
}

function size($name)
{
	$s = stat($name);
	$_SESSION['TOTAL_BYTES'] += sprintf('%u',$s['size']);
	
	$rights = get_rights($name, false, $s['mode']);
	$_SESSION['RIGHTS'][$rights] = $rights;
	$_SESSION['UIDS'][$s['uid']] = $s['uid'];
	$_SESSION['GIDS'][$s['gid']] = $s['gid'];
	
	if(($s['mode'] & 0x4000) == 0x4000 /* is dir? */) $_SESSION['DIRS']++;
	else                                              $_SESSION['FILES']++;
	
	return true;
}

function cpstart()
{
	return array();
}

function cpcont($name, &$data)
{
	static $fps = false, $fpd = false; /* File Pointer for Source, ... Destination */
	static $lastfile = false;
	
	global $__perms;
	
	//echo 'Fdadfas';
	
	setwritable(dirname(getcwd().'/'.$name), true);
	
	/* an array( source dir => dest dir ); -- to make copy into the same directory possible */
	if(!isset($data['dirs_replace'])) $data['dirs_replace'] = array();
	
	if(isset($data['lastnewname']))
	{
		$lastnewname = $data['lastnewname'];
	}else
	{
		$lastnewname = false;
	}
	
	if(empty($data['lastfile']) || $data['lastfile'] != $name)
	{
		if(abs_path($data['newdir']) == abs_path(dirname(getcwd().'/'.$name)))
		{
			$lastnewname = abs_path(gen_copy_name($data['newdir'], getcwd().'/'.$name));
			
			$data['dirs_replace'][abs_path(getcwd().'/'.$name)] = abs_path($lastnewname);
		}else
		{
			$lastnewname = abs_path($data['newdir'].'/'.$name);
			
			foreach($data['dirs_replace'] as $k=>$v)
			{
				if(strlen($lastnewname) < strlen($k)) continue;
				
				if(substr($lastnewname,0,strlen($k)) == $k)
				{
					$lastnewname = $v.substr($lastnewname, strlen($k));
					break;
				}
			}
		}
	}
	
	$newname = $data['lastnewname'] = $lastnewname;
	
	if(is_dir($name))
	{
		$lastfile = $data['lastfile'] = $name;
		$_SESSION['DIRS']++;
		return d_mkdir($newname, d_get_rights($name));
	}
	
	if($lastfile != $name)
	{
		if(is_resource($fps)) fclose($fps);
		if(is_resource($fpd)) fclose($fpd);
		
		$lastfile = $data['lastfile'] = $name;
		
		setreadable($name, true);
		
		if(!$fps = fopen($name, 'rb')) return false;
		
		//error_log('name: '.$name.', newname: '.$newname);
		
		setwritable($dn = dirname($newname), true);
		
		//if(!d_chmod($dn, 777)) echo 'Fuck!'.reason()."\n";
		
		//echo "rights: ". get_rights($dn,false) ."\n";
		
		if(file_exists($newname))
		{
			setwritable($newname, true);
            $info = get_files_info(array(basename($newname)), $dn);

			if(fseek($fps, sprintf('%u',filesize($newname))) < 0) return false;
		}else
		{
			$_SESSION['FILES']++;
		}
		
		if(!$fpd = fopen($newname, 'ab'))
		{
			$_SESSION['FILES']--; /* this file was counted, so we cancel it's count */
			return false;
		}
		
		$__perms[$newname] = get_rights($name);
	}
	
	$_SESSION['TOTAL_BYTES'] += fwrite($fpd, fread($fps, 65536));
	
	if(feof($fps)) return true;
	
	return array();
}

function chmod_processor($name, $data)
{
	if(is_dir($name)) $_SESSION['DIRS']++;
	else              $_SESSION['FILES']++;
	
	return d_chmod($name, $data['chmod']);
}

// class for generating the list of pages
// copyright Dmitry Koterov 2005
// http://forum.dklab.ru/php/advises/Tools_pageslistGenerationOfPaginalNavigation.html

class Tools_PagesList
{
        function make($pageSize, $nElts, $curElt=null, $url=false, $arg="p")
        {
                $pages = array();
                $pageSize = intval($pageSize);
                if ($pageSize <= 0) $pageSize = 10;
                if ($url === false) $url = $_SERVER["REQUEST_URI"];
                if ($curElt === null) $curElt = isset($_GET[$arg])? $_GET[$arg] : 0;
                for ($n=1,$i=0; $i<$nElts; $i+=$pageSize,$n++) {
                        if (preg_match("/([?&]$arg=)\\d+/s", $url)) {
                                $purl = preg_replace("/([?&]$arg=)\\d+/s", '${1}'.$i, $url);
                        } else {
                                $div = strpos($url, "?")? "&" : "?";
                                $purl = $url.$div.$arg."=".$i;
                        }
                        $pages[] = array(
                                "n"       => $n,
                                "pos"     => $i,
                                "isfirst" => false,
                                "islast"  => false,
                                "url"     => $purl,
                                "iscur"   => $curElt>=$i && $curElt<$i+$pageSize,
                        );
                }
                if (count($pages)) {
                        $pages[0]["isfirst"] = 1;               
                        $pages[count($pages)-1]["islast"] = 1;
                        if ($curElt >= $nElts) $pages[count($pages)-1]["iscur"] = true;
                }
                return $pages;
        }
       
        function frame($frameSize, $pageSize, $nElts, $curElt=null, $url=false, $arg="p")
        {
                $pages = Tools_PagesList::make($pageSize, $nElts, $curElt, $url, $arg);
                for ($i=0; $i<count($pages); $i++) if ($pages[$i]['iscur']) break;
                $cur = $i;
                $start = 0;
                if ($i > $frameSize/2) $start = intval($i-$frameSize/2);
                if (count($pages) - $start < $frameSize) $start = count($pages) - $frameSize;
                $start = max($start, 0);
                $framePages = array_slice($pages, $start, $frameSize);
               
                $frame = array();
                if ($start != 0) {
                        $prev = max($cur - $frameSize, 0);
                        $frame['prev'] = $pages[$prev];
                }
                if ($start + $frameSize < count($pages)) {
                        $next = min($cur + $frameSize, count($pages)-1);
                        $frame['next'] = $pages[$next];
                }
                $frame['pages'] = $framePages;
               
                return $frame;
        }
}

// the human_date function, that has been taken from
// http://blog.evandavey.com/2008/04/php-date-in-human-readable-form-facebook-style.html
// and modified a little bit

function human_date($timestamp)
{
	$difference = time() - $timestamp;
	$periods = array("sec", "min", "hour", "day", "week",
		"month", "year", "decade");
	$lengths = array("60", "60", "24", "7", "4.35", "12", "10");
	
	if($difference > 6*30*24*3600 /* 6 months */)
	{
		return date('F Y', $timestamp);
	}
	
	//ob_start();
	//var_dump($timestamp);
	//error_log( 'timestamp:'.ob_get_clean() );
	
	if ($difference >= 0)
	{
		if($difference <= 5) return 'a moment ago';
		
		// this was in the past
		$ending = "ago";
	}else
	{ // this was in the future
		$difference = -$difference;
		$ending = "to go";
	}
	
	for ($j = 0; $j < count($periods) - 1 && $difference >= $lengths[$j]; $j++)
		$difference /= $lengths[$j];
	$difference = round($difference);
	
	if ($difference != 1)
		$periods[$j].= "s";
	
	return "$difference $periods[$j] $ending";
}
?>