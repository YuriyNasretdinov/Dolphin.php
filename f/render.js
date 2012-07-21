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
	
	T.file_icon = T.fi = function(path, background)
	{
        background = background || "f/iconz/16-f.png";
		var e = E.ge(path).toLowerCase();

        var el = document.createElement('div');
        el.className = 'file-icon';
        el.style.background = "url('" + background + "')";
        el.style.backgroundPosition = "0px " + (_ext[e] ? -_ext[e]*16 : 0) + "px";
		return el;
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
			if(row.type == 'dir') I.change_address(name);
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
                var name = T.filelist[i];
				if(_selected[name]) return;
				_selected[name] = true;
				_selected_len++;
			}
			
			var i;

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

	var _filelist_shown = false;
	
	var _last_clicked_idx = -1;
	var _last_clicked_time = null;
	
	var _filelist_pos = 0;

	var _fileinfo = {
		// name: { size: ..., type: ..., modified: ... }
	};
	var _pending_files = {/* name: true */};
	var _in_progress = false;
	T.filelist = [];
    T.filtered_filelist = [];

    var _last_filter = '';

    T.filter = function(str, skip_redraw) {
        if (!str) {
            T.filtered_filelist = T.filelist;

        } else {
            T.filtered_filelist = [];
            var l = T.filelist.length;
            for (var i = 0; i < l; i++) {
                if (T.filelist[i].indexOf(str) > -1) T.filtered_filelist.push(T.filelist[i]);
            }
        }
        _last_filter = '' + str;

        if(!skip_redraw) T.GRID.redraw();
    };

	T.df = T.draw_files = function(address, reload)
	{	
		if(!grid_setup)
		{
			T.GRID = new Grid();
			var g = T.GRID;
            var settings = {};
			
			settings.container = document.getElementById('content');
            settings.fetch = function(i) {
                var name = T.filtered_filelist[i];
                var info = _fileinfo[name];
                if (!info) {
                    _pending_files[name] = true;
                    info = {};
                }

                return {
                    name: name,
                    modified: info.modified || '',
                    size: info.size || '',
                    icon: function() {
                        return T.file_icon(name, info.type == 'dir' ? 'f/iconz/16-folder.png' : '');
                    },
                    type: info.type
                };
            };
            settings.count = function() {
                // last element is always empty
                return Math.max(0, T.filtered_filelist.length);
            };
            T.onDataLoaded = function(req, need_filter)
			{
                if (!req['error']) {
                    _in_progress = false;
                    grid_setup = true;
                    _fileinfo = req.fileinfo;
                    T.filelist = req.res.split('/');
                    T.filelist.pop();
                    T.filelist.sort();
                    if (need_filter) T.filter(_last_filter, true);
                    else             T.filtered_filelist = T.filelist;
                }

				if(!_filelist_shown)
				{
					_filelist_shown = true;
					try {
						D.onFileListLoaded(req);
					} catch(e) {
						console.log(e)
					}

				}
				
				g.redraw();
			};
            settings.updateInterval = 25;

            settings.colorForRow = function(row, idx)
			{
				if(_selected[row['name']])
				{
					return '#329ef5';
				}
				
				return null;
			};

            settings.onRowClick = handle_row_select;

            settings.onRowChange = function(pos)
			{
				_filelist_pos = pos;
			};

            settings.fields = {
				icon: '&nbsp;',
				name: 'Name',
				//owner: '</a>Owner<a>',
				//group: '</a>Group<a>',
				//perm: '</a>Permissions<a>',
				modified: 'Modified',
				size: 'Size'
			};
			
			settings.widths = {
				icon: 21,
				name: settings.container.offsetWidth - (21 + /*80 + 80 + 80 + */130 + 80 /* field widths */ + 4 /*field count*/
					+ 17 /*scroll width + border*/),
				//owner: 80,
				//group: 80,
				//perm: 80,
				modified: 130,
				size: 80
			};

			settings.zebraColor = 'rgba(50, 50, 50, 0.03)';
			
			g.setup(settings);

            T.GRID_SETTINGS = settings;
			
			D.qr('?act=filelist', {DIR: address}, T.onDataLoaded);
			setInterval(function() {
				if (_in_progress) return;
				var pending = [], old_dir = D.get_dir();
				for(var k in _pending_files) pending.push(k);
				if (pending.length) {
					_in_progress = true;
					D.qr('?act=files-info', {files: pending}, function(res) {
                        if (D.get_dir() != old_dir) return;
						_in_progress = false;

						for (var k in res.info) {
							_fileinfo[k] = res.info[k];
						}

						for (var i = 0; i < pending.length; i++) {
							var name = pending[i];
							delete _pending_files[name];
							if (!_fileinfo[name]) _fileinfo[name] = {};
						}

                        T.GRID.setNeedsRedraw();
					});
				}
			}, 500);
			
		}else
		{
			D.qr('?act=filelist', {DIR: address}, function(req) {
                if (!req.error) {
                    _filelist_shown = false;

                    if(!reload)
                    {
                        _filelist_pos = 0;

                        _selected = {};
                        _selected_len = 0;

                        _last_clicked_idx = -1;
                        _last_clicked_time = null;
                    }
                }

                T.onDataLoaded(req, reload);
                T.GRID.redraw(_filelist_pos);
            });
			
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