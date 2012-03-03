<?
	include('../../system/core.php');
?>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title>Upload files</title>

	<link href="default.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
		
		<?php
		
		if(isset($_GET['classic']))
		{
			?>
			
			try
			{
				window.opener.E.F5();
			}catch(e)
			{

			}
			
			<?
		}
		
		?>
		
		var upload;

		window.onload = function() {
			
			<?php if(isset($_GET['classic'])) { echo 'show_classic();'; } ?>;
			
			//setTimeout(function(){
			
			upload = new SWFUpload({
				// Backend Settings
				upload_url: "upload.php",	// Relative to the SWF file (or you can use absolute paths)
				post_params: {"<?=session_name()?>" : "<?=session_id()?>"},

				// File Upload Settings
				file_size_limit : "<?=return_bytes(ini_get('upload_max_filesize'))?>",
				file_types : "*.*",
				file_types_description : "All Files",
				//file_upload_limit : "10",
				file_queue_limit : "0",

				// Event Handler Settings (all my handlers are in the Handler.js file)
				file_dialog_start_handler : fileDialogStart,
				file_queued_handler : fileQueued,
				file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,
				upload_start_handler : uploadStart,
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : function(a,b,c,d,e,f,g,h)
				{
					try
					{
						window.opener.E.F5();
					}catch(e)
					{

					}
					uploadComplete(a,b,c,d,e,f,g,h);
				},

				// Flash Settings
				flash_url : "swfupload_f8.swf",	// Relative to this file (or you can use absolute paths)
				
				swfupload_element_id : "flashUI1",		// Setting from graceful degradation plugin
				degraded_element_id : "degradedUI1",	// Setting from graceful degradation plugin

				custom_settings : {
					progressTarget : "fsUploadProgress1",
					cancelButtonId : "btnCancel1"
				},
				
				// Debug Settings
				debug: false
			});
			
			//}, 15000);
	     }

		function show_classic()
		{
			document.getElementById("degradedUI1").style.display = "none";
			document.getElementById("flashUI1").style.display = "none";
			document.getElementById("classicUI").style.display = "";
			window.onload = null;
			if(window.tmout)
			{
				clearTimeout(window.tmout);
				window.tmout = null;
			}
		}

		<?php
		if(!isset($_GET['classic']))
		{
			?>
			window.tmout = setTimeout(function()
			{
				if(document.getElementById("flashUI1").style.display == 'none')
					document.getElementById("degradedUI1").style.display = "";
			}, 1000); /* prevent flicker, in case user has fast connection */
			<?php
		}
		?>
		
	</script>

</head>
<body>
	<div class="title">Upload files (using SWFUpload v2.0)</div>
	<form id="form1" action="upload.php" method="post" enctype="multipart/form-data">
		
		<div id="flashUI1" style="display: none;">
			<div class="content">
				<div style="padding-bottom: 10px;">
					In order to upload files to current directory, click "<b>Select files</b>" button, and choose which files you want to be uploaded. The <u>upload process will start immediately</u>. If uploader does not work, you may <a href="#" onclick="show_classic(); return false;">try a classic version</a>.
				</div>
				
				<div style="padding-bottom: 10px;">
					<input type="button" style="font-weight: bold; font-size: 11px;" value="Select files (max <?=htmlspecialchars(ini_get('upload_max_filesize'))?> per file)" onclick="upload.selectFiles()" />
					<input id="btnCancel1" type="button" value="Cancel Uploads" onclick="cancelQueue(upload);" disabled="disabled" style="font-size: 11px;" /><br />
				</div>
				
				<fieldset class="flash" id="fsUploadProgress1">
					<legend>Upload Site</legend>
				</fieldset>
			</div>
		
		</div>
	
		<div id="degradedUI1" style="padding-top: 10px; display: none;" align="center">
			
			<h1>loading SWFUpload, it should load in several seconds...</h1>
					
			<div style="padding-top: 10px;">
				In case you have no Flash Player installed, or you do not want to use SWFUpload, <a href="#" onclick="show_classic(); return false;">click here</a>.
			</div>
							
		</div>

		<div id="classicUI" style="display: none;">

			<div class="content">
				<?php if(isset($_GET['success']))
				{
					echo '<h3>The files have been uploaded successfully</h3>';
				}else
				{
					?>
					<div style="padding-bottom: 10px;">
						Here is the classic version of file uploads. Choose files you want to upload and click "<b>Submit files</b>".
					</div>
					<?php
				}
				?>
				
				<fieldset>
					<legend>Upload Site</legend>
					<input type="file" name="files[]" /><br/>
					<input type="file" name="files[]" /><br/>
					<input type="file" name="files[]" /><br/>
					<input type="file" name="files[]" /><br/>
					<input type="file" name="files[]" /><br/>
					<input type="file" name="files[]" /><br/>
					<input type="file" name="files[]" /><br/>
				</fieldset>
				
				<input type="hidden" name="classic" value="true" />
				
				
				<div>
					<input type="submit" style="font-weight: bold; font-size: 11px;" value="Submit files (max <?=htmlspecialchars(ini_get('upload_max_filesize'))?> per file)" />
				</div>
			</div>
		</div>
		
		
	</form>

	<script type="text/javascript" src="swfupload.js"></script>
	<script type="text/javascript" src="swfupload.graceful_degradation.js"></script>
	<script type="text/javascript" src="swfupload.queue.js"></script>
	<script type="text/javascript" src="handlers.js"></script>

</body>
</html>
