<?
require('core.php');

session_write_close();

if(MULTIVIEWS_ENABLED && !isset($_GET['file']))
{
	$parts = explode('/', $_SERVER['REQUEST_URI']);
	if(empty($parts[sizeof($parts)-1])) unset($parts[sizeof($parts)-1]);
	$f=clean(base64_decode(rawurldecode($parts[sizeof($parts)-2])).'/'.rawurldecode(end($parts)));
}else
{
	$f=clean($_GET['file']);
}

// some people reported about problems with file compression, so it is turned off always

$compress=false /*d_filesize($f)<100*1024*/; //compress the stream or not?

if(!empty($_GET['text'])) $text=str_replace(array("\r\n","\r","\n","\t"),array("\n","\n","\r\n"," "),d_file_get_contents($f));

if($compress) ob_start('ob_gzhandler');

header("Content-Type: application/force-download; charset=".CHARSET); 
header("Content-Transfer-Encoding: binary");
header('Content-Description: File Transfer');
if(!$compress) header("Content-Length: ".(isset($text) ? strlen($text) : d_filesize($f)));
header("Content-Disposition: attachment; filename=\"".addslashes(basename($f))."\"");
if(empty($_GET['text']))
{
	if(file_exists($f))
	{
		readfile($f);
	}else
	{
		echo d_file_get_contents($f);
	}
}
else echo $text;

die();
?>