<?php
function d_filelist_simple($dir)
{
	$dh = opendir($dir);
	if (!$dh) return d_error("Cannot open $dir");
	// use as little memory as possible using strings
	$files = '';
	// assuming that first two entries are always "." and ".." or (in case of root dir) it is only "."
	// we can read first two entries separately and skip check for "." and ".." in main cycle for 
	// maximum possible performance
	for ($i = 0; $i < 2; $i++) {
		$f = readdir($dh);
		if ($f === false) return array('res' => '', 'cnt' => 0);
		if ($f === "." || $f === "..") continue;
		$files .= "$f/";
	}
	while (false !== ($f = readdir($dh))) $files .= "$f/";
	closedir($dh);
	return array('res' => $files, 'cnt' => substr_count($files, '/'));

}

function d_filelist_fast($dir)
{
	setreadable($dir,true);
	if(!(@$dh=opendir($dir)) && !(@$ftp_list=d_ftplist($dir))) return false;
	
	if($dh)
	{
		$dirs = $files = $fsizes = array();
		/* chdir($dir); */
		
		while(false!==(@$file=readdir($dh)))
		{
			if($file=='.' || $file=='..') continue;
			if(is_dir($dir.'/'.$file)) $dirs[]=$dir.'/'.$file;
			else $files[]=$dir.'/'.$file;
			$fsizes[$dir.'/'.$file] = filesize($dir.'/'.$file);
		}
	
		closedir($dh);
	}else return $ftp_list;
	
	return array('dirs'=>$dirs,'files'=>$files,'fsizes'=>$fsizes);
}

/*
 * function returns $arg1 || $arg2 || $arg3 || ... || $argN as it would work in JS.
 * there is one exception: ALL arguments are pre-executed
 * 
 * returns empty value if all is FALSE
 */
function sor(/* $arg1, $arg2, ..., $argN */)
{
	$params = func_get_args();
	foreach($params as $v) if($v) return $v;
	return '';
}


/*

extremely complicated :), extremely fast (on huge directories) and extremely customizable sorted filelist :)

$dir    -- directory from which to get filelist
$params -- array with optional parameters (see beginning of function for details)

RETURN: array(

	'pages' => array(
		$pagemin => array(
			'files' => array('field1' => $list1, ..., 'fieldN' => $listN),
			'dirs' 	=> ... (array of the same format)
		),
	
		... (the intermediate pages)
	
		$pagemax => array(
			'files' => ...,
			'dirs'  => ...
		)
	),
	
	'pages_num' => ...,
	'items_num' => ...
)

where

field1, ..., fieldN   -- requested fields (default 'name' and 'size')
$list1, ..., $listN   -- a list of values (array('value1', 'value2', ...,'valueN')),

$pagemin and $pagemax -- the page numbers of the specified range (default 1) 
pages_num             -- filtered number of pages (returns 1 if you do not ask not to split to pages)
items_num             -- filtered number of files + total number of folders

EXAMPLE:

$res = d_filelist_exteme('/home/yourock');
print_r($res);

this will result in:

Array
(
[pages] => Array
(
	[1] => Array
	(
		[files] => Array
		(
			[name] => Array (
				[0] => file1
				[1] => file3
				[2] => file20
			)

			[size] => Array (
				[0] => 1000
				[1] => 2000
				[2] => 300000
			)
		)

		[dirs] => Array
		(
			[name] => Array (
				[0] => dir1
			)

			[size] => Array (
				[0] => 512
			)
		)
	)
)

[pages_num] => 1

[items_num] => 4
)

*/
/* TODO: move it to config.php in some time */
define('LIGHT_PERPAGE', 30);

function d_filelist_extreme($dir, $params=array())
{
	/* set defaults: $key = ''; is equal to default value for $params['key'] */
	
	$fields = array('name', 'size'); // name, chmod or any field of stat(): (size, mtime, uid, gid, ...)
    
	$filt=''; // filename filter
	$sort='name'; // what field to sort (see $fields)
	$order='asc'; // sorting order: "asc" (ascending) or "desc" (descending)
	
	$fast=true; // use some optimizations (e.g. can allow to get some range from a filelist of 5000 files in 0.1 sec)
	$maxit=defined('JS_MAX_ITEMS') ? JS_MAX_ITEMS : 200; // how many items is enough to enable optimization?
	
	$split=true; // split result to pages and return only results for pages from $pagemin to $pagemax (including both)
	$pagemin=1; 
	$pagemax=1; // see description for $split
	$perpage=LIGHT_PERPAGE; // how many files per page
	
	$ftp=true; // try to get filelist through FTP also (can affect performance)
	
	/* read parameters, overwriting default values */
	extract($params,EXTR_OVERWRITE);
	
	if($sort!='name')
	{
		/*return d_error('Not supported yet');*/
		$fast = false;
		
		if(array_search('mode', $fields) === false) $fields[] = 'mode';
	}
	if($pagemax < $pagemin) $pagemax = $pagemin;
	if(array_search($sort, $fields)===false) $fields[] = $sort;
	if($order != 'asc') $order = 'desc';
	$filt = strtolower($filt);
	
	/* check required fields */
	$st = stat(__FILE__);
	
	foreach($fields as $k=>$v)
	{
		if($v == 'name' || $v=='chmod') continue;
		if(!isset($st[$v]))
		{
			$keys = array_filter(array_keys($st), 'is_string');
			return d_error('Unknown field: '.$v.'. Use the following: name, chmod, '.implode(', ', $keys));
		}
	}
	
	setreadable($dir, true);
	
	if(!@$dh = opendir($dir))
	{
		if(!$ftp) return d_error('Directory not readable');
		
		if(!@$ftp_list=d_ftplist($dir)) return d_error('Directory not readable');
	}
	
	if($dh)
	{
	    $it = array(); /* items */
		if(!$filt)
		{
			while(false!==(@$f=readdir($dh)))
			{
				if($f=='.' || $f=='..') continue;
				$it[] = $f;
			}
		}else
		{
			while(false!==(@$f=readdir($dh)))
			{
				if($f=='.' || $f=='..') continue;
				if(strpos(strtolower($f),$filt)!==false) $it[] = $f;
			}
		}
		closedir($dh);
		
		if(!$split) $perpage = sizeof($it);
		
		$old_dir = getcwd();
		chdir($dir);
		
		$l = sizeof($it);
		if($l < $maxit) $fast = false;
		
		/* $fast means do not sort "folders first" */
		
		if($fast) /* $sort = 'name' and $split = true */
		{
		    if($order=='asc') sort($it);
			else rsort($it);
		}else
		{
		    $dirs = $files = array();
		    
		    if($sort=='name')
		    {
			    for($i = 0; $i < $l; $i++)
			    {
			        if(is_dir($it[$i])) $dirs[]  = $it[$i];
			        else                $files[] = $it[$i];
			    }
		    	
		    	if($order=='asc')
				{
					sort($dirs);
					sort($files);
					$it = array_merge($dirs, $files);
				}else
				{
					rsort($files);
					rsort($dirs);
					$it = array_merge($files, $dirs);
				}
		    }
		}
		
		/* array_display($it); */
		
	    $res = array('pages_num' => ceil($l / $perpage), 'items_num' => $l);
	    $all = $pages = array();
		
		/* fix invalid page range, if it is required */
		
		if($pagemin > $res['pages_num'])
		{
			$pagemin = //max(1, $pagemin + ($pagemax - $res['pages_num']) );
			$pagemax = $res['pages_num'];
		}
	    
	    $cd = $cf = $ci =  ''; /* Code for Directories, Code for Files and Code for Items */ 
	    foreach($fields as $v)
	    {
	        $t = '[\''.$v.'\'][] = ';
	        
	        if      ($v == 'name')  $t .= '$n';
	        else if ($v == 'chmod') $t .= 'decoct($s[\'mode\'] & 0777)';
	        else                    $t .= '$s[\''.$v.'\']';
	        
	        if($sort == 'name')
	        {
		        $cd .= '$pages[$page][\'dirs\']'.$t.";\n";
		        $cf .= '$pages[$page][\'files\']'.$t.";\n";
	        }else
	        {
	        	$ci .= '$all'.$t.";\n";
	        }
	    }
	    
	    /* we cannot optimize sorting, if sorted field is not name:
		   we will have to call expensive stat() for every file, not only
		   $perpage files.
		*/
	    
	    if($sort == 'name')
	    {
		    eval('
		    for($i = 0; $i < '.$l.'; $i++)
		    {
		        $page = floor($i / '.$perpage.') + 1;
		        if( $page < '.$pagemin.' || $page > '.$pagemax.' ) continue;
		        
		        $n = $it[$i];
		        $s = stat($n);
		        
		        // is a directory?
		        if(($s[\'mode\'] & 0x4000) == 0x4000)
		        {
		            '.$cd.'
		        }else
		        {
		            '.$cf.'
		        }
		    }
		    ');
	    }
	    
	    if($sort!='name')
	    {
	    	eval('
		    for($i = 0; $i < '.$l.'; $i++)
		    {
		        $n = $it[$i];
		        $s = stat($n);
		        '.$ci.'
		    }
		    ');
	    	
	    	$code = 'array_multisort($all[\''.$sort.'\'], SORT_NUMERIC, SORT_'.strtoupper($order);
	    	
	    	foreach($fields as $v)
	    	{
	    		if($v != $sort) $code .= ', $all[\''.$v.'\']';
	    	}
	    	
	    	$code .= ');';
	    	
	    	/* code is evalled to prevent games with links to arrays */
	    	
	    	eval($code);
	    	
	    	$pages = array();
	    	
	    	$cf = $cd = '';
	    	
	    	foreach($fields as $k => $v)
	    	{
	    		$cf .= '$pages[$page][\'files\'][\''.$v.'\'][] = $all[\''.$v.'\'][$i];';
	    		$cd .= '$pages[$page][\'dirs\'][\''.$v.'\'][] = $all[\''.$v.'\'][$i];';
	    	}
	    	
	    	eval('
	    	for($i = 0; $i < $l; $i++)
	    	{
	    		$page = floor($i / '.$perpage.') + 1;
	    		if( $page < '.$pagemin.' || $page > '.$pagemax.' ) continue;
	    		
	    		if(($all[\'mode\'][$i] & 0x4000) == 0x4000)
		        {
		            '.$cd.'
		        }else
		        {
		            '.$cf.'
		        }
	    	}
	    	');
	    }
	    
	    if($res) $res['pages'] = $pages;
	    
	    chdir($old_dir);
	    
	    return $res;
	}else
	{
		extract($ftp_list);
		
		if($fields !== array('name', 'size') || $sort!='name') return d_error('Custom fields and sorting not by name are not currently supported in FTP mode');
		
		$files = array_map('basename', $files);
		$dirs  = array_map('basename', $dirs);
		
		$fl = sizeof($files);
		$dl = sizeof($dirs);
		
		if($filt)
		{
			$files_c = $dirs_c = array();
			
			for($i=0; $i<$fl; $i++) if(strpos(strtolower($files[$i]),$filt)!==false) $files_c[]=$files[$i];
			for($i=0; $i<$dl; $i++) if(strpos(strtolower($dirs[$i]),$filt)!==false) $dirs_c[]=$dirs[$i];
			
			$dirs = $dirs_c;
			$files = $files_c;
			
			$fl = sizeof($files);
			$dl = sizeof($dirs);
		}
		
		if(!$split) $perpage = $fl + $dl;
		
		$pages = array();
		
		for($i=0,$arr='files'; $arr=='files'||$i<$dl; $i++)
		{
		    if($arr=='files' && $i>=$fl)
		    {
			    $arr='dirs';
			    $i=0;
		    }
		    
		    $page = floor($i / $perpage) + 1;
		    if( $page < $pagemin || $page > $pagemax ) continue;
		    
		    $pages[$page][$arr]['name'][] = ${$arr}[$i];
		    $pages[$page][$arr]['size'][] = @$fsizes[$dir.'/'.${$arr}[$i]];
		}
	    
	    return array('items_num' => ($fl+$dl), 'pages_num' => ceil(($fl+$dl) / $perpage), 'pages' => $pages);
	}
}

/* list dirs + files + all subdirs + all other files */

function d_filelist_all($dir)
{
	setreadable($dir,true);
	if(!(@$dh=opendir($dir)) && !(@$ftp_list=d_ftplist($dir))) return false;
	
	if($dh)
	{
		$dirs = $files = $fsizes = array();
		/* chdir($dir); */
		
		while(false!==(@$file=readdir($dh)))
		{
			if($file=='.' || $file=='..') continue;
			if(is_dir($dir.'/'.$file)) $dirs[]=$dir.'/'.$file;
			else $files[]=$dir.'/'.$file;
			$fsizes[$dir.'/'.$file] = filesize($dir.'/'.$file);
		}
	
		closedir($dh);
	}else
	{
		extract($ftp_list);
	}
	
	foreach($dirs as $v)
	{
		$res = d_filelist_all($v);
		$dirs = array_merge($dirs, $res['dirs']);
		$files = array_merge($files, $res['files']);
		$fsizes = array_merge($fsizes, $res['fsizes']);
	}
	
	return array('dirs'=>$dirs,'files'=>$files,'fsizes'=>$fsizes);
}

/*

the cached version of filelist especially made for JS GGGR

returns:

array(

'items' => array(
	start: array(
		'name' => ...,
		'size' => ...,
		'is_dir' => true|false,
	),
	...
	start+length-1: array(
		'name' => ...,
		'size' => ...,
		'is_dir' => true|false,
	),
),

'cnt' => N

)

*/

function d_filelist_cached($dir, $start, $length, $filter = '')
{
	//sleep(1);

	$tmpdir = is_callable('get_tmp_dir') ? get_tmp_dir() : '/tmp';
	$cache_prefix = $tmpdir.'/dolphin'.md5(__FILE__);
	
	$cache_dat = $cache_prefix.'.dat';
	$cache_idx = $cache_prefix.'.idx';
	
	$new = false;
	
	if(!file_exists($cache_dat) || filemtime($dir) > filemtime($cache_dat))
	{
		$new = true;
		
		$fp = fopen($cache_dat, 'w+b');
		$ifp = fopen($cache_idx, 'w+b');
	}else
	{
		$fp = fopen($cache_dat, 'r+b');
		$ifp = fopen($cache_idx, 'r+b');

		list(, $l) = unpack('n', fread($fp, 2));
		$cached_dir = fread($fp, $l);
		
		list(, $l) = unpack('n', fread($fp, 2));
		$cached_filter = fread($fp, $l);
		
		if($cached_dir != $dir || $cached_filter != $filter)
		{
			ftruncate($fp, 0);
			ftruncate($ifp, 0);
			
			fseek($fp, 0, SEEK_SET);
			fseek($ifp, 0, SEEK_SET);
			
			$new = true;
		}
	}
	
	$items = array();
	$cnt   = 0;
	
	$old_cwd = getcwd();
	
	try
	{
		if(!@chdir($dir)) throw new Exception('Could not chdir to the folder');

		if($new)
		{
			fwrite($fp, pack('n', strlen($dir)).$dir);
			fwrite($fp, pack('n', strlen($filter)).$filter);
			
			$pos = ftell($fp);
			
			$dh = opendir('.');

			if(!$dh) throw new Exception('Could not open directory for reading');
			
			$filter = strtolower($filter);
			
			while( false !== ($f = readdir($dh)) )
			{
				if($f == '.' || $f == '..') continue;
				if(strlen($filter) && !substr_count(strtolower($f), $filter)) continue;
				
				fwrite($ifp, pack('NN', $pos, strlen($f)));
				fwrite($fp, $f);
				
				$pos += strlen($f);
				
				// ftell is not as fast as it should be, sadly
			}
			
			fflush($ifp);
			fflush($fp);
		}
		
		fseek($ifp, $start * 8 /* length(pack('NN')) */);
		
		$first = true;
		$curr_idx = $start;
		
		while( $curr_idx < $start + $length )
		{
			list(, $pos, $l) = unpack('N2', fread($ifp, 8));

			if($first)
			{
				fseek($fp, $pos);
				$first = false;
			}
			
			$f = fread($fp, $l);
			
			if(!strlen($f)) break;
			
			if(strlen($f) != $l)
			{
				throw new Exception('Consistency error');
			}
			
			$items[$curr_idx++] = array(
				'name' => $f,
				'size' => filesize($f),
				'is_dir' => is_dir($f),
			);
		}
		
		
		$cnt = filesize($cache_idx) / 8;
		
		
	}catch(Exception $e)
	{
		fclose($fp);
		fclose($ifp);

		unlink($cache_dat);
		unlink($cache_idx);
		
		@chdir($old_cwd);

		return is_callable('d_error') ? d_error($e->getMessage()) : false;
	}
	
	if($cnt < 500 && $length >= 500)
	{
		usort($items, 'd_filelist_cached_usort_cmp');
	}
	
	@chdir($old_cwd);
	
	return array( 'items' => $items, 'cnt' => $cnt );
}

function d_filelist_cached_usort_cmp($it1, $it2)
{
	return strcmp( $it1['name'], $it2['name'] );
}
?>