var EngineClass = function(){
	var T = this;
	var _history = {'back': [], 'fwd': []};
	
	/* protected functions */
	var draw_menu_for_item_callback, _copycut, print_history, sync, show_state;
	
	T.address = false; // the address of current directory
	T.page = 1; // current page
	T.perpage = 0;
	T.sort = 'name'; // sort column
	T.order = 'asc'; // sorting order
	T.fast = true; // use fast sorting, if sort field is 'name'
	
	T.copied = false; // if something is copied (or cut)
	T.op = 'copy'; // what operation will be done - cut or copy?
	
	T.ggr = T.get_global_res = function()
	{
		return D.ggr();
	};
	
	T.ggm = (T.get_global_menu = function() // function that gets _menu
	{
		return D.ggm();
	});
	
	T.ggs = (T.get_global_status = function()
	{
		return D.ggs();
	});
	
	var _draw_timeout = false;
	
	/* cancel delayed draw of menu (e.g. information about file) */
	
	T.cd = (T.cancel_draw = function()
	{
		if(!_draw_timeout) return;
		
		clearTimeout(_draw_timeout);
		_draw_timeout = false;
	});
	
	// function changes dir to the specified location
	// if nohistory set to true, nothing will be added to history
	// function changes the name in the header, the address and even the menu
	
	var _lasterr = false;
	
	T.go2 = function(where,nohistory)
	{
		return D.go2(where,nohistory);
	};
	
	T.rf = T.request_filelist = function(dir,params,onreadyfunc)
	{
		D.qr('index.php?act=filelist', {DIR: dir, 'params': params}, onreadyfunc, true, 'requesting pages');
	};
	
	// function is the analogue of basename() function in PHP
	
	T.bsnm = (T.basename = function(path)
	{
		var p = path.split('/');
		if(!p[p.length-1]) p.pop();
		return p[p.length - 1];
	});
	
	T.round = function(digit, precision)
	{
		if(precision <= 0) return Math.round(digit);
		precision = parseInt(precision);
		
		var fp = ''+Math.round( (digit - Math.floor(digit)) * Math.pow(10, parseInt(precision)));
		
		if(fp.length < precision)
		{
			for(var i = precision - fp.length; i>0; i--) fp = '0' + fp;
		}
		
		return Math.floor(digit) + '.' + fp;
	};
	
	T.hb = T.human_bytes = function(bytes)
	{
		if(bytes < 0) return '&gt;2 Gb';
		
		if(bytes < 1024) return bytes + ' bytes';
		else if(bytes < 1024*1024) return T.round(bytes/1024,2) + ' Kb';
		else if(bytes < 1024*1024*1024) return T.round(bytes/(1024*1024), 2) + ' Mb';
		else return T.round(bytes/(1024*1024*1024), 2) + ' Gb';
	};
	
	// function gets the extension of file
	
	T.ge = (T.get_extension = function(file)
	{
		var arr=file.split('.');
		if(!arr[1]) return '';
		for(var k in arr) var ext=arr[k];
		return ext;
	});
	
	T.htmlspecialchars = function(code)
	{
		return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	
	// function that returns the full path for object with number k
	
	T.path = function(k)
	{
		/* R._selected = [_items[k]]; */
		
		return _items[k]['fullpath'];
	}
	
	// function that draws menu for 1 selected item
	// it draws the menu after a timeout of 300 msec (to enable normal double-clicking)
	
	T.dmfi = (T.draw_menu_for_item = function(item)
	{
		//if(_items[item]['type']!=tFILE&&_items[item]['type']!=tDIR) return draw_menu_for_item_callback(item);
		
		T.cancel_draw();
			
		_draw_timeout = setTimeout(function(){draw_menu_for_item_callback(item);}, 300);
	});
	
	T.dmfis = (T.draw_menu_for_items = function()
	{	
		L.draw({0: 'operations', 1: {name: 'details', filename: 'Selected:', selnum: R.get_selected_items().length}});
		I.change_status([['Selected items',R.get_selected_items().length]]);
	});
	
	
	/* item - name of file
	   info - the cached result of index.php?act=info , if present */
	draw_menu_for_item_callback = function(item, info)
	{
		//var i = _items[item];
		
		//if(i['type']==tFILE||i['type']==tDIR) 
		//{
			T.cancel_draw();
			
			var dr = function(info){
				//if(i['type']==tDIR) info['size']=i['size'];
				var type = (info['dir'] ? tDIR : tFILE);
				L.draw({0: {name: 'operations', type: type},1: info });
				
				var status = [['Type',info['type']],['Size',info['size']]];
				
				if(type == tDIR)
				{
					status.push(['Hint','Double-click to open']);
				}else
				{
					status.push(['Hint','Press Esc to remove selection']);
				}
				
				I.change_status(status);
			}
			
			if(!info) D.qr('index.php?act=info', {  file: item }, function(d,err) { if(d) dr(d); });
			else dr(info);

		//}
		/*else if(i['type']==tDIR)
		{
			L.draw({0: 'operations',1: {name: 'details', filename: i['name'], dir: true, size: i['size']}});
		}*///else if(i['type']==tDRIVE)
		//{	
		//	L.draw({0: 'common', 1: { name: 'details', filename: i['name'], dir: false, type: i['descr'], free: i['free'], total: i['total'], fs: i['fs'] }});
		//}
	}
	
	T.di = T.delete_item = T.dis = T.delete_items = function()
	{
		var items = R.get_selected_items();
		
		
		/*for(var i=0; i<items.length; i++)
		{
			if(items[i]['type']!=tDIR && items[i]['type']!=tFILE) return; // you can only delete files and folders
		}*/
		
		if(!confirm('Do you really want to delete ' + (items.length == 1 ? E.bsnm(items[0]) : 'all items ('+items.length+')') + '?')) return;
		
		var del;
		
		R.remove_selection();
		
		(del = function(result)
		{
			D.qr('index.php?act=delete', {'items':items}, function(res,err)
			{
				if(res && res.end)
				{
					if(!res.success) alert('Delete failed');
					T.F5();
				}else if(res && !res.end)
				{
					/*setTimeout(function(){*/del(res);/*}, 100);*/
				}
			},true, 'deleting ' + show_state(result) + '...');
		})();
	};
	
	/*
	sync = function(el,i,e,force)
	{
		var v = document.getElementById('__vary');
		e = e||window.event;
		
		if(!v)
		{
			v = document.createElement('div');
			v.className = 'norm';
			v.style.visibility = 'hidden';
			v.style.position = 'absolute';
			v.style.whiteSpace = 'pre';
			
			document.body.appendChild(v);
		}
		
		if(e && e.keyCode == 13 // Enter
		   || force)
		{
			D.qr('index.php?act=rename', {'old': i, 'new': el.value}, function(res,err)
			{
				if(res['success'])
				{
					_items[i['id']] = res['new'];
				}else
				{
					alert('The item ' + res['f'] + ' could not be renamed.' + res['reason']);
				}
				
				el.parentNode.removeChild(el);
				R.draw(_items);
				R.cl(document.getElementById('it'+i['id']),{});
			});
			
			el.onblur = function(){}; // Safari blurs the element when the node is deleted and tries to rename file 2 times
			
			return;
		}
		
		v.innerHTML = el.value;
		el.style.width = (v.clientWidth - (-20) ) + 'px';
	}
	*/
	
	// function that renames the selected item (for ex. file or folder)
	
	T.ri = (T.rename_item = function()
	{
		var i = R.gsi()[0];
		//if(i['type']!=tDIR && i['type']!=tFILE) return; // you can only rename files and folders
		/*var n = prompt('Enter new name: ',i['name']);
		if(!n) return;
		*/
		
		//var el = document.getElementById('it'+i['id']);
		//var nm = el.firstChild.nextSibling;
		
		/*
		I.dbg('name: ' + el.nodeValue);
		
		*/
		
		//el.removeChild(nm);
		
		//var inp = document.createElement('input');
		
		/*var buf = '';
		
		for(var k in inp)
		{
			buf += k + '<br>';
		}
		
		I.dbg(buf);
		*/
		
		//var s = function(e){sync(inp,i,e);};
		
		//var p = {type: 'text', value: i['name'], className: 'norm rename_inp', onkeydown: s, onblur: function(){sync(inp,i,null,true);} };
		
		//for(var k in p) inp[k] = p[k];
		
		//el.appendChild(inp);
		
		//s();
		//inp.select();
		
		//R.un_cl();
		
		var newname = prompt('Enter new name:', T.basename(i));
		
		if(!newname) return;
		
		D.qr('index.php?act=rename', {'old': i, 'new': newname}, function(res,err)
		{
			if(res['success'])
			{
				var sel_len = R.get_selected_length();
				
				if(sel_len == 1)
				{
					R.select_item(newname, true, true);
				}else
				{
					R.remove_selection(true);
				}
				
				E.F5();
			}else
			{
				alert('The item ' + res['f'] + ' could not be renamed.' + res['reason']);
			}
		});
			
	});
	
	// T function creates folder
	
	T.mkdir = function()
	{
		/* stupid IE7! It blocks prompts */
		var new_name = prompt('Enter the new directory name:','NewFolder');
		
		if(!new_name) return;
		
		D.qr('index.php?act=mkdir', {name: new_name}, function(res,err){
			if(res['success']) T.F5();
			else alert('Could not create directory.' + res['reason']/* + '. Error text: ' + err*/);
		});
	}
	
	T.mkfile = function()
	{
		/* stupid IE7! It blocks prompts */
		var new_name = prompt('Enter the new filename:','NewFile');
		
		if(!new_name) return;
		
		D.qr('index.php?act=mkfile', {name: new_name, confirm: 0}, function(res,err){
			if(res['exists'])
			{
				if(confirm('The file already exists. Overwrite it?')) D.qr('index.php?act=mkfile', {name: new_name, confirm: 1}, function(r,e)
				{
					if(!r['success']) alert('Could not create file.' + r['reason']);
					else T.F5();
				});
				
				return;
			}
			if(res['success']) T.F5();
			else alert('Could not create file.' + res['reason']/* + '. Error text: ' + err*/);
		});
	}
	
	// T function downloads the selected element
	
	T.df = T.download_file = function(i)
	{
		var undef;
		if(typeof(i) == typeof(undef)) i = R.get_selected_items()[0];
		D.qr('index.php?act=download_get_href',{file: i, type: tFILE},function(res,err)
		{
			if(res)
			{
				//alert(res['href']);
				window.location.href = res['href'];
			}else alert('Could not get address to download file. This error cannot happen.');
		},false,'downloading...');
	};
	
	T.cpi = (T.cpis = (T.copy_items = (T.copy_item = function(){ _copycut('copy'); })));
	
	T.cti = (T.ctis = (T.cut_items = (T.cut_item = function(){ _copycut('cut'); })));
	
	T.cancel_copy = function ()
	{
		D.qr('index.php?act=cancel_copy',{}, function(res,err)
		{
			T.copied = false;
			T.F5();
		});
	}
	
	// the function copies or cuts the file
	
	_copycut = function (what /* copy or cut? */)
	{
		D.qr('index.php?act='+what,{items: R.get_selected_items()},function(res,err)
		{
			if(!res) alert('Could not '+what+' files.');
			else
			{
				T.op = what;
				T.copied = true;
				R.remove_selection();
			}
		});
	}
	
	// function which pastes copied or cut items
	
	show_state = function(result)
	{
		if(!result) return '(process started)';
		
		return '<small>(<b>files:</b> '+result.files+'&nbsp;&nbsp;&nbsp;<b>dirs:</b> '+result.dirs+(result.total ? '&nbsp;&nbsp;&nbsp;<b>total:</b> ' + result.total + (result.speed ? ' on ' + result.speed : '') : '')+')</small>';
	}
	
	T.pi = (T.paste_items = function ()
	{
		if(T.op == 'cut')
		{ 
			D.qr('index.php?act=paste',{}, function(res,err)
			{
				if(!res) alert(err);
				T.copied = false;
				T.F5();
			},true, T.op=='copy'?'copying...':'moving...');
		}else
		{
			var cp;

			(cp = function(result)
			{
				D.qr('index.php?act=paste',{}, function(res,err)
				{
					if(err) alert(err);
					
					if(!res)
					{
						return;
					}
					
					if(res.end)
					{
						T.copied = false;
						if(!res.success) alert( (T.op == 'copy' ? 'Copy' : 'Move') + ' failed');
						T.F5();
					}else
					{
						/*setTimeout(function(){ */cp(res);/* }, 100);*/
					}
				},true, T.op=='copy'?'copying '+ show_state(result)+'...':'moving ' + show_state(result) +'...');
			})();
		}
	});
	
	// refresh filelist
	T.F5 = T.refresh = function()
	{
		T.go2(T.address, true);
	};
	
	var _filenum = 0;
	
	T.edit_file_for_item = function(filename)
	{
		var wnd = I.window_open('about:blank', 'edit' + (_filenum++), 640, 480);
		
		/* window is opened just now because in JsHttpRequest handler it will be blocked!
		   
		   "smart" browsers do not block windows that were opened on user click,
		   but they do not know that I do not know URL of the file :) at that moment,
		   and need an additional asynchonous request to server
		*/
		
		D.qr('index.php?act=info', {file: filename, type: tFILE}, function(res,err)
		{
			var img = res['thumb'] ? true : false;
			res['thumb'] = false; /* decrease server load, we do not need to draw the thumb in info */
			
			draw_menu_for_item_callback(filename, res);
			
			if(res['size_bytes'] >= 100*1024 && !img)
			{
				T.download_file(filename);
			}else
			{
				wnd.location.href = 'index.php?act=edit&file=' + res['filename_encoded'] + (img ? '&img=true' : '');
			}
		},true,'opening...');
	};
	
	var _block_back = false; // block add button
	var _block_fwd = false; // block fwd button
	
	T.ath = (T.add_to_history = function(dir)
	{
		_history['back'].push(dir);
		_history['fwd'] = [];
		print_history();
	});
	
	T.gb = (T.go_back = function()
	{
		if(_history['back'].length<=1) return false;
		_history['fwd'].push(_history['back'].pop());
		T.go2(_history['back'][_history['back'].length-1], true);
		print_history();
	});
	
	T.gf = (T.go_fwd = function()
	{
		if(_history['fwd'].length==0) return false;
		var addr = _history['fwd'].pop();
		_history['back'].push(addr);
		T.go2(addr, true);
		print_history();
	});
	
	T.cgb = (T.can_go_back = function(){ return _history['back'].length > 1; });
	T.cgf = (T.can_go_fwd = function(){ return _history['fwd'].length > 0; });
	T.cgu = (T.can_go_up = function(){ return D.cgu(); });
	
	print_history = function()
	{
		I.dbg(_history['back']);
	}
	
	// function uploads files selected in the left menu
	
	/*T.uf = (T.upload_files = function()
	{
		D.qr('index.php?act=upload',{ 'form': document.getElementById('upload_form'), 'DIR': T.address },function(res, err)
		{
			
			setTimeout(function(){I.show_upload();T.F5();}, 100); // "fixing" the JsHttpRequest library bug
			
			if(!res) alert(err);
		
		},true,'uploading...');
		
		return true;
	});*/
	
	// the function replaces the link "show dir size" by the directory size
	
	T.sds = (T.show_dir_size = function(nolimit)
	{
		var el = document.getElementById('_dirsize');
		var i, name;
		if(R.gsi().length>0)
		{
			name = R.gsi()[0];
		}else
		{
			i = -1;
			name = T.address;
		}
		
		//el.innerHTML = '<i>loading, please wait...</i>';
		
		D.qr('index.php?act=show-properties',{'items': [name] }, function(res,err)
		{
			if(res)
			{
				if(!nolimit&&!res.end) res.total += ' <a href="javascript:E.sds(true);" style="text-decoration: underline;">count further</a>';
				el.innerHTML = (res.end ? '' : '&gt;') + res.total;
				if(res.end)
				{
					if(i==-1) _menu[2]['size'] = res.total;
				}
				
				if(!res.end && nolimit)
				{
					/*setTimeout(function(){ */T.sds(true);/* }, 100);*/
				}
			}
			else el.innerHTML = 'error: '+err;
		}, true, 'counting...');
	});
	
	T.ci = T.chmod_item = T.cis = T.chmod_items = function(mod,items)
	{
		//if(!mod) mod = prompt('Enter rights for item(s): ', '777');
		var recursive = confirm('CHMOD items recursively (chmod also subdirectories and files in subdirectories)?');
		//if(!mod) return;
		
		if(!recursive)
		{
		
			D.qr('index.php?act=set_rights', {'items': items/* || R.get_selected_items()*/, 'mod': mod, 'recursive': false},function(res,err)
			{
				if(err) alert(err);
				//if(!items) T.F5();
			});
		}else
		{
			
			var cp;

			(cp = function(result)
			{
				D.qr('index.php?act=set_rights', {items: items/* || R.get_selected_items()*/, 'mod': mod, 'recursive': true},function(res,err)
				{
					if(err)
					{
						alert(err);
						return;
					}
					
					if(res.end) if(!res.success) alert( 'CHMOD failed');//if(!items) T.F5();
					else        setTimeout(function(){ cp(res); }, 100);
				}, true, 'CHMODding '+show_state(result)+'...');
			})();
		}
	};
	
	T.zis = T.zi = T.zip_items = T.zip_item = function()
	{	
		D.qr('index.php?act=zip', {items: R.gsi()}, function(res,err)
		{
			if(err) alert(err);
			T.F5();
		}, true, 'compressing');
	};
	
	T.uzi = T.unzip_item = function(mode)
	{	
		D.qr('index.php?act=unzip', {'fullpath': R.gsi()[0], 'mode': mode}, function(res,err)
		{
			if(err) alert(err);
			T.F5();
		}, true, 'extracting');
	};
	
	T.ru = T.run_update = function()
	{
		D.qr('index.php?act=update', {}, function(res,err)
		{
			if(!res)
			{
				if(confirm('Auto-update failed.\nDo you want to use advanced way to update SNAME (version will be changed to light)?')) window.location='index.php?version=light&DIR=.&act=download-new';
			}else
			{
				alert('Update successful!');
				window.location.reload();
			}
		});
	};
	
	// the function which opens the terminal window
	
	T.ot = T.open_terminal = function()
	{
		I.window_open('index.php?act=terminal', 'terminal', 700, 500);
	};
	
	T.sp = T.show_properties = function()
	{
		if(!this.i) this.i = 0;
		I.window_open('index.php?act=properties', 'properties'+(this.i++), 300, 400);
	};
	
	/* the function from http://www.mredkj.com/javascript/numberFormat.html */
	T.format_number = function(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		return x1 + x2;
	}
};

window.Engine = (window.E = new EngineClass());
