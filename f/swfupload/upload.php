<?php
	if (isset($_POST['S'])) {
		session_id($_POST['S']);
	}
	include('../../system/core.php');
	
	//file_put_contents(microtime(), print_r($_FILES,true));
	
	/* convert $_FILES to usual format (special for SWFUpload) */
	
	if(!empty($_FILES['Filedata']))
	{
		$data = $_FILES['Filedata'];
		
		$_FILES = array( 'files' =>
			array(
				'name'     => array($data['name']),
				'tmp_name' => array($data['tmp_name']),	
			)
		);
	}
	
	if(!upload_files())
	{
		header('HTTP/1.1 500 File Upload Error');
		
		if(isset($_POST['classic']))
		{
			echo 'An error occured while uploading files';
		}
		
		die();
	}else if(!isset($data))
	{
		header('location: index.php'.(isset($_POST['classic']) ? '?classic=true&success=true' : ''));
	}
	
	echo 'good';
	
	/*
	 
	*/
?>