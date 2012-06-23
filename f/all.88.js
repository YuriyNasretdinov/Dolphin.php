/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);


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

	var _fileinfo = {
		// name: { size: ..., type: ..., modified: ... }
	};
	var _pending_files = {/* name: true */};
	var _in_progress = false;
	T.filelist = [];
	
	T.df = T.draw_files = function(address, nohistory)
	{	
		if(!grid_setup)
		{
			T.GRID = new GGGR();
			var g = T.GRID;
			
			g.container = document.getElementById('content');
			g.dataSource = {
				type: 'local',
				fetch: function(i) {
					var name = T.filelist[i];
					var info = _fileinfo[name];
					if (!info) {
						_pending_files[name] = true;
						info = {};
					}

					return {
						name: name,
						nameNew: htmlspecialchars(name),
						modified: info.modified || '',
						size: info.size || '',
						icon: info.type == 'dir' ? '<img src="f/iconz/16-folder.png" width=16 height=16 />' : T.file_icon(name),
						type: info.type
					};
				},
				count: function() {
					return Math.max(0, Math.min(500000, T.filelist.length - 1)); // last element is always empty
				}
			}
			g.onDataLoaded = function(req)
			{
				if(!grid_setup)
				{
					E.add_to_history(req['DIR']);
				}
				grid_setup = true;
				_fileinfo = req.fileinfo;
				T.filelist = req.res.split('/')
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
				modified: '</a>Modified<a>',
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
			
			D.qr('?act=filelist', {DIR: address}, g.onDataLoaded);
			setInterval(function() {
				if (_in_progress) return;
				var pending = [];
				for(var k in _pending_files) pending.push(k);
				if (pending.length) {
					_in_progress = true;
					D.qr('?act=files-info', {files: pending}, function(res) {
						_in_progress = false;

						for (var k in res.info) {
							_fileinfo[k] = res.info[k];
						}

						for (var i = 0; i < pending.length; i++) {
							var name = pending[i];
							delete _pending_files[name];
							if (!_fileinfo[name]) _fileinfo[name] = {};
						}
						T.GRID.redraw();
					});
				}
			}, 500);
			
		}else
		{
			var filt = document.getElementById('fsearch');
			if(!filt) filt = '';
			else filt = filt.value;
			// T.GRID.dataSource.data.filter = filt == L._search_str_default ? null : filt;
			
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
			
			T.filelist = [];
			_pending_files = {};
			_fileinfo = {};
			_in_progress = false;
			D.abort();
			D.qr('?act=filelist', {DIR: address}, T.GRID.onDataLoaded);
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
		//if(_items[item]['type']!=1&&_items[item]['type']!=0) return draw_menu_for_item_callback(item);
		
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
		
		//if(i['type']==1||i['type']==0) 
		//{
			T.cancel_draw();
			
			var dr = function(info){
				//if(i['type']==0) info['size']=i['size'];
				var type = (info['dir'] ? 0 : 1);
				L.draw({0: {name: 'operations', type: type},1: info });
				
				var status = [['Type',info['type']],['Size',info['size']]];
				
				if(type == 0)
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
		/*else if(i['type']==0)
		{
			L.draw({0: 'operations',1: {name: 'details', filename: i['name'], dir: true, size: i['size']}});
		}*///else if(i['type']==2)
		//{	
		//	L.draw({0: 'common', 1: { name: 'details', filename: i['name'], dir: false, type: i['descr'], free: i['free'], total: i['total'], fs: i['fs'] }});
		//}
	}
	
	T.di = T.delete_item = T.dis = T.delete_items = function()
	{
		var items = R.get_selected_items();
		
		
		/*for(var i=0; i<items.length; i++)
		{
			if(items[i]['type']!=0 && items[i]['type']!=1) return; // you can only delete files and folders
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
		//if(i['type']!=0 && i['type']!=1) return; // you can only rename files and folders
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
		D.qr('index.php?act=download_get_href',{file: i, type: 1},function(res,err)
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
		
		D.qr('index.php?act=info', {file: filename, type: 1}, function(res,err)
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
				if(confirm('Auto-update failed.\nDo you want to use advanced way to update Dolphin.php (version will be changed to light)?')) window.location='index.php?version=light&DIR=.&act=download-new';
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


var LeftMenuClass = function()
{
	var T = this;
	var names = {}; // the names of menus { id: name, ... }
	var hidden = {}; // the names of hidden elements { 'name': name, ... }
	
	var add_link; /* protected functions */
	
	// generates left menu with the specified parameters:
	// params = { id1: 'what to draw1', id2: 'what to draw2', ... }
	// 'what to drawN' = 'common' || 'additional' || 'operations' || 'long text'
	
	T.draw = function(params)
	{
		var i=0;
		var tmp='',header='',body='',up='',visible='';
		names = {};
		
		
		tmp += '<div class="left_menu_div">';
		
		//alert('called');
		
		for(var k in params)
		{
			i++;
			
			if(!params[k]['name']) params[k]={name: params[k]};
			
			names[i]=params[k]['name'];
			
			var p = params[k];
			
			switch(p['name'])
			{
			default:
			case 'common':
				header='Common';
				body='';
				if(E.copied)
				{
					body+=add_link("javascript:E.paste_items();",'Paste items here','paste','Paste');
					/*if(E.op=='copy') body+=add_link("javascript:E.advanced_paste();",'Paste items in several steps','paste','Paste <i>big files, experimental</i>');*/
					body+=add_link("javascript:E.cancel_copy();",'Cancel '+E.op,'cancel','Cancel '+E.op);
				}
				body+=add_link("javascript:E.mkfile();",'Create a file','mkdir','Create a file');
				body+=add_link("javascript:E.mkdir();",'Create a folder','mkdir','Create a directory');
				//body+=add_link("javascript:E.open_terminal();",'Open terminal window to execute shell commands','rename','Open terminal');
				/* TODO: make a better uploads */
				//body+=add_link("javascript:I.show_upload();",'Upload files','upload','Upload files');
				//body+='<form enctype="multipart/form-data" style="display:none; margin: 0px; padding: 0px;" id="upload_form"><div id="uploads_container"></div><div align="right" style="padding-bottom: 3px;"><a href="javascript:I._append_upload();" style="text-decoration: underline;">add more files...</a></div><button type="button" style="font-size: 10px;" onclick="E.upload_files();return false;"><b>upload'+(upload_max_filesize?' ('+upload_max_filesize+' max)':'')+'</b></button></form>';
				break;
			case 'fsearch':
				continue;
				header='Filename filter';
				T._search_str_default = 'Enter part of filename...';
				if(!T._search_str) T._search_str = T._search_str_default; // the search string
				body='<input type=text name="fsearch" id="fsearch" class="fsearch_g" onkeyup="/*setTimeout is to prevent IE crash =) */if(window.search_timeout) clearTimeout(window.search_timeout); window.search_timeout = setTimeout(function(){ L._search_str=document.getElementById(\'fsearch\').value;D.apply_filter();}, event.keyCode == 13 ? 0 : 500);" onfocus="if(this.value==\''+T._search_str_default+'\') this.value=\'\';this.className=\'fsearch\'" onblur="this.className=\'fsearch_g\';if(this.value==\'\') this.value=\''+T._search_str_default+'\';" value="'+T._search_str+'">';
				break;
			case 'operations': // all items are taken from the main frame
				var s /* selected */ = R.gsi();
				
				
				
				header='Common operations';
				
				if(s.length == 1)
				{
					s = s[0];
					
					if(p['type'] == 1)
					{
						body = add_link("javascript:E.rename_item();",'Set another name to current file','rename','Rename file');
						body += add_link("javascript:E.cut_item();",'Move file to another place','cut','Cut file');
						
						body += add_link("javascript:E.copy_item();",'Make a copy of file','copy','Copy file');
						
						body += add_link("javascript:E.download_file();",'Download the selected file to your computer','upload','Download file');
						
						body += add_link("javascript:E.delete_item();",'Remove the file from computer','delete','Delete file');
						if(E.get_extension(s) == 'zip')
						{
							body += add_link("javascript:E.unzip_item(&quot;extract_here&quot;);",'Extract contents here','zip','Extract here');
							var lon = E.basename(s);
							lon = lon.substr(0, lon.length-4);
							var shor = lon.length>12 ? lon.substr(0,9) + '...' : lon;
							
							body += add_link("javascript:E.unzip_item(&quot;extract&quot;);",'Extract to &quot;'+lon+'/&quot;','zip','Extract to &quot;' + shor + '/&quot;');
						}else
						{
							body += add_link("javascript:E.zip_item();",'Add file to zip','zip','Add to zip');
						}
						
						//alert(p['type']);
						
						body += add_link("javascript:E.show_properties();",'Show file properties','admin','Show Properties');
					}else
					{
						body = add_link("javascript:E.rename_item();",'Set another name to current directory','rename','Rename folder');
						body += add_link("javascript:E.cut_item();",'Move directory to another place','cut','Cut folder');
						
						body += add_link("javascript:E.copy_item();",'Make a copy of directory','copy','Copy folder');
						
						body += add_link("javascript:E.delete_item();",'Remove the directory from computer','delete','Delete folder');
						body += add_link("javascript:E.zip_item();",'Add directory to zip','zip','Add to zip');
						
						body += add_link("javascript:E.show_properties();",'Show directory properties','admin','Show Properties');
					}
				}else
				{
					body += add_link("javascript:E.cut_items();",'Move items to another place','cut','Cut items');
					
					body += add_link("javascript:E.copy_items();",'Make copy of items','copy','Copy items');
					
					/*body += add_link("javascript:E.download_files();",'Download the selected items to your computer','upload','Download file');*/
					
					body += add_link("javascript:E.delete_items();",'Remove the items from computer','delete','Delete items');
					/*if(E.get_extension(s['fullpath']) == 'zip')
					{
						body += add_link("javascript:E.unzip_item(&quot;extract_here&quot;);",'Extract contents here','zip','Extract here');
						var lon = E.basename(s['fullpath']);
						var lon = lon.substr(0, lon.length-4);
						shor = lon.length>12 ? lon.substr(0,9) + '...' : lon;
						
						body += add_link("javascript:E.unzip_item(&quot;extract&quot;);",'Extract to &quot;'+lon+'/&quot;','zip','Extract to &quot;' + shor + '/&quot;');
					}else
					{
						
					}
					*/
					
					body += add_link("javascript:E.zip_items();",'Add items to zip','zip','Add to zip');
					
					body += add_link("javascript:E.show_properties();",'Show properties of items','admin','Show Properties');
				}
				break;
			case 'details': // params: { filename, dir, type, changed, size, thumb }
				header='Details';
				
				if(p['thumb']) body=p['thumb'];
				else body='';
				
				body+='<b style="'+( /*document.all && !window.opera /* stupid IE doesn't understand, what does the overflow of element without width mean */ true ? 'width: 200px;' : '')+'overflow: hidden; display: block;">'+p['filename']+'</b>';
				
				if(p['dir']) p['type'] = 'Directory';
				
				if(p['type']) body+=p['type'] + '<br><br>';
				else body += '<br>';
				
				if(p['selnum']) body+=p['selnum'] + ' items<br><br>';
				
				if(p['id3']) body+=p['id3']+ '<br><br>';
				
				if(p['fs']) body+='Filesystem: ' + p['fs'] + '<br><br>';
				if(p['free']) body+='Free disk space: ' + p['free']+ '<br><br>';
				if(p['total']) body+='Total disk space: ' + p['total']+ '<br><br>';				
				
				if(p['changed']) body+='Changed: '+p['changed']+ '<br><br>';
				if(p['owner']) body+='Owner: '+p['owner']+'<br><br>';
				if(p['group']) body+='Group: '+p['group']+'<br><br>';
				if(p['rights']) body+='Rights: '+p['rights']+'<br><br>';
				if(p['link'])
				{
					body+='Links to: <a href="" onclick="E.go2(unescape(&quot;'+escape(p['link_raw'])+'&quot;)); return false;" title="'+p['link']+'">'+p['link']+'</a><br><br>';
				}
				
				if(p['size']) body+='Size: <span id="_dirsize">'+p['size']+ '</span><br><br>';
				else if(p['dir']) body+='Size: <span id="_dirsize"><a href="javascript:E.show_dir_size(false);" style="text-decoration: underline;">click to show size</a></span>'+ '<br><br>';
				
				body = body.substr(0,body.length-4);
				if(body.substr(body.length,body.length-4) == '<br>') body = body.substr(0,body.length-4);
				
				break;
			case 'long text':
				header='phylosophy';
				body='long text should be here';
				
				break;
			}
			
			up = hidden[p['name']] ? 'l_darr' : 'l_uarr';
			var displ = up=='l_uarr' ? '' : ' style="display: none;"'
			
			tmp+='<div class="left_menu_head"><span onclick="L._hide('+i+');">'+header+'</span></div>\
			\
			<div class="left_menu_body" id="b'+i+'" border=0'+displ+'>'+body+'</td><td width=12><img src="f/i/no.png" width=12 height=1></div>';
		}
		
		tmp += '</div>';
		
		document.getElementById('left_menu').innerHTML=tmp;
	}
	
	// function is used to highlight the header in the left menu (used in draw)
	
	T._highlight = function(id,act)
	{
		var el = document.getElementById('i'+id);
		var state = act=='over' ? 'h' : '';
		
		if(hidden[names[id]]) I.im(el,state,'l_darr');
		else I.im(el,state,'l_uarr');
	}
	
	// function is used to hide left menu with the specified id (used in draw_left_menu)
	
	T._hide = function(id)
	{
		var el = document.getElementById('b'+id);
		var img = document.getElementById('i'+id);
		var name = names[id];
		
		if(el.style.display!='none')
		{
			T.opac(el,0.3,false);
			
			setTimeout(function(){el.style.display='none';},350);
			//I.im(img,'h','l_darr');
			
			hidden[name] = name;
		}else
		{
			el.style.visibility = 'hidden';
			el.style.display='';
			
			T.opac(el,0.3,true);
			
			I.im(img,'h','l_uarr');
			
			hidden[name] = null;
		}
	}
	
	// this function adds link with icon [icon] (see menu_all.png and coords), href [href], with title [title] and name [name]
	
	var _i = 0; // the counter for add_link
	
	add_link = function(href,title,icon,name)
	{
		_i++;
		var style = "background: url('f/i/menu_all.png') -"+I.coords['m_'+icon][0]+"px -"+I.coords['m_'+icon][1]+"px";
		
		return '<div style="padding-top: 2px; padding-bottom: 2px;"><a href="'+href+'" title="'+title+'" style="text-decoration: none;"><img src="f/i/no.png" width=16 height=16 style="'+style+'" border=0>&nbsp;&nbsp;<span id=\'u'+_i+'\' style="text-decoration: underline;">'+name+'</span></a></div>';
	}
	
	//a function that is used in "add link" to underline links
	
	T._underl = function(id,underline)
	{
		var el=document.getElementById('u'+id);
		
		if(underline) el.style.textDecoration='underline';
		else el.style.textDecoration='none';
	}
	
	// function for opacity
	
	T.opac = function(el,duration,direct)
	{
		if(!duration) duration=0.3;
		if(direct==undefined) direct = true; // true - show element, false - hide element
		var added = false; /* added style.width and style.height ? */
		
		if(el.runtimeStyle) //IE, filter works only with absolute positioned elements, or elements with specified width or height. Other elements are just _made_ to answer there conditions
		{
			if(el.style.position!='absolute' && !el.style.width && !el.style.height)
			{
				el.style.width=el.offsetWidth+'px';
				el.style.height=el.offsetHeight+'px';
				added = true;
			}
			
			el.runtimeStyle.filter='BlendTrans(Duration='+duration+')';
			
			if(direct) el.style.visibility = "hidden";
			else el.style.visibility = "visible";
			
			el.filters["BlendTrans"].Apply();
			
			if(!direct) el.style.visibility = "hidden";
			else el.style.visibility = "visible";
			
			el.filters["BlendTrans"].Play();
			
			if(added)
			{
				el.style.width='';
				el.style.height='';
			}
			return true;
		}
		
		if(el.style.opacity!=undefined) //Mozilla and opera >= 9
		{
			var bit=-1/(duration*40);
			
			if(!direct) bit = -bit;
			
			el.style.opacity=direct ? 0 : 1;
			el.style.visibility="visible";
			var op=function()
			{
				if((el.style.opacity>=1 && direct) || (el.style.opacity<=0 && !direct))
				{
					return;
				}
				el.style.opacity-=bit; //"+" works as if digit is a string
				
				setTimeout(op,25);
			}
			op();
			return true;
		}
		
		return false;
	}
}

window.LeftMenu = (window.L = new LeftMenuClass());

var InterfaceClass = function(){
	
	var T = this;
	
	T.coords = { // 'name': {right, top, width, height}
	/** overall.88.png **/
	back: [0, 0, 61, 30],
	back_disabled: [0, 582, 61, 30],
	fwd: [0, 90, 34, 30],
	fwd_disabled: [0, 612, 34, 30],
	up: [48, 90, 29, 30],
	up_disabled: [71, 612, 29, 30],
	search: [0, 180, 66, 30],
	dirs: [0, 270, 65, 30],
	view: [0, 360, 37, 30],
	
	close: [72, 360, 28, 30],
	go: [0, 450, 58, 22],
	
	// left menu
	
	l_uarr: [77, 90, 23, 23],
	l_darr: [77, 136, 23, 23],
	
	// table view
	
	tv_sep: [64, 360, 8, 20],
	tv_lsep: [94, 450, 6, 20],
	tv_uarr: [68, 439, 9, 5],
	tv_darr: [63, 445, 9, 5],
	
	/** menu_all.png **/
	m_open: [0,0,16,16],
	m_mkdir: [0,16,16,16],
	m_upload: [0,32,16,16],
	m_rename: [0,48,16,16],
	m_cut: [0,64,16,16],
	m_copy: [0,80,16,16],
	m_delete: [0,96,16,16],
	m_control_panel: [0,112,16,16],
	m_admin: [0,128,16,16],
	m_paste: [0,160,16,16],
	m_cancel: [0,176,16,16],
	m_zip: [0, 192, 16, 16]
	};
	
	T.dbg = function(message)
	{
		try
		{
			console.log(message);
		}catch(exc)
		{
			/*var el = document.getElementById('debug');
			if(!el)
			{
				el = document.createElement('div');
				el.id = 'debug';
				document.body.appendChild(el);
			}
			el.innerHTML = message;*/
		}
	}
	
	T.gw = T.get_width = function()
	{
		if(document.body.offsetWidth) return document.body.offsetWidth;
	  	else if(window.innerWidth) return window.innerWidth;
	  	else return false;
	}
	
	T.gh = T.get_height = function()
	{
		if(document.body.offsetHeight) return document.body.offsetHeight;
	  	else if(window.innerHeight) return window.innerHeight;
	  	else return false;
	}
	
	// the function (taken from xpoint.ru), which determines the coordinates of an object
	
	T.gb = T.get_bounds = function(element)
	{
		var left = element.offsetLeft;
		var top = element.offsetTop;
		for (var parent = element.offsetParent; parent; parent = parent.offsetParent)
		{
			left += parent.offsetLeft;
			top += parent.offsetTop;
		}
		return {left: left, top: top, width: element.offsetWidth, height: element.offsetHeight};
	}
	
	T.mh = T.menu_hover = function()
	{
	}
	
	T.mo = T.menu_out = function()
	{
	}
	
	// the function changes the current path (changes title, adress and icon)
	
	T.cp = T.change_path = function(address,dir,type)
	{
		if(0)
		{
			var a = document.getElementById('address_img');
			var h = document.getElementById('header_icon');
			
			if(type==0)
			{
				a.style.backgroundPosition = '-0px -516px';
				h.style.backgroundPosition = '-37px -360px';
			}else if(type==2)
			{
				a.style.backgroundPosition = '-0px -538px';
				h.style.backgroundPosition = '-37px -390px';
			}else if(type==3)
			{
				a.style.backgroundPosition = '-0px -560px';
				h.style.backgroundPosition = '-37px -420px';
			}
			
			document.getElementById('name_of_folder').innerHTML = dir;
			
		}
		document.getElementById('address').value = address;
	}
	
	// the function changes the current path (calls go2)
	// if path is specified, it must be relative
	
	T.ca = T.change_address = function(path)
	{
		var new_addr = document.getElementById('address').value;
		
		if(path)
		{
			new_addr += '/'+path;
		}
		
		R.draw_files(new_addr);
	}
	
	// function changes the status string, params = [ ..., [ name, value ], ... ]
	
	T.cs = T.change_status = function(pr)
	{
		var el = document.getElementById('footer_descr');
		var tmp = [];
		var j = 0;
		
		for(var k in pr)
		{
			var p = pr[k];
			if(!p[1]) continue;
			
			tmp[j++] = '<b>'+p[0]+'</b>: '+p[1];
		}
		
		el.innerHTML = '<nobr>'+tmp.join('&nbsp;&nbsp;&nbsp;')+'</nobr>';
	}
	
	// function that sets another image (name - the name of image, state - '', 'h' or 'd')
	// iname - the real image name, if not specified, by default takes name from id ( btn_NAME )
	
	T.im = function(obj,state,iname)
	{
		if(!iname) iname = obj.id.substr(4);
		var c = T.coords[iname];
		var offset = 0;
		
		if(state=='h') offset = -c[3];
		if(state=='d') offset = -c[3]*2;
		
		obj.style.backgroundPosition = '-' + c[0] + 'px -' + (c[1] - (obj.id.substr(obj.id.length-9,9)=='_disabled' ? 0 : offset)) + 'px';
	}
	
	// function used to show the Upper Panel Menu
	
	T.upp = T.upperpanel = function(name,e,obj)
	{
		var x=10,y=10;
		
		/*if(obj.x)
		{
			x=obj.x;
			y=obj.y;
		}else if(e.offsetX)
		{
			x = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft - event.offsetX;
			y = event.clientY + document.documentElement.scrollTop + document.body.scrollTop - event.offsetY;
		}
		
		y += obj.clientHeight - 3;*/
		
		if(name!='Update')
		{
			var bounds = T.get_bounds(obj);
			
			var el = document.getElementById('debug');
			if(!el) return;
			
			el.style.position = 'absolute';
			el.style.top = (parseInt(bounds['top']) + parseInt(bounds['height'])) + 'px';
			el.style.left = bounds['left'] + 'px';
			el.innerHTML = 'menu';
		}else
		{
			D.perform_update();
		}
	}
	
	/*
	
	set styles for elements els:
	
	els    should be a string with ids of elements separated by ","
	styles should be a hash, containing key-value pairs for style
	
	EXAMPLE:
	
	// set width to 19px and height to 28px for elements with id element1, element2 and element3
	
	T.ss( 'element1,element2,element3' , 
	{
		width:  '19px',
		height: '28px'
	});
	
	*/
	
	T.ss = T.set_style = function(els, styles)
	{
		var el;
		
		els = els.split(',');
		
		for(var key in els)
		{
			el = document.getElementById(els[key]);
			if(!el) return false;
			
			//alert('Set style');
			
			for(var k in styles)
			{
				if(typeof(el.style[k]) == typeof(undef)) continue; //alert('Fuck '+k);
				el.style[k] = styles[k];
			}
		}
		
		return true;
	};
	
	var w_width, w_height;

	var prev_content_w;
	
	T.resize = function()
	{
		/* T.dbg(T.get_height()); */
		
		/* heights */
		var fh = $('#footer').height(), hh = 69, mh = 0;

		/* widths */		
		var lw = 250;
		
		w_width  = T.gw();
		w_height = T.gh();
		
		T.ss('address_div,address',
		{
			width: (w_width - document.getElementById('upper_left').offsetWidth - document.getElementById('upper_right').offsetWidth) + 'px'
		});
		
		T.ss('content',
		{
			width: (w_width - lw) + 'px'
		});
		
		T.ss('main_area',
		{
			height: (w_height - fh - hh - mh) + 'px'
		});
		
		T.ss('left_menu,content',
		{
			position: 'absolute',
			top: (hh - (-mh)),
			height: (w_height - fh - mh - hh) + 'px'
			//border: '1px blue dashed'
		});
		
		T.ss('content',
		{
			left: lw
		});
		
		T.ss('very_main',
		{
			visibility: ''
		});

		var cstyle = document.getElementById('content').style;

		if(!E.init_complete)
		{
			E.init_complete = true;
			D.go2('.');
		}else
		{
			R.GRID.widths.nameNew -= (prev_content_w - parseInt(cstyle.width));
			R.GRID.resize( parseInt(cstyle.width), parseInt(cstyle.height) );
		}

		prev_content_w = parseInt(cstyle.width);
	}
	
	T.db = T.disable_buttons = function()
	{
		for(var k in {fwd:'',back:'',up:''})
		{
			var el = document.getElementById('btn_'+k),
			    el_dis = document.getElementById('btn_'+k+'_disabled');
			if (!el || !el_ds) continue;
			if(!E['can_go_'+k]())
			{
				el.style.display='none';
				el_dis.style.display='';
			}else
			{
				el.style.display='';
				el_dis.style.display='none';
			}
			
		}
	}
	
	// all functions with "upload" work with the upload form in the left menu
	
	/*T.su = T.show_upload = function()
	{
		var el = document.getElementById('upload_form');
		
		if(el.style.display == 'none')
		{
			el.style.display = '';
			T._append_upload();
		}
		else
		{
			T._clear_uploads();
			el.style.display = 'none';
		}
	}
	
	var _created = []; // array of all appended and created elements to the form
	
	T._append_upload = function()
	{
		if(!T.i) T.i=0;
		
		var el = document.getElementById('uploads_container');
		
		var obj = document.createElement('input');
		obj.type = 'file';
		obj.className = 'upl';
		obj.name = 'files['+(T.i++)+']';
		
		el.appendChild(obj);
		_created.push(obj);
		obj = document.createElement('br');
		el.appendChild(obj);
		_created.push(obj);
	}
	
	T._clear_uploads = function()
	{
		var el = document.getElementById('uploads_container');
		
		for(var i = 0; i<_created.length; i++)
		{
			//try{
			el.removeChild(_created[i]);
			//}catch(e){}
			//alert(_created[i]);
		}
		_created = [];
	}
	*/
	
	// function that shows that something is loading (if state is true - loading started, false - loading finished)
	
	var dolphin_position = 0;
	var frames = 6;
	
	var dolphin_interval = null;
	var dolphin;

	function scrollDolphinImage()
	{
		dolphin_position += 80;
		dolphin_position %= frames*80;
		dolphin.style.backgroundPosition = '0px -'+dolphin_position+'px';
	}

	T.sl = T.show_loading = function(state, text)
	{
		var d = document.getElementById('footer_state');
		var s = text||'loading...';
		dolphin = document.getElementById('footer_dolphin');
		
		//alert('Show loading for '+state+' with text '+text);
		
		try
		{
			if(d)
			{
				if(state)
				{
					s = s.replace('...','');

					if(!dolphin_interval)
					{
						//scrollDolphinImage();
						dolphin_interval = setInterval(scrollDolphinImage, 500);
					}

				}else if(!state && dolphin_interval)
				{
					clearInterval(dolphin_interval);
					dolphin_interval = null;
				}

				//document.getElementById('btn_stop_disabled').style.display = state ? 'none' : '';
				//document.getElementById('btn_stop').style.display = state ? '' : 'none';
			}else
			{
				d = document.getElementById('loading');
				if(!d) return;
			}

			s = '<b>Status:</b> '+s+' (<a style="color: black; text-decoration:none; border-bottom: 1px black dashed;" href="" onclick="D.abort();return false;">cancel)';

			if(state)
			{
				d.innerHTML = s;
				d.style.visibility = 'visible';
			}else
			{
				d.style.visibility = 'hidden';
				d.innerHTML = s;
			}
		}catch(e)
		{
			alert('Exception: '+e);
		}
		
	}
	
	T.wo = T.window_open = function(src, name, width, height)
	{	
		return window.open(src, name, 'width=' + width + ',height= ' + height + ',resizeable=0,menubar=0,location=0,scrollbars=1,toolbar=0,status=0,top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
	}
	
	T.hk = T.handle_keydown = function(e)
	{
		if(R.is_inp(e)) return true;
		
		switch(e.keyCode || e.charCode)
		{
			case 27: /* ESC */
				R.remove_selection();
				break;
		}
		
		// T.dbg('handled');
		return true;
		var sel = R.get_selected_items();
		var filt = E.get_filtered_items();
		var items = E.get_filtered_items();
		var t = e.srcElement || e.target;
		
		if(R.is_smpl_view() || filt.length == 0) return true;
		
		
		
		
		//T.dbg(e.keyCode + ' ' + e.charCode + ' ' + Math.random());
		
		switch(e.keyCode || e.charCode)
		{
		case 46 /*delete*/:
			if(sel.length>=1)
			{
				E['delete_item'+(sel.length>1?'s':'')]();
				return false;
			}else
			{
				return true;
			}
			break;
		case 113 /*F2*/:
			if(sel.length==1)
			{
				E.rename_item();
				return false;
			}else
			{
				return true;
			}
			break;
		case 38 /* KEYUP */:
		case 40 /* KEYDOWN */:
			if(filt.length!=E.get_global_items().length) return false; /* implementation of arrows is buggy when filter is active */
		
			var id = sel[sel.length-1] ? sel[sel.length-1].id : (filt[0]&&filt[0].k?filt[0].k:0);
			var mstep = e.keyCode ==38 ? 1 : -1;
			var el = document.getElementById('it'+id);
			var old_id = +id;
			
			if(mstep == 1)
			{
				if(id>0 && !document.getElementById('it'+(id-1)))
				{
					var prev = id;
					for(var k in filt)
					{
						if(filt[k]['k'] == id) break;
						prev = filt[k]['k'];
					}
					
					id = prev;
				}else if(id>0)
				{
					id-=mstep;
				}
			}else
			{
				if(id<items.length-1 && !document.getElementById('it'+(id-(-1))))
				{
					var brknext = false;
					t = null;
					
					for(var k in filt)
					{
						if(brknext)
						{
							id = filt[k]['k'];
							break;
						}
						if(filt[k]['k'] == id) brknext = true;
					}
				}else if(id<E.get_global_items().length-1)
				{
					id-=mstep;
				}
			}
			
			if(id==old_id) return;
			if(R.is_selected(items[id]) || sel.length==2 && sel[0]==items[id])
			{
				id = old_id;
			}
			
			/*I.dbg(id);*/
			document.getElementById('it'+id).onmousedown(e);
			
			return false;
			break;
		case 13 /* enter */:
			var el;
			if(sel.length==1 && (el=document.getElementById('it'+sel[0]['id'])))
			{
				el.ondblclick(e);
			}
			return false;
			break;
		case 8 /* backspace */:
			T.change_address('..');
			return false;
			break;
		case 67 /* C (and Ctrl) */:
		case 99 /* charCode */:
			if(!e.ctrlKey || sel.length==0) break;
			E.copy_item();
			break;
		case 88 /* X (and Ctrl) */:
		case 120 /* charCode */:
			if(!e.ctrlKey || sel.length==0) break;
			E.cut_item();
			break;
		case 86 /* V (and Ctrl) */:
		case 118 /* charCode */:
			if(!e.ctrlKey) break;
			E.paste_items();
			break;
		case 65: /* A (and Ctrl) */
		case 97: /* charCode */
		case 2: /* B (for Safari) */
		case 66: /* B (for others) */
			if(!e.ctrlKey) break;
			var l = filt.length;
			for(var k=0; k<l; k++)
			{
				R.cl(document.getElementById('it'+(filt[k]['k']||k)),e,true);
			}
			
			E.draw_menu_for_items();
			
			return false;
			break;
		}
		
		return true;
	}
	
	T.in_menu = false;
	T.LINK_OVER = false;
	
	T.cm = T.context_menu = function(params,event)
	{
		var sub_params={};
		var el = document.getElementById("cm");
		if(!el)
		{
			el=document.createElement('div');
			el.id='cm';
			el.className='cm';
			el.onmouseover=function(){T.in_menu=true;};
			el.onmouseout=function(){T.in_menu=false;};
			document.body.appendChild(el);
		}
		
		if(el.style.display && el.style.display!='none') return false;
		
		var x = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		var y = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
		
		var spacer='<img src="f/i/no.png" width=1 height=1 style="visibility: hidden;">';
		var tmp='<table cellspacing=0 cellpadding=0 border=0 id="__cmtable"><tr height="2"><td colspan=7>'+spacer+'</td></tr>';
		
		var offsety=0,stl='';
		
		for(var k in params)
		{
			if(params[k]=='space') tmp+='<tr height="10"><td width="2">'+spacer+'</td><td valign="middle" style="vertical-align: middle;" colspan="4"><img src="f/i/hr.png" width="100%" height="1" border=0></td><td width="2">'+spacer+'</td></tr>';
			else
			{
				if(params[k]['nested'] || params[k]['disabled']) params[k]['onclick']='return false;';
				if(params[k]['disabled']) stl='gray';
				else stl='black';
				
				if(params[k]['nested']) sub_params[k]=params[k]['nested'];
				
				val='<td width="16" style="vertical-align: middle; align: center; text-align: center;">'+(params[k]['icon'] ? '<img src="f/i/'+params[k]['icon']+'.png" width=13 height=13>' : spacer)+'</td><td><nobr>'+params[k]["value"]+'</nobr></td>'+('<td nowrap="nowrap">&nbsp;&nbsp;&nbsp;'+(params[k]['hotkey']||'')+'</td>')+'<td align="center" style="align: center; text-align: center;" width="18">'+(params[k]['nested'] ? '<img src="f/i/arrow.png" width=18 height=16>' : spacer)+'</td>';
				tmp+='<tr height="16" onclick="'+params[k]["onclick"]+';I.hide_cm();" onmouseover="this.className=\'cm_'+stl+' cm_'+stl+'_hover\';window.status=this.title;I.LINK_OVER=true;return true;" onmouseout="this.className=\'cm_'+stl+'\';window.status=\'\';I.LINK_OVER=false;return true;" title="'+params[k]["title"]+'"  class="cm_'+stl+'"><td width="2">'+spacer+'</td>'+val+'<td width="2">'+spacer+'</td></tr>';
			}
			offsety+=16;
			if(params[k]=='space') offsety-=6;
		}
		
		tmp+='<tr height="2"><td colspan=7>'+spacer+'</td></tr></table>';
		
		el.innerHTML=tmp;
		
		el.style.visibility = "hidden";
		el.style.display="block";
		
		var height = el.scrollHeight+30;
		//if(window.opera) height+= 50; //stupid opera...
		
		var width = el.scrollWidth+30;
		//if(window.opera) width+= 30; //stupid opera...
		
		if (event.clientY + height > document.body.clientHeight) { y-=height-24 } else { y+=2 }
		if (event.clientX + width > document.body.clientWidth) { x-=width-24 } else { x+=2 }
		
		el.style.left = x + "px";
		el.style.top  = y + "px";
		
		el.style.visibility = "hidden";
		el.style.display="block";
		
		L.opac(el);
		
		event.returnValue=false;
		return false;
	}
	
	T.hc = T.hide_cm = function()
	{
		var el = document.getElementById("cm");
		if(!el) return;
		el.style.visibility="hidden";
		el.style.display="none";
		I.in_menu = false;
		I.LINK_OVER = false;
	}
	
	T.dm = T.draw_menu = function(e)
	{
		var ecp = { clientX: e.clientX, clientY: e.clientY, returnValue: false };
		
		/* the problem is that the file has to be selected already when the context menu is going to be drawn :)
		   that's why I use setTimeout to be sure that a file is selected
		*/
		
		setTimeout(function(){
			
			var g = R.gsi();
			var params = {};
			if(!g.length)
			{
				params = {
					0: {
						title: 'Refresh filelist',
						onclick: 'E.F5();',
						value: '<b>Refresh</b>',
						hotkey: 'F5'
					},
					1: 'space',
					2: {
						title: 'Paste items here',
						onclick: 'E.pi();',
						value: 'Paste',
						disabled: !E.copied,
						hotkey: 'Ctrl+V'
					},
					3: {
						title: 'Cancel operation',
						onclick: 'E.cc();',
						value: 'Cancel '+E.op,
						disabled: !E.copied
					},
					4: 'space',
					5: {
						title: 'Create a file',
						onclick: 'E.mkfile();',
						value: 'Create a file'
					},
					6: {
						title: 'Create a folder',
						onclick: 'E.mkdir();',
						value: 'Create a directory'
					},
					7: {
						title: 'Open the shell emulator',
						onclick: 'E.ot();',
						value: 'Open terminal'
					},
					'7.5': 'space',
					8: {
						title: 'Properties of current directory',
						onclick: 'E.sp();',
						value: 'Properties',
						disabled: false
					}
				};
			}else if(g.length>1)
			{
				params = {
					0: {
						title: 'Cut items',
						onclick: 'E.cut_items();',
						value: 'Cut',
						hotkey: 'Ctrl+X'
					},
					1: {
						title: 'Copy items',
						onclick: 'E.copy_items();',
						value: 'Copy',
						hotkey: 'Ctrl+V'
					},
					2: {
						title: 'Delete items without possibility to recover them',
						onclick: 'E.delete_items();',
						value: 'Delete',
						hotkey: 'Delete'
					},
					3: {
						title: 'Add items to .zip archive',
						onclick: 'E.zip_items();',
						value: 'Add to zip'
					},
					4: {
						title: 'Change rights of items',
						onclick: 'E.chmod_items();',
						value: 'CHMOD'
					},
					'4.5': 'space',
					5: {
						title: 'Properties',
						onclick: 'E.sp();',
						value: 'Properties',
						disabled: false
					}
				};
			}else /* if g.length == 1 */
			{
				if(g[0]['type']==1)
				{
					params = {
						'-2': {
							title: 'Edit file or download it',
							onclick: 'document.getElementById(\'it'+g[0]['id']+'\').ondblclick(event);',
							value: '<b>Open</b>',
							hotkey: 'Enter'
						},
						'-1': 'space',
						'-0.5': {
							title: 'Rename file',
							onclick: 'E.rename_item();',
							value: 'Rename',
							hotkey: 'F2'
						},
						0: {
							title: 'Cut file',
							onclick: 'E.cut_item();',
							value: 'Cut',
							hotkey: 'Ctrl+X'
						},
						1: {
							title: 'Copy file',
							onclick: 'E.copy_item();',
							value: 'Copy',
							hotkey: 'Ctrl+V'
						},
						2: {
							title: 'Delete file without possibility to recover them',
							onclick: 'E.delete_item();',
							value: 'Delete',
							hotkey: 'Delete'
						},
						3: {
							title: 'Add file to .zip archive',
							onclick: 'E.zip_item();',
							value: 'Add to zip'
						},
						4: {
							title: 'Change rights of file',
							onclick: 'E.chmod_item();',
							value: 'CHMOD'
						},
						5: {
							title: 'Download file',
							onclick: 'E.download_file();',
							value: 'Download'
						},
						'5.5': 'space',
						6: {
							title: 'Properties',
							onclick: 'E.sp();',
							value: 'Properties',
							disabled: false
						}
					};
				}else if(g[0]['type']==0)
				{
					params = {
						'-2': {
							title: 'Open directory',
							onclick: 'document.getElementById(\'it'+g[0]['id']+'\').ondblclick(event);',
							value: '<b>Open</b>',
							hotkey: 'Enter'
						},
						'-1': 'space',
						'-0.5': {
							title: 'Rename dir',
							onclick: 'E.rename_item();',
							value: 'Rename',
							hotkey: 'F2'
						},
						0: {
							title: 'Cut dir',
							onclick: 'E.cut_item();',
							value: 'Cut',
							hotkey: 'Ctrl+X'
						},
						1: {
							title: 'Copy dir',
							onclick: 'E.copy_item();',
							value: 'Copy',
							hotkey: 'Ctrl+V'
						},
						2: {
							title: 'Delete dir without possibility to recover them',
							onclick: 'E.delete_item();',
							value: 'Delete',
							hotkey: 'Delete'
						},
						3: {
							title: 'Add dir to .zip archive',
							onclick: 'E.zip_item();',
							value: 'Add to zip'
						},
						4: {
							title: 'Change rights of dir',
							onclick: 'E.chmod_item();',
							value: 'CHMOD'
						},
						'4.5': 'space',
						5: {
							title: 'Properties',
							onclick: 'E.sp();',
							value: 'Properties',
							disabled: false
						}
					};
				}
			}
			
			I.context_menu(params,ecp);
			
		},30);
		
		return false;
	}
};

window.Interface = (window.I = new InterfaceClass());

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
					alert('AJAX request failed because of 404 error (Not Found). Please ensure, that Dolphin.php is installed properly.');
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
		
		D.qr('http://dolphin-php.org/'+'build-info/', {}, function(res,err)
		{
			if(!res) alert('Could not contact http://dolphin-php.org/.');
			else if(res == 88) alert('No new version available');
			else if(res < 88) alert('You have a newer version, than on a server :).');
			else if(confirm('New version ('+res+' build) is available.\nInstall it?'))
			{
				E.run_update();
			}
		}, true, 'contacting http://dolphin-php.org/');
	};
	
	T.ou = T.open_uploads = function()
	{
		I.window_open('f/swfupload/', 'uploads', 450, 350);
	}
};

window.Dolphin = (window.D = new DolphinClass());

/**
 * JsHttpRequest: JavaScript "AJAX" data loader (script-xml support only!)
 *
 * @license LGPL
 * @author Dmitry Koterov, http://en.dklab.ru/lib/JsHttpRequest/
 * @version 5.x $Id$
 */
// {{{
function JsHttpRequest() {
    // Standard properties.
    var t = this;
    t.onreadystatechange = null;
    t.readyState         = 0;
    t.responseText       = null;
    t.responseXML        = null;
    t.status             = 200;
    t.statusText         = "OK";
    // JavaScript response array/hash
    t.responseJS         = null;
    
    /* youROCK */
    t.aborted = false;
    /* / youROCK */

    // Additional properties.
    t.caching            = false;        // need to use caching?
    t.loader             = null;         // loader to use ('form', 'script', 'xml'; null - autodetect)
    t.session_name       = "PHPSESSID";  // set to  cookie or GET parameter name

    // Internals.
    t._ldObj              = null;  // used loader object
    t._reqHeaders        = [];    // collected request headers
    t._openArgs          = null;  // parameters from open()
    t._errors = {
        inv_form_el:        'Invalid FORM element detected: name=%, tag=%',
        must_be_single_el:  'If used, <form> must be a single HTML element in the list.',
        js_invalid:         'JavaScript code generated by backend is invalid!\n%',
        url_too_long:       'Cannot use so long query with GET request (URL is larger than % bytes)',
        unk_loader:         'Unknown loader: %',
        no_loaders:         'No loaders registered at all, please check JsHttpRequest.LOADERS array',
        no_loader_matched:  'Cannot find a loader which may process the request. Notices are:\n%'
    }
    
    /**
     * Aborts the request. Behaviour of this function for onreadystatechange() 
     * is identical to IE (most universal and common case). E.g., readyState -> 4
     * on abort() after send().
     */
    t.abort = function() { with (this) {
         /* youROCK */
        t.aborted = true;
        /* / youROCK */
        
        if (_ldObj && _ldObj.abort) _ldObj.abort();
        _cleanup();
        if (readyState == 0) {
            // start->abort: no change of readyState (IE behaviour)
            return;
        }
        if (readyState == 1 && !_ldObj) {
            // open->abort: no onreadystatechange call, but change readyState to 0 (IE).
            // send->abort: change state to 4 (_ldObj is not null when send() is called)
            readyState = 0;
            return;
        }
        _changeReadyState(4, true); // 4 in IE & FF on abort() call; Opera does not change to 4.
    }}
    
    /**
     * Prepares the object for data loading.
     * You may also pass URLs like "GET url" or "script.GET url".
     */
    t.open = function(method, url, asyncFlag, username, password) { with (this) {
        // Extract methor and loader from the URL (if present).
        if (url.match(/^((\w+)\.)?(GET|POST)\s+(.*)/i)) {
            this.loader = RegExp.$2? RegExp.$2 : null;
            method = RegExp.$3;
            url = RegExp.$4; 
        }
        // Append  to original URL. Use try...catch for security problems.
        try {
            if (
                document.location.search.match(new RegExp('[&?]' + session_name + '=([^&?]*)'))
                || document.cookie.match(new RegExp('(?:;|^)\\s*' + session_name + '=([^;]*)'))
            ) {
                url += (url.indexOf('?') >= 0? '&' : '?') + session_name + "=" + this.escape(RegExp.$1);
            }
        } catch (e) {}
        // Store open arguments to hash.
        _openArgs = {
            method:     (method || '').toUpperCase(),
            url:        url,
            asyncFlag:  asyncFlag,
            username:   username != null? username : '',
            password:   password != null? password : ''
        }
        _ldObj = null;
        _changeReadyState(1, true); // compatibility with XMLHttpRequest
        return true;
    }}
    
    /**
     * Sends a request to a server.
     */
    t.send = function(content) {
        if (!this.readyState) {
            // send without open or after abort: no action (IE behaviour).
            return;
        }
        this._changeReadyState(1, true); // compatibility with XMLHttpRequest
        this._ldObj = null;
        
        // Prepare to build QUERY_STRING from query hash.
        var queryText = [];
        var queryElem = [];
        if (!this._hash2query(content, null, queryText, queryElem)) return;
    
        // Solve the query hashcode & return on cache hit.
        var hash = null;
        if (this.caching && !queryElem.length) {
            hash = this._openArgs.username + ':' + this._openArgs.password + '@' + this._openArgs.url + '|' + queryText + "#" + this._openArgs.method;
            var cache = JsHttpRequest.CACHE[hash];
            if (cache) {
                this._dataReady(cache[0], cache[1]);
                return false;
            }
        }
    
        // Try all the loaders.
        var loader = (this.loader || '').toLowerCase();
        if (loader && !JsHttpRequest.LOADERS[loader]) return this._error('unk_loader', loader);
        var errors = [];
        var lds = JsHttpRequest.LOADERS;
        for (var tryLoader in lds) {
            var ldr = lds[tryLoader].loader;
            if (!ldr) continue; // exclude possibly derived prototype properties from "for .. in".
            if (loader && tryLoader != loader) continue;
            // Create sending context.
            var ldObj = new ldr(this);
            JsHttpRequest.extend(ldObj, this._openArgs);
            JsHttpRequest.extend(ldObj, {
                queryText:  queryText.join('&'),
                queryElem:  queryElem,
                id:         (new Date().getTime()) + "" + JsHttpRequest.COUNT++,
                hash:       hash,
                span:       null
            });
            var error = ldObj.load();
            if (!error) {
                // Save loading script.
                this._ldObj = ldObj;
                JsHttpRequest.PENDING[ldObj.id] = this;
                return true;
            }
            if (!loader) {
                errors[errors.length] = '- ' + tryLoader.toUpperCase() + ': ' + this._l(error);
            } else {
                return this._error(error);
            }
        }
    
        // If no loader matched, generate error message.
        return tryLoader? this._error('no_loader_matched', errors.join('\n')) : this._error('no_loaders');
    }
    
    /**
     * Returns all response headers (if supported).
     */
    t.getAllResponseHeaders = function() { with (this) {
        return _ldObj && _ldObj.getAllResponseHeaders? _ldObj.getAllResponseHeaders() : [];
    }}

    /**
     * Returns one response header (if supported).
     */
    t.getResponseHeader = function(label) { with (this) {
        return _ldObj && _ldObj.getResponseHeader? _ldObj.getResponseHeader(label) : null;
    }}

    /**
     * Adds a request header to a future query.
     */
    t.setRequestHeader = function(label, value) { with (this) {
        _reqHeaders[_reqHeaders.length] = [label, value];
    }}
    
    //
    // Internal functions.
    //
    
    /**
     * Do all the work when a data is ready.
     */
    t._dataReady = function(text, js) { with (this) {
        if (caching && _ldObj) JsHttpRequest.CACHE[_ldObj.hash] = [text, js];
        responseText = responseXML = text;
        responseJS = js;
        if (js !== null) {
            status = 200;
            statusText = "OK";
        } else {
            status = 500;
            statusText = "Internal Server Error";
        }
        _changeReadyState(2);
        _changeReadyState(3);
        _changeReadyState(4);
        _cleanup();
    }}
    
    /**
     * Analog of sprintf(), but translates the first parameter by _errors.
     */
    t._l = function(args) {
        var i = 0, p = 0, msg = this._errors[args[0]];
        // Cannot use replace() with a callback, because it is incompatible with IE5.
        while ((p = msg.indexOf('%', p)) >= 0) {
            var a = args[++i] + "";
            msg = msg.substring(0, p) + a + msg.substring(p + 1, msg.length);
            p += 1 + a.length;
        }
        return msg;
    }

    /** 
     * Called on error.
     */
    t._error = function(msg) {
        msg = this._l(typeof(msg) == 'string'? arguments : msg)
        msg = "JsHttpRequest: " + msg;
        
        /* <youROCK> */
		/* add support of very useful "onerror" property */

		if(t.onerror)
		{
			return t.onerror(msg);
		}

		/* </youROCK> */
        
        if (!window.Error) {
            // Very old browser...
            throw msg;
        } else if ((new Error(1, 'test')).description == "test") {
            // We MUST (!!!) pass 2 parameters to the Error() constructor for IE5.
            throw new Error(1, msg);
        } else {
            // Mozilla does not support two-parameter call style.
            throw new Error(msg);
        }
    }
    
    /**
     * Convert hash to QUERY_STRING.
     * If next value is scalar or hash, push it to queryText.
     * If next value is form element, push [name, element] to queryElem.
     */
    t._hash2query = function(content, prefix, queryText, queryElem) {
        if (prefix == null) prefix = "";
        if((''+typeof(content)).toLowerCase() == 'object') {
            var formAdded = false;
            if (content && content.parentNode && content.parentNode.appendChild && content.tagName && content.tagName.toUpperCase() == 'FORM') {
                content = { form: content };
            }
            for (var k in content) {
                var v = content[k];
                if (v instanceof Function) continue;
                var curPrefix = prefix? prefix + '[' + this.escape(k) + ']' : this.escape(k);
                var isFormElement = v && v.parentNode && v.parentNode.appendChild && v.tagName;
                if (isFormElement) {
                    var tn = v.tagName.toUpperCase();
                    if (tn == 'FORM') {
                        // FORM itself is passed.
                        formAdded = true;
                    } else if (tn == 'INPUT' || tn == 'TEXTAREA' || tn == 'SELECT') {
                        // This is a single form elemenent.
                    } else {
                        return this._error('inv_form_el', (v.name||''), v.tagName);
                    }
                    queryElem[queryElem.length] = { name: curPrefix, e: v };
                } else if (v instanceof Object) {
                    this._hash2query(v, curPrefix, queryText, queryElem);
                } else {
                    // We MUST skip  values, because there is no method
                    // to pass 's via GET or POST request in PHP.
                    if (v === null) continue;
                    // Convert JS boolean true and false to corresponding PHP values.
                    if (v === true) v = 1; 
                    if (v === false) v = '';
                    queryText[queryText.length] = curPrefix + "=" + this.escape('' + v);
                }
                if (formAdded && queryElem.length > 1) {
                    return this._error('must_be_single_el');
                }
            }
        } else {
            queryText[queryText.length] = content;
        }
        return true;
    }
    
    /**
     * Remove last used script element (clean memory).
     */
    t._cleanup = function() {
        var ldObj = this._ldObj;
        if (!ldObj) return;
        // Mark this loading as aborted.
        JsHttpRequest.PENDING[ldObj.id] = false;
        var span = ldObj.span;
        if (!span) return;
        // Do NOT use iframe.contentWindow.back() - it is incompatible with Opera 9!
        ldObj.span = null;
        var closure = function() {
            span.parentNode.removeChild(span);
        }
        // IE5 crashes on setTimeout(function() {...}, ...) construction! Use tmp variable.
        JsHttpRequest.setTimeout(closure, 50);
    }
    
    /**
     * Change current readyState and call trigger method.
     */
    t._changeReadyState = function(s, reset) { with (this) {
        if (reset) {
            status = statusText = responseJS = null;
            responseText = '';
        }
        readyState = s;
        if (onreadystatechange) onreadystatechange();
    }}
    
    /**
     * JS escape() does not quote '+'.
     */
    t.escape = function(s) {
        return escape(s).replace(new RegExp('\\+','g'), '%2B');
    }
}


// Global library variables.
JsHttpRequest.COUNT = 0;              // unique ID; used while loading IDs generation
JsHttpRequest.MAX_URL_LEN = 2000;     // maximum URL length
JsHttpRequest.CACHE = {};             // cached data
JsHttpRequest.PENDING = {};           // pending loadings
JsHttpRequest.LOADERS = {};           // list of supported data loaders (filled at the bottom of the file)
JsHttpRequest._dummy = function() {}; // avoid memory leaks


/**
 * These functions are dirty hacks for IE 5.0 which does not increment a
 * reference counter for an object passed via setTimeout(). So, if this 
 * object (closure function) is out of scope at the moment of timeout 
 * applying, IE 5.0 crashes. 
 */

/**
 * Timeout wrappers storage. Used to avoid zeroing of referece counts in IE 5.0.
 * Please note that you MUST write "window.setTimeout", not "setTimeout", else
 * IE 5.0 crashes again. Strange, very strange...
 */
JsHttpRequest.TIMEOUTS = { s: window.setTimeout, c: window.clearTimeout };

/**
 * Wrapper for IE5 buggy setTimeout.
 * Use this function instead of a usual setTimeout().
 */
JsHttpRequest.setTimeout = function(func, dt) {
    // Always save inside the window object before a call (for FF)!
    window.JsHttpRequest_tmp = JsHttpRequest.TIMEOUTS.s; 
    if (typeof(func) == "string") {
        id = window.JsHttpRequest_tmp(func, dt);
    } else {
        var id = null;
        var mediator = function() {
            func();
            delete JsHttpRequest.TIMEOUTS[id]; // remove circular reference
        }
        id = window.JsHttpRequest_tmp(mediator, dt);
        // Store a reference to the mediator function to the global array
        // (reference count >= 1); use timeout ID as an array key;
        JsHttpRequest.TIMEOUTS[id] = mediator;
    }
    window.JsHttpRequest_tmp = null; // no delete() in IE5 for window
    return id;
}

/**
 * Complimental wrapper for clearTimeout. 
 * Use this function instead of usual clearTimeout().
 */
JsHttpRequest.clearTimeout = function(id) {
    window.JsHttpRequest_tmp = JsHttpRequest.TIMEOUTS.c;
    delete JsHttpRequest.TIMEOUTS[id]; // remove circular reference
    var r = window.JsHttpRequest_tmp(id);
    window.JsHttpRequest_tmp = null; // no delete() in IE5 for window
    return r;
}


/**
 * Global static function.
 * Simple interface for most popular use-cases.
 * You may also pass URLs like "GET url" or "script.GET url".
 */
JsHttpRequest.query = function(url, content, onready, nocache) {
    var req = new this();
    req.caching = !nocache;
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            onready(req.responseJS, req.responseText);
        }
    }
    req.open(null, url, true);
    req.send(content);
}


/**
 * Global static function.
 * Called by server backend script on data load.
 */
JsHttpRequest.dataReady = function(d) {
    var th = this.PENDING[d.id];
    delete this.PENDING[d.id];
    if (th) {
        th._dataReady(d.text, d.js);
    } else if (th !== false) {
        throw "dataReady(): unknown pending id: " + d.id;
    }
}


// Adds all the properties of src to dest.
JsHttpRequest.extend = function(dest, src) {
    for (var k in src) dest[k] = src[k];
}

// {{{ xml
// Loader: XMLHttpRequest or ActiveX.
// [+] GET and POST methods are supported.
// [+] Most native and memory-cheap method.
// [+] Backend data can be browser-cached.
// [-] Cannot work in IE without ActiveX. 
// [-] No support for loading from different domains.
// [-] No uploading support.
//
JsHttpRequest.LOADERS.xml = { loader: function(req) {
    JsHttpRequest.extend(req._errors, {
        xml_no:          'Cannot use XMLHttpRequest or ActiveX loader: not supported',
        xml_no_diffdom:  'Cannot use XMLHttpRequest to load data from different domain %',
        xml_no_headers:  'Cannot use XMLHttpRequest loader or ActiveX loader, POST method: headers setting is not supported, needed to work with encodings correctly',
        xml_no_form_upl: 'Cannot use XMLHttpRequest loader: direct form elements using and uploading are not implemented'
    });
    
    this.load = function() {
        if (this.queryElem.length) return ['xml_no_form_upl'];
        
        // XMLHttpRequest (and MS ActiveX'es) cannot work with different domains.
        if (this.url.match(new RegExp('^([a-z]+://[^\\/]+)(.*)', 'i'))) {
        	// We MUST also check if protocols matched: cannot send from HTTP 
        	// to HTTPS and vice versa.
            if (RegExp.$1.toLowerCase() != document.location.protocol + '//' + document.location.hostname.toLowerCase()) {
                return ['xml_no_diffdom', RegExp.$1];
            }
        }
        
        // Try to obtain a loader.
        var xr = null;
        if (window.XMLHttpRequest) {
            try { xr = new XMLHttpRequest() } catch(e) {}
        } else if (window.ActiveXObject) {
            try { xr = new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {}
            if (!xr) try { xr = new ActiveXObject("Msxml2.XMLHTTP") } catch (e) {}
        }
        if (!xr) return ['xml_no'];
        
        // Loading method detection. We cannot POST if we cannot set "octet-stream" 
        // header, because we need to process the encoded data in the backend manually.
        var canSetHeaders = window.ActiveXObject || xr.setRequestHeader;
        if (!this.method) this.method = canSetHeaders && this.queryText.length? 'POST' : 'GET';
        
        // Build & validate the full URL.
        if (this.method == 'GET') {
            if (this.queryText) this.url += (this.url.indexOf('?') >= 0? '&' : '?') + this.queryText;
            this.queryText = '';
            if (this.url.length > JsHttpRequest.MAX_URL_LEN) return ['url_too_long', JsHttpRequest.MAX_URL_LEN];
        } else if (this.method == 'POST' && !canSetHeaders) {
            return ['xml_no_headers'];
        }
        
        // Add ID to the url if we need to disable the cache.
        this.url += (this.url.indexOf('?') >= 0? '&' : '?') + 'JsHttpRequest=' + (req.caching? '0' : this.id) + '-xml';        
        
        // Assign the result handler.
        var id = this.id;
        xr.onreadystatechange = function() { 
            if (xr.readyState != 4) return;
            // Avoid memory leak by removing the closure.
            xr.onreadystatechange = JsHttpRequest._dummy;
            req.status = null;
            try { 
                // In case of abort() call, xr.status is unavailable and generates exception.
                // But xr.readyState equals to 4 in this case. Stupid behaviour. :-(
                req.status = xr.status;
                req.responseText = xr.responseText;
            } catch (e) {}
            if (!req.status) return;
            try {
                // Prepare generator function & catch syntax errors on this stage.
                eval('JsHttpRequest._tmp = function(id) { var d = ' + req.responseText + '; d.id = id; JsHttpRequest.dataReady(d); }');
            } catch (e) {
                // Note that FF 2.0 does not throw any error from onreadystatechange handler.
                return req._error('js_invalid', req.responseText)
            }
            // Call associated dataReady() outside the try-catch block 
            // to pass exceptions in onreadystatechange in usual manner.
            JsHttpRequest._tmp(id);
            JsHttpRequest._tmp = null;
        };

        // Open & send the request.
        xr.open(this.method, this.url, true, this.username, this.password);
        if (canSetHeaders) {
            // Pass pending headers.
            for (var i = 0; i < req._reqHeaders.length; i++) {
                xr.setRequestHeader(req._reqHeaders[i][0], req._reqHeaders[i][1]);
            }
            // Set non-default Content-type. We cannot use 
            // "application/x-www-form-urlencoded" here, because 
            // in PHP variable HTTP_RAW_POST_DATA is accessible only when 
            // enctype is not default (e.g., "application/octet-stream" 
            // is a good start). We parse POST data manually in backend 
            // library code. Note that Safari sets by default "x-www-form-urlencoded"
            // header, but FF sets "text/xml" by default.
            xr.setRequestHeader('Content-Type', 'application/octet-stream');
        }
        xr.send(this.queryText);
        
        // No SPAN is used for this loader.
        this.span = null;
        this.xr = xr; // save for later usage on abort()
        
        // Success.
        return null;
    }
    
    // Override req.getAllResponseHeaders method.
    this.getAllResponseHeaders = function() {
        return this.xr.getAllResponseHeaders();
    }
    
    // Override req.getResponseHeader method.
    this.getResponseHeader = function(label) {
        return this.xr.getResponseHeader(label);
    }

    this.abort = function() {
        this.xr.abort();
        this.xr = null;
    }
}}
// }}}

/**
 * Each loader has the following properties which must be initialized:
 * - method
 * - url
 * - asyncFlag (ignored)
 * - username
 * - password
 * - queryText (string)
 * - queryElem (array)
 * - id
 * - hash
 * - span
 */ 
 
// }}}

// {{{ script
// Loader: SCRIPT tag.
// [+] Most cross-browser. 
// [+] Supports loading from different domains.
// [-] Only GET method is supported.
// [-] No uploading support.
// [-] Backend data cannot be browser-cached.
//
JsHttpRequest.LOADERS.script = { loader: function(req) {
    JsHttpRequest.extend(req._errors, {
        script_only_get:   'Cannot use SCRIPT loader: it supports only GET method',
        script_no_form:    'Cannot use SCRIPT loader: direct form elements using and uploading are not implemented'
    })
    
    this.load = function() {
        // Move GET parameters to the URL itself.
        if (this.queryText) this.url += (this.url.indexOf('?') >= 0? '&' : '?') + this.queryText;
        this.url += (this.url.indexOf('?') >= 0? '&' : '?') + 'JsHttpRequest=' + this.id + '-' + 'script';        
        this.queryText = '';
        
        if (!this.method) this.method = 'GET';
        if (this.method !== 'GET') return ['script_only_get'];
        if (this.queryElem.length) return ['script_no_form'];
        if (this.url.length > JsHttpRequest.MAX_URL_LEN) return ['url_too_long', JsHttpRequest.MAX_URL_LEN];

        var th = this, d = document, s = null, b = d.body;
        if (!window.opera) {
            // Safari, IE, FF, Opera 7.20.
            this.span = s = d.createElement('SCRIPT');
            var closure = function() {
                s.language = 'JavaScript';
                if (s.setAttribute) s.setAttribute('src', th.url); else s.src = th.url;
                b.insertBefore(s, b.lastChild);
            }
        } else {
            // Oh shit! Damned stupid Opera 7.23 does not allow to create SCRIPT 
            // element over createElement (in HEAD or BODY section or in nested SPAN - 
            // no matter): it is created deadly, and does not response the href assignment.
            // So - always create SPAN.
            this.span = s = d.createElement('SPAN');
            s.style.display = 'none';
            b.insertBefore(s, b.lastChild);
            s.innerHTML = 'Workaround for IE.<s'+'cript></' + 'script>';
            var closure = function() {
                s = s.getElementsByTagName('SCRIPT')[0]; // get with timeout!
                s.language = 'JavaScript';
                if (s.setAttribute) s.setAttribute('src', th.url); else s.src = th.url;
            }
        }
        JsHttpRequest.setTimeout(closure, 10);
        
        // Success.
        return null;
    }
}}
// }}}

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

