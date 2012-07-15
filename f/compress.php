<?
$f=array();
switch(@$_REQUEST['act'])
{
	case 'js':
		include('../system/core.php');
		$js_contents = compress_js();
		
		header('content-type: application/javascript');
		echo $js_contents;
		break;
	case 'css':
		header('location: overall.'.FVER.'.css');
		break;
	default:
		die();
		break;
}
?>