/**
 * jQuery��Cookie��д�����ķ�װ
 * @type {Object}
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//iframe����iframe��������ݽ�������iframe�ĸ����documentע�ᵽiframe�㡣
window.topDocument = window.top.document;

/*
 *  ȫ�ֺ����ķ�װ
 */
var Global = {
	//�����ֲ��Ŀ¼��Ĭ��ֵ
	rootPath: "http://css.doyoe.com",
	//�Ƿ�chm�����ʽ
	isLocal: /^mk:$/i.test(location.protocol),
	//�Ƿ��IE�����
	notIE: document.querySelector && !(document.documentMode < 10)
};

// �����˵���չ������Ĺ��캯��,����sΪ�����˵�����������;
Global.folding = function(s){
	s.hover(function() {
		$(this).addClass('on');
	}, function() {
		$(this).removeClass('on');
	});
};

//ȡ�ñ�ʶ�ﶨλdataλ�õ�rel�ͱ�ʶ�Ŵ�����Ϣ��name
(function(id){
	var tag = $(id);
	if(!tag.length){return};
	Global.rel = tag.attr('rel');
	Global.name = tag.attr('name');
	Global.pathname = (Global.rel ? '/' + Global.rel : '') + '/' + Global.name + '.htm';
	if (Global.isLocal) {
		Global.url = Global.rootPath + Global.pathname;
	} else {
		Global.url = location.href;
		Global.rootPath = Global.url.replace(Global.pathname, "");
	}
})('#category');

//url��ַ��ҳ����ת
if (!Global.isLocal && Global.name) {
	(function(){
		if(window === window.top){
			$.cookie('pos', Global.url, {path: '/'});
			location = Global.rootPath + (/^file:$/i.test(location.protocol) ? "/index.htm" : "");
		} else {
			var pos = $.cookie('pos');
			if(pos){
				$.cookie('pos',null,{path:'/'});
				$('#archives',topDocument).attr('src',pos);
			}
		}
	})();
}

//���ƺ���
(function() {
	var tip = "����������֧�ִ˹���,���ֶ����и��ơ�",
		clipboardData = window.clipboardData;
	if(!clipboardData){
		!function a(b,c,e){function f(d,j){if(!c[d]){if(!b[d]){var i=typeof require=='function'&&require;if(!j&&i)return i(d,!0);if(g)return g(d,!0);throw new Error("Cannot find module '"+d+"'")}var h=c[d]={exports:{}};b[d][0].call(h.exports,function(c){var a=b[d][1][c];return f(a?a:c)},h,h.exports,a,b,c,e)}return c[d].exports}var g=typeof require=='function'&&require;for(var d=0;d<e.length;d++)f(e[d]);return f}({1:[function(b,a,c){!function(e,h,p,n,k,g,q,j,l,m,i,b,c,d,f,o){'use strict';e=function(a,c){var b=a.style[c];if(a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=document.defaultView.getComputedStyle(a,null).getPropertyValue(c)),b=='auto'&&c=='cursor'){var e=['a'];for(var d=0;d<e.length;d++)if(a.tagName.toLowerCase()==e[d])return'pointer'}return b},h=function(a){if(!b.prototype._singleton)return;a||(a=window.event);var c;this!==window?c=this:a.target?c=a.target:a.srcElement&&(c=a.srcElement),b.prototype._singleton.setCurrent(c)},p=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent('on'+b,c)},n=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent('on'+b,c)},k=function(a,b){if(a.addClass)return a.addClass(b),a;if(b&&typeof b==='string'){var d=(b||'').split(/\s+/);if(a.nodeType===1)if(!a.className)a.className=b;else{var f=' '+a.className+' ',e=a.className;for(var c=0,g=d.length;c<g;c++)f.indexOf(' '+d[c]+' ')<0&&(e+=' '+d[c]);a.className=e.replace(/^\s+|\s+$/g,'')}}return a},g=function(a,b){if(a.removeClass)return a.removeClass(b),a;if(b&&typeof b==='string'||b===undefined){var e=(b||'').split(/\s+/);if(a.nodeType===1&&a.className)if(b){var c=(' '+a.className+' ').replace(/[\n\t]/g,' ');for(var d=0,f=e.length;d<f;d++)c=c.replace(' '+e[d]+' ',' ');a.className=c.replace(/^\s+|\s+$/g,'')}else a.className=''}return a},q=function(a){var b={left:0,top:0,width: $(a).outerWidth(),height:$(a).outerHeight(),zIndex:9999},c=e(a,'zIndex');c&&c!='auto'&&(b.zIndex=parseInt(c,10));while(a){var d=parseInt(e(a,'borderLeftWidth'),10),f=parseInt(e(a,'borderTopWidth'),10);b.left+=isNaN(a.offsetLeft)?0:a.offsetLeft,b.left+=isNaN(d)?0:d,b.top+=isNaN(a.offsetTop)?0:a.offsetTop,b.top+=isNaN(f)?0:f,a=a.offsetParent}return b},j=function(a){return(a.indexOf('?')>=0?'&nocache=':'?nocache=')+new Date().getTime()},l=function(a){var b=[];return a.trustedDomains&&(typeof a.trustedDomains==='string'?b.push('trustedDomain='+a.trustedDomains):b.push('trustedDomain='+a.trustedDomains.join(','))),b.join('&')},m=function(c,b){if(b.indexOf)return b.indexOf(c);for(var a=0,d=b.length;a<d;a++)if(b[a]===c)return a;return-1},i=function(a){if(typeof a==='string')throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},b=function(d,e){if(d&&(b.prototype._singleton||this).glue(d),b.prototype._singleton)return b.prototype._singleton;b.prototype._singleton=this,this.options={};for(var a in f)this.options[a]=f[a];for(var c in e)this.options[c]=e[c];this.handlers={},b.detectFlashSupport()&&o()},d=[],b.prototype.setCurrent=function(a){c=a,this.reposition(),a.getAttribute('title')&&this.setTitle(a.getAttribute('title')),this.setHandCursor(e(a,'cursor')=='pointer')},b.prototype.setText=function(a){a&&a!==''&&(this.options.text=a,this.ready()&&this.flashBridge.setText(a))},b.prototype.setTitle=function(a){a&&a!==''&&this.htmlBridge.setAttribute('title',a)},b.prototype.setSize=function(a,b){this.ready()&&this.flashBridge.setSize(a,b)},b.prototype.setHandCursor=function(a){this.ready()&&this.flashBridge.setHandCursor(a)},b.version='1.1.7',f={moviePath:'ZeroClipboard.swf',trustedDomains:null,text:null,hoverClass:'zeroclipboard-is-hover',activeClass:'zeroclipboard-is-active',allowScriptAccess:'sameDomain'},b.setDefaults=function(b){for(var a in b)f[a]=b[a]},b.destroy=function(){b.prototype._singleton.unglue(d);var a=b.prototype._singleton.htmlBridge;a.parentNode.removeChild(a),delete b.prototype._singleton},b.detectFlashSupport=function(){var a=!1;try{new ActiveXObject('ShockwaveFlash.ShockwaveFlash'),a=!0}catch(b){navigator.mimeTypes['application/x-shockwave-flash']&&(a=!0)}return a},o=function(){var c=b.prototype._singleton,a=document.getElementById('global-zeroclipboard-html-bridge');if(!a){var d='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+c.options.moviePath+j(c.options.moviePath)+'"/>         <param name="allowScriptAccess" value="'+c.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+l(c.options)+'"/>         <embed src="'+c.options.moviePath+j(c.options.moviePath)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+l(c.options)+'"           scale="exactfit">         </embed>       </object>';a=document.createElement('div'),a.id='global-zeroclipboard-html-bridge',a.setAttribute('class','global-zeroclipboard-container'),a.setAttribute('data-clipboard-ready',!1),a.style.position='absolute',a.style.left='-9999px',a.style.top='-9999px',a.style.width='15px',a.style.height='15px',a.style.zIndex='9999',a.innerHTML=d,document.body.appendChild(a)}c.htmlBridge=a,c.flashBridge=document['global-zeroclipboard-flash-bridge']||a.children[0].lastElementChild},b.prototype.resetBridge=function(){this.htmlBridge.style.left='-9999px',this.htmlBridge.style.top='-9999px',this.htmlBridge.removeAttribute('title'),this.htmlBridge.removeAttribute('data-clipboard-text'),g(c,this.options.activeClass),c=null,this.options.text=null},b.prototype.ready=function(){var a=this.htmlBridge.getAttribute('data-clipboard-ready');return a==='true'||a===!0},b.prototype.reposition=function(){if(!c)return!1;var a=q(c);this.htmlBridge.style.top=a.top+'px',this.htmlBridge.style.left=a.left+'px',this.htmlBridge.style.width=a.width+'px',this.htmlBridge.style.height=a.height+'px',this.htmlBridge.style.zIndex=a.zIndex+1,this.setSize(a.width,a.height)},b.dispatch=function(a,c){b.prototype._singleton.receiveEvent(a,c)},b.prototype.on=function(a,e){var d=a.toString().split(/\s/g);for(var c=0;c<d.length;c++)a=d[c].toLowerCase().replace(/^on/,''),this.handlers[a]||(this.handlers[a]=e);this.handlers.noflash&&!b.detectFlashSupport()&&this.receiveEvent('onNoFlash',null)},b.prototype.addEventListener=b.prototype.on,b.prototype.off=function(c,e){var d=c.toString().split(/\s/g);for(var a=0;a<d.length;a++){c=d[a].toLowerCase().replace(/^on/,'');for(var b in this.handlers)b===c&&this.handlers[b]===e&&delete this.handlers[b]}},b.prototype.removeEventListener=b.prototype.off,b.prototype.receiveEvent=function(b,d){b=b.toString().toLowerCase().replace(/^on/,'');var a=c;switch(b){case'load':if(d&&parseFloat(d.flashVersion.replace(',','.').replace(/[^0-9\.]/gi,''))<10){this.receiveEvent('onWrongFlash',{flashVersion:d.flashVersion});return}this.htmlBridge.setAttribute('data-clipboard-ready',!0);break;case'mouseover':k(a,this.options.hoverClass);break;case'mouseout':g(a,this.options.hoverClass);this.resetBridge();break;case'mousedown':k(a,this.options.activeClass);break;case'mouseup':g(a,this.options.activeClass);break;case'datarequested':var h=a.getAttribute('data-clipboard-target'),e=h?document.getElementById(h):null;if(e){var i=e.value||e.textContent||e.innerText;i&&this.setText(i)}else{var j=a.getAttribute('data-clipboard-text');j&&this.setText(j)}break;case'complete':this.options.text=null;break}if(this.handlers[b]){var f=this.handlers[b];typeof f=='function'?f.call(a,this,d):typeof f=='string'&&window[f].call(a,this,d)}},b.prototype.glue=function(a){a=i(a);for(var b=0;b<a.length;b++)m(a[b],d)==-1&&(d.push(a[b]),p(a[b],'mouseover',h))},b.prototype.unglue=function(a){a=i(a);for(var b=0;b<a.length;b++){n(a[b],'mouseover',h);var c=m(a[b],d);c!=-1&&d.splice(c,1)}},a!==void 0?a.exports=b:typeof define==='function'&&define.amd?define(function(){return b}):window.ZeroClipboard=b}()},{}],2:[function(h,j,i){var c=typeof self!=='undefined'?self:typeof window!=='undefined'?window:{},e=c.ZeroClipboard=h('ZeroClipboard'),g={path:'ZeroClipboard.swf',copy:null,beforeCopy:null,afterCopy:null,clickAfter:!0},f=function(a){return a=0,function(){return a++}}(),d={},b,a=jQuery;a.fn.zclip=function(i){var h,j;if(a.isPlainObject(i))h=a.extend({},g,i),j=f(),d[j]=h,this.data('zclip-client',j),b?b.glue(this):b=new e(this,{moviePath:h.path,trustedDomains:[c.location.protocol+'//'+c.location.host],hoverClass:'hover',activeClass:'active'}),a.isFunction(h.copy)&&this.on('zClip_copy',a.proxy(h.copy,this)),a.isFunction(h.beforeCopy)&&this.on('zClip_beforeCopy',a.proxy(h.beforeCopy,this)),a.isFunction(h.afterCopy)&&this.on('zClip_afterCopy',a.proxy(h.afterCopy,this)),b.on('mouseover',function(){var b=a(this);b.trigger('mouseenter')}),b.on('mouseout',function(){var b=a(this);b.trigger('mouseleave')}),b.on('mousedown',function(){var b=a(this);b.trigger('mousedown')}),b.on('load',function(a){a.setHandCursor(h.setHandCursor)}),b.on('complete',function(h,g){var b=g.text,e=a(this),f=d[e.data('zclip-client')];a.isFunction(f.afterCopy)?e.trigger('zClip_afterCopy',b):(b.length>500&&(b=b.substr(0,500)+'\u2026\n\n('+(b.length-500)+'characters not shown)'),c.alert('Copied text to clipboard:\n\n'+g.text)),f.clickAfter&&e.trigger('click')}),b.on('dataRequested',function(e){var b=a(this),c=d[b.data('zclip-client')];b.trigger('zClip_beforeCopy'),a.isFunction(c.copy)?e.setText(String(b.triggerHandler('zClip_copy'))):e.setText(c.copy)}),a(c).on('load resize',function(){b.reposition()});else if(b&&typeof i==='string')switch(i){case'remove':case'hide':b.unglue(this);break;case'show':b.glue(this)}}},{ZeroClipboard:1}]},{},[2])
	}
	Global.copy = function(btn, content, isAlertContent) {
		if (btn && btn.length) {
			content = content.replace(/\s+$/, "");
			btn.click(function(e) {
				e.preventDefault();
				try {
					clipboardData.setData("text", content);
				} catch (ex) {
					// ���������isAlertContent����������޷�����ʱ��������tip����content��
					if (isAlertContent) {
						prompt(tip + "\n���ӵ�ַΪ��", content);
					} else {
						alert(tip);
					}
				}
			});
			if ($.fn.zclip) {
				btn.zclip({
					afterCopy: function() {},
					path: Global.rootPath + "/js/ZeroClipboard.swf",
					clickAfter: false,
					copy: content
				});
			}
		}
	};
})();


/*
 * ���������˵�
 *
 * ����sΪjquery����֮��������˵�����������,����idΪ��ʶ;
 */
(function(){
	var creatMenu = function(s){

		// ����֪ʶ��
		// ���� ������creatMenu��֪ʶ��,Ӧ�ó�����iframe�ڲ������������˵���
		// �ṹ ��ÿ�����ݵ�����ֵ+'htm'Ϊ�Լ���url��ַ,�����������url��ַΪindex.html.
		// 		  ��һ��ֵΪÿ�������Լ������֣�����Ļ�Ĭ��������ֵ��ͬ��
		// 		  �ڶ���ֵΪ�����Լ��������ô�Լ���ѡ�е�ʱ����ʾ�����֡�
		this.data = {

			'index' : ['�ٲ�����ͨ��','�ٲ�����ͨ��'],
			introduction : {
				'index' : ['���','���������Ŀ'],
				'change-list' : ['������ʷ'],
				'about-this-handbook' : ['���ڱ��ֲ�'],
				'what-is-css' : ['������ʽ��'],
				'about-me' : ['��������'],
				'guide' : ['�Ķ���ʹ��ָ��'],
				'thanks' : ['��л'],
				'contribute' : ['����']
			},

			properties : {
				'index' : ['�����б�','�������Բο�'],
				positioning : {
					'index' : ['��λ(Positioning)','������λ���Բο�'],
					'position' : [],
					'z-index' : [],
					'top' : [],
					'right' : [],
					'bottom' : [],
					'left' : [],
					'clip' : []
				},
				layout : {
					'index' : ['����(Layout)','�����������Բο�'],
					'display' : [],
					'float' : [],
					'clear' : [],
					'visibility' : [],
					'overflow' : []
				},
				dimension : {
					'index' : ['�ߴ��벹��(Ddimension)','�����ߴ��벹�ײο�'],
					'width' : [],
					'min-width' : [],
					'max-width' : [],
					'height' : [],
					'min-height' : [],
					'max-height' : [],
					'margin' : [],
					'padding' : []
				},
				backgrounds : {
					'index' : ['������߿�(Backgrounds and Borders)','���������߿�ο�'],
					'border' : [],
					'border-width' : [],
					'border-style' : [],
					'border-color' : [],
					'box-shadow' : [],
					'border-radius' : [],
					'border-image' : [],
					'border-image-source' : [],
					'border-image-slice' : [],
					'border-image-width' : [],
					'border-image-outset' : [],
					'border-image-repeat' : [],
					'background' : [],
					'background-color' : [],
					'background-image' : [],
					'background-repeat' : [],
					'background-attachment' : [],
					'background-position' : [],
					'background-origin' : [],
					'background-clip' : [],
					'background-size' : []
				},
				color : {
					'index' : ['��ɫ(Color)','������ɫ���Բο�'],
					'color' : [],
					'opacity' : []
				},
				font : {
					'index' : ['����(Font)','�����������Բο�'],
					'font' : [],
					'font-style' : [],
					'font-variant' : [],
					'font-weight' : [],
					'font-size' : [],
					'font-family' : [],
					'font-stretch' : [],
					'font-size-adjust' : []
				},
				text : {
					'index' : ['����(text)','�����ı����Բο�'],
					'text-transform' : [],
					'white-space' : [],
					'tab-size' : [],
					'word-break' : [],
					'overflow-wrap' : [],
					'text-align' : [],
					'text-align-last' : [],
					'text-justify' : [],
					'word-spacing' : [],
					'letter-spacing' : [],
					'text-indent' : [],
					'vertical-align' : [],
					'line-height' : [],
					'text-size-adjust' : []
				},
				'text-decoration' : {
					'index' : ['�ı�װ��(Text Decoration)','�����ı�װ������'],
					'text-decoration' : [],
					'text-decoration-line' : [],
					'text-decoration-color' : [],
					'text-decoration-style' : [],
					'text-decoration-skip' : [],
					'text-underline-position' : [],
					'text-shadow' : []
				},
				'writing-modes' : {
					'index' : ['��дģʽ(Writing Modes)','������дģʽ����'],
					'direction' : [],
					'unicode-bidi' : []
				},
				'list' : {
					'index' : ['�б�(list)','�����б����Բο�'],
					'list-style' : [],
					'list-style-image' : [],
					'list-style-position' : [],
					'list-style-type' : []
				},
				'table' : {
					'index' : ['���(table)','����������Բο�'],
					'table-layout' : [],
					'border-collapse' : [],
					'border-spacing' : [],
					'caption-side' : [],
					'empty-cells' : []
				},
				'content' : {
					'index' : ['����(Content)','�����������Բο�'],
					'content' : [],
					'counter-increment' : [],
					'counter-reset' : [],
					'quotes' : []
				},
				'user-interface' : {
					'index' : ['�û�����(User Interface)','�����û���������'],
					'appearance' : [],
					'text-overflow' : [],
					'outline' : [],
					'outline-width' : [],
					'outline-color' : [],
					'outline-style' : [],
					'outline-offset' : [],
					'nav-index' : [],
					'nav-up' : [],
					'nav-right' : [],
					'nav-down' : [],
					'nav-left' : [],
					'cursor' : [],
					'zoom' : [],
					'box-sizing' : [],
					'resize' : [],
					'ime-mode' : [],
					'user-select' : [],
					'pointer-events' : []
				},
				'multi-column' : {
					'index' : ['����(Multi-column)','�����������Բο�'],
					'columns' : [],
					'columns-width' : [],
					'columns-count' : [],
					'columns-gap' : [],
					'columns-rule' : [],
					'columns-rule-width' : [],
					'columns-rule-style' : [],
					'columns-rule-color' : [],
					'columns-span' : [],
					'columns-fill' : [],
					'columns-break-before' : [],
					'columns-break-after' : [],
					'columns-break-inside' : []
				},
				'flexible-box' : {
					'index' : ['���Ժ�ģ��(Flexible Box)(��)','�������Ժ�ģ������'],
					'box-orient' : [],
					'box-pack' : [],
					'box-align' : [],
					'box-flex' : [],
					'box-flex-group' : [],
					'box-ordinal-group' : [],
					'box-direction' : [],
					'box-lines' : []
				},
				'flex' : {
					'index' : ['���Ժ�ģ��(Flexible Box)(��)','�������Ժ�ģ������'],
					'flex' : [],
					'flex-basis' : [],
					'flex-direction' : [],
					'flex-flow' : [],
					'flex-grow' : [],
					'flex-shrink' : [],
					'flex-wrap' : [],
					'align-contnet' : [],
					'align-items' : [],
					'align-self' : [],
					'justify-content' : [],
					'order' : []
				},
				'transform' : {
					'index' : ['�任(Transform)','�����任���Բο�'],
					'transform' : [],
					'transform-origin' : [],
					'transform-style' : [],
					'perspective' : [],
					'perspective-origin' : [],
					'backface-visibility' : []
				},
				'transition' : {
					'index' : ['����(Transition)','�����������Բο�'],
					'transition' : [],
					'transition-property' : [],
					'transition-duration' : [],
					'transition-timing-function' : [],
					'transition-delay' : []
				},
				'animation' : {
					'index' : ['����(Animation)','�����������Բο�'],
					'animation' : [],
					'animation-name' : [],
					'animation-duration' : [],
					'animation-timing-function' : [],
					'animation-delay' : [],
					'animation-iteration-count' : [],
					'animation-direction' : [],
					'animation-play-state' : [],
					'animation-fill-mode' : []
				},
				'printing' : {
					'index' : ['��ӡ(printing)','������ӡ���Բο�'],
					'page' : [],
					'page-break-before' : [],
					'page-break-after' : [],
					'page-break-inside' : []
				},
				'media-queries' : {
					'index' : ['ý���ѯ(Media Queries)','����ý���ѯ����'],
					'width' : [],
					'height' : [],
					'device-width' : [],
					'device-height' : [],
					'orientation' : [],
					'aspect-ratio' : [],
					'color' : [],
					'color-index' : [],
					'monochrome' : [],
					'resolution' : [],
					'scan' : [],
					'grid' : []
				},
				'only-ie' : {
					'index' : ['Only IE','Only IE����'],
					'scrollbar-3dlight-color' : [],
					'scrollbar-darkshadow-color	' : [],
					'scrollbar-highlight-color' : [],
					'scrollbar-shadow-color' : [],
					'scrollbar-arrow-color' : [],
					'scrollbar-face-color' : [],
					'scrollbar-track-color	' : [],
					'scrollbar-base-color' : [],
					'filter' : [],
					'behavior' : []
				},
				'only-webkit' : {
					'index' : ['Only Webkit','Only Webkit����'],
					'-webkit-box-reflect' : [],
					'-webkit-text-fill-color' : [],
					'-webkit-text-stroke' : [],
					'-webkit-text-stroke-width' : [],
					'-webkit-text-stroke-color' : [],
					'-webkit-tap-highlight-color' : [],
					'-webkit-user-drag' : [],
					'-webkit-overflow-scrolling' : []
				}
			},

			rules : {
				'index' : ['�﷨�����','�����﷨�����ο�'],
				'!important' : [],
				'comment' : [],
				'@import' : [],
				'@charset' : [],
				'@media' : [],
				'@font-face' : [],
				'@page' : [],
				'@keyframes' : [],
				'@supports' : []
			},

			selectors : {
				'index' : ['ѡ����б�','����ѡ����ο�'],
				'element' : {
					'index' : ['Ԫ��ѡ���','����Ԫ��ѡ����ο�'],
					'all' : ['ͨ��ѡ���(*)'],
					'e' : ['����ѡ���(E)'],
					'id' : ['IDѡ���(E#id)'],
					'class' : ['��ѡ���(E.class)']
				},
				'relationship' : {
					'index' : ['��ϵѡ���','������ϵѡ����ο�'],
					'ef' : ['����ѡ���(E F)'],
					'e-child-f' : ['��ѡ���(E>F)'],
					'e-adjacent-f' : ['����ѡ���(E+F)'],
					'e-brother-f' : ['�ֵ�ѡ���(E~F)']
				},
				'attribute' : {
					'index' : ['����ѡ���','��������ѡ����ο�'],
					'att' : ['E[att]'],
					'att2' : ['E[att="val"]'],
					'att3' : ['E[att~="val"]'],
					'att4' : ['E[att^="val"]'],
					'att5' : ['E[att$="val"]'],
					'att6' : ['E[att*="val"]'],
					'att7' : ['E[att|="val"]']
				},
				'pseudo-classes' : {
					'index' : ['α��ѡ���','����α��ѡ���'],
					'link' : ['E:link'],
					'visited' : ['E:visited'],
					'hover' : ['E:hover'],
					'active' : ['E:active'],
					'focus' : ['E:focus'],
					'lang(fr)' : ['E:lang(fr)'],
					'not(s)' : ['E:not(s)'],
					'root' : ['E:root'],
					'first-child' : ['E:first-child'],
					'last-child' : ['E:last-child'],
					'only-child' : ['E:only-child'],
					'nth-child(n)' : ['E:nth-child(n)'],
					'nth-last-child(n)' : ['E:nth-last-child(n)'],
					'first-of-type' : ['E:first-of-type'],
					'last-of-type' : ['E:last-of-type'],
					'only-of-type' : ['E:only-of-type'],
					'nth-of-type(n)' : ['E:nth-of-type(n)'],
					'nth-last-of-type(n)' : ['E:nth-last-of-type(n)'],
					'empty' : ['E:empty'],
					'checked' : ['E:checked'],
					'enabled' : ['E:enabled'],
					'disabled' : ['E:disabled'],
					'target' : ['E:target'],
					'@page-first' : ['@page-first'],
					'@page-left' : ['@page-left'],
					'@page-right' : ['@page-right']
				},
				'pseudo-element' : {
					'index' : ['α����ѡ���','����α����ѡ���'],
					'first-letter' : ['E::first-letter'],
					'first-line' : ['E::first-line'],
					'before' : ['E::before'],
					'after' : ['E::after'],
					'placeholder' : ['E::placeholder'],
					'selection' : ['E::selection']
				}
			},

			values : {
				'index' : ['ȡֵ Values','����ȡֵ�뵥λ�ο�'],
				'length' : {
					'index' : ['����(Length)','����ֵ�뵥λ�ο�'],
					'length' : ['&lt;length&gt;'],
					'em' : [],
					'ex' : [],
					'ch' : [],
					'rem' : [],
					'vw' : [],
					'vh' : [],
					'vmax' : [],
					'vmin' : [],
					'cm' : [],
					'mm' : [],
					'q' : [],
					'in' : [],
					'pt' : [],
					'pc' : [],
					'px' : []
				},
				'angle' : {
					'index' : ['�Ƕ�(Angle)','�Ƕ�ֵ�뵥λ�ο�'],
					'angle' : ['&lt;angle&gt;'],
					'deg' : [],
					'grad' : [],
					'rad' : [],
					'turn' : []
				},
				'time' : {
					'index' : ['ʱ��(Time)','ʱ��ֵ�뵥λ�ο�'],
					'time' : ['&lt;time&gt;'],
					's' : [],
					'ms' : []
				},
				'frequency' : {
					'index' : ['Ƶ��(Frequency)','Ƶ��ֵ�뵥λ�ο�'],
					'frequency' : ['&lt;frequency&gt;'],
					'Hz' : [],
					'kHz' : []
				},
				'layout-specific' : {
					'index' : ['����(Layout-specific)','����ֵ�뵥λ�ο�'],
					'fraction' : ['&lt;fraction&gt;'],
					'grid' : ['&lt;grid&gt;'],
					'fr' : [],
					'gr' : []
				},
				'resolution' : {
					'index' : ['�ֱ���(Resolution)','�����ֱ��ʵ�λ�ο�'],
					'resolution' : ['&lt;resolution&gt;'],
					'dpi' : [],
					'dpcm' : [],
					'dppx' : []
				},
				'color' : {
					'index' : ['��ɫ(Color)','������ɫֵ�ο�'],
					'color' : ['&lt;color&gt;'],
					'color-name' : ['Color Name'],
					'hex' : ['HEX'],
					'rgb' : ['RGB'],
					'rgba' : ['RGBA'],
					'hsl' : ['HSL'],
					'hsla' : ['HSLA'],
					'transparent' : [],
					'currentColor' : []
				},
				'textual' : {
					'index' : ['�ı�(Textual)','�����ı�ֵ�ο�'],
					'inherit' : [],
					'initial' : [],
					'string' : ['&lt;string&gt;'],
					'url' : ['&lt;url&gt;'],
					'identifier' : ['&lt;identifier&gt;']
				},
				'content' : {
					'index' : ['��������(Content)','������������ֵ�ο�'],
					'counter()' : [],
					'counters()' : [],
					'attr()' : []
				},
				'functional' : {
					'index' : ['����(Functional)','��������ֵ�ο�'],
					'calc()' : [],
					'min()' : [],
					'max()' : [],
					'toggle()' : []
				},
				'image' : {
					'index' : ['ͼ��(Image)','����ͼ��ֵ�ο�'],
					'image' : ['&lt;image&gt;'],
					'image()' : [],
					'image-set()' : [],
					'gradient' : ['&lt;gradient&gt;'],
					'linear-gradient()' : [],
					'radial-gradient()' : [],
					'repeating-linear-gradient()' : [],
					'repeating-radial-gradient()' : []
				},
				'numeric' : {
					'index' : ['����(Numeric)','��������ֵ�ο�'],
					'number' : ['&lt;number&gt;'],
					'integer' : ['&lt;integer&gt;'],
					'percentage' : ['&lt;percentage&gt;']
				}
			},

			appendix : {
				'index' : ['��¼ Appendix','����CSS��¼�ο�'],
				'color-keywords' : ['��ɫ�ؼ���(Color Keywords)'],
				'media-types' : ['ý������(Media Types)']
			},

			hack : {
				'index' : ['CSS Hack','����CSS Hack�ο�'],
				'conditions' : ['����Hack'],
				'properties' : ['���Լ�Hack'],
				'selectors' : ['ѡ�����Hack']
			},

			experience : {
				'index' : ['����;���','��������;���ο�'],
				'refer' : ['�ο���Դ�б�'],
				'bugs' : ['Bugs�ͽ������'],
				'skill' : ['���ɺ;���'],
				'other' : ['��������']
			}
		}
		this.searchData();
		this.drawMenu(s);
	}

	//���ݱ�ʶȡ�ô����֪ʶ��
	creatMenu.prototype.searchData = function (){
		var i = 0,
			arr = Global.rel.split('/') || [],
			len = arr.length,
			temp;
		for (i ; i<len ; i++){
			temp = arr[i];
			if(temp != ''){
				this.data = this.data[temp];
			}
		}
	}

	//����֪ʶ��������ݻ��Ƴ������˵�
	creatMenu.prototype.drawMenu = function (s){
		var menu = $(s),
			title = menu.find('strong'),
			list = menu.find('ul'),
			listHtml = '',
			url='',
			name='',
			key,
			val;
		for(key in this.data){
			if (key == 'index'){continue;}
			else{
				val = this.data[key];
				if (val instanceof Array){
					name = val.length==0?key:val[0];
					url = key+'.htm';
				}else{
					name = val.index[0];
					url = key+'/index.htm';
				}
				listHtml += '<li><a href="'+url+'">'+name+'</a>'+'</li>';
			}
		}
		title.html(this.data.index[1]);
		list.html(listHtml);
	}

	//����ʵ��
	var s=$('#guide .g-combobox');
	if(s.length){new creatMenu(s);}
})();


/*
 * ҳ���ڵ�С����
 */
(function(){
	//�õ�UA��������汾
	var UA = navigator.userAgent,
		gteWin7 = UA.match(/Windows NT ([\d\.]+)/) && parseFloat(RegExp.$1) > 6,
		isiPad = UA.match(/iPad/),
		isiPhone = UA.match(/iPhone/),
		isiPod = UA.match(/iPod/);

	//������ҳ������һЩͨ�õ�ģ�飬��ִ�л�������copyright�ȡ�
	(function (){
		//��ҳ��ͷ����������Ӳ��Ի���������ģ��
		var testBrowser =
		'<div class="g-browser g-clear">'+
			'<ul>'+
				'<li><a href="https://github.com/doyoe/css-handbook/issues" target="_blank" rel="external" class="external">Issues</a></li>'+
				'<li><a href="https://github.com/doyoe/css-handbook/pulls" target="_blank" rel="external" class="external">Pull Requests</a></li>'+
			'</ul>'+
			'<p>Base Browsers: IE8.0+, Firefox40.0+, Chrome40.0+, iOS8.0+, Android4.4+, Opera40.0+</p>'+
		'</div>';

		$('#title').append(testBrowser);
		$('#rights').append(testBrowser);

		//��ҳ��ĵ��������copyrightģ��
		var copyright = '<p class="copyright">Copyright ? 2006-'+ new Date().getFullYear() +' <a href="http://www.doyoe.com/" rel="external" target="_blank">Doyoe</a>. All Rights Reserved</p>'
		$('#rights').append(copyright);

		//��ҳ��ı��������ӷ�����ģ��,�������ӵ�
		var share = '<div id="share" class="g-combobox g-transition share">'+
			'<div class="g-transition target">'+
			'	<strong>����</strong>'+
			'	<span>ѡ��������<!--[if lte IE 7]><ins>IE7 and earlier, Get to die</ins><![endif]--></span>'+
			'</div>'+
			'<div class="g-transition list"><ul>'+
			'<li><a href="#" class="weibo">����΢��</a></li>'+
			'<li><a href="#" class="qq">QQ�ռ�</a></li>'+
			'<li><a href="#" class="renren">������</a></li>'+
			'<li><a href="#" class="douban">����</a></li>'+
			'</ul></div></div>';
		var copyLink = '<a href="#" id="copylink" class="copylink">���Ʊ�ҳ����</a>'
		var tit = $('#hd .tit');
		if(tit.length){
			Global.title = tit.html();
			tit.after(copyLink).after(share);
		}

	})();

	//���Ʊ�ҳ���ӹ���
	Global.copy($("#copylink"), Global.url, true);

	//������
	(function(){
		var container = $('#share'),
			title = Global.title ? encodeURIComponent('CSS�ο��ֲᡡ' + Global.title + '�����ʳ��֣�') : encodeURIComponent('CSS�ο��ֲ�'),
			url =  Global.url,
			pic = Global.rootPath + "/images/share.png";

		if(!container.length) return;

		// ����΢��
		container.delegate('.weibo', 'click', function() {
			window.open('http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&pic=' + pic, '_blank');
			return false;
		});

		// QQ�ռ�
		container.delegate('.qq', 'click', function() {
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?site=www.tuan2.com&title=' + '' + '&desc=' + title + '&summary=' + '' + '&url=' + url + '&pics=' + pic, '_blank');
			return false;
		});

		// ������
		container.delegate('.renren', 'click', function() {
			window.open('http://widget.renren.com/dialog/share?resourceUrl=' + url + '&title=' + title + '&description=' + '' + '&pic=' + pic + '&charset=utf-8', '_blank')
			return false;
		});

		// ����
		container.delegate('.douban', 'click', function() {
			window.open('http://www.douban.com/recommend/?title=' + title + '&url=' + url, '_blank');
			return false;
		});
	})();

	//ipad ������ʧЧ����ÿ��ҳ��������һ�㡣
	(function(){
		if(!isiPad && !isiPhone && !isiPod){return;}
		if($('#wrapper').length){return;}
		$('body').children().not('script').wrapAll('<div id="wrapper"></div>');
	})();

	//����ʾ�������Լ���ز���
	(function(){
		var example = $('#example'),
			content = example.find('textarea'),
			btnRun = example.find('.g-btn-sure');

		if (example.length) {
			//��Ӹ��ƴ���İ�ť
			var copyCode = '<input type="button" class="g-btn g-btn-copy" value="����">';
			btnRun.after(copyCode);

			//���д���
			if (Global.isLocal && gteWin7) {

				//�����win7�µ�chm�汾����֧��ֱ�Ӵ����������
				btnRun.on({
					click: function(e) {
						e.preventDefault();
						if (confirm('���β�������������д򿪣�����ֲ����߰��е�����а�ť')) {
							var codeWin = window.open(Global.url);
						}
					}
				});
			} else {
				btnRun.on({
					click: function(e) {
						e.preventDefault();
						var codeWin = window.open();
						codeWin.document.write(content.val());
						codeWin.document.close();
					}
				});
			}

			//���ƴ���
			Global.copy(example.find(".g-btn-copy"), content.val());
		}
	})();

	//Ϊ�Լ���������չ��������۵�Ч��
	Global.folding($('.g-combobox'));

	$(".g-combobox .target").click(function(e) {
		e.preventDefault();
	});
})();


/*
 * ����Ĺ���
 */
(function(){

//�����chm�汾��û�и���ͷ��غ���
if(window == window.top){return false;}

//��������������б��չ��������۵�Ч��

Global.folding($('.g-combobox',topDocument));

/*
 * ���� ����������չ�����𡢵�����iframe��ת
 *
 * ����jquery.js;
 */
(function(){
	var dytree = $('#dytree',topDocument);
	var iframe = $('#archives',topDocument),
		allLinks = dytree.find('a'),
		allFolder = dytree.find('.haschild'),
		allList = dytree.find('ul');

	//�ø�ҳ���е����ĵ������ж�Ӧ��ҳ�����ڴ򿪵��� ��ѡ��.
	(function(){
		if(!Global.name){return false;}
			var url = Global.pathname.slice(1),
			onLink = dytree.find('a[href="'+url+'"]'),
			onLinkList = onLink.parents('ul'),
			onLinkFolder = onLinkList.siblings('.haschild'),
			onFolder = onLink.parents('.haschild'),
			onFolderList = onFolder.siblings('ul');

		//ѡ������
		allLinks.removeClass('on');
		onLink.addClass('on');

		//���������ļ��С�
		allFolder.removeClass('open')
		allList.removeClass('unfold');

		//չ����ѡ�е�����֮�ϵ��ļ��С�
		onLinkFolder.addClass('open');
		onLinkList.addClass('unfold');
		onFolder.addClass('open');
		onFolderList.addClass('unfold');
	})();

	if(Global.notIE && dytree.prop('loaded')){
		return;
	}


	//չ����������л�
	allFolder.on({
		click : function(){
			var _this = $(this),
				item = _this,
				list = item.siblings('ul');

			item.hasClass('open') ? item.removeClass('open') : item.addClass('open');
			list.hasClass('unfold') ? list.removeClass('unfold') : list.addClass('unfold');
		}
	})

	//�������ʱ�����Ҳ�iframe�ĵ�ַ,��ʾ��ǰѡ��,��ֹĬ����Ϊ
	dytree.on("click", "a", function(e){
		//��ֹĬ����Ϊ
		e.preventDefault();
		var _this = $(this),
			iframeSrc = _this.attr('href');

		//�����Ҳ�iframe��ַ
		iframe.attr('src',iframeSrc);

		//��ʾ��ǰѡ��
		allLinks.removeClass('on');
		_this.addClass('on');

	});

	dytree.prop('loaded', true);

})();

})();
