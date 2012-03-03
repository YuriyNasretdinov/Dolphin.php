<?
if(!function_exists('dolphin_handler')) die('dolphin not found');

$f = clean($_GET['file']);

if($_SERVER['REQUEST_METHOD']=='GET')
{
	if(!d_file_exists($f)) die('File does not exist!');
	
	if(!empty($_GET['img']))
	{
		$NOHANDLER=true;
?><html><head><title>Preview of <?=basename($f)?></title><style>body {margin:0px;padding:0px} td{vertical-align:middle;text-align:center;align:center;}</style></head><body><table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><a href="javascript:window.close()" title="Close window"><img src="system/preview.php?file=<?=rawurlencode($f)?>&size=big" border="0"></td></tr></table></body></html>
<?		die();
	}
	
	if(show_size($f,false) > 100*1024) die('File too big!');
	
	$wr = setwritable($f,true);
	
	$p=pathinfo($f);
	@$ext=strtolower($p['extension']);
	
	$file = basename($f);
	$cont = d_file_get_contents($f);
	
	if(USERCHARSET != CHARSET && function_exists('iconv'))
	{
		$file = iconv(CHARSET, USERCHARSET, $file);
		
		$cont = iconv('UCS-2BE', USERCHARSET, iconv(USERCHARSET, 'UCS-2BE', $cont)); /* test, whether iconv really does support the entered encoding. User will see nothing (or a lot of "????" if he entered something wrong. Otherwise everything will be ok */
	}
	?>
<html>
<head>
	<title>Edit file <?=$file?></title>
	<style>
	body {margin: 10px; overflow: hidden;}
	body, td { font-family: Tahoma, Arial, Sans-serif; font-size: 11px; }
	textarea { font-family: monospace, Courier New; font-size: 12px; width: 620px; height: 350px; overflow: scroll; }
	#loading {background-color: #4ea6f1; font-family: Courier New, monospace; font-size: 12px;  color: white; position: absolute; top: 0px; left: 0px; visibility: hidden; }
	h2,h3,form { margin: 0px; padding: 0px; }
	h2 { height: 20px; width: 450px; overflow: hidden; font-size: 16px; }
	</style>
	<script>
	var cont_hash = false;
	</script>
	<script src="f/all.<?=FVER?>.js"></script>
	<script>
	/* the simpliest strhash */
	
	function get_content()
	{
		return document.getElementById('content').value;
	}
	
	function count_hash()
	{
		return get_content();
	}
	
	function strhash(str)
	{
		return ''+str;
	}
	
	function send_changes(clos)
	{
		document.getElementById('save').disabled = true;
		document.getElementById('changes').innerHTML = '&nbsp;';
		var cont = get_content();
		
		Dolphin.qr('<?=dirname($_SERVER['REQUEST_URI']).'/'?>index.php?act=save-file&charset='+$('charset').value, { filename_encoded: "<?=rawurlencode($f)?>", content: cont }, function(res,err)
		{
			try
			{
				window.opener.E.F5();
			}catch(e)
			{

			}
			
			if(err) alert(err);
			else
			{
				document.getElementById('changes').innerHTML = 'File has been saved successfully.';
				document.getElementById('save').disabled = false;
			}
			
			if(clos && !err) window.close();
		},true,"saving...");
	}
	
	function handle_keydown(event)
	{
		if(event.ctrlKey && (event.charCode && event.charCode==115||event.keyCode==83) /* s */)
		{
			if(event.returnValue) event.returnValue=false;
			if(event.preventDefault) event.preventDefault();
			if(event.stopPropagation) event.stopPropagation();
			
			if(!document.getElementById('save').disabled) document.getElementById('save').onclick(event); return false;
		}
	}
	</script>
</head>
<body onbeforeunload="if(cont_hash!=count_hash()) return 'Leave unsaved changes?';" onkeydown="handle_keydown(event);"><div id="loading">&nbsp;</div><table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr height="40">
		<td>
			<form action="index.php?act=edit&file=<?=rawurlencode($f)?>" enctype="multipart/form-data" method="POST">
			
			<table width="100%">
				<tr>
					<td><h2 title="<?=htmlspecialchars($file)?>"><nobr><script>document.write(R.file_icon(unescape("<?=rawurlencode($f)?>")));</script>&nbsp;<?=$file?></nobr></h2></td>
					<td nowrap="nowrap" align="right">&nbsp;<select name="charset" id="charset" title="The file charset" onchange="
					var cs = this.value;
					if(cs == 'custom')
					{
						cs = prompt('Enter charset of this file\n(both your browser and PHP iconv must support the entered spelling)','');
						if(!cs) return;	
						cs = escape(cs) + '&custom_charset=1';
					}
					
					window.location='index.php?act=edit&file=<?=rawurlencode($f)?>&charset='+cs;"><?
					
					/* from http://www.gnu.org/software/libiconv/ */
					
					$list = 'European languages
    ASCII, ISO-8859-{1,2,3,4,5,7,9,10,13,14,15,16}, KOI8-R, KOI8-U, KOI8-RU, windows-{1250,1251,1252,1253,1254,1257}, CP{850,866}, Mac{Roman,CentralEurope,Iceland,Croatian,Romania}, Mac{Cyrillic,Ukraine,Greek,Turkish}, Macintosh
Semitic languages
    ISO-8859-{6,8}, CP{1255,1256}, CP862, Mac{Hebrew,Arabic}
Japanese
    EUC-JP, SHIFT_JIS, CP932, ISO-2022-JP, ISO-2022-JP-2, ISO-2022-JP-1
Chinese
    EUC-CN, HZ, GBK, CP936, GB18030, EUC-TW, BIG5, CP950, BIG5-HKSCS, BIG5-HKSCS:2001, BIG5-HKSCS:1999, ISO-2022-CN, ISO-2022-CN-EXT
Korean
    EUC-KR, CP949, ISO-2022-KR, JOHAB
Armenian
    ARMSCII-8
Georgian
    Georgian-Academy, Georgian-PS
Tajik
    KOI8-T
Kazakh
    PT154, RK1048
Thai
    ISO-8859-11, TIS-620, CP874, MacThai
Laotian
    MuleLao-1, CP1133
Vietnamese
    VISCII, TCVN, CP1258
Platform specifics
    HP-ROMAN8, NEXTSTEP
Full Unicode
    UTF-8, UCS-2, UCS-2BE, UCS-2LE, UCS-4, UCS-4BE, UCS-4LE, UTF-16, UTF-16BE, UTF-16LE, UTF-32, UTF-32BE, UTF-32LE, UTF-7, C99, JAVA
European languages
    CP{437,737,775,852,853,855,857,858,860,861,863,865,869,1125}
Semitic languages
    CP864
Japanese
    EUC-JISX0213, Shift_JISX0213, ISO-2022-JP-3
Chinese
    BIG5-2003
Turkmen
    TDS565
Platform specifics
    ATARIST, RISCOS-LATIN1
Custom
    '.($custom_text = isset($_GET['custom_charset']) ? USERCHARSET : 'Click to enter one');
	
					function expand_multiples($res)
					{
						$ret = array();
						
						foreach(explode(',',$res[2]) as $v)
						{
							$ret[] = $res[1].trim($v);
						}
						
						return join(', ', $ret);
					}
					
					
					$list = preg_replace_callback('/([a-zA-Z0-9-]+)\\{([^\\}]+)\\}/s', 'expand_multiples', $list);
					
					//echo '<!-- '.$list.' -->';
					
					$list = explode("\n", $list);
					
					foreach($list as $k => $v)
					{
						$v = rtrim($v);
						
						if($k % 2 == 0)
						{
							echo '<optgroup label="'.$v.'">';
						}else
						{
							foreach(explode(',',$v) as $cs)
							{
								$cs = trim($cs);
								echo '<option value="'.($cs == $custom_text && !isset($_GET['custom_charset']) ? 'custom' : $cs).'"'.( $cs == USERCHARSET ? ' selected' : '').'>'.$cs."</option>\n";
							}
							
							echo '</optgroup>';
						}
					}
					
					//$charsets = explode();
					
					
					
					?></select>&nbsp;</td>
				</tr>
			</table>
		</td>
	</tr>
	
	<tr>
		<td><textarea cols=10 rows=10 name="content" id="content" wrap="virtual"><?=str_replace(':','&#58;',htmlspecialchars($cont))?></textarea>
		<script> cont_hash = count_hash(); </script>
		
		</td>	
	</tr>
	
	<tr height="40">
		<td>
		
			<div align="center">
			
			<button name="save" onclick="cont_hash=count_hash(); send_changes(); return false;" id="save" <?=($wr?'':'disabled="disabled"')?>><b>save changes</b><small> (Ctrl+S)</small></button>&nbsp;&nbsp;&nbsp;
			
			<button name="edit" onclick="cont_hash=count_hash();send_changes(true); return false;" <?=($wr?'':'disabled="disabled"')?>>save &amp; close window</button>
			
			</div>
			
		</td></tr>
	<tr height="28">
		<td>
			<div style="color: <?=($wr?'green':'red')?>" id="changes"><?=($wr?'&nbsp;':'Warning! File is not writable!')?></div>
			<? if(USERCHARSET != CHARSET) echo '<div style="color: red;">To be sure you can save file in this encoding, try to edit some file (e.g. copy of this file), and then <u>reopen it</u></div>'; ?></form>
		</td>
	</tr>
</table></body>
</html>
<?}else
{
	if(get_magic_quotes_gpc()) $_POST['content'] = stripslashes($_POST['content']);
	if(d_file_put_contents($f, $_POST['content']))
	{
		if(empty($_POST['save']))
		{
			echo '<script>window.close();</script>File successfully changed. You may now close the window.';
		}else
		{
			header('location: index.php?act=edit&file='.rawurlencode($f).'&success=true');
		}
	}else
	{
		echo 'An error occured. '.reason();
	}
}
?>