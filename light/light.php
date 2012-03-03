<?
if(!function_exists('dolphin_handler')) die('Dolphin not found');
?>
<html>
<head>
<title><?=NAME?> light version</title>
<link rel="stylesheet" type="text/css" href="light/light.<?=FVER?>.css" media="all">
<style type="text/css" media="handheld,perspection">
body { margin: 0px; padding: 0px; padding-left: 0px; padding-right: 0px; }
form { padding: 0px; padding-top: 0px; margin: 0px; }
h3 { padding: 0px; margin: 0px; }
p { padding: 0px; margin: 0px; }
textarea { height: 150px; }
.desktop { display: none; }
.toutput { font-size: 10px; }
</style>
<meta http-equiv="content-type" content="text/html; charset=<?=CHARSET?>" />
<!-- next is for iPhone -->
<meta name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=false;" />
<link media="only screen and (device-width: 320px)" href="light/iphone.css" type= "text/css" rel="stylesheet">
</head>
<body onload="if(!document.getElementById)return true;else{var el=document.getElementById('filter');if(el&&el.focus)el.focus();return true;}" bgcolor="white">
<script src="light/light.<?=FVER?>.js"></script>
<?if(defined('BAD_CONFIG')) echo '<h2 align="center">Warning! Your <b><a href="?act=edit&file='.rawurlencode(ROOT.'/config.php').'">config.php</a></b> is corrupted! Using default configuration.</h2>';?>
<h3 align="center"><?=NAME?></h3>
<?
include_once(ROOT.'/light/light_func.php');

@$f=clean($_REQUEST['file']);
set_magic_quotes_runtime(0);

if(@$_REQUEST['act']=='upload-new' && basename(ROOT)!='dolphin') die();

$nomain = true; /* disable display of filelist (act=main) for different actions */

switch(@$_REQUEST['act'])
{
	default:
		$nomain=false;
		break;
	case 'show-size':
		$nomain=false;
		if(!d_is_dir($f)) light_message('You should have entered the directory name');
		else
		{
			if(!empty($_REQUEST['nolimit']))
			{
				@set_time_limit(0);
				define('NOLIMIT', true);
			}
			light_message('Size of '.show_file($f).': <b>'.($sz=show_size(clean($_GET['file']))).'</b>'.($sz[0]=='&' ? ' <a href="index.php?act=show-size&DIR='.rawurlencode($_SESSION['DIR']).'&file='.rawurlencode($f).'&nolimit=true"><u>recount w/o limits</u></a>': ''));
		}
		break;
	case 'delete':
		$nomain=false;
		
		if(empty($_REQUEST['files']) && empty($_REQUEST['file']))
		{
			light_message('Choose at least one file!');
			break;
		}
		
		if(empty($_POST['files']))
		{
			if(empty($_REQUEST['confirm']) && empty($_REQUEST['unconfirm']))
			{
				light_message('<form action="index.php?act=delete&file='.rawurlencode($f).'" method="POST"><div align="center">Are you sure you want to delete '.show_file($f).'?<br><br><input type=submit name="confirm" value="Yes"> <input type=submit name="unconfirm" value="No"></div></form>');
			}else if(empty($_REQUEST['unconfirm']))
			{
				$file_str=show_file($f);
				$d_str=dirname($f);
				if(@d_remove($f)) light_message($file_str.' has been removed successfully.','index.php?DIR='.urlencode($d_str));
				else light_message($file_str.' could not be removed.'.reason(),'index.php?DIR='.urlencode($d_str));
			}else
			{
				header('Location: index.php?DIR='.dirname($f));
				exit();
			}
		}else
		{
			$error=false;
			foreach($_POST['files'] as $k=>$v) if(!@d_remove(clean($v))) $error=true;
	
			if(!$error) light_message('All files were removed successfully.');
			else light_message('There were some problems while removing files.'.reason());
		}
		break;
	case 'rename':
		if(empty($_REQUEST['files']) && empty($_REQUEST['file']))
		{
			light_message('Choose at least one file!');
			break;
		}
		
		if(empty($_REQUEST['files']) || sizeof($_REQUEST['files'])==1)
		{
			if(empty($_POST['apply']))
			{
				if(empty($_REQUEST['file'])) $f=clean($_REQUEST['files'][0]);
				light_message('<form action="index.php?act=rename&file='.urlencode($f).'" method="POST">Enter new name for '.show_file($f).':<br><input type=text name="new-file" value="'.htmlspecialchars(basename($f)).'"><br><input type=submit name="apply" value="rename"></form>');
			}else
			{
				$nomain=false;
				
				$file_str=show_file($f);
				$nf=clean($_SESSION['DIR'].'/'.$_POST['new-file']);
				if(@d_rename($f,$nf)) light_message('Renamed '.$file_str.' to '.show_file($nf).' successfully.','index.php?DIR='.dirname($f));
				else light_message('Failed to rename '.$file_str.' to '.show_file($nf,d_is_dir($f)?'dir':'file').reason(),'index.php?DIR='.dirname($f));
				
			}
		}else
		{
			if(empty($_POST['apply']))
			{
				$_SESSION['files']=$_POST['files']; //temporary archive for files
				light_message('<form action="index.php?act=rename&amp;files[]=1&files[]=2" method="POST">
				<input type="hidden" name="DIR" value="'.htmlspecialchars($_SESSION['DIR']).'">
				<h3>Renaming multiple files</h3>
				The <i>'.NAME.'</i> can rename files in the following way - you specify the mask of files, that you want to be renamed. "?" symbol will be replaced by the counter value. For example:<br>
<h4>Mask:</h4>
image<b>?</b>.jpg
<h4>Before renaming:</h4>
<i>some-image.jpg</i><br>
<i>some-other-image.jpeg</i><br>
<i>very-nice-image.jpe</i>
<h4>After renaming:</h4>
<i>image<b>1</b>.jpg</i><br>
<i>image<b>2</b>.jpg</i><br>
<i>image<b>3</b>.jpg</i><br>
				<h3>Rename</h3>
				You have selected <b>'.sizeof($_POST['files']).'</b> files.
				<br>Enter the mask: <input type=text name="mask" value="file?.ext">
				<br><input type=submit name="apply" value="rename">
				</form>');
			}else
			{
				$nomain=false;
				
				$error=false;
				$i=1;
				foreach($_SESSION['files'] as $k=>$v) if(!@d_rename(clean($v),clean($_SESSION['DIR'].'/'.str_replace('?',$i++,$_POST['mask'])))) $error=true;
				if(!$error) light_message('All files have been renamed successfully');
				else light_message('There were some problems while renaming files.'.reason(),'index.php');
				$_SESSION['files']=false;
				unset($_SESSION['files']);
			}
		}
		break;
	case 'copy':
	case 'cut':
		$nomain=false;
		
		if(!empty($_REQUEST['file'])) $_REQUEST['files']=array($_REQUEST['file']);
		if(empty($_REQUEST['files']))
		{
			light_message('Choose one or more files you want to '.$_REQUEST['act'].'.');
			break;
		}
		
		$_SESSION['copy']=$_SESSION['cut']=array();
		foreach($_REQUEST['files'] as $k=>$v) $_SESSION[$_REQUEST['act']][]=clean($v);
		
		light_message('Files have been prepared for the requested operation. Now go to the folder you want and choose "paste" there to paste the selected files.');
	
		break;
	case 'cancel':
		$nomain=false;
		
		$_SESSION['copy']=$_SESSION['cut']=array();
		
		light_message('Operation has been cancelled.');
		break;
	case 'paste':
		$nomain=false;
		
		paste('light_message');
		break;
	case 'advanced_paste':
		$bytes=0;
		$res = advanced_paste($_SESSION['DIR'], 'copy', $_SESSION['copy'], $bytes);
	
		$sz = show_size(false,true,@$_SESSION['adv_bytes']+=$bytes);
		
		if($res==FINISHED_COPY || empty($_SESSION['copy']))
		{
			$_SESSION['copy']=false;
			$_SESSION['adv_bytes']=0;
			$_SESSION['copy_cache']=null;
			
			$nomain=false;
			light_message('Files were successfully copied ('.$sz.' total).');
		}else
		{
			light_message('<meta http-equiv="refresh" content="1; URL=index.php?DIR='.rawurlencode($_SESSION['DIR']).'&act=advanced_paste&nocacheid='.rand().'">Copying ('.$sz.')...<br><br><a href="index.php?DIR='.rawurlencode($_SESSION['DIR']).'&act=advanced_paste&nocacheid='.rand().'"><u>--&gt; continue --&gt;</u></a><br><br>');
		}
		
		break;
	case 'edit':
		if(!empty($_REQUEST['apply']))
		{
			if(get_magic_quotes_gpc()) $_POST['content']=stripslashes($_POST['content']);
			if(!d_file_put_contents($f,$_POST['content']))
			{
				light_message('The file could not be edited.'.reason());
				break;
			}
			
			if(empty($_POST['save']))
			{
				$nomain=false;
				light_message('The file has been edited successfully.');
			}
			else header('Location: index.php?act=edit&file='.urlencode($f).'&success=ok&rand='.rand(0,1000));
		}else
		{
			$tmp=pathinfo($f);
			switch(@strtolower($tmp['extension']))
			{
			case 'jpeg':
			case 'jpe':
			case 'jpg':
			case 'gif':
			case 'png':
				@$sz=getimagesize($f);
				light_message('<h3>Preview of '.show_file($f).'</h3>
				<a href="system/download.php?file='.rawurlencode($f).'&'.session_name().'='.session_id().'"><img src="system/preview.php?file='.rawurlencode($f).'&size=normal" border="0" alt="Download the full image" title="Download the full image ('.($sz ? $sz[0].'x'.$sz[1].', ' : '').show_size($f).')"></a>');
				break;
			default:
				if(d_filesize($f)>102400)
				{
					header('location: system/download.php?file='.rawurlencode($f).'&'.session_name().'='.session_id());
					break;
				}
				
				$wr = setwritable($f,true);
				
				light_message('<h3>Edit '.show_file($f).' <small>(<a href="?act=properties&files[]='.rawurlencode($f).'&back='.rawurlencode('?act=edit&file='.rawurlencode($f)).'">info</a>)</small></h3>
				<form action="index.php?act=edit&apply=true&file='.rawurlencode($f).'" method="POST">
				<textarea name="content" id="content" rows=10 cols=40>'.htmlspecialchars(d_file_get_contents($f)).'</textarea>
				
				<script><!--
				/* for stupid IE <= 6 */
				var checkf = function()
				{
					if(!document.getElementById) return false;
					var el = document.getElementById("content");
					if(get_width()>=800) el.style.width = "750px";
					else /*if(el.clientWidth>(get_width()-50))*/ el.style.width = (get_width()-50)+"px";
					return true;
				}
				checkf();
				setInterval(checkf,100);
				//-->
				</script>
				
				<div align="center"><input type="submit" name="save" value="save changes" style="font-weight: bold;" id="save" '.($wr?'':'disabled="disabled"').'>&nbsp;&nbsp;&nbsp;<input type="submit" name="edit" value="save &amp; return" onclick="changed=false;" '.($wr?'':'disabled="disabled"').'></div>
				'.($wr ? '' : '<div style="color: red;">Warning! File is not writable!</div>').'
				'.(!empty($_GET['success']) ? '<div style="color: green;">File has been saved successfully.</div>' : '').'				
				</form>',false /* for stupid opera */);
				break;
			}
		}
		break;
	case 'upload':
		if(empty($_FILES['files']))
		{
			light_message('<form action="index.php?act=upload" method="POST" enctype="multipart/form-data">
 Choose files you want to upload<br>
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><input type="file" name="files[]" style="width:170px;">
 <br><br>Notice: The maximum filesize for upload - <b>'.show_size(false,true,return_bytes(ini_get('upload_max_filesize'))).'</b>.<br>
 <br><input type="submit" value="upload">
 </form>');
		}else
		{
			$nomain=false;
			
			$success = upload_files();
			
			if($success) light_message('Files were successfully uploaded to server');
			else light_message('There were some errors while uploading.');
		}
		break;
	case 'upload-new':
	case 'download-new':
		
		if( ($mess=update_dolphin('light_message')) !== NEED_UPLOAD && $mess === true)
		{
			light_message('Update completed successfully.');
		}else if( $mess === NEED_UPLOAD )
		{
			light_message('<form action="index.php?act=upload-new" method="POST" enctype="multipart/form-data">
To upload new version of '.SNAME.', you need to <a href="'.MASTER_SITE.'/files/dolphin-current.zip">download the latest version of '.SNAME.'</a> and upload it here. All required operations will be done automatically.
<br><br><input type="file" name="files[]">
<br><br><input type="checkbox" name="save-login" value="true" id="save-login" checked=checked><label for="save-login"> Save configuration and login information. </label>
<br><input type="submit" value="upload">
</form>');
		}else
		{
			light_message($mess);
		}
		
		break;
	case 'mkfile':
		@$f = clean($_SESSION['DIR'].'/'.$_REQUEST['file']);
		if(empty($_GET['apply']))
		{
			light_message('<form action="index.php?act=mkfile&apply=true" method="POST">
			Enter the name of file you want to create: 
			<br><input type="text" name="file" value="NewFile"> <input type="submit" value="go">
			</form>');
		}else
		{
			$nomain=false;
			
			if(!d_is_file($f) || !empty($_GET['confirm']))
			{
				if(d_file_put_contents($f,'')) light_message(show_file($f).' has been created successfully.');
				else light_message('File could not be created.'.reason());
			}else
			{
				light_message('File '.show_file($f).' already exists.
				<br><br><a href="index.php?act=mkfile&file='.urlencode($_REQUEST['file']).'&apply=true&confirm=true">Click here to clear the file contents</a>');
			}
		}
		break;
	case 'mkdir':
		@$f = clean($_SESSION['DIR'].'/'.$_REQUEST['file']);
		if(empty($_GET['apply']))
		{
			light_message('<form action="index.php?act=mkdir&apply=true" method="POST">
			Enter the name of directory you want to create: 
			<br><input type="text" name="file" value="NewFolder"> <input type="submit" value="go">
			</form>');
		}else
		{
			$nomain=false;
			
			if(d_mkdir($f)) light_message(show_file($f).' has been created successfully.');
			else light_message('Directory could not be created.'.reason());
		}
		break;
	case 'zip':
		$nomain=false;
		
		if(empty($_REQUEST['files']))
		{
			light_message('Choose at least one file!');
			break;
		}
		
		if(add_to_zip($_REQUEST['files'])) light_message('Files have been zipped successfully.');
		else light_message('Cannot add files to zip.'.reason());
		break;
	case 'release':
		/* I repeat: this feature is only for developer. Do not even try to use it */
		include(ROOT.'/release.php');
		break;
	case 'extract_here':
	case 'extract':
		$nomain=false;
		
		if(empty($_REQUEST['files']))
		{
			light_message('Choose at least one file!');
			break;
		}
		
		if(unzip_files($_REQUEST['files'], $_REQUEST['act'])) light_message('All files have been extracted successfully.'.reason());
		else light_message('Could not extract files.'.reason());
	
		break;
	case 'chmod':
		if(!empty($_POST['files']) && empty($_POST['mod']))
		{
			$mod = get_rights(clean($_POST['files'][0]));
			
			function box($mask)
			{
				$mask = bindec(str_replace(' ', '',$mask));
				
				//echo $mask.' ';
				
				return '<input type="checkbox" name="mod_smart[]" value="'.$mask.'" '.(octdec($GLOBALS['mod']) & $mask ? 'checked' : '').'>';
			}
			
			light_message('<form action="index.php?act=chmod" method="POST">
			Set CHMOD for selected files:
			
			<table>
				<tr>
					<th>&nbsp;</th>
					<th title="File owner">Owner</th>
					<th title="Users with the same group, as file owner">Group</th>
					<th>All</th>
				</tr>
				
				<tr>
					<th>Read</th>
					
					<td>'.box('100 000 000').'</td>
					<td>'.box('000 100 000').'</td>
					<td>'.box('000 000 100').'</td>
				</tr>
				
				<tr>
					<th>Write</th>
					
					<td>'.box('010 000 000').'</td>
					<td>'.box('000 010 000').'</td>
					<td>'.box('000 000 010').'</td>
				</tr>
				
				<tr>
					<th>Execute</th>
					
					<td>'.box('001 000 000').'</td>
					<td>'.box('000 001 000').'</td>
					<td>'.box('000 000 001').'</td>
				</tr>
			</table>
			
			<br>or enter the CHMOD value:  <input type="text" name="mod" value="'.$mod.'">
			
			<input type="hidden" name="mod_old" value="'.$mod.'">
			<br><br><input type="checkbox" name="recurse" value="true" id="recurse"><label for="recurse"> Recursive (will affect all subdirectories and all files in subdirectories)</label>
			<br><input type=submit value="chmod!">
			</form>');
			$_SESSION['chmod_files']=$_POST['files'];
		}else if(!empty($_SESSION['chmod_files']) && !empty($_POST['mod']))
		{
			$nomain=false;
			
			$_POST['files']=$_SESSION['chmod_files'];
			$_SESSION['chmod_files']=false;
			unset($_SESSION['chmod_files']);
			
			if($_POST['mod'] == $_POST['mod_old'])
			{
				$_POST['mod'] = decoct(array_sum($_POST['mod_smart']));
			}
			
			$error=false;
			foreach($_POST['files'] as $k=>$v)
			{
				$func = d_is_dir(clean($v)) && isset($_POST['recurse']) ? 'd_chmod_recursive' : 'd_chmod';
				if(!@$func(clean($v),$_POST['mod'])) $error=true;
			}
			if(!$error) light_message('All files have been CHMOD\'ed successfully.');
			else light_message('Could not CHMOD files.'.reason());
		}else
		{
			$nomain=false;
			
			light_message('Choose at least one file!');
		}
		break;
	case 'properties':
		if(empty($_REQUEST['files']))
		{
			$nomain=false;
			light_message('Choose at least one file to see properties!');
		}else if(sizeof($_REQUEST['files']) == 1)
		{
			$f = clean($_REQUEST['files'][0]);
			
			@$s = getimagesize($f);
			
			light_message('<h3>Properties for '.show_file($f).'</h3>
			<p>size: <b>'.show_size($f).'</b></p>
			<p>date: <b>'.date('d M Y',filemtime($f)).'</b></p>
			<p>mod: <b>'.get_rights($f, false).' ('.get_rights($f).')</b></p>
			'.(($owner=get_owner($f)) ? '<p>owner: <b>'.$owner.'</b></p>' : '').'
			'.(($group=get_group($f)) ? '<p>group: <b>'.$group.'</b></p>' : '').
			($s ? '<p>width: <b>'.$s[0].'px</b></p><p>height: <b>'.$s[1].'px</b></p>' : ''));
		}else
		{
			$files = $_REQUEST['files'];
			$groups = $owners = array();
			$fsizes = $dsizes = array();
			$mods = array();
			
			foreach($files as $k=>$v)
			{
				$v = $files[$k] = clean($v);
				
				$gr = get_group($v);
				if(!empty($gr)) $groups[$gr] = true;
				
				$own = get_group($v);
				if(!empty($own)) $owners[$own] = true;
				
				$mod = get_rights($v);
				$mods[$mod] = true;
				
				if(d_is_file($v)) $fsizes[] = show_size($v, false);
				else $dsizes[] = show_size($v, false);
			}
			
			light_message('<h3>Properties for selected items</h3>
			<p>size of '.sizeof($fsizes).' selected files: <b>'.show_size(0,false,array_sum($fsizes)).'</b></p>
			<p>size of '.sizeof($dsizes).' selected dirs: <b>'.show_size(0,false,array_sum($dsizes)).'</b></p>
			<p>total size: <b>'.show_size(0,false,array_sum($fsizes)+array_sum($dsizes)).'</b></p>
			'.(sizeof($mods)==1 ? '<p>mod: <b>'.get_rights($v,false).' ('.get_rights($v).')</b></p>' : '').'
			'.(sizeof($owners)==1 ? '<p>owner: <b>'.get_owner($v).'</b></p>' : '').'
			'.(sizeof($groups)==1 ? '<p>group: <b>'.get_group($v).'</b></p>' : '') );
			
			
		}
		break;
	case 'terminal':
		if(!empty($_REQUEST['cmd']))
		{
			$res = exec_command($_REQUEST['cmd']);
		}else
		{
			$res = array('cmd'=>'', 'output'=>'', 'dir'=> getcwd_short());
		}
		
		light_message('<form action="?act=terminal" method="POST" style="margin: 0px; padding: 0px;"><h3>'.$res['dir'].'</h3>
		<!-- cmd has id "filter" because filter is default focused on -->
		<input type=text id="filter" name="cmd" value="'.(!empty($_REQUEST['cmd']) ? htmlspecialchars($_REQUEST['cmd']) : '').'"><br>
		<input type="submit" value="execute">
		<br>
<br><div style="font-family: Courier New, Courier, monospace;" class="toutput">'.$res['output'].'</div>
		');
		break;
	case 'logout':
		logout();
		break;
}

if(!$nomain || $_REQUEST['act']=='main')
{
	if(empty($_GET['sort']) && empty($_SESSION['sort'])) $_GET['sort']='name';
	else if(empty($_GET['sort']) && !empty($_SESSION['sort'])) $_GET['sort']=$_SESSION['sort'];
	
	if(empty($_GET['order']) && empty($_SESSION['order'])) $_GET['order']='asc';
	else if(empty($_GET['order']) && !empty($_SESSION['order'])) $_GET['order']=$_SESSION['order'];
	
	if(!isset($_GET['p']) && !empty($_REQUEST['DIR'])) $_GET['p']='';
	else if(!isset($_GET['p']) && empty($_REQUEST['DIR']) && isset($_SESSION['p'])) $_GET['p']=$_SESSION['p'];
	
	if(empty($_GET['filter']) && !empty($_REQUEST['DIR'])) $_GET['filter']='';
	else if(empty($_GET['filter']) && empty($_REQUEST['DIR']) && isset($_SESSION['filter'])) $_GET['filter']=$_SESSION['filter'];
	
	$_SESSION['sort']=$_GET['sort'];
	$_SESSION['order']=$_GET['order'];
	@$_SESSION['p']=$_GET['p'];
	@$_SESSION['filter']=$_GET['filter'];

?>
<div id="debug" style="position: absolute; width: 200px; top:0px; left: 0px;"></div><table width="100%" cellpadding="0" cellspacing="0" border="0">
 <tr>
  <td class="main" bgcolor="#c3d9ff" valign="middle"><?
  
  if(empty($_GET['p'])) $page=0;
  else $page=intval($_GET['p']);
  
  $per = LIGHT_PERPAGE; // per page
  
  $mypage = ceil($page / $per) + 1;
  $res=read_directory(true,array(
  	'pagemin' => $mypage,
  	'pagemax' => $mypage,
  	'filt'    => $_GET['filter'],
  	'sort'    => $_GET['sort']?$_GET['sort']:'name',
  	'order'   => $_GET['order'],
  ));
  
  $pg = ''; // pages html
  
  $files = $dirs = array();
  
  if($res)
  {
  	  $pages = $res['pages_num'];
	  if($pages>1)
	  {
	  	$pg.='<div align="center">page: ';
	
	  	$frame=Tools_PagesList::frame(7,$per,$res['items_num']);
	  	
	  	if(!empty($frame['prev'])) $pg.='<a href="'.$frame['prev']['url'].'">...</a> ';
	  	foreach($frame['pages'] as $p)
	  	{
	  		if($p['iscur']) $pg.='<b style="background-color: #eaeaff;">'.$p['n'].'</b> ';
	  		else $pg.='<a href="'.$p['url'].'">'.$p['n'].'</a> ';
	  	}
	  	if(!empty($frame['next'])) $pg.='<a href="'.$frame['next']['url'].'">...</a>';
	  }
	  
	  @$files = $res['pages'][$mypage]['files']['name'];
	  if(!$files) $files = array();
	  @$tmp = $res['pages'][$mypage]['files']['size'];
	  $fsizes = array();
	  foreach($files as $k=>$v) $fsizes[$v] = $tmp[$k];
	  
	  @$dirs = $res['pages'][$mypage]['dirs']['name'];
	  if(!$dirs) $dirs = array();
	  @$tmp = $res['pages'][$mypage]['dirs']['size'];
	  $dsizes = array();
	  foreach($dirs as $k=>$v) $dsizes[$v] = $tmp[$k];
  }
 
?><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="100%">Go: <a href="<?(!empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'javascript:history.back(1)')?>" onclick="history.back(1);return false;">Back</a>,&nbsp;<a href="javascript:history.forward(1)">Forward</a><?if($up){?>,&nbsp;<a href="index.php?DIR=<?=rawurlencode($up)?>">Up</a><?}?></td><td><a href="index.php?rand=<?=rand()?>" id="refresh_a">Refresh</a></td></tr></table>

<form action="index.php" method="GET"><table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="n" width="60"><b>address</b></td><td class="n"><input type="text" name="DIR" value="<?=htmlspecialchars($_SESSION['DIR'])?>" style="width: 100%;" size="10"></td><td class="n" width="30"><input type=submit value="go"></td></tr></table></form><form action="index.php" method="GET"><table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td class="n" width="60"><b>filter</b></td><td class="n"><input type="hidden" name="DIR" value="<?=htmlspecialchars($_SESSION['DIR'])?>"><input type=text name="filter" id="filter" value="<?=(!empty($_GET['filter']) ? htmlspecialchars($_GET['filter']) : 'part of filename...')?>" onfocus="if(this.value=='part of filename...') this.value='';" style="width: 100%;<?=(!empty($_GET['filter']) ? (sizeof($dirs)+sizeof($files)>0 ? 'background: #dcffcc;' : 'background: #ffc8a6;') : '')?>" size="10"></td><td class="n" width="90"><nobr><input type=submit value="apply">&nbsp;<input type=submit name="nofilter" value="clear" onmousedown="if(document.getElementById) document.getElementById('filter').value='';"></nobr></td></tr></table>
</form>  

<form action="index.php" method="POST" onsubmit="return validate_act();">
  <?=$pg?>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" class="list">
   <tr height="24" bgcolor="#a2c4fe">
    <th id="sort_menu"><div><?=show_sort('Name','name','light')?></div></th>
    <th align="left" width="75">&nbsp;<?=show_sort('Size','size','light')?></th>
   <!-- <th align="left">&nbsp;Actions</th> -->
   </tr>
   <?
     if($res) light_show_filelist();
     else echo '<tr height=50 bgcolor="#eeeeee"><td colspan=3><div align="center">Directory could not be opened.'.reason().'</div></td></tr>';
  ?>
  </table>

  <script> if(document.getElementById){ document.getElementById('sort_menu').innerHTML =  '<div style="float: left;<?=(sizeof($dirs)+sizeof($files)>0 ? '' : ' visibility: hidden;')?>" id="all_div"><input type="checkbox" name="all" id="all" align="left" onclick="select_all(this);"><label for="all"> (this page)</label></div>' + document.getElementById('sort_menu').innerHTML; }</script>
  <?=($pg)?>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr><td class="n">
  <input type="hidden" name="DIR" value="<?=htmlspecialchars($_SESSION['DIR'])?>">
  <p><b>actions:</b>
  <br><select name="act" id="act_choice">
  <optgroup label="usual operations">
   <? if(!empty($_SESSION['copy']) || !empty($_SESSION['cut'])) { ?><option value="paste">paste</option>
  <!-- <option value="advanced_paste">paste (big files)</option> -->
   <option value="cancel">cancel operation</option><?}?>
   <option value="chmod">chmod</option>
   <option value="properties">show properties</option>
   <option value="cut">cut</option>
   <option value="copy">copy</option>
   <option value="rename">rename</option>
   <option value="delete">delete</option>
  </optgroup>
  <optgroup label="add to">
   <option value="zip">add to zip</option>
   <!-- <option value="prepare">folder upload</option> -->
  </optgroup>
  <optgroup label="extract (zip)">
   <option value="extract_here">extract here</option>
   <option value="extract">each to own dir</option>
  </optgroup>
  </select> <input type="submit" name="usual" value="go">
  </form>
  </p>
  </td>
  <td class="n">
  <form action="index.php" method="POST" style="padding-top: 0px;" onsubmit="if(this.act.value=='download-new') return confirm('Run update?');return true;">
  <input type="hidden" name="DIR" value="<?=htmlspecialchars($_SESSION['DIR'])?>">
  <p><b>other: </b>
  <br><select name="act">
  <optgroup label="usual operations">
   <option value="upload">upload files</option>
   <option value="mkfile">create file</option>
   <option value="mkdir">create directory</option>
   <option value="terminal">open terminal</option>
  </optgroup>
  <optgroup label="update">
<? if(IS_DEVELOPER) echo '<option value="release">release new version</option>';
   else echo ' <option value="download-new">install new version</option>';
?>
  </optgroup>
  </select> <input type="submit" name="other" value="go">
  </form>
  </p>
  </td>
  </tr>
  </table>
 </tr>
</table>
<?
}
?>
<?stats()?>
</body>
</html>