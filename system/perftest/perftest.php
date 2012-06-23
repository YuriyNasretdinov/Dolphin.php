<?php
error_reporting(0);
require('system/func.php');
require('system/filelist_func.php');
if ($argc != 2) {
    fwrite(STDERR, "Usage: $argv[0] <variant>\n");
    exit(1);
}

$dir = "/Users/yuriy/tmp/50000";

$time = microtime(true);
$memory = memory_get_usage();
register_shutdown_function(function() use ($time, $memory)
{
    fwrite(STDERR, "Done in " . round( (microtime(true) - $time) * 1000) . "ms\n");
    fwrite(STDERR, "Memory usage: " . round( (memory_get_peak_usage() - $memory) / 1024 / 1024, 2) . " Mb\n");
    fwrite(STDERR, "Overall memory usage: " . round( (memory_get_peak_usage()) / 1024 / 1024, 2) . " Mb\n");
});

switch ($argv[1]) {
    default:
        fwrite(STDERR, "Unknown variant '$argv[1]': valid options are 1-4\n");
        exit(1);
    case 1:
        $result = d_filelist_fast($dir);
        break;
    case 2:
        $result = d_filelist_extreme($dir, array('perpage' => 1000));
        break;
    case 3:
        $result = d_filelist_cached($dir, 0, 1000);
        break;
    case 4:
        $result = d_filelist_simple($dir);
        break;
}

$json = json_encode($result);
echo $json;