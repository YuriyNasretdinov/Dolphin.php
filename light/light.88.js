function get_width()
{
	if(document.body.offsetWidth) return document.body.offsetWidth;
  	else if(window.innerWidth) return window.innerWidth;
  	else return false;
}

//var el=document.getElementById('main_div');
//var check = function(){ if(get_width()>800) el.style.width = '800px'; else el.style.width='100%'; };
//check();
//setInterval(check,100);

function del(el)
{
	var what=confirm('Are you sure you want to delete this?');
	if(!what) return false;
	
	el.href+='&confirm=true';
	return true;
}

function validate_act()
{
	if(document.getElementById && document.getElementById('act_choice').value=='delete') return confirm('Are you sure you want delete all this files and folders?');
	return true;
}

// the function selects the file

function c_sel(cbox /* checkbox */)
{
	if(!document.getElementById) return false;
	var id = cbox.id.substr(1);
	var tr = document.getElementById('t' + id);
	
	if(cbox.checked) tr.style.background="#ffffcc";
	else tr.style.background="#e8eef7";
	return true;
}

// the function highlights the file ( state - 'h' or '')

function high(tr,e)
{
	if(!document.getElementById) return false;
	var id = tr.id.substr(1);
	var cbox = document.getElementById('c' + id);
	
	if(!cbox.checked && e.type && e.type=='mouseover') tr.style.background="#eff3f9";
	else if(!cbox.checked && e.type && e.type=='mouseout') tr.style.background="#e8eef7";
	return true;
}

// function checks the required checkbox

function chk(tr,e)
{
	if(!document.getElementById) return false;
	var id = tr.id.substr(1);
	var cbox = document.getElementById('c' + id);
	var t = e.target || e.srcElement; // target in Mozilla, srcElement - in IE
	
	if(t && t.nodeName)
	{
		var n = t.nodeName.toLowerCase();
		var n2 = t.parentNode.nodeName.toLowerCase();
		if(n=='a' || n2=='a' || n=='input') return false;
	}
	
	
	if(false)
	{
		var tmp = '';
		for(k in e)
		{
			tmp += k + ' = ' + e[k] + '<br>';
		}
		document.getElementById('debug').innerHTML=tmp;
	}
	cbox.checked = !cbox.checked;
	c_sel(cbox);
	
	return true;
}

// function selects or deselects all files

function select_all(box)
{
	var cbox;
	if(!document.getElementById) return false;
	for(var i=1; cbox=document.getElementById('c'+i); i++)
	{
		cbox.checked=box.checked;
		c_sel(cbox);
	}
	
	return true;
}