<?
// the file of actions of FULL version

// all actions are JsHttpRequest backends

if(!function_exists('dolphin_handler')) die('dolphin not found');

ajax_start_transfer();

$fz=array(); /* filez :) */
$f=false;

if(!empty($_REQUEST['file'])) $fz[]=$f=clean($_REQUEST['file']);
if(!empty($_REQUEST['fullpath'])) $fz[]=$f=clean($_REQUEST['fullpath']);
if(!empty($_REQUEST['items']))
{
	foreach($_REQUEST['items'] as $v) $fz[]=clean($v/*['fullpath']*/);
	$f=$fz[0];
}

switch(@$_REQUEST['act'])
{
case 'filelist':
	$mypage = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
	
	$_REQUEST['params'] = array(
		'perpage' => 1,
		'pagemin' => 1,
		'pagemax' => 1,
		'filt'    => isset($_REQUEST['filter']) ? $_REQUEST['filter'] : false,
	);
	
	$res=read_directory(true,$_REQUEST['params']);
	$first_files = explode("/", substr($res['res'], 0, 2000));
	if (count($first_files)) array_pop($first_files);
	
	$_RESULT = array(
		'res'        => $res['res'],
		'count'      => $res['cnt'],
		'fileinfo'   => get_files_info($first_files),
		'DIR'        => $_SESSION['DIR'],
		'stats'      => stats(false),
		'info'       => get_info($_SESSION['DIR']),
		'type'       => (!empty($req['type']) && empty($drives) ? $req['type'] : (empty($drives) ? tDIR : tMYCOMP)),
		'up'         => $up,
		'reason'     => reason(),
	);
	break;
case 'files-info':
    $_RESULT = array(
        'info' => get_files_info($_REQUEST['files']),
    );
    break;
case 'info':	
	$_RESULT = get_info($f,$_REQUEST);
	break;
case 'delete':
	if(empty($_SESSION['DCACHE']) || $_SESSION['DFILEZ']!=$fz) /* Delete Cache */
	{
		$_SESSION['TOTAL_BYTES'] = $_SESSION['DIRS'] = $_SESSION['FILES'] = 0;
		
		$_SESSION['DCACHE'] = multipart_begin(array(
			'basedir' => dirname($fz[0]),
			'files' => array_map('basename', $_SESSION['DFILEZ'] = $fz),
			'processors' => array('remove'),
			'dircall' => 'after',
		));
		
		$GLOBALS['MAX_MULTIPART_TIME'] = 1;
	}
	
	if(is_array($_SESSION['DCACHE'] = multipart_cont($_SESSION['DCACHE'])))
	{
		$end = false;
	}else
	{
		$_SESSION['DCACHE'] = false;
		unset($_SESSION['DCACHE']);
		$end = true;
	}
	
	$_RESULT = array(
	'dirs'   => $_SESSION['DIRS'],
	'files'  => $_SESSION['FILES'],
	'total'  => show_size(false,true,$_SESSION['TOTAL_BYTES']),
	'end'    => $end,
	'success' => $_SESSION['DCACHE'] !== false,
	);
	break;
case 'rename':
	$f = clean($_REQUEST['old']);
	if(empty($_REQUEST['new'])) $_REQUEST['new'] = basename($f);
	$newname = clean(dirname($f).'/'.$_REQUEST['new']);
	if(!d_rename($f,$newname)) $_RESULT = array( 'success' => false, 'reason' => reason(), 'f' => $f );
	else $_RESULT = array( 'success' => true );
	
	break;
case 'mkdir':
	$f=clean($_SESSION['DIR'].'/'.$_REQUEST['name']);
	if(!d_mkdir($f)) $_RESULT = array('success' => false, 'reason' => reason());
	else $_RESULT = array('success' => true);
	
	break;
case 'mkfile':
	$f=clean($_SESSION['DIR'].'/'.$_REQUEST['name']);
	if(file_exists($f) && $_REQUEST['confirm']==0)
	{
		$_RESULT = array('exists' => true);
	}else if(file_exists($f) && $_REQUEST['confirm'] == 1 || !file_exists($f))
	{
		$_RESULT = array('success' => d_file_put_contents($f,''), 'reason' => reason());
	}else $_RESULT = array('success' => false, 'reason' => 'unknown situation');
	
	break;
case 'download_get_href':
	if(MULTIVIEWS_ENABLED)
	{
		$_RESULT = array( 'href' => 'system/download.php/'.session_name().'='.session_id().'/'.rawurlencode(base64_encode(dirname($f))).'/'.rawurlencode(basename($f)) );
	}else
	{
		$_RESULT = array( 'href' => 'system/download.php?file='.rawurlencode($f).'&'.session_name().'='.session_id() );
	}
	break;
case 'copy':
case 'cut':
	$_REQUEST['files']=$fz;
	/*if(empty($_REQUEST['files']))
	{
		light_message('::Please choose one or more files you want to '.$_REQUEST['act'].'.::');
		break;
	}*/
	
	$_SESSION['copy']=$_SESSION['cut']=array();
	foreach($_REQUEST['files'] as $k=>$v) $_SESSION[$_REQUEST['act']][]=clean($v);
	
	$_RESULT = sizeof($_REQUEST['files'])>0 ? true : false;
	break;
case 'paste':
	if(!empty($_SESSION['cut']))
	{
		@set_time_limit(0);
		function full_print($param){ echo $param; }
		
		$_RESULT = paste('full_print');	
	}else
	{
		if(empty($_SESSION['CPCACHE'])) /* CoPy Cache */
		{
			$_SESSION['TOTAL_BYTES'] = $_SESSION['DIRS'] = $_SESSION['FILES'] = 0;
			
			$src = abs_path(dirname($_SESSION['copy'][0]),false).'/';
			$dest = abs_path($_SESSION['DIR'],false).'/';
			
			/*
			if($src!=$dest && substr($dest,0,strlen($src))==$src)
			{
				print('Cannot copy the directory inside itself.');
				$_RESULT = false;
				break;
			}
			*/
			
			foreach($_SESSION['copy'] as $v)
			{
				$v.='/';
				
				if(substr($dest,0,strlen($v))==$v)
				{
					echo 'Cannot copy the directory inside itself.';
					$_RESULT = false;
					break(2);
				}
			}
			
			$GLOBALS['MAX_MULTIPART_TIME'] = 1;
			
			$_SESSION['CPCACHE'] = multipart_begin(array(
				'basedir' => substr($src,0, -1),
				'files' => array_map('basename', $_SESSION['copy']),
				'processors' => array('cpstart', 'cpcont'),
				'dircall' => 'before',
				'data' => array('newdir' => substr($dest,0, -1))
			));
		}
		
		$prev_bytes = $_SESSION['TOTAL_BYTES'];
		
		$success = false;
		
		if(is_array($_SESSION['CPCACHE'] = multipart_cont($_SESSION['CPCACHE'])))
		{
			$end = false;
		}else
		{
			$success = $_SESSION['CPCACHE'] !== false;
			$_SESSION['CPCACHE'] = false;
			unset($_SESSION['CPCACHE']);
			$end = true;
		}
		
		$_RESULT = array(
		'dirs'   => $_SESSION['DIRS'],
		'files'  => $_SESSION['FILES'],
		'total'  => show_size(false,true,$_SESSION['TOTAL_BYTES']),
		'speed'  => show_size(false,true, floor($_SESSION['TOTAL_BYTES'] - $prev_bytes) / (array_sum(explode(' ', microtime())) - START_TIME)) . '/sec',
		'end'    => $end,
		'success' => $success,
		);
	
	}
	break;
case 'cancel_copy':
	$_SESSION['copy']=$_SESSION['cut']=array();
	$_SESSION['CPCACHE'] = false;
	unset($_SESSION['CPCACHE']);
	$_RESULT = true;
	break;
case 'upload':
	$_RESULT = upload_files(clean($_REQUEST['DIR']));
	if(!$_RESULT) echo 'Could not upload files.'.reason();
	break;
case 'show-properties':
	//array_display($_SESSION);
	
	if(empty($_SESSION['SPCACHE']) || $_SESSION['SPFILEZ']!=$fz) /* Show Properties Cache */
	{
		$_SESSION['TOTAL_BYTES'] = $_SESSION['DIRS'] = $_SESSION['FILES'] = 0;
		$_SESSION['RIGHTS'] = $_SESSION['UIDS'] = $_SESSION['GIDS'] = array();
		
		$_SESSION['SPCACHE'] = multipart_begin(array(
			'basedir' => dirname($fz[0]),
			'files' => array_map('basename', $_SESSION['SPFILEZ'] = $fz),
			'processors' => array('size'),
		));
		
		$GLOBALS['MAX_MULTIPART_TIME'] = DIRSIZE_LIMIT; /* users should not wait too long at first time */
	}
	
	if(is_array($_SESSION['SPCACHE'] = multipart_cont($_SESSION['SPCACHE'])))
	{
		$end = false;
	}else
	{
		$success = $_SESSION['SPCACHE'] !== false;
		$_SESSION['SPCACHE'] = false;
		unset($_SESSION['SPCACHE']);
		$end = true;
	}
	
	$_RESULT = array(
	'dirs'   => $_SESSION['DIRS'],
	'files'  => $_SESSION['FILES'],
	'total'  => show_size(false,true,$_SESSION['TOTAL_BYTES']),
	'uids'   => implode(', ', $_SESSION['UIDS']),
	'gids'   => implode(', ', $_SESSION['GIDS']),
	'rights' => implode(', ', $_SESSION['RIGHTS']),
	'mod'    => d_get_rights($fz[0]),
	'end'    => $end,
	'success' => $success,
	'dir'    => sizeof($fz) == 1 ? d_is_dir($fz[0]) : true,
	);
	break;
case 'save-file':
	$f = clean(urldecode($_REQUEST['filename_encoded']));
	
	if(!d_file_put_contents($f, $_REQUEST['content']))
	{
		echo 'Cannot edit file.'.reason();
		$_RESULT = false;
	}else $_RESULT = true;
	break;
case 'exec':
	session_write_close();
	$_RESULT = exec_command($_REQUEST['cmd']);
	break;
case 'get_rights':
	$_RESULT = d_get_rights($f);
	break;
case 'set_rights':
	if(!$_REQUEST['recursive'])
	{
		$_RESULT = true;
		
		//array_display($_REQUEST);
		
		foreach($fz as $v)
		{
			if(!d_chmod($v, trim($_REQUEST['mod']))) $_RESULT=false;
		}
		
		if(!$_RESULT) echo 'Could not change file rights.'.reason();
	}else
	{
		if(empty($_SESSION['CHCACHE']) || $_SESSION['CHFILEZ']!=$fz) /* CHmod Cache */
		{
			$_SESSION['DIRS'] = $_SESSION['FILES'] = 0;
			
			$_SESSION['CHCACHE'] = multipart_begin(array(
				'basedir' => dirname($fz[0]),
				'files' => array_map('basename', $_SESSION['CHFILEZ'] = $fz),
				'processors' => array('chmod_processor'),
				'data' => array('chmod' => trim($_REQUEST['mod']))
			));
			
			$GLOBALS['MAX_MULTIPART_TIME'] = 1;
		}
		
		if(is_array($_SESSION['CHCACHE'] = multipart_cont($_SESSION['CHCACHE'])))
		{
			$end = false;
		}else
		{
			$_SESSION['CHCACHE'] = false;
			$success = $_SESSION['CHCACHE'] !== false;
			unset($_SESSION['CHCACHE']);
			$end = true;
		}
		
		$_RESULT = array(
		'dirs'   => $_SESSION['DIRS'],
		'files'  => $_SESSION['FILES'],
		'end'    => $end,
		'success' => $success,
		);
	}
	break;
case 'zip':
	$_RESULT = add_to_zip($fz);
	if(!$_RESULT) echo 'Could not add to zip.'.reason();
	break;
case 'unzip':
	$_RESULT = unzip_files(array($f), $_REQUEST['mode']);
	if(!$_RESULT) echo 'Could not extract files.'.reason();
	break;
case 'update':
	$_REQUEST['act'] = 'download-new'; /* for correct work of update_dolphin() */
	$_RESULT = update_dolphin(create_function('$cmd','return true;'))===true;
	break;
case 'ping':
	$_RESULT = 'pong';
	break;
case 'handletab':
	$cmd = ltrim($_REQUEST['cmd']);
	
	$parts = explode(' ', $cmd);
	
	if(sizeof($parts) <= 1) /* autocomplete command */
	{
		list($dirs, $exts) = get_path_dirs();
		foreach($exts as $k=>$v) $exts[$k] = trim(strtolower($v));
		$tmp = strtolower($cmd);
		$l = strlen($cmd);
		$found = array();
		
		foreach($dirs as $d)
		{
			if( !@$dh = opendir($d) ) continue;
			
			while( ($f = readdir($dh)) !== false)
			{
				if($f=='.'&&$f=='..') continue;
				
				if(strtolower(substr($f, 0, $l)) == $tmp && is_file($d.'/'.$f))
				{
					$good = is_callable('is_executable') ? is_executable($d.'/'.$f) : false; /* for *nix */
					$ext = '';
					
					if(sizeof($exts) > 1) /* for Windows */
					{
						$good = false;
						foreach($exts as $v)
						{
							if(empty($v)) continue; /* in Windows file without extension is not executable */
							if( strlen($f)>strlen($v) && strtolower(substr($f, -strlen($v))) == $v)
							{
								//echo $f.' ';
								$good = true;
								$ext = $v;
								break;
							}
						}
					}
					
					if($good)
					{
						if($ext) $f = substr($f, 0, -strlen($ext));
					
						//echo $f.' ';
							
						$found[]=$f;
					}
				}
			}
			
			closedir($dh);
		}
		
		if(sizeof($found) == 0)
		{
			$_RESULT['cmd'] = $cmd;
		}else if(sizeof($found) == 1)
		{
			$_RESULT['cmd'] = $found[0];
		}else /* if sizeof($found) > 1 */
		{
			/* find the longest string, equal for all */
			for($good = true, $i = $l; $good; )
			{
				$i++;
				$tmp = substr($found[0], 0, $i);
				
				foreach($found as $v)
				{
					if(substr($v, 0, $i) != $tmp)
					{
						$good = false;
						break;
					}
				}
			}
			
			$i--;
			
			if($i == $l) /* means that TAB was pressed again */
			{
				$_RESULT['output'] = '';
				if(sizeof($found) < 30)
				{
					foreach($found as $v) $_RESULT['output'] .= $v.' ';
				}else
				{
					for($j=0;$j<29;$j++) $_RESULT['output'] .= $found[$j].' ';
					$_RESULT['output'] .='...';
				}
			}
			
			$_RESULT['cmd'] = substr($found[0], 0, $i);
		}
	}else
	{
		$ignorecase = file_exists(dirname(__FILE__).'/'.strtoupper(basename(__FILE__)));
		$tmp = $ignorecase ? strtolower($parts[sizeof($parts)-1]) : $parts[sizeof($parts)-1];
		$l = strlen($tmp);
		$found = array();
		
		if( !@$dh = opendir($_SESSION['DIR']) )
		{
			$_RESULT=false;
			die('Permission denied');
		}
		
		if($ignorecase)
		{
			while( ($f = readdir($dh)) !== false)
			{
				if($f=='.' || $f=='..') continue;
				if(strtolower(substr($f, 0, $l)) == $tmp) $found[]=$f;
			}
		}else
		{
			while( ($f = readdir($dh)) !== false)
			{
				if($f=='.' || $f=='..') continue;
				if(substr($f, 0, $l) == $tmp) $found[]=$f;
			}
		}
		
		closedir($dh);
		
		//print_r($found);
		
		if(sizeof($found) == 0)
		{
			$_RESULT['cmd'] = implode(' ', $parts);
		}else if(sizeof($found) == 1)
		{
			$parts[sizeof($parts)-1] = $found[0];
			$_RESULT['cmd'] = implode(' ', $parts);
		}else /* if sizeof($found) > 1 */
		{
			/* find the longest string, equal for all */
			for($good = true, $i = $l; $good; )
			{
				$i++;
				$tmp = substr($found[0], 0, $i);
				
				foreach($found as $v)
				{
					if(substr($v, 0, $i) != $tmp)
					{
						$good = false;
						break;
					}
				}
			}
			
			$i--;
			
			if($i == $l) /* means that TAB was pressed again */
			{
				$_RESULT['output'] = '';
				if(sizeof($found) < 30)
				{
					foreach($found as $v) $_RESULT['output'] .= $v.' ';
				}else
				{
					$_RESULT['output'] .= 'too many results';
				}
			}
			
			$parts[sizeof($parts)-1] = substr($found[0], 0, $i);
			$_RESULT['cmd'] = implode(' ', $parts);
		}
	}
	
	$_RESULT['dir'] = getcwd_short();
	break;
}
?>