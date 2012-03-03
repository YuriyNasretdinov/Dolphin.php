window.GGGR = function()
{
	var VIRTUAL_ROW_HEIGHT = 30;
	var REAL_ROW_HEIGHT = 30;
	
	var T = this;
	
	T.container = null;
	T.dataSource = { type: null };
	T.fields = { };
	T.widths = { };
	
	var NEED_INITIAL_LOADING = -1;
	var PERFORMING_INITIAL_LOADING = -2;
	
	var _container = null;
	
	var _count = NEED_INITIAL_LOADING;
	
	var _loadType = ''; // local or remote
	
	/* for local load type: */
	
	var _fetch = null;
	
	/* for remote load type: */
	
	var _backend = '';
	var _remoteData = { };
	var _cacheSize = 100;
	
	
	var _id = 0;
	
	var _fields = null;
	
	var _widths = null;
	
	var _field_offsets = { };
	
	var _scroll_helper = null; // the div with scroll itself
	
	var _current_row = 0; // the number of the current row
	
	var _onrowchange = function() { };
	
	var _cache = { }; // loading cache
	var _loadingIdx = { }; // a list of loading rows
	var _pendingReq = [ ]; // a list of currently active requests
	
	var _reqSent = 0;
	
	var _searchStr = '';
	var _foundIndex = -1;
	var _needToHighlightElement = false;
	
	
	var _zIndex = null;
	
	var _helperGrid = null; // the helperGrid is a temporary grid for displaying results of filtering
	
	var _interval = null;
	
	/* from start to end, including both */
	
	function _fetchRange(start, end, onloadfunc)
	{
		if(!_backend) throw new Error('Internal error: fetch range called for non-remote dataSource');
		if(typeof(onloadfunc) != 'function') throw new Error('The onload function must be set');
		
		// TODO: remove this limit
		//if(_reqSent++ > 10) return;
		
		//window.console && console.log('fetch from '+start+' to '+end);
		
		if(end < 0) return;
		
		var validStart = Math.max(0, start);
		var validEnd = /* __count < 0 ? */end/* : Math.min(_count-1, end)*/;
		
		if(T.onBeginLoading)
		{
			try
			{
				T.onBeginLoading();
			}catch(exc)
			{
				
			}
		}
		
		var req = new JsHttpRequest();
		
		req.open(null, _backend, true);
		req.loader = 'xml';
		req.caching = false;
		
		req.onreadystatechange = function()
		{
			if(req.readyState != 4) return;
			
			var ans = req.responseJS.res;
			
			if(ans)
			{
				//window.console && console.log('loaded');
				//window.console && console.log(_loadingIdx);
				
				for(var k in ans)
				{
					//if(!_loadingIdx[k] && window.console) console.log('loaded row that was not marked as loading with idx='+k);
				
					//delete _loadingIdx[k];
					_cache[k] = ans[k];
				}
			}
			
			for(var i = validStart; i <= validEnd; i++)
			{
				if(!_cache[i])
				{
					var tmp = {};
					for(var k in _fields) tmp[k] = 'loading failed';
					
					_cache[i] = tmp;
				}
				
				delete _loadingIdx[i];
			}
			
			var deleted = false;
			
			var l = 0;
			
			for(var k in _pendingReq)
			{
				if(_pendingReq[k]) l++;
				
				if(_pendingReq[k] == req)
				{
					delete _pendingReq[k];
					deleted = true;
				}
			}
			
			try
			{
				document.getElementById('loading_queue_length').innerHTML = l-1;
			}catch(e)
			{
				
			}
			
			//if(!deleted && window.console) console.log('Could not delete pending request');
			
			/* the problem with negative count is that these values are reserved by GGGR */
			_count = Math.max(0, parseInt(req.responseJS.count));
			
			//window.console && console.log('new count: '+_count);
			
			/*
			window.console && console.log('cache');
			console.log(_cache);
			window.console && console.log('loading indexes');
			console.log(_loadingIdx);
			*/
			
			onloadfunc(start, end);
			
			if(T.onFinishLoading)
			{
				try
				{
					T.onFinishLoading();
				}catch(exc)
				{

				}
			}
			
			if(T.onDataLoaded)
			{
				try
				{
					T.onDataLoaded(req.responseJS, validStart, validEnd);
				}catch(e)
				{

				}
			}
			
		}
		
		/*
		window.console && console.log('loading indexes');
		window.console && console.log(_loadingIdx);
		*/
		
		for(var i = validStart; i <= validEnd; i++)
		{
			//if(_loadingIdx[i] && window.console) console.log('loading row with idx='+i+' which is already marked as loading');
			
			_loadingIdx[i] = true;
		}
		
		/*
		window.console && console.log(_loadingIdx);
		*/
		
		var tmpData = { };
		for(var k in _remoteData) tmpData[k] = _remoteData[k];
		
		tmpData.start = validStart;
		tmpData.length = validEnd - validStart + 1;
		
		req.send(tmpData);
		
		_pendingReq.push(req);
		
		var l = 0;
		for(var k in _pendingReq)
		{
			if(_pendingReq[k]) l++;
		}
		
		try
		{
			document.getElementById('loading_queue_length').value = l;
		}catch(e)
		{
			
		}
	}
	
	/* dispatch the process of loading the next portion of data, starting with rowIdx */
	
	function _dispatchLoading(rowIdx)
	{
		_fetchRange(rowIdx - _cacheSize / 2, rowIdx + _cacheSize / 2, function() { T.redraw(); });
	}
	
	/* dispatch the process of loading additional data, which should prevent user from seeing
	   "loading" at all, if the user is scrolling not too fast */
	
	function _dispatchLoadingNextPortion(rowIdx)
	{
		if(_count < 100) return;
		
		if(rowIdx - 50 >= 0 && !_loadingIdx[(rowIdx - 50)])
		{
			_dispatchLoading(rowIdx - 50);
		}
		
		if(parseInt(rowIdx) + 50 < _count && !_loadingIdx[(parseInt(rowIdx) + 50)] )
		{
			_dispatchLoading( parseInt(rowIdx) + 50 );
		}
	}
	
	function _calc_field_offsets()
	{
		_field_offsets = { };
		
		var prev_offset = 1;

		var i = 0;

		for(var k in _fields)
		{
			i++;

			var wd = parseInt(_widths[k] || 100) + 1; // account for 1px border
			
			prev_offset += wd;
			
			_field_offsets[k] = i == 1 ? -1000 : prev_offset;
		}
	}
	
	function _colWidth(k)
	{
		return _widths[k] ? _widths[k] - 6 : 94;
	}
	
	var _last_render_widths = null;
	
	function _renderAt(idx)
	{
		var div = document.getElementById(_id+'_scroller');
		if(!div) return;
		
		var pos = idx;//Math.floor(div.scrollTop / VIRTUAL_ROW_HEIGHT);
		
		if( _count > 30000 )
		{
			VIRTUAL_ROW_HEIGHT = Math.floor( REAL_ROW_HEIGHT * 30000 / _count );
		}else
		{
			VIRTUAL_ROW_HEIGHT = 1*REAL_ROW_HEIGHT;
		}
		
		div.scrollTop = pos*VIRTUAL_ROW_HEIGHT; // maintain current row
		
		//window.console && console.log('render at '+idx+' (count = '+_count+')');
		
		var start = (new Date()).getTime();
		
		if(_count == NEED_INITIAL_LOADING)
		{
			//window.console && console.log('NEED INITIAL LOADING');
			
			_count = PERFORMING_INITIAL_LOADING;
			
			_fetchRange( idx - _cacheSize / 2, idx + _cacheSize / 2, function() { T.redraw(idx); } );
			
			return;
		}
		
		if(_count == PERFORMING_INITIAL_LOADING)
		{
			// see previous code: this method will be called again when the initial loading ends
			
			return;
		}
		
		var redraw_header = false;
		
		if(!_last_render_widths) redraw_header = true;
		else
		{
			for(var k in _widths)
			{
				if(_widths[k] != _last_render_widths[k])
				{
					redraw_header = true;
					break;
				}
			}
		}
		
		var code = [ ];
		
		if(redraw_header)
		{
			code.push('<div class="gggr_head"><table cellspacing="0" cellpadding="0" class="gggr_head_table" id="'+_id+'_head"><thead><tr height="'+REAL_ROW_HEIGHT+'">');

			var i = 0;

			var l = 0;
			for(var k in _fields) l++;

			for(var k in _fields)
			{
				code.push('<th width="'+_colWidth(k)+'" class="gggr_cell gggr_th_header ui-widget-header"><div style="width: '+_colWidth(k)+'px;" class="gggr_header"><nobr><a href="" onclick="window.GGGR_INSTANCES[\''+_id+'\'].show_filter_for('+i+', this.parentNode.parentNode); return false;">' + _fields[k] + '</a></nobr></div></th>');

				i++;

				var visible = i != l && i != 1;

				code.push('<th width="1"'+(visible ? '': ' style="visibility:hidden;"')+'><img src="f/ni/filelist-head-delim.png" width="1" height="30" style="background: #afafaf;"></th>');
			}

			code.push('</tr></thead></table></div><div id="'+_id+'_body" class="gggr_body">');
		}
		
		code.push('<table cellspacing="0" cellpadding="0" class="gggr_body_table" onmousedown="try{ return GGGR_INSTANCES[\''+_id+'\'].handleClick(event); }catch(e){ }"><tbody>');
		
		var maxRows = Math.ceil(document.getElementById(_id).offsetHeight / REAL_ROW_HEIGHT);
		
		var res;
		
		var startLoadingIdx = -1;
		
		for(var i = idx; i < idx + maxRows && i < _count; i++)
		{
			if(_loadType == 'local')
			{
				res = _fetch(i);
				if(T.dataSource.transformRow) res = T.dataSource.transformRow(res, i);
				
				if(!res) break;
			}else if(_loadType == 'remote')
			{
				if(_cache[i])
				{
					res = _cache[i];
					
					if(T.dataSource.transformRow) res = T.dataSource.transformRow(res, i);
				}else
				{
					res = null;
					if(startLoadingIdx == -1 && !_loadingIdx[i]) startLoadingIdx = i;
				}
			}
			
			if(i == _foundIndex)
			{
				var replace = new RegExp( '('+preg_quote(_searchStr)+')', 'ig');
				
				for(var k in _fields)
				{
					if(res[k])
					{
						if(res[k].indexOf('<') != -1) // has tags
						{
							// skip preprocessing
							
						}else
						{
							res[k] = res[k].replace(replace, '<span class="gggr_highlight" id="_gggr_highlighted">$1</span>');
						}
					}
				}
			}
			
			var color = null, customColor = false;
			if(T.colorForRow)
			{
				try{ color = T.colorForRow(res, i); if(color) customColor = true; }catch(exc){ }
			}
			
			if(!color && (i%2 == 0 && T.zebraColor))
			{
				color = T.zebraColor;
			}
			
			code.push('<tr height="'+REAL_ROW_HEIGHT+'"'+(color ? ' style="background: '+color+';"' : '')+'>');
			
			if(!res)
			{
				var colspanCnt = 0;
				//var colWd = 1;
				var last_k = null;
				for(var k in _fields)
				{
					colspanCnt++;
					last_k = k;
					//colWd += _colWidth(k) + 3;
				}
				
				code.push('<td colspan="'+colspanCnt+'" width="'+(_field_offsets[last_k]-8 + 1 /*virtual border*/)+'" align="center" class="gggr_cell">&nbsp;</td>');
			}else
			{
				for(var k in _fields)
				{
					code.push('\
					<td width="'+(_colWidth(k)+1)+'" class="gggr_cell" id="gggr_'+i+'"'+(customColor ? 'style="border-bottom: 1px #f9f9f9 solid;"' : '')+'>\
						<div style="width: '+(_colWidth(k)+1)+'px; overflow: hidden;">'+(res[k]===null ? '&nbsp;' : res[k])+'</div>\
					</td>');
				}
			}
			
			code.push('</tr>');
		}
		
		if(startLoadingIdx != -1)
		{
			_dispatchLoading(startLoadingIdx);
		}
		
		//_dispatchLoadingNextPortion(idx);
		
		code.push('</tbody></table>');
		
		var render_start = (new Date()).getTime();
		
		var mainTable;
		
		if(redraw_header)
		{
			code.push('</div>');
			mainTable = document.getElementById(_id);
		}else
		{
			mainTable = document.getElementById(_id+'_body');
		}
		
		try
		{
			//console.log(mainTable);
		}catch(exc)
		{
			
		}
		
		
		
		mainTable.innerHTML = code.join('');
		
		if(_needToHighlightElement)
		{
			var hltd = document.getElementById('_gggr_highlighted');

			if(hltd)
			{
				_needToHighlightElement = false;
			}
		}
		
		
		var end = (new Date()).getTime();
		
		var fps = Math.floor(1000 / ( end - start));
		var render_fps = Math.floor(1000 / ( end - render_start));
		
		try
		{
			document.getElementById('fps').value = fps + ' ('+render_fps+')';
		}catch(e)
		{
			
		}
		
		_last_render_widths = { };
		for(var k in _widths) _last_render_widths[k] = _widths[k];
		
	}
	
	var _removeFilterHelper = function()
	{
		var filt_cont = document.getElementById('_gggr'+_id+'_filter');
		
		if(filt_cont)
		{
			filt_cont.parentNode.removeChild(filt_cont);
			_helperGrid && _helperGrid.destroy();
			_helperGrid = null;
		}
	}
	
	var _setupColumnResizing = function(el)
	{
		var in_redraw = false;
		var redraw_el = false;
		var orig_offset = false;
		var orig_width = false;
		var orig_scrollLeft = false;
		
		
		
		var bound_mousemove_handler = false;
		
		var unbind_handlers;
		
		var in_redraw_mousemove;
		var in_redraw_mouseup;
		
		unbind_handlers = function()
		{
			if(bound_mousemove_handler)
			{
				$(document).unbind('mousemove', in_redraw_mousemove);
				$(document).unbind('mouseup', in_redraw_mouseup);
				bound_mousemove_handler = false;
			}
		}
		
		in_redraw_mousemove = function(e)
		{
			if(!in_redraw)
			{
				unbind_handlers();
				return;
			}
			
			var left = parseInt(e.pageX - parseInt(el.style.left) + (orig_scrollLeft===false ? el.scrollLeft : orig_scrollLeft)); // the trick to maintain persistence when reducing the column width
			
			_widths[redraw_el] = Math.max(10, orig_width + left - orig_offset);
			T.redraw();
		
			// the continue of the trick to achieve position persistence of a column and a cursor
			el.scrollLeft = orig_scrollLeft;
		
			e.preventDefault();
		}
		
		in_redraw_mouseup = function(e)
		{
			unbind_handlers();
			
			orig_scrollLeft = false;
			in_redraw = false;
			el.style.cursor = '';
		}
		
		$(el).bind('mousedown', function(e)
		{
			_removeFilterHelper();
			
			var top = parseInt(e.pageY - parseInt(el.style.top));
			var left = parseInt(e.pageX - parseInt(el.style.left) + el.scrollLeft);
		
			if(top > REAL_ROW_HEIGHT) return true;
		
			e.preventDefault();
		
			//window.console && console.log('mouse down at x: '+left+'; y: '+top);
		
			for(var k in _field_offsets)
			{
				var off = _field_offsets[k];
			
				if( Math.abs(left - off) < 5 )
				{
					in_redraw = true;
					redraw_el = k;
					orig_offset = off;
					orig_width = parseInt(_widths[k]) || 100;
					orig_scrollLeft = el.scrollLeft;
				
					/* actually, existense of ew-resize depends more on the OS than on the browser
					   but, as IE is present only on Windows, we can safely show e-resize in this case
				
					   Other (cross-platform) browsers have no problem displaying ew-resize cursor under Windows
					*/
				
					if(document.all) el.style.cursor = 'e-resize';
					else el.style.cursor = 'ew-resize';
					
					if(!bound_mousemove_handler)
					{
						$(document).bind('mousemove', in_redraw_mousemove);
						$(document).bind('mouseup', in_redraw_mouseup);
						bound_mousemove_handler = true;
					}
					
					break;
				}
			}
		
			if(!in_redraw)
			{
				el.style.cursor = '';
			}
		});
		
		$(el).bind('mousemove', function(e)
		{
			var top = parseInt(e.pageY - parseInt(el.style.top));
			var left = parseInt(e.pageX - parseInt(el.style.left) + (orig_scrollLeft===false ? el.scrollLeft : orig_scrollLeft)); // the trick to maintain persistence when reducing the column width
		
			if(!in_redraw)
			{
				var show_cursor = false;
			
				if(top > REAL_ROW_HEIGHT)
				{
					el.style.cursor = '';
					return true;
				}
			
				e.preventDefault();

				for(var k in _field_offsets)
				{
					var off = _field_offsets[k];

					if( Math.abs(left - off) < 5 )
					{
						show_cursor = true;
						if(document.all) el.style.cursor = 'e-resize';
						else el.style.cursor = 'ew-resize';
						break;
					}
				}

				if(!show_cursor)
				{
					el.style.cursor = '';
				}
			}
		
		});
	
		$(el).bind('dblclick', function(e)
		{
			var top = parseInt(e.pageY - parseInt(el.style.top));
			var left = parseInt(e.pageX - parseInt(el.style.left) + el.scrollLeft);
		
			for(var k in _field_offsets)
			{
				var off = _field_offsets[k];

				if( Math.abs(left - off) < 5 )
				{
					e.preventDefault();
					
					try
					{
						document.selection.empty() ; // IE
					}catch(e)
					{

					}
					
					in_redraw_mouseup(null);
					
					/* fit width of a column */
				
					var render_el = document.createElement('div');
					render_el.style.position = 'absolute';
					render_el.style.visibility = 'hidden';
					render_el.style.top = '0px';
					render_el.style.left = '0px';
				
					document.body.appendChild(render_el);
				
					var pos = _current_row;
				
					var wd = 0;
					
					/* skip data loading when just handling double-click */
					
					if(_loadType == 'local')
					{
						var __fetch = _fetch;
					}else if(_loadType == 'remote')
					{
						var __fetch = function(row)
						{
							if(_cache[row]) return _cache[row];
							
							var res = { };
							
							for(var k in _fields) res[k] = '&nbsp;&nbsp;&nbsp;';
							
							return res;
						}
					}
					
					for(var i = Math.max(0, pos - 50); i < pos + 50 && i < _count && (res = __fetch(i)); i++)
					{
					
						render_el.innerHTML = res[k];
						if(render_el.offsetWidth > wd) wd = render_el.offsetWidth;
					
					}
				
					document.body.removeChild(render_el);
				
					_widths[k] = wd + 10;
					
					
					
					T.redraw();
				
					
				
					return false;
				
					break;
				}
			}
		
			return true;
		});
		
		
	}
	
	var _setupKeydownControls = function(el)
	{
		var scroller = document.getElementById(_id+'_scroller');
		
		var grid_keydown_handler = function(e)
		{
			switch(e.keyCode)
			{
				case 38: // up
					scroller.scrollTop -= VIRTUAL_ROW_HEIGHT;
					break;
				case 40: //down
					scroller.scrollTop += parseInt(VIRTUAL_ROW_HEIGHT);
					break;
				case 37: // left
					el.scrollLeft -= 50;
					break;
				case 39: // right
					el.scrollLeft += 50;
					break;
					
				case 33: // PgUp
					scroller.scrollTop -= 10*VIRTUAL_ROW_HEIGHT;
					break;
				case 34: // PgDown
					scroller.scrollTop += 10*VIRTUAL_ROW_HEIGHT;
					break;
			}
		}
		
		var already_bound = true;
		
		// mozilla auto-repeats keypress event, and other auto-repeat the keydown event
		// I'm really sorry for browser-detect :)
		var ev = $.browser.mozilla ? 'keypress' : 'keydown';
		
		$(document).bind(ev, grid_keydown_handler);
		
		$(el).bind('mouseover', function(e)
		{
			if(!already_bound)
			{
				$(document).bind(ev, grid_keydown_handler);
				already_bound = true;
			}
		});
		
		$(el).bind('mouseout', function(e)
		{
			if(already_bound)
			{
				$(document).unbind(ev, grid_keydown_handler);
				already_bound = false;
			}
		})
	}
	
	function _check_arguments()
	{
		if(!T.container) throw new Error('Container property must be set');
		
		if(!T.dataSource || !T.dataSource.type || T.dataSource.type != 'local' && T.dataSource.type != 'remote' ) throw new Error('dataSource must be set and have type = local or remote');
		
		if(T.fields === { } || typeof(T.fields) != 'object') throw new Error('Fields must be set and be in form of an associative array');
		
		if(T.widths)
		{
			if(typeof(T.widths) != 'object') throw new Error('Widths must be in a form of an associative array');

			_widths = T.widths;
		}else
		{
			_widths = { };
		}
		
		
		
		_container = T.container;
		
		_loadType = T.dataSource.type;
		
		if(_loadType == 'local')
		{
			if(!T.dataSource.fetch) throw new Error('dataSource fetch method not found');
			
			_fetch = T.dataSource.fetch;
			
			if(T.dataSource.count) _count = parseInt(T.dataSource.count());
			else
			{
				for(var i = 0; i < 1000000 && _fetch(i); i++); // a million is just in case user supplied a function that has unlimited rows

				_count = i;
			}
		}
		
		if(_loadType == 'remote')
		{
			if(!T.dataSource.backend) throw new Error('dataSource backend address not found');
			
			_backend = T.dataSource.backend;
			
			//_count = NEED_INITIAL_LOADING;
			
			if(T.dataSource.data)
			{
				if(typeof(T.dataSource.data) != 'object') throw new Error('An associative array must be passed as data');
				
				_remoteData = T.dataSource.data;
			}else
			{
				_remoteData = { };
			}
			
			if(T.dataSource.cacheSize)
			{
				// cannot have cache size less than 50 as it makes absolutely no sense
				_cacheSize = Math.max( 50, parseInt(T.dataSource.cacheSize) );
				if(_cacheSize % 2 == 1) _cacheSize++; // _cacheSize must be dividable by two
			}else
			{
				_cacheSize = 100;
			}
		}
		
		
		
		if(T.onRowChange)
		{
			if(typeof(T.onRowChange) != 'function') throw new Error('onRowChange must be a function');
			
			_onrowchange = T.onRowChange;
		}
		
		
		
		_fields = T.fields;
		
		if(T.zIndex) _zIndex = parseInt(T.zIndex);
	}
	
	T.setup = function()
	{
		_check_arguments();
		
		_id = '_GGGR_'+(++window.GGGR.id);
		
		window.GGGR_INSTANCES[_id] = T;
		
		_calc_field_offsets();
		
		var code = [];
		
		try
		{
			//console.log(_container);
		}catch(e)
		{
			
		}
		
		code.push('<div style="height: '+(_container.offsetHeight || 450)+'px; width: '+(_container.offsetWidth || 450)+'px; overflow: auto;" id="'+_id+'_scroller"><div id="'+_id+'_scroll_helper" style="height: '+((_count-1)*VIRTUAL_ROW_HEIGHT + _container.offsetHeight)+'px;">&nbsp;</div></div>');
		
		_container.innerHTML = code.join('');
		
		_scroll_helper = document.getElementById(_id+'_scroll_helper');
		var div = document.getElementById(_id+'_scroller');
		if(_zIndex) div.style.zIndex = _zIndex;
		
		//var curr_row = document.getElementById('current_row');
		
		var el = document.createElement('div');
		el.className = 'GGGR';
		
		if(_zIndex) el.style.zIndex = _zIndex;
		
		el.style.height = (_container.offsetHeight) + 'px';
		el.style.width  = (_container.offsetWidth-16 /* vertical scroll */)  + 'px';
		
		el.id = _id;
		
		var coords = $(_container).offset();
		
		el.style.position = 'absolute';
		el.style.left = coords.left + 'px';
		el.style.top  = coords.top + 'px';
		
		if(el.addEventListener)
		{
			/* Mozilla-only */
			
			el.addEventListener('DOMMouseScroll', function(e)
			{
				var axis = 'vertical';
				if(e.axis && e.axis == e.HORIZONTAL_AXIS)
				{
					axis = 'horizontal';
				}
				
				if(axis == 'vertical')
				{
					var dy = e.detail/3;

					var sign = dy < 0 ? -1 : 1;

					dy = sign*Math.ceil( Math.abs(dy) ) * VIRTUAL_ROW_HEIGHT;

					div.scrollTop += dy;

					e.preventDefault();
				}
				
				return false;
				
			}, false);
			
		}
		
		/* Other browsers */
		
		$(el).bind('mousewheel', function(e)
		{
			var oe = e.originalEvent;
			
			//window.console && console.log(e);

			var dy = (typeof(oe.wheelDeltaY) != 'undefined' ? oe.wheelDeltaY : e.wheelDelta) / 120;
			var sign = dy < 0 ? -1 : 1;

			dy = sign*Math.ceil( Math.abs(dy) ) * VIRTUAL_ROW_HEIGHT;

			div.scrollTop -= dy;
			
			if(oe.wheelDeltaX) return;// el.scrollLeft -= oe.wheelDeltaX;
			
			e.preventDefault();
			return false;
		});
		
		
		
		_setupColumnResizing(el);
		_setupKeydownControls(el);
		
		
		document.body.appendChild(el);
		
		//console.log( code.join('') );
		
		
		
		_renderAt(0);
		
		
		
		var __last_pos = 0;
		
		_interval = setInterval(function()
		{
			var delta = div.scrollTop - __last_pos;

			div.scrollTop = Math.floor(div.scrollTop / VIRTUAL_ROW_HEIGHT) * VIRTUAL_ROW_HEIGHT;
			
			var pos = Math.floor(div.scrollTop / VIRTUAL_ROW_HEIGHT);
			
			//curr_row.innerHTML = pos;
			
			_onrowchange(pos);
			
			__last_pos = div.scrollTop;
			
			if(delta != 0)
			{
				_renderAt(pos);
			}
			
			_current_row = pos;
			
		}, T.updateInterval || 100);
		
		T['setup'] = function()
		{
			throw new Error('The grid has been already set up. To change grid parameters, just change instance parameters and then call redraw() method. If you change dataSource.backend, also call abort() method before redraw().');
		};
	};
	
	T.destroy = function()
	{
		delete window.GGGR_INSTANCES[_id];
		
		var scroller = document.getElementById(_id+'_scroller');
		var el = document.getElementById(_id);
		
		scroller && scroller.parentNode.removeChild(scroller);
		el && el.parentNode.removeChild(el);
		
		_interval && clearInterval(_interval);
	}
	
	T.redraw = function(pos)
	{
		_check_arguments();
		_calc_field_offsets();
		
		//if(_count < 0 && pos > 0) // it's remote loading
		//{
		//	_count = pos+1; // temporary count value to allow scrolling
		//}
		
		if(_count >= 0)
		{
			if(pos && pos >= _count) pos = _count-1;
			if(pos && pos < 0)       pos = 0;
		}
		
		if( _count > 30000 )
		{
			VIRTUAL_ROW_HEIGHT = Math.max(1, Math.floor( REAL_ROW_HEIGHT * 30000 / _count ));
		}else
		{
			VIRTUAL_ROW_HEIGHT = 1*REAL_ROW_HEIGHT;
		}
		
		_scroll_helper.style.height = ((_count-1)*VIRTUAL_ROW_HEIGHT + _container.offsetHeight) + 'px';
		
		var div = document.getElementById(_id+'_scroller');
		if(typeof(pos) == "undefined") pos = Math.floor(div.scrollTop / VIRTUAL_ROW_HEIGHT);
		else div.scrollTop = pos*VIRTUAL_ROW_HEIGHT;
		
		_renderAt(pos);
	};
	
	T.abort = function()
	{
		for(var k in _pendingReq)
		{
			try
			{
				_pendingReq[k].abort();
			}catch(e)
			{
				//window.console && console.log('Could not abort request at '+k+' because '+e);
			}
		}
		
		_pendingReq = [ ];
		_cache = { };
		_loadingIdx = { };
		
		_count = NEED_INITIAL_LOADING;
	}
	
	T.resize = function(width, height, left, top) // left and top are not mandatory
	{
		var el = document.getElementById(_id);
		var scroller = document.getElementById(_id+'_scroller');
		
		el.style.width = (width-16 /* vscroll */)+'px';
		el.style.height = height+'px';
		
		if(left !== null) el.style.left = left+'px';
		if(top !== null) el.style.top = top+'px';
		
		scroller.style.width = width+'px';
		scroller.style.height = height+'px';
		
		if(left !== null) T.container.style.left = left+'px';
		if(top !== null) T.container.style.top = top+'px';
		
		T.redraw();
	}
	
	T.search = function(text, direction, change_status_func)
	{
		if(!_fetch) return false;
		if(!change_status_func) change_status_func = function(){  }
		
		if(!text.length)
		{
			_foundIndex = -1;
			change_status_func( -1 );
			
			
			T.redraw();
			return;
		}
		
		_searchStr = ''+text;
		
		text = text.toLowerCase();
		
		var inc = 1;
		if(direction == 'previous') inc = -1;
		
		_removeFilterHelper();
		
		for(var i = _current_row == 0 && inc>0 && _foundIndex!=0 ? 0 : _current_row+inc; i >= 0 && i < _count; i += inc)
		{
			var res = _fetch(i);
			
			for(var k in _fields)
			{
				if(res[k] && res[k].toLowerCase().indexOf(text) != -1)
				{
					_current_row = i;
					
					var div = document.getElementById(_id+'_scroller');
					div.scrollTop = i * VIRTUAL_ROW_HEIGHT;
					
					_foundIndex = i;
					
					change_status_func( -1 );
					
					_needToHighlightElement = true;
					
					_renderAt(i);
					
					return;
				}
			}
			
			if(i % 200 == 0) change_status_func( i );
		}
		
		alert('Not found');
		
		change_status_func( -1 );
	}
	
	/* filter just replaces _fetch and _count with values for filtered results */
	var _orig_fetch = false;
	var _orig_count_func = false;
	
	T.filter = function(text, change_status_func)
	{
		if(!_fetch) return false;
		if(!change_status_func) change_status_func = function(){  }
		
		_removeFilterHelper();
		
		
		if(!_orig_fetch)
		{
			_orig_fetch = T.dataSource.fetch;
			_orig_count_func = T.dataSource.count;
		}else if(_orig_fetch && !text.length)
		{
			T.dataSource.fetch = _orig_fetch;
			T.dataSource.count = _orig_count_func;
		}
		
		if(text)
		{
			var filtered_indexes = [ ];
			var count = _orig_count_func();
			
			var field = null;
			
			for(var k in _fields)
			{
				if(text.substring(0, k.length+1) == k+'=' )
				{
					field = k;
					text = text.substring(k.length+1);
					
					break;
				}
			}
			
			if(field)
			{
				for(var i = 0; i < count; i++)
				{
					var res = _orig_fetch(i);
					
					if(res[field] == text)
					{
						filtered_indexes.push(i);
					}
					
					if(i % 200 == 0) change_status_func( i );
				}
				
			}else
			{
				text = text.toLowerCase();
				
				for(var i = 0; i < count; i++)
				{
					var res = _orig_fetch(i);

					for(var k in _fields)
					{
						if(res[k] && res[k].toLowerCase().indexOf(text) != -1)
						{
							filtered_indexes.push(i);
							break;
						}
					}

					if(i % 200 == 0) change_status_func( i );
				}
			}
			
			
			
			//console.log(filtered_indexes);
			
			T.dataSource.fetch = function(rowIdx)
			{
				return _orig_fetch( filtered_indexes[rowIdx] );
			}
			
			T.dataSource.count = function()
			{
				return filtered_indexes.length;
			}
		}
		
		T.redraw(0);
		change_status_func(-1);
	}
	
	T.show_filter_for = function(field_idx, obj)
	{
		if(!_fetch) return;
		
		var i = 0;
		
		var field = '';
		
		for(var k in _fields)
		{
			if(i == field_idx)
			{
				field = k;
				break;
			}
			
			i++;
		}
		
		var coords = $(obj).offset();
		
		var div = document.createElement('div');
		
		div.className = 'gggr_filter';
		div.id = '_gggr'+_id+'_filter';
		
		var wd = parseInt(_widths[field] || 200) + 30;
		var right = parseInt(coords.left) + wd;
		
		var left = coords.left;
		
		var window_width = $(window).width();
		
		if(right - 50 > window_width)
		{
			div.style.left = (window_width - wd - 25)+'px';
		}else
		{
			div.style.left = left+'px';
		}
		
		div.style.top = (coords.top + obj.offsetHeight)+'px';
		
		
		
		
		div.style.width = wd + 'px';
		
		document.body.appendChild(div);
		
		$(div).bind('click', function(e)
		{
			e.stopPropagation();
		});
		
		div.innerHTML = '<b>Filter for '+_fields[k]+'</b><div id="_gggr'+_id+'_filter_contents" class="gggr_filter_content"><div class="gggr_loading">loading...</div></div>';
		
		// force browser to draw "loading"
		
		setTimeout(function()
		{
			var unique_values = { };
			
			var fetch = _fetch;
			if(_orig_fetch) fetch = _orig_fetch;
			
			var count = _count;
			if(_orig_count_func) count = _orig_count_func();
			
			for(var i = 0; i < count && (res = fetch(i)); i++)
			{
				unique_values[res[field]] = true;
			}
			
			var unique_list = [ ];
			for(var k in unique_values) unique_list.push(k);
			
			unique_list.sort();
			
			unique_values = null;
			
			
			
			var el = document.getElementById('_gggr'+_id+'_filter_contents');
			
			el.innerHTML = '<div style="height: 400px;"></div>';
			
			var grid = new GGGR();
			
			grid.container = el;
			grid.dataSource = {
				type: 'local',
				
				fetch: function(idx)
				{
					var val = unique_list[idx];
					if(!val.length) val = '&lt;<i>empty</i>&gt;';
					
					return { value:
						'<a href="" onclick="try{ GGGR_INSTANCES[\''+_id+'\'].applyFilter('+field_idx+','+(
							unique_list[idx].length ? 'unescape(\''+escape(unique_list[idx])+'\')' : '\'\''
						)+');}catch(e){ try{console.log(e);}catch(exc){} } return false;">'+val+'</a>'
					};
				},
				
				count: function() { return unique_list.length; }
			};
			
			grid.fields = { value: '' };
			grid.widths = { value: wd-20 };
			
			grid.zIndex = 9999;
			
			grid.setup();
			
			_helperGrid = grid;
			
		}, 100);
	}
	
	T.applyFilter = function(field_idx, text, statusfunc)
	{
		var i = 0;
		
		var field = '';
		
		for(var k in _fields)
		{
			if(i == field_idx)
			{
				field = k;
				break;
			}
			
			i++;
		}
		
		var filt_el = document.getElementById('filter_text');
		
		text = k+'='+text;
		
		if(!filt_el)
		{
			T.filter(text, statusfunc);
		}else
		{
			filt_el.value = text;
			perform_filter();
		}
	}
	
	T.handleClick = function(e)
	{
		var targ = e.target || e.srcElement;
		if(!targ) return true;
		
		var par = targ, tagName, row, i;
		
		while(par && par.tagName.toLowerCase() != 'body')
		{
			tagName = par.tagName.toLowerCase();
			
			if(tagName == 'td' && par.className == 'gggr_cell')
			{
				try
				{
					i = parseInt(par.id.substring(5)); // gggr_N
					T.onRowClick( T.getRow(i), i, e );
				}catch(e)
				{
					
				}
				
				break;
			}
			
			par = par.parentNode;
			
		}
	}
	
	T.getRow = function(idx)
	{
		var row;
		if(_loadType == 'local') row = _fetch(idx);
		else                     row = _cache[idx];
		
		return row;
	}
};

window.GGGR.id = 0;
window.GGGR_INSTANCES = {  };

function preg_quote (str) {
    // Quote regular expression characters plus an optional character  
    // 
    // version: 1006.1915
    // discuss at: http://phpjs.org/functions/preg_quote    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

	return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, '\\$1');
}