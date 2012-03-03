<?
$f=array();
switch(@$_REQUEST['act'])
{
	case 'js':
		include('../system/core.php');
		if(IS_DEVELOPER) compress_js();
		
		header('content-type: text/javascript');
		readfile(ROOT.'/f/all.'.FVER.'.js');
		break;
	case 'css':
		header('location: overall.'.FVER.'.css');
		break;
	default:
		die();
		break;
}
?>