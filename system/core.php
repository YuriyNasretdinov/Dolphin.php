<?
//error_reporting(0);

ini_set('display_errors', 0);

define('START_TIME',array_sum(explode(' ',microtime())));
define('ROOT',dirname(dirname(__FILE__)));


define('IS_DEVELOPER',file_exists(ROOT.'/release.php'));

/*

next is specially for damned PHP >= 4.2.3 with it's stupid compatibility warnings

it's damned as I use register_globals Off and do not rely on the effect that
variables in session become global if PHP version is less than 4.2.3

this warning caused me to lose about an hour of my highly valuable time as a
script just showed blank screen and nothing else, though my code was correct

*/
ini_set('session.bug_compat_warn', 0);

define('CAN_SELFUPDATE',ini_get('allow_url_fopen'));

define('BUILD',88);

define('FVER', BUILD); /* file (js, css) version */

// if(IS_DEVELOPER) define('LAST_UPDATE', filemtime(ROOT.'/../dolphin.zip'));

define('VERSION','0.9');
define('SNAME','Dolphin.php'); /* the short name of product */
define('NAME',SNAME.' '.VERSION/*.' (build '.BUILD.')'*/);
define('GREET',preg_replace("/\\s+/s",'','websh-'.VERSION/*.BUILD*/));

define('MASTER_SITE','http://dolphin-php.org/');

if(!isset($_REQUEST)) die('<b>'.SNAME.' error:</b> PHP must have version not less than 4.1.0');

/* enable special syntax for requests (e.g. for download): /system/download.php/S=(session_id)/(file_info)/filename
   session data should be recognized correctly in this case
*/
if(preg_match('/S\\=([0-9a-zA-Z]{32})/s', $_SERVER['REQUEST_URI'], $patt)) session_id($patt[1]);

session_name('S');
session_start() or die('<b>'.SNAME.' error:</b> PHP must have support of sessions in order to use Dolphin.');

$fp = fopen(ROOT.'/config.php','rb') or die('<b>'.SNAME.' error:</b> cannot read config.php');
if(!@eval('?>'.fread($fp, filesize(ROOT.'/config.php')).'<?return true;') || !isset($CFG))
{
	define('BAD_CONFIG', true);
	require_once(ROOT.'/system/config-default.php');
	if(!isset($CFG)) die('<b>'.SNAME.' error:</b> installation of file manager is corrupted. Please install it again.');
}
fclose($fp);

define('MULTIVIEWS_ENABLED', function_exists('getallheaders') /* Apache-specific function. If Apache is enabled, possibly .htaccess directive Options +MultiViews is read.. */);

/* the next piece is for backward compatibility and will be removed after version 1.0 */
if(!defined('MAX_COPY_TIME')) define('MAX_COPY_TIME',4);    // how many seconds the files can be copied
if(!defined('MAX_MULTIPART_TIME'))
{
	define('MAX_MULTIPART_TIME', 5); // this value may be overriden by setting value for $MAX_MULTIPART_TIME global variable
	define('USE_MULTIPART', true);
}
/* end of piece */


/* user can change the default charset, if he wishes */

define('USERCHARSET', (!isset($_REQUEST['charset']) ? CHARSET : preg_replace("/[^0-9a-z-]+/is", "", $_REQUEST['charset'])));

require_once(ROOT.'/system/filelist_func.php');
require_once(ROOT.'/system/func.php');


auth();

/*
$_GET, $_POST and $_REQUEST are saved in case session has expired suddenly
*/

if(!empty($_SESSION['savedreq']))
{
	list($r,$g,$p) = $_SESSION['savedreq'];
	$_REQUEST = array_merge($_REQUEST, $r);
	$_POST = array_merge($_POST, $p);
	$_GET = array_merge($_GET, $g);
	
	$_SESSION['savedreq'] = false;
}

if(!empty($_GET['version'])) $_SESSION['version'] = $_GET['version'];
if(!empty($_SESSION['version']) && !defined('VER') /* VER can be defined as 'full' in order to make AJAX requests work as they should */) define('VER',$_SESSION['version']);

if(!class_exists('JsHttpRequest')) header('content-type: text/html; charset='.USERCHARSET.'');
?>