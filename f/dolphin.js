/* this file should be included last */

function $set(id, content)
{
	return document.getElementById(id).innerHTML = content;
}

/* code taken from http://www.fpublisher.ru/cms_fpublisher/javascript_develop/new571 */

function htmlspecialchars(str)
{
	if(!str) return str;
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}


var DolphinClass = function(){
	var T = this;
	var req = false;
	
	T.abort = function()
	{
		req.abort();
		E.cancel_draw();
		I.show_loading(false);
		
		try{ R.GRID.abort(); }catch(exc) { }
	};
	
	/* something like JsHttpRequest.query() - AJAX data loader */
	/* it differs from JsHttpRequest.query() - it also shows "loading...", and does not cache anything by default */
	T.qr = function(addr, data, onreadyfunc, nocache, text)
	{
		var undef;
		
		if(typeof(nocache) == typeof(undef)) nocache = true;
		
		var display_loading = (addr != 'index.php?act=info');
		
		if(display_loading) I.show_loading(true, text);
		E.cancel_draw(); /* this is required for many reasons */
		
		var beg = (new Date()).getTime();
		
		var r = new JsHttpRequest();
		
		req = r;
		
		r.onerror = function(msg)
		{
			I.show_loading(false,text);
			
			if(r.aborted) return;
			
			if(msg.length > 100) msg = msg.substr(0, 100) + '...';
			
			if(r.status)
			{
				switch(r.status)
				{
				case 500:
					msg = 'Internal server error';
					break;
				case 503:
				case 502:
					msg = 'The server is temporarily busy';
					break;
				case 404:
					alert('AJAX request failed because of 404 error (Not Found). Please ensure, that SNAME is installed properly.');
					return false;
				case 403:
					alert('AJAX request failed because of 403 error (Permission denied). Please ensure, that you have set correct rights to PHP files.');
					return false;
				}
			}
			
			if(confirm('AJAX subrequest failed.\nThe technical reason: ' + msg + '\n\nDo you want to send that request again?')) T.qr(addr, data, onreadyfunc, nocache);
		}
		
		r.onreadystatechange = function()
		{
			if(r.readyState==4)
			{
				var time = Math.round(((new Date()).getTime() - beg)*1000)/1000000;
				
				if(display_loading) I.show_loading(false,text);
				
				if(r.responseText != '--error-login-required')
				{
					try{
						onreadyfunc(r.responseJS, r.aborted ? 'action aborted' : r.responseText);
					}catch(e){}
				}else
				{
					if(confirm('Session has expired, relogin required.\nDo you want to relogin now?'))
						T.qr('index.php', {login: prompt('login:'), pass: prompt('password:'), 'DIR': Engine.address}, function(res, err){
							T.qr(addr, data, onreadyfunc, nocache);
						});
				}
				
				//var total = Math.round(((new Date()).getTime() - beg)*1000)/1000000;
				//I.dbg('http+php: '+time+' sec, http+php+js+html: '+total+' sec');
			}
		}
		
		r.caching = !nocache;
		
		r.open(null/*addr.substring(0,4) == 'http' ? 'GET' : 'POST'*/,addr,true);
		
		r.send(data);
	}
	
	T.init = function()
	{
		//setTimeout(function(){
		
		if(document.getElementById('load_screen')) document.body.removeChild(document.getElementById('load_screen'));
		
		//I.generate_panel();
		T.resize(true)
		
		if(window.interv)
		{
			clearInterval(window.interv);
			window.interv = null;
		}
		
		//}, 5000);
		
		//document.getElementById('loading').style.visibility='hidden';
		//document.getElementById('very_main').style.visibility='visible';
		
		//I.change_address();
		
		// init Drag'n'Drop Interface
		
		/*__DDI__.setPlugin('dragStateAsCursor');
	    __DDI__.setPlugin('draggedElementTip');
	    __DDI__.setPlugin('fixNoMouseSelect');
	    __DDI__.setPlugin('lockCursorAsDefault');
	    __DDI__.setPlugin('fixDragInMz');
	    __DDI__.setPlugin('resizeIT');
	    __DDI__.setPlugin('moveIT');*/
	}
	
	T.resize = function()
	{
		I.resize();
	}
	
	var _pingpong_failed = false;
	
	T.pingpong = function()
	{	
		T.qr('index.php?act=ping', 'ping', function(res,err)
		{
			/* prevent from multiple alerts */
			if(res!='pong' && !_pingpong_failed)
			{
				alert('PING-PONG request to server failed. Please check your internet connection.');
				_pingpong_failed = true;
			}else if(res=='pong')
			{
				_pingpong_failed = false;
			}
		}, true, 'server ping');
	}
	
	var _res = []; // the result of querying
	var _status = []; /* global status */
	var _menu = {}; // the global menu cache
	var _up = false;
	
	T.ggr = function(){ return _res; }
	T.ggm = function(){ return _menu; }
	T.ggs = function(){ return _status; }
	T.cgu = function(){ return _up!=false; }
	
	var _lasterr = false; /* for go2() */
	
	var _addr_el;
	
	T.go2 = function(where, nohistory)
	{
		if(!_addr_el)   _addr_el = document.getElementById('address');
		//_addr_el.value = where;
		
		var _fsearch_el = document.getElementById('fsearch');
		
		if(_fsearch_el) _fsearch_el.value = '';
		
		R.df(where, nohistory);
	}
	
	var last_filter_value = '';
	
	T.apply_filter = function()
	{
		var _fsearch_el = document.getElementById('fsearch');
		
		if(last_filter_value != _fsearch_el.value)
		{
			R.df(_addr_el.value);
			
			last_filter_value = _fsearch_el.value;
		}
		
		
	}
	
	T.onFileListLoaded = function(res, err)
	{
		if(res && res['res'] && !res['error'])
		{
			var nohistory = ( _addr_el.value == res['DIR'] );
			
			if(!nohistory) E.add_to_history(res['DIR']);
			
			//_res = res['res']; // create a var with all the types of objects
			_up = res['up'];
			_menu = {0: 'fsearch', 1: 'common',2: res['info'] };
			
			//console.log(res);
			
			_addr_el.value = E.address = res['DIR'];

			document.title = E.basename(res['DIR']) + ' / ' + window.init_title;
			
			//R.df();
			
			R.redraw_menu();
			
			I.change_path(res['DIR'],res['dir'],res['type']);
			I.change_status(_status = [['Total items',E.format_number(res['count'])], ['Prepare time',res.stats.seconds+' sec']]);
			I.disable_buttons();
			
			
			//var search_el = document.getElementById('fsearch');
			//if(search_el && search_el.focus) search_el.focus();
			
			//alert(res['DIR']);
			
			_lasterr = false;
			if(err) alert(err);
		}else if(!_lasterr) /* prevent from infitite asking */
		{
			_lasterr = true;
			alert('Could not change directory ' + res['reason']);
			if(err) alert(err);
			if(!res['stop']) T.go2(res['dir'],true);
		}
	}
	
	T.cs = T.change_sort = function(sort)
	{
		E.sort = sort;
		E.F5();
	}
	
	T.co = T.change_order = function(order)
	{
		E.order = order;
		E.F5();
	}
	
	T.cf = T.change_fast = function()
	{
		E.fast = !E.fast;
		E.F5();
	}
	
	var _getting_list = false;
	
	T.pu = T.perform_update = function()
	{
		if(!confirm('Check for newer version?')) return;
		
		D.qr('MASTER_SITE'+'build-info/', {}, function(res,err)
		{
			if(!res) alert('Could not contact MASTER_SITE.');
			else if(res == FVER) alert('No new version available');
			else if(res < FVER) alert('You have a newer version, than on a server :).');
			else if(confirm('New version ('+res+' build) is available.\nInstall it?'))
			{
				E.run_update();
			}
		}, true, 'contacting MASTER_SITE');
	};
	
	T.ou = T.open_uploads = function()
	{
		I.window_open('f/swfupload/', 'uploads', 450, 350);
	}
};

window.Dolphin = (window.D = new DolphinClass());