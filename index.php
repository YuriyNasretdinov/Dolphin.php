<?
function dolphin_handler($str)
{
	if(empty($GLOBALS['NOHANDLER']) && function_exists("ob_gzhandler") && !ini_get("zlib.output_compression") &&
		/* Stupid Konqueror says "unexpected end of data" */
		(!preg_match('/khtml/i', $_SERVER['HTTP_USER_AGENT'])
		/* I don't know how browsers other than Mozilla, Opera and IE work with Gzip compression */
		&& preg_match('/gecko|compatible/i', $_SERVER['HTTP_USER_AGENT']) ||
		/* Safari and webkit supports gzip well */
		preg_match('/safari|webkit/i', $_SERVER['HTTP_USER_AGENT'])
		)
	)
	{
		return ob_gzhandler($str,9);
	}else
	{
		return $str;
	}
}

ob_start('dolphin_handler');

require('system/core.php');

include(VER.'/'.VER.'.php');
?>