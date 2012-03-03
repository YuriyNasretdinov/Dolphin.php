<?
require('core.php');
session_write_close();

$f=clean($_GET['file']);

//ob_start();

if(@$_GET['size']=='small' || !empty($_GET['info'])) list($w,$h)=array(160,120);
else if(@$_GET['size']=='normal') list($w,$h)=array(220,220);
else if(@$_GET['size']=='big') list($w,$h)=array(620,460);
else die();

$ret = -1;

setreadable($f, true);

if(preg_match('/Darwin/is', PHP_OS))
{
	$cmd = ROOT.'/full/thumbnailer '.escapeshellarg(abs_path($f)).' '.escapeshellarg($pr = get_tmp_dir().'/'.uniqid(rand()).'.jpg').' '.$w.' '.$h;
	
	//echo $cmd."<bR>";
	
	/* Code specially for MAMP, which spoils some environment variables... */
	
	putenv("DYLD_LIBRARY_PATH=");
	
	exec($cmd, $out, $ret);
	
	if($ret == 0)
	{
		header('content-type: image/jpeg');
		
		readfile($pr);
		
		unlink($pr);
		
		//echo '1';
		//header('location: ../images/thumb.jpg?'.rand());
	}
}

if($ret != 0 && !send_thumbnail($f,$w,$h))
{
	//print_r(d_error('all'));
	//fputs(fopen('L:/log.txt','w'),ob_get_clean());
	
	switch(d_error(NODEBUG))
	{
		case NOMEMORY:
			$file = 'memory';
			break;
		case NOGD:
			$file='gd';
			break;
		case UNSUPP:
			$file = 'unsupported';
			break;
		default:
			$file = 'small';
			break;
	}
	header('Location: ../images/no-preview-'.$file.'.png');
}

//fclose(fopen(round(microtime(true) - START_TIME, 5), "w"));
?>