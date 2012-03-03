var Render_Views = 
{
table: function(){
	var T = this;
	var _selected = {}, _selected_len = 0;
	var FILE_OVER = false;
	var _filter = '';
	
	T.gsi = T.get_selected_items = function()
	{
		var sel = [];
		for(var k in _selected) if(_selected[k]) sel.push(k);
		
		return sel;
	}
	
	T.get_selected_length = function()
	{
		return _selected_len;
	}
	
	T.remove_selection = function(skip_redraw)
	{
		//_last_selected = false;
		
		_selected = { };
		_selected_len = 0;
		
		if(!skip_redraw)
		{
			T.GRID.redraw();
			T.redraw_menu();
		}
	}
	
	/**
	 * selects a file with name "filename" (just a basename of a file)
	 * 
	 * if replace_selection is set to true, then the current selection will be
	 * replaced with a new one
	 */
	
	T.select_item = function(filename, replace_selection, skip_redraw)
	{
		if(replace_selection)
		{
			_selected = { };
			_selected_len = 0;
		}
		
		if(!_selected[filename]) _selected_len++;
		_selected[filename] = true;
		
		if(!skip_redraw)
		{
			T.GRID.redraw();
			T.redraw_menu();
		}
	}
	
	T.it = (T.is_tag = function(e,tagname)
	{
		if(!e || (e.target || e.srcElement).nodeName.toLowerCase()!=tagname.toLowerCase()) return false;
		return true;
	});
	
	T.ii = (T.is_inp = function(e)
	{
		return T.is_tag(e,'input');
	});
	
	// offsets for different extensions in f/iconz/16-f.png
	var _ext = {_default: 0, ace: 1, app: 2, avi: 3, bat: 4, bmp: 5, chm: 6, com: 7, css: 8, divx: 9, dll: 10, doc: 11, exe: 12, fon: 13, gif: 14, gz: 15, hlp: 16, htaccess: 17, htm: 18, html: 19, htpasswd: 20, inc: 21, ini: 22, jpe: 23, jpeg: 24, jpg: 25, js: 26, lnk: 27, log: 28, mdb: 29, mid: 30, midi: 31, mov: 32, mp3: 33, mpeg: 34, mpg: 35, pdf: 36, php: 37, php3: 38, phtml: 39, pl: 40, png: 41, psd: 42, ptt: 43, rar: 44, rtf: 45, shtm: 46, shtml: 47, sys: 48, tar: 49, ttf: 50, txt: 51, wav: 52, wbmp: 53, wma: 54, zip: 55};
	
	T.file_icon = T.fi = function(path)
	{
		var e = E.ge(path).toLowerCase();
		
		return '<img src="f/i/no.png" width=16 height=16 border=0 style="background: url(\'f/iconz/16-f.png\'); background-position: 0px '+(_ext[e] ? -_ext[e]*16 : 0)+'px" align="absmiddle">';
	};
	
	
	var grid_setup = false;
		
	function handle_row_select(row, idx, ev)
	{
		var isDblClick = false;
		var name = row['name'] || null;
		if(!name) return;

		if( _last_clicked_time && _last_clicked_idx == idx )
		{
			var delta = (new Date().getTime() - _last_clicked_time.getTime());

			if(delta < 500) isDblClick = true;
		}

		try
		{
			ev.preventDefault();
		}catch(exc)
		{

		}
		
		try
		{
			ev.stopPropagation();
		}catch(exc)
		{
			
		}

		document.getElementById('address').focus();
		document.getElementById('address').blur();

		if(isDblClick)
		{
			//alert('Double-clicked '+idx+' (delta = '+delta+')');
			if(row['is_dir']) I.change_address(name);
			else E.edit_file_for_item(name);
		}



		if(ev.ctrlKey || ev.metaKey)
		{
			if(_selected[name])
			{
				delete _selected[name];
				_selected_len--;
				
				//_last_selected = null;
			}else
			{
				//if(_selected_len > 0) _last_selected = null;
				_selected[name] = true;
				_selected_len++;
			}
		}else if(ev.shiftKey)
		{
			function add_to_selection(i)
			{
				res = T.GRID.getRow(i);
				if(!res) return;
				if(_selected[res['name']]) return;
				
				_selected[res['name']] = true;
				_selected_len++;
			}
			
			var i, res;
			
			var num = Math.abs( idx - _last_clicked_idx ) + 1;
			if(num > 500)
			{
				alert('Selection of more than 500 elements at once is not supported. You tried to select '+num+' items.');
				return;
			}
			
			if( idx > _last_clicked_idx )
			{
				for(i = _last_clicked_idx; i <= idx; i++)
				{
					add_to_selection(i);
				}
			}else
			{
				for(i = idx; i <= _last_clicked_idx; i++)
				{
					add_to_selection(i);
				}
			}
			
		}else
		{
			_selected = {};
			_selected[name] = true;
			_selected_len = 1;
		}


		T.GRID.redraw();
		T.redraw_menu();


		_last_clicked_idx = idx;
		_last_clicked_time = new Date();
	}
	
	var _load_queue_length = 0;
	var _new_directory = true;
	var _filelist_shown = false;
	
	var _last_clicked_idx = -1;
	var _last_clicked_time = null;
	
	var _filelist_pos = 0;
	
	T.df = T.draw_files = function(address, nohistory)
	{
		//console.log('draw files with address = '+address);
		
		if(!grid_setup)
		{
			T.GRID = new GGGR();
			var g = T.GRID;
			
			g.container = document.getElementById('content');
			g.dataSource = {
				type: 'remote',
				backend: '?act=filelist',
				data: {
					DIR: address
				},
				cacheSize: 1000,
				transformRow: function(res, idx)
				{
					res['name'] = res['name'] || '';
					
					res['icon'] = res['is_dir'] ? '<img src="f/iconz/16-folder.png" width="16" height="16" align="absmiddle" />' : T.file_icon(res['name']);
					
					res['nameNew'] = htmlspecialchars(res['name']);
					
					return res;
				}
			}
			g.onDataLoaded = function(req)
			{
				if(!grid_setup)
				{
					E.add_to_history(req['DIR']);
				}
				grid_setup = true;
				
				if(!_filelist_shown)
				{
					_filelist_shown = true;
					D.onFileListLoaded(req);
				}
				
			};
			g.updateInterval = 25;
			
			var update_loading_status = function()
			{
				if(_load_queue_length == 1)
				{
					I.show_loading(true, _new_directory ? 'Preparing '+( L._search_str == L._search_str_default || !L._search_str.length ? 'full' : 'filtered' )+' filelist for opened directory <small>(might take a while)</small>' : 'Loading filelist chunk');
					_new_directory = false;
				}else if(_load_queue_length > 1)
				{
					I.show_loading(false);
					I.show_loading(true, 'Loading '+_load_queue_length+' filelist chunks');
				}
			}
			
			g.onBeginLoading = function()
			{
				//alert('begin loading');
				
				_load_queue_length++;
				
				update_loading_status();
			}
			
			g.onFinishLoading = function()
			{
				//alert('finish loading');
				
				_load_queue_length--;
				
				if(!_load_queue_length) I.show_loading(false);
				else update_loading_status();
			}
			
			g.colorForRow = function(row, idx)
			{
				if(_selected[row['name']])
				{
					return '#329ef5';
				}
				
				return null;
			}
			
			g.onRowClick = handle_row_select;
			
			g.onRowChange = function(pos)
			{
				_filelist_pos = pos;
			}
			
			g.fields = {
				icon: '</a>&nbsp;<a>',
				nameNew: '</a>Name<a>',
				//owner: '</a>Owner<a>',
				//group: '</a>Group<a>',
				//perm: '</a>Permissions<a>',
				modifDate: '</a>Modified<a>',
				size: '</a>Size<a>'
			};
			
			g.widths = {
				icon: 21,
				nameNew: g.container.offsetWidth - (21 + /*80 + 80 + 80 + */130 + 80 /* field widths */ + 4 /*field count*/ 
					+ 17 /*scroll width + border*/),
				//owner: 80,
				//group: 80,
				//perm: 80,
				modifDate: 130,
				size: 80
			};

			g.zebraColor = 'rgba(50, 50, 50, 0.03)';
			
			g.setup();
			
			
		}else
		{
			T.GRID.dataSource.data.DIR    = address;
			
			var filt = document.getElementById('fsearch');
			if(!filt) filt = '';
			else filt = filt.value;
			T.GRID.dataSource.data.filter = filt == L._search_str_default ? null : filt;
			
			_new_directory = true;
			_filelist_shown = false;
			
			if(!nohistory)
			{
				_filelist_pos = 0;
				
				_selected = {};
				_selected_len = 0;
				//_last_selected = null;
				
				_last_clicked_idx = -1;
				_last_clicked_time = null;
			}
			
			T.GRID.abort();
			
			T.GRID.redraw(_filelist_pos);
		}
	}
	
	
	
	T.redraw_menu = function()
	{
		if(_selected_len == 0)
		{
			L.draw(D.ggm()); /* draw the default folder menu */
			I.cs(D.ggs());
			this.last = false;
		}else if(_selected_len == 1)
		{
			for(var k in _selected);
			
			E.dmfi(k); /* draw menu for (1) item */
			//_last_selected = k;
		}else
		{
			E.dmfis(); /* draw menu for items */
			this.last = false;
		}
	}
	
	T.ir = (T.is_rbutton = function(e)
	{
		return e.button==3 || e.button==2;
	});
}
};

window.Render = (window.R = new Render_Views['table']());