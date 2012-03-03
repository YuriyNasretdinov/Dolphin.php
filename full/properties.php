<html>

 <head>
  <title>Properties</title>
  <script src="f/all.<?=FVER?>.js"></script>
  <script>
  var p = window.opener;
  
  window.s = p.R.gsi();
  window.items = [];
  
  if(!s || s.length == 0)
  {
  	document.title += ' - ' + p.E.address;
  	window.items = [ p.E.address ];
  }else if(s.length == 1)
  {
  	document.title += ' - ' + s[0];
  	window.items = [s[0]];
  }else /* if (s.length>1) */
  {
  	document.title += ' (' + s.length + ' items)';
  	for(var k in s) window.items.push(s[k]);
  }
  </script>
  <link href="f/overall.<?=FVER?>.css" rel="stylesheet" />
  <style type="text/css">
  body {margin: 10px; overflow: hidden; background-image: none;}
  body, td, th { font-family: Tahoma, Arial, Sans-serif; font-size: 13px; }
  th { font-size: 12px; }
  #loading {background-color: #4ea6f1; font-family: Courier New, monospace; font-size: 14px;  color: white; position: absolute; top: 0px; left: 0px; visibility: hidden; }
  h2,h3,form { margin: 0px; padding: 0px; }
  </style>
 </head>
 
 <body>
<div id="loading">&nbsp;</div>
  <div id="results">
  	
  </div>
  
  <!--  <div id="ddd"></div> -->
  
  <script>
  /*
  var tmp = [];
  for(var k in window.items)
  {
  	var t = window.items[k];
  	var ta = ['<b>' + k + '</b>'];
  	
  	for(var i in t)
  	{
  		ta.push(i + ' = ' + t[i]);
  	}
  	
  	tmp.push(ta.join('<br>'));
  }
  document.getElementById('ddd').innerHTML = tmp.join('<hr>');
  */
  
  (show_info = function(nolimit)
  {
	  
	  D.qr('index.php?act=show-properties', {'items': window.items}, function(res,err)
	  {
	   var mod = res.mod;
	   
	   var oct_mod = -(-mod.charAt(2)-8*mod.charAt(1)-64*mod.charAt(0)); /* how many times will I say "WTF!!!" about string concatenation in JavaScript :)? */
	   
	   window.sync_mods = function(smart2numeric /* 'smart->numeric' = true or 'numeric->smart' = false */)
	   {
		   if(smart2numeric)
		   {
			   oct_mod = 0;
			   
			   for(var i=0,mask;i<9;i++)
			   {
					mask = Math.pow(2,i);
					if(document.getElementById('mod_smart['+mask+']').checked) oct_mod += mask;
			   }
			   
			   mod=(oct_mod%8 + 10*(Math.floor(oct_mod/8)%8) + 100*(Math.floor(oct_mod/64)%8)) + '';
			   
			   while(mod.length<3) mod='0'+mod;
			   
			   document.getElementById('mod').value = mod;
		   }else
		   {
			   mod = document.getElementById('mod').value;
			   oct_mod = -(-mod.charAt(2)-8*mod.charAt(1)-64*mod.charAt(0));
			   
			   for(var i=0,mask;i<9;i++)
			   {
					mask = Math.pow(2,i);
					document.getElementById('mod_smart['+mask+']').checked = oct_mod & mask;
			   }
		   }
	   }
	   
	   var box = function(smask)
	   {
		   smask = smask.replace(/ /g, '');
		   for(var i=0,mask=0;i<9;i++) if(smask.charAt(i)=='1') mask += Math.pow(2,8-i);
		   
		   return '<input onclick="sync_mods(true);" type="checkbox" name="mod_smart['+mask+']" id="mod_smart['+mask+']" value="'+mask+'"'+(oct_mod&mask?' checked':'')+'>';
	   }
	   
	   
	  	//document.getElementById('ddd').innerHTML = err;
	  	document.getElementById('results').innerHTML = '\
	  	\
	  	<h3>' + ( s.length==1&&!res['dir'] ? R.file_icon(window.items[0])+' ' + E.basename(window.items[0]) : (s.length > 1 ? s.length + ' items in ' : '') + ('<img src="f/iconz/16-folder.png" width=16 height=16> ' + (s.length==1 ? E.basename(window.items[0]) : E.basename(p.E.address)) ) ) + '</h3>\
	  	(files: ' + (!res.end?'&gt;':'') +res.files + ', dirs: ' + (!res.end?'&gt;':'') + res.dirs + ')<br><br>\
	  	<table class="1px">\
	  	<tr>\
	  		<td>rights:</td>\
	  		<td>' + res.rights + '</td>\
	  	</tr>\
	  	\
	  	' + (res.owners ? '<tr>\
	  		<td>owner(s):</td>\
	  		<td>' + res.owners + '</td>\
	  	</tr>\
	  	\
	  	<tr>\
	  		<td>group(s):</td>\
	  		<td>' + res.groups + '</td>\
	  	</tr> ' : '') + '\
	  	\
	  	<tr>\
	  		<td><b>total size:</b></td>\
	  		<td>' + (res.end ? '' : '&gt;') + (res.total) + '</td>\
	  	</tr>\
	  	\
	  	' + ((!res.end && !nolimit) ? '<tr><td colspan="2">&nbsp;&nbsp;<a href="#" onclick="show_info(true);return false;">count further</a></td></tr>' : '') + '\
	  	\
	  	</table>\
		\
		\<br><br>\
		\
		<table bgcolor="#ececec">\
		<tr bgcolor="#dedede">\
			<th colspan=4>Items\' rights</th>\
		</td>\
		\
		<tr>\
			<th>&nbsp;</th>\
			<th title="File owner">Owner</th>\
			<th title="Users with the same group, as file owner">Group</th>\
			<th>All</th>\
		</tr>\
		\
		<tr>\
			<th>Read</th>\
			\
			<td>' + box('100 000 000') + '</td>\
			<td>' + box('000 100 000') + '</td>\
			<td>' + box('000 000 100') + '</td>\
		</tr>\
		\
		<tr>\
			<th>Write</th>\
			\
			<td>' + box('010 000 000') + '</td>\
			<td>' + box('000 010 000') + '</td>\
			<td>' + box('000 000 010') + '</td>\
		</tr>\
		\
		<tr>\
			<th>Execute</th>\
			\
			<td>' + box('001 000 000') + '</td>\
			<td>' + box('000 001 000') + '</td>\
			<td>' + box('000 000 001') + '</td>\
		</tr>\
		\
		<tr bgcolor="#dedede">\
			<th colspan=4>Numeric value: <input type="text" onkeyup="sync_mods(false);" name="mod" id="mod" value="' + mod + '" size="3"><br>\
			<button onclick="E.ci(document.getElementById(\'mod\').value,items);"><b>chmod!</b></button>\
		</th>\
		</td>\
		\
		</table>\
		\
		\
		\
		\
	  	';
	  	
	  	if(!res.end && nolimit) setTimeout(function(){ show_info(true); }, 100);
	  	
	  	//document.getElementById('ddd').innerHTML = err;
	  	
	  }, true, 'counting...');
  })();
  </script>
 </body>
 
</html>