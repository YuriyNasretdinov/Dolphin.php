<?
function determine_type($f)
{
	if($f == lang('My computer')) return tMYCOMP;
	if($f[0] != '/' && $f[1] == ':' && strlen($f) <= 3) return tDRIVE;
	
	return d_is_dir($f) ? tDIR : tFILE;
}

function get_info($f, $_REQUEST = array())
{
	global $descr;
	
	if(!isset($_REQUEST['type'])) $_REQUEST['type'] = determine_type($f);
	
	if(isset($_REQUEST['file'])) $f = clean($_REQUEST['file'], true);
	
	if($f == lang('My computer'))
	{
		$_RESULT = array(
		'name' => 'details',
		'filename' => htmlspecialchars($f),
		'dir' => false,
		'type' => lang('System folder'),
		);
	}else if(in_array($_REQUEST['type'],array(tDIR,tFILE)))
	{
		if(!@lstat($f)) return null;
		
		$ext=pathinfo($f); @$ext=strtolower($ext['extension']);
		$imgext = array('jpeg','jpe','gif','png','jpg');
		
		if(preg_match('/Darwin/is', PHP_OS)) $imgext = array_merge($imgext, explode(' ','pdf doc docx ppt pptx xls xlsx tiff tif bmp mov avi mpg mp4 tga psd svg eps key pages html'));
		
		$img=in_array($ext,$imgext);
		
		//echo $f;
		
		$real_link = $link_raw = @is_link($f) && function_exists('readlink') ? readlink($f) : false;
		
		if($link_raw !== false && $link_raw[0] != '/') // not absolute link
		{
			$link_raw = abs_path( dirname($f).'/'.$link_raw );
		}
		
		$_RESULT=array(
		'name' => 'details',
		'filename' => htmlspecialchars(basename($f)),
		'filename_encoded' => rawurlencode($f),
		'fullpath' => $f,
		'link' => $link_raw !== false ? htmlspecialchars($real_link) : false,
		'link_raw' => $link_raw,
		'md5(filename)' => md5($f),
		'dir'  => d_is_dir($f),
		'type' => (d_is_dir($f) ? false : get_type($f)),
		'changed' => ((@$t=filemtime($f)) ? date('d F Y, H:i',$t) : false),
		'size' => ( (d_is_dir($f) && !SHOW_DIRSIZE) ? (/*no subdirectories*/!empty($GLOBALS['files']) && sizeof($GLOBALS['dirs'])==0 && !empty($GLOBALS['sz']) ? show_size(true,true,$GLOBALS['sz']) : false) : show_size($f)),
		'size_bytes' => d_filesize($f),
		'thumb' => ($img ? '<div style="padding-bottom: 10px;" align="center"><img src="system/preview.php?file='.rawurlencode($f).'&size=small" align="center"></div>' : false),
		'id3' => (($img && d_filesize($f) < 15*1024*1024 && @$sz=getimagesize($f)) ? 'Dimensions: '.$sz[0].'x'.$sz[1] : ''),
		'owner' => get_owner($f),
		'group' => get_group($f),
		'rights' => d_get_rights($f, false),
		);
	}else if($_REQUEST['type']==tDRIVE)
	{
		$_RESULT=array(
		'name' => 'details',
		'filename' => !empty($_REQUEST['name']) ? $_REQUEST['name'] : $_SESSION['DIR'],
		'type' => $descr[$_REQUEST['icon']],
		'dir' => false,
		);
		if(!empty($_REQUEST['fs'])) $_RESULT['fs'] = $_REQUEST['fs'];
		if($s = disk_free_space($f)) $_RESULT['free']=show_size(true,true,$s);
		if($s = disk_total_space($f)) $_RESULT['total']=show_size(true,true,$s);
	}
	
	return $_RESULT;
}

// @@ description for drive types

$descr = array( 'diskette' => lang('Diskette 3.5'), 'removable' => lang('Removable device'), 'hdd' => lang('Local disk'), 'smb' => lang('Network drive'), 'cd' => lang('CD/DVD drive'), 'ramdrive' => lang('Ramdrive'), 'unknown' => '', );

/* @@ constants to set the type of item to draw */

// 0x - filesystem
define('tDIR',0);
define('tFILE',1);
define('tDRIVE',2);
define('tMYCOMP',3);
// 1x - special
define('tPANEL_ITEM',10);

/* MISC constants */
define('JS_MAX_ITEMS', 200); /* changing of this value will require JS recompilation */
?>