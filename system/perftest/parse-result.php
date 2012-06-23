<?php
if (isset($_GET['getresult'])) {
    header('Content-type: application/json');
    function dolphin_handler($str)
    {
    	$str = ob_gzhandler($str,5);
    	header("Content-length: " . strlen($str));
    	return $str;
    }
    ob_start('dolphin_handler');
    readfile('result.txt');
    die();
}
?>
<script>
console.time("Result");
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', <?=json_encode($_SERVER['PHP_SELF'] . '?getresult=1')?>, false);
xmlhttp.send(null);
if(xmlhttp.status == 200) {
    var result = JSON.parse(xmlhttp.responseText);
    console.timeEnd("Result");
    console.log(result);
}
</script>