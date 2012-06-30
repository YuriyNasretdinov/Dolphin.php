<?php
function dolphin_handler($str)
{
	$str = ob_gzhandler($str,5);
	header("Content-length: " . strlen($str));
	return $str;
}

ob_start('ob_gzhandler');

require('system/core.php');

include(VER.'/'.VER.'.php');
?>