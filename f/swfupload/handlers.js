
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
	document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
	instance.stopUpload();
	var stats;
	
	do {
		stats = instance.getStats();
		instance.cancelUpload();
	} while (stats.files_queued !== 0);
	
}

/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function fileDialogStart() {
	/* I don't need to do anything here */
}
function fileQueued(fileObj) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetStatus("Pending...");
		progress.ToggleCancel(true, this);

	} catch (ex) { this.debug(ex); }

}

function fileQueueError(fileObj, error_code, message) {
	try {
		if (error_code === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
			return;
		}

		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetError();
		progress.ToggleCancel(false);

		switch(error_code) {
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
				progress.SetStatus("File is too big.");
				this.debug("Error Code: File too big, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
				progress.SetStatus("Cannot upload Zero Byte files.");
				this.debug("Error Code: Zero byte file, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
				progress.SetStatus("Invalid File Type.");
				this.debug("Error Code: Invalid File Type, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
				alert("You have selected too many files.  " +  (message > 1 ? "You may only add " +  message + " more files" : "You cannot add any more files."));
				break;
			default:
				if (fileObj !== null) {
					progress.SetStatus("Unhandled Error");
				}
				this.debug("Error Code: " + error_code + ", File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(num_files_queued) {
	try {
		if (this.getStats().files_queued > 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		
		/* I want auto start and I can do that here */
		this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(fileObj) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetStatus("Uploading...");
		progress.ToggleCancel(true, this);
	}
	catch (ex) {}
	
	return true;
}

function uploadProgress(fileObj, bytesLoaded, bytesTotal) {

	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetProgress(percent);
		progress.SetStatus("Uploading...");
	} catch (ex) { this.debug(ex); }
}

function uploadSuccess(fileObj, server_data) {
	try {
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetComplete();
		progress.SetStatus("Complete.");
		progress.ToggleCancel(false);

	} catch (ex) { this.debug(ex); }
}

function uploadComplete(fileObj) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued === 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = true;
		} else {	
			this.startUpload();
		}
	} catch (ex) { this.debug(ex); }

}

function uploadError(fileObj, error_code, message) {
	try {
		var progress = new FileProgress(fileObj, this.customSettings.progressTarget);
		progress.SetError();
		progress.ToggleCancel(false);

		switch(error_code) {
			case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
				progress.SetStatus("Upload Error: " + message);
				this.debug("Error Code: HTTP Error, File name: " + fileObj.name + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
				progress.SetStatus("Configuration Error");
				this.debug("Error Code: No backend file, File name: " + fileObj.name + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
				progress.SetStatus("Upload Failed.");
				this.debug("Error Code: Upload Failed, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.IO_ERROR:
				progress.SetStatus("Server (IO) Error");
				this.debug("Error Code: IO Error, File name: " + fileObj.name + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
				progress.SetStatus("Security Error");
				this.debug("Error Code: Security Error, File name: " + fileObj.name + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
				progress.SetStatus("Upload limit exceeded.");
				this.debug("Error Code: Upload Limit Exceeded, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
				progress.SetStatus("File not found.");
				this.debug("Error Code: The file was not found, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
				progress.SetStatus("Failed Validation.  Upload skipped.");
				this.debug("Error Code: File Validation Failed, File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
			case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
				if (this.getStats().files_queued === 0) {
					document.getElementById(this.customSettings.cancelButtonId).disabled = true;
				}
				progress.SetStatus("Cancelled");
				progress.SetCancelled();
				break;
			case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
				progress.SetStatus("Stopped");
				break;
			default:
				progress.SetStatus("Unhandled Error: " + error_code);
				this.debug("Error Code: " + error_code + ", File name: " + fileObj.name + ", File size: " + fileObj.size + ", Message: " + message);
				break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}



function FileProgress(fileObj, target_id) {
	this.file_progress_id = fileObj.id;

	this.opacity = 100;
	this.height = 0;

	this.fileProgressWrapper = document.getElementById(this.file_progress_id);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.file_progress_id;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
		progressText.appendChild(document.createTextNode(fileObj.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(target_id).appendChild(this.fileProgressWrapper);
	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
	}

	this.height = this.fileProgressWrapper.offsetHeight;

}
FileProgress.prototype.SetProgress = function(percentage) {
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
	this.fileProgressElement.childNodes[3].style.width = percentage + "%";
};
FileProgress.prototype.SetComplete = function() {
	this.fileProgressElement.className = "progressContainer blue";
	this.fileProgressElement.childNodes[3].className = "progressBarComplete";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	setTimeout(function() { oSelf.Disappear(); }, 10000);
};
FileProgress.prototype.SetError = function() {
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	setTimeout(function() { oSelf.Disappear(); }, 5000);
};
FileProgress.prototype.SetCancelled = function() {
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[3].className = "progressBarError";
	this.fileProgressElement.childNodes[3].style.width = "";

	var oSelf = this;
	setTimeout(function() { oSelf.Disappear(); }, 2000);
};
FileProgress.prototype.SetStatus = function(status) {
	this.fileProgressElement.childNodes[2].innerHTML = status;
};

FileProgress.prototype.ToggleCancel = function(show, upload_obj) {
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if (upload_obj) {
		var file_id = this.file_progress_id;
		this.fileProgressElement.childNodes[0].onclick = function() { upload_obj.cancelUpload(file_id); return false; };
	}
};

FileProgress.prototype.Disappear = function() {

	var reduce_opacity_by = 15;
	var reduce_height_by = 4;
	var rate = 30;	// 15 fps

	if (this.opacity > 0) {
		this.opacity -= reduce_opacity_by;
		if (this.opacity < 0) {
			this.opacity = 0;
		}

		if (this.fileProgressWrapper.filters) {
			try {
				this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			} catch (e) {
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		} else {
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}

	if (this.height > 0) {
		this.height -= reduce_height_by;
		if (this.height < 0) {
			this.height = 0;
		}

		this.fileProgressWrapper.style.height = this.height + "px";
	}

	if (this.height > 0 || this.opacity > 0) {
		var oSelf = this;
		setTimeout(function() { oSelf.Disappear(); }, rate);
	} else {
		this.fileProgressWrapper.style.display = "none";
	}
};