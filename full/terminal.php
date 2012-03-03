<?
if(!function_exists('dolphin_handler')) die('Dolphin not found');
?>
<html>
<head>
	<title>Web shell - <?=getcwd_short()?></title>
	<link href="f/overall.<?=FVER?>.css" rel="stylesheet" />
	<style>
	body, input, td { background-color: black; background-image: none; font-family: Courier New, Courier, monospace; font-size: 13px; color: rgb(187,187,187); }
	body { margin: 5px; overflow-x: hidden; overflow-y: scroll; }
	input { width: 100%; border: 1px black solid; outline-width: 0px; /* tell WebKit not to draw glow around the text field */ }
	</style>
	<script src="f/all.<?=FVER?>.js"></script>
<script>
var _tcurr    = 0; /* current command, got from history */
var _thistory = [];

function send_command(cmd, tab)
{
	var undef;
	if(typeof(tab) == typeof(undef)) tab = false;
	
	if(cmd == 'exit' || cmd == 'quit')
	{
		window.close();
		return false;
	}
	
	document.title = 'Web shell - loading...';
	window.status = 'loading...';
	
	Dolphin.qr('index.php?act='+(tab?'handletab':'exec'), {'cmd': cmd}, function(res,err)
	{
		if(res['exit']) window.close();
		
		if(!tab || res && res['output'] || err)
		{
			if(!res || !res['output']) res['output'] = err;
			else res['output'] += err;
			
			document.getElementById('answers').innerHTML += '<br><?=GREET?>$&nbsp;' + res['cmd'] + (res['output'] ? '<br>'+res['output'] : res['output']);
		/* alert(res['output'] + '\n' + res['dir'] + '$ '); */
			document.getElementById('dirname').innerHTML = '<?=GREET?>$&nbsp;';
		}
		
		var finp = document.getElementById('finp');
		
		finp.value = tab ? res['cmd'] : '';
		finp.focus();
		if(finp.scrollIntoView) finp.scrollIntoView(true);
		
		document.title = 'Web shell - ' + res['dir'];
		window.status = res['dir'];
		
		if(_thistory[_thistory.length-1] != cmd && !tab) _thistory.push(cmd);
		_tcurr = _thistory.length;
	});

    return true;
}

function set_thistory(inp, where)
{	
	_tcurr += where;
	
	if( _tcurr < 0)
	{
		_tcurr = 0;
		return false;
	}
	
	if(_tcurr+1 > _thistory.length )
	{
		_tcurr = _thistory.length - 1;
		
		inp.value = '';
		inp.focus();
		
		return false;
	}
	
	inp.value = _thistory[_tcurr];
	inp.focus();
	return true;
}

var KEYUP = 38, KEYDOWN = 40, KEYENTER = 13, KEYTAB = 9;
</script>
</head>
<body onload="document.getElementById('finp').focus();" onkeydown="if(lost_focus) document.getElementById('finp').focus();"><div id="loading" style="display: none;"></div>
<div id="answers"><?
echo '*************************************************<br>';
echo 'Welcome to '.SNAME.' web shell!<br>';
echo '&nbsp;This shell emulator is designed to launch simple commands<br>';
echo 'like "cp", "chmod", "mv", etc. You can also launch "gcc"<br>';
echo 'compiler. This shell is restricted by PHP possibility to<br>';
echo 'execute shell commands.<br>';
echo '<br>';
echo '&nbsp;Please note, that this shell uses redirect to temp file, so<br>';
echo 'commands like "vi" or "mc" will not work and they are even<br>';
echo 'known to hang the system. "wget" also may fail if not launched<br>';
echo 'with "-b" option.<br>';
echo '*************************************************';
?></div><table width="100%" cellpadding="0" cellspacing="0"><tr><td><nobr id="dirname"><?=GREET?>$&nbsp;</nobr></td><td width="100%"><input type="text" id="finp" value="" onkeydown="if(event.keyCode==KEYENTER) send_command(this.value); if(event.keyCode==KEYUP) set_thistory(this, -1); if(event.keyCode==KEYDOWN) set_thistory(this, 1); if(event.keyCode==KEYTAB) { send_command(this.value, true); this.focus(); return false;}" onblur="lost_focus = true;" onfocus="lost_focus = false;"></td></tr></table>
</body>
</html>