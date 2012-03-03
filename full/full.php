<?
   if(!function_exists('dolphin_handler')) die('dolphin not found');
   include_once(ROOT.'/full/full_func.php');
   if(@$_GET['act']=='logout') logout();
   else if(@$_GET['act']=='edit') die(include(ROOT.'/full/edit.php'));
   else if(@$_GET['act']=='terminal') die(include(ROOT.'/full/terminal.php'));
   else if(@$_GET['act']=='properties') die(include(ROOT.'/full/properties.php'));
//   else if(@$_GET['act']=='uploads') die(include(ROOT.'/full/uploads.php'));
   else if(!empty($_REQUEST['act'])) die(include(ROOT.'/full/actions.php'));
   
   function strip_eofs($str)
   {
		return str_replace(array("\n", "\r", "\t"), '', $str);
   }
   
   ob_start('strip_eofs');
?>
<html>
<head>
	
	<title><?=NAME?></title>
	
	<meta name="author" content="Yuriy Nasretdinov" />
	
	<link rel="stylesheet" type="text/css" href="f/overall.<?php echo BUILD;?>.css" />
	
</head>
	
<body
 onload="        if(D) D.init();"
 onselectstart=" if(R &amp;&amp; !R.is_inp(event)) return false; /* onselectstart is IE-specific */"
 onresize="      if(D) D.resize();"
 onkeydown="     if(I) return I.handle_keydown(event);"
>

<a href="index.php?version=light&amp;DIR=." id="safelink">
	<b>switch to light version...</b>
</a>

<noscript>

<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
 <tr>
  <td align="center" valign="middle">
  	<big>
  	 JavaScript MUST be enabled in order to use full version.<br><br>
     <a href="index.php?version=light&amp;DIR=.&amp;<?=SID?>">click here to use light version</a>
  	</big>
  </td>
</tr>
</table>

</noscript>
	
<script>/* loading */

/* at least DOM browsers are supported */

if(!document.getElementById || !document.getElementById('safelink') || !document.body || !document.createElement || !document.body.appendChild)
{
	alert('Your browser will not run this version. Click OK to go to light version...');
	window.location.href = 'index.php?version=light&DIR=.&<?=SID?>';
}else
{
	var l=document.getElementById('safelink');
	var d=document.body.appendChild(document.createElement('DIV'));
	var s=d.style;
	
	document.body.style.padding="0px";
	document.body.style.margin="0px";
	
	d.id         = "load_screen";
	
	s.position   = "absolute";
	s.width      = "100%";
	s.height     = "100%";
	
	d.innerHTML='<table width="100%" height="100%"><tr><td valign="middle" align="center"><img src="f/i/loading.gif"><br><h3>Loading, please wait...</h3><h4>if you experience problems with full version,<br><a href="index.php?version=light&DIR=.">use light version</a></td></tr></table>';
	
	l.style.display='none';
	
	/*
	d.id="loading";
	
	window.interv=setInterval(function()
	{
		var d=document.getElementById('dots');
		if(!this.cnt) this.cnt=2;
		if(cnt==1) d.innerHTML='...';
		if(cnt==2) d.innerHTML='&nbsp;..';
		if(cnt==3) d.innerHTML='.&nbsp;.';
		if(cnt==4) d.innerHTML='..&nbsp;';
		
		cnt++;
		
		if(cnt>4) cnt=1;
	},600);
	*/
}

window.upload_max_filesize = '<?=ini_get('upload_max_filesize')?>';
window.init_title = document.title;
</script>

<script language="javascript" src="f/<?=(IS_DEVELOPER ?  'compress.php?act=js' : 'all.'.BUILD.'.js')?>"></script>

<script>
/* prevent from session expire */
setInterval(D.pingpong, <?=round(max(intval(ini_get('session.gc_maxlifetime'))*1000/2, 1000*60))?>);
</script>

<div id="very_main" style="width: 100%; height: 100%; padding: 0px; margin: 0px; overflow: hidden; visibility: hidden;">

<div id="upper" style="height: 68px;">
	
	<div id="upper_left" style="position: absolute; top: 0; left: 0;">
		<img src="f/ni/top-left.png" width="139" height="68" />
	</div>
	
	<img src="f/ni/top-up.png" onmouseover="this.src='f/ni/top-up-h.png';" onmouseout="this.src='f/ni/top-up.png';" style="position: absolute; left: 85px; top: 0px; cursor: pointer; z-index: 500;" onclick="D.go2('..');" alt="&uarr;" title="&uarr;" />
	
	<div id="address_div">
		<input type="input" name="address" value="<?php echo isset($_SESSION['DIR']) ? htmlspecialchars($_SESSION['DIR']) : '.';?>" id="address" onkeydown="if(event.keyCode == 13 /* ENter */) document.getElementById('go').onclick();"><input type="button" value="go" id="go" onclick="I.change_address();" style="display: none;">
	</div>
	
	<div id="upper_right" style="position: absolute; top: 0; right: 0;">
		<img src="f/ni/top-right.png" width="149" height="68" />
	</div>
	
	<img src="f/ni/top-go-btn.png" onmouseover="this.src='f/ni/top-go-btn-h.png';" onmouseout="this.src='f/ni/top-go-btn.png';" style="position: absolute; right: 20px; top: 0px; cursor: pointer; z-index: 500;" onclick="I.change_address();" onmousedown="this.src='f/ni/top-go-btn-p.png';" onmouseup="this.onmouseout();" alt="Go" title="Go" />
	
	<!-- 
	<div id="logout_div" style="float: right;">
		<a href="?version=light&amp;DIR=."><img src="f/i/light.png" width="25" height="30" alt="light" title="switch to light version" border="0"></a>&nbsp;&nbsp;
		<a href="?act=logout" onclick="return confirm('Really log out?');"><img src="f/i/logout.png" width="25" height="30" alt="log out" title="log out" border="0"></a>
	</div>
	
	<div>
	
		<div style="float: left; font-size: 20px; padding: 10px;" id="menu_nav">
             
			<a href="#" onclick="E.go_back(); return false;" id="btn_back">Back</a>
			<span style="display:none;" id="btn_back_disabled">Back</span>
			, 

			<a href="#" onclick="E.go_fwd(); return false;" id="btn_fwd">Forward</a>
			<span style="display:none;" id="btn_fwd_disabled">Forward</span>
			, 
                
			<a href="#" onclick="I.change_address('..'); return false;" id="btn_up">Up</a>
			<span style="display:none;" id="btn_up_disabled">Up</span>
			, 
                
			<a href="#" onclick="E.refresh(); return false;">Refresh</a>
			, 
		
			<a href="#" onclick="D.abort(); return false;" style="display:none;" id="btn_stop">Stop</a>
			<span id="btn_stop_disabled">Stop</span>
		</div>

		<div style="float: right; padding: 10px;" id="menu_actions">
			<button onclick="D.perform_update();">Dolphin update</button> 
			<button onclick="E.open_terminal();">Open Terminal</button> 
			<button onclick="D.open_uploads();" style="font-weight: bold;">Upload Files</button>
		</div>
	
	</div>
	
	-->
</div>

<div id="left_menu" style="width: 224px; height: 100px; overflow-y: auto; overflow-x: hidden;">
<!-- Left Menu -->
</div>

<div id="content" style="width: 50px; height: 100px; overflow: hidden;">
	
	<!-- filelist -->

</div>

<div id="footer">

	<table cellspacing="0" cellpadding="0">
		<tr height="39" valign="middle">
			<td id="footer_dolphin_btn" width="155" nowrap="nowrap" valign="top"><div>Dolphin</div></td>
			<td id="footer_descr"></td>
			<td id="footer_state"></td>
		</tr>
	</table>

</div>

<div id="footer_upload_btn">
	<div><a href="" onclick="try{D.open_uploads();}catch(e){}; return false;">Upload</a></div>
</div>


<img width="110" height="80" id="footer_dolphin" src="f/i/no.png" />

</div>

</body>
</html>
