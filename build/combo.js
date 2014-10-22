!function(a,b){function c(a,b){function c(){r||(r=!0,l=a.querySelector("canvas"),m=l.getContext("2d"),p=.13373158940994154,q=.06015722128359704);var b=l.getBoundingClientRect();(l.width!==b.width*s||l.height!==b.height*s)&&(l.width=b.width*s,l.height=b.height*s,n=b.width/2,o=n/15)}function f(){if("spin"===t){c();var a=0;!function(){"spin"===t&&(m.clearRect(0,0,l.width,l.height),m.beginPath(),m.arc(n*s,n*s,(n-o)*s,-p-Math.PI/2-a,-p-Math.PI/2-100*q-a,!0),m.lineWidth=o*s,m.strokeStyle="#ff5000",m.stroke(),m.closePath(),a+=4*Math.PI/60,d(arguments.callee))}()}}function g(a){"draw"===t&&(c(),a>100&&(a=100),m.clearRect(0,0,l.width*s,l.height*s),m.beginPath(),m.arc(n*s,n*s,(n-o)*s,-p-Math.PI/2,-p-Math.PI/2-q*a,!0),m.lineWidth=o*s,m.strokeStyle="#ff5000",m.stroke(),m.closePath())}function h(){var b=a.querySelector(".arrow");b.style.cssText="display: block"}function i(){var b=a.querySelector(".arrow");b.style.webkitTransform="scale(1)",b.style.opacity="1",d(function(){b.style.webkitTransition="-webkit-transform 0.4s ease-in 0, opacity 0.4s ease-in 0",b.style.webkitTransform="scale(0.5)",b.style.opacity="0",b.addEventListener("webkitTransitionEnd",function(){b.removeEventListener("webkitTransitionEnd",arguments.callee),b.style.cssText="display:none;"})})}var j=Date.now()+"-"+ ++e,k=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(b=arguments[0],a=null),a||(a=document.createElement("div"),k.appendChild(a)),b=b||{},a.setAttribute("data-ctrl-name","loading"),a.setAttribute("data-ctrl-id",j),a.innerHTML='<div><canvas></canvas><span class="arrow"></span></div><span class="text"></span>';var l,m,n,o,p,q,r=!1,s=2;Object.defineProperty(this,"bgcolor",{get:function(){return a.style.backgroundColor},set:function(b){if("string"!=typeof b)throw new Error("Non expected value");a.style.backgroundColor=b}}),Object.defineProperty(this,"text",{get:function(){return a.querySelector(".text").innerText},set:function(b){if("string"!=typeof b)throw new Error("Non expected value");var c=a.querySelector("div"),d=a.querySelector(".text");b?(a.style.webkitBoxPack="",c.style.marginLeft="",d.style.display="block",d.innerText=b):(a.style.webkitBoxPack="center",c.style.marginLeft="0",d.style.display="none",d.innerText="")}});var t="";Object.defineProperty(this,"mode",{get:function(){return t},set:function(a){if(!a&&"string"!=typeof a&&["draw","spin"].indexOf(a)<0)throw new Error("Non expected value");t=a,"spin"===t?(v&&i(),f()):"draw"===t&&(h(),g(0))}});var u=0;Object.defineProperty(this,"per",{get:function(){return u},set:function(a){if("draw"!==t)throw new Error('only work under "draw" mode');if(!a&&"number"!=typeof a&&0>a&&a>100)throw new Error("Non expected value");g(a)}});var v="";Object.defineProperty(this,"arrowDirection",{get:function(){return v},set:function(b){if(!b&&"string"!=typeof b&&["up","down",""].indexOf(b)<0)throw new Error("Non expected value");v=b,a.querySelector(".arrow").className="arrow "+b}}),this.remove=function(){a.parentNode&&a.parentNode.removeChild(a)},this.element=a,this.root=k}var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame||function(a){setTimeout(a,1/60*1e3)},e=0;b.loading=c}(window,window.ctrl||(window.ctrl={}));!function(a,b){function c(a,b){return[[(a/3+(a+b)/3-a)/(b-a),(a*a/3+a*b*2/3-a*a)/(b*b-a*a)],[(b/3+(a+b)/3-a)/(b-a),(b*b/3+a*b*2/3-a*a)/(b*b-a*a)]]}function d(a){if(this.v=a.v||0,this.a=a.a||0,"undefined"!=typeof a.t&&(this.t=a.t),"undefined"!=typeof a.s&&(this.s=a.s),"undefined"==typeof this.t)if("undefined"==typeof this.s)this.t=-this.v/this.a;else{var b=(Math.sqrt(this.v*this.v+2*this.a*this.s)-this.v)/this.a,c=(-Math.sqrt(this.v*this.v+2*this.a*this.s)-this.v)/this.a;this.t=Math.min(b,c)}"undefined"==typeof this.s&&(this.s=this.a*this.t*this.t/2+this.v*this.t)}d.prototype.generateCubicBezier=function(){return c(this.v/this.a,this.t+this.v/this.a)},b.motion=d}(window,window.lib||(window.lib={}));!function(a){"use strict";function b(a,b){for(var c=a;c;){if(c.contains(b)||c==b)return c;c=c.parentNode}return null}function c(a,b,c){var d=i.createEvent("HTMLEvents");if(d.initEvent(b,!0,!0),"object"==typeof c)for(var e in c)d[e]=c[e];a.dispatchEvent(d)}function d(a,b,c,d,e,f,g,h){var i=Math.atan2(h-f,g-e)-Math.atan2(d-b,c-a),j=Math.sqrt((Math.pow(h-f,2)+Math.pow(g-e,2))/(Math.pow(d-b,2)+Math.pow(c-a,2))),k=[e-j*a*Math.cos(i)+j*b*Math.sin(i),f-j*b*Math.cos(i)-j*a*Math.sin(i)];return{rotate:i,scale:j,translate:k,matrix:[[j*Math.cos(i),-j*Math.sin(i),k[0]],[j*Math.sin(i),j*Math.cos(i),k[1]],[0,0,1]]}}function e(a){0===Object.keys(l).length&&(j.addEventListener("touchmove",f,!1),j.addEventListener("touchend",g,!1),j.addEventListener("touchcancel",h,!1));for(var d=0;d<a.changedTouches.length;d++){var e=a.changedTouches[d],i={};for(var m in e)i[m]=e[m];var n={startTouch:i,startTime:Date.now(),status:"tapping",element:a.srcElement,pressingHandler:setTimeout(function(b){return function(){"tapping"===n.status&&(n.status="pressing",c(b,"press",{touchEvent:a})),clearTimeout(n.pressingHandler),n.pressingHandler=null}}(a.srcElement),500)};l[e.identifier]=n}if(2==Object.keys(l).length){var o=[];for(var m in l)o.push(l[m].element);c(b(o[0],o[1]),"dualtouchstart",{touches:k.call(a.touches),touchEvent:a})}}function f(a){for(var e=0;e<a.changedTouches.length;e++){var f=a.changedTouches[e],g=l[f.identifier];if(!g)return;g.lastTouch||(g.lastTouch=g.startTouch),g.lastTime||(g.lastTime=g.startTime),g.velocityX||(g.velocityX=0),g.velocityY||(g.velocityY=0),g.duration||(g.duration=0);var h=Date.now()-g.lastTime,i=(f.clientX-g.lastTouch.clientX)/h,j=(f.clientY-g.lastTouch.clientY)/h,k=70;h>k&&(h=k),g.duration+h>k&&(g.duration=k-h),g.velocityX=(g.velocityX*g.duration+i*h)/(g.duration+h),g.velocityY=(g.velocityY*g.duration+j*h)/(g.duration+h),g.duration+=h,g.lastTouch={};for(var m in f)g.lastTouch[m]=f[m];g.lastTime=Date.now();var n=f.clientX-g.startTouch.clientX,o=f.clientY-g.startTouch.clientY,p=Math.sqrt(Math.pow(n,2)+Math.pow(o,2));("tapping"===g.status||"pressing"===g.status)&&p>10&&(g.status="panning",g.isVertical=!(Math.abs(n)>Math.abs(o)),c(g.element,"panstart",{touch:f,touchEvent:a,isVertical:g.isVertical}),c(g.element,(g.isVertical?"vertical":"horizontal")+"panstart",{touch:f,touchEvent:a})),"panning"===g.status&&(g.panTime=Date.now(),c(g.element,"pan",{displacementX:n,displacementY:o,touch:f,touchEvent:a,isVertical:g.isVertical}),g.isVertical?c(g.element,"verticalpan",{displacementY:o,touch:f,touchEvent:a}):c(g.element,"horizontalpan",{displacementX:n,touch:f,touchEvent:a}))}if(2==Object.keys(l).length){for(var q,r=[],s=[],t=[],e=0;e<a.touches.length;e++){var f=a.touches[e],g=l[f.identifier];r.push([g.startTouch.clientX,g.startTouch.clientY]),s.push([f.clientX,f.clientY])}for(var m in l)t.push(l[m].element);q=d(r[0][0],r[0][1],r[1][0],r[1][1],s[0][0],s[0][1],s[1][0],s[1][1]),c(b(t[0],t[1]),"dualtouch",{transform:q,touches:a.touches,touchEvent:a})}}function g(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var n=a.changedTouches[i],o=n.identifier,p=l[o];if(p){if(p.pressingHandler&&(clearTimeout(p.pressingHandler),p.pressingHandler=null),"tapping"===p.status&&(p.timestamp=Date.now(),c(p.element,"tap",{touch:n,touchEvent:a}),m&&p.timestamp-m.timestamp<300&&c(p.element,"doubletap",{touch:n,touchEvent:a}),m=p),"panning"===p.status){var q=Date.now(),r=q-p.startTime,s=((n.clientX-p.startTouch.clientX)/r,(n.clientY-p.startTouch.clientY)/r,n.clientX-p.startTouch.clientX),t=n.clientY-p.startTouch.clientY,u=Math.sqrt(p.velocityY*p.velocityY+p.velocityX*p.velocityX),v=u>.5;c(p.element,"panend",{isflick:v,touch:n,touchEvent:a,isVertical:p.isVertical}),v&&(c(p.element,"flick",{duration:r,velocityX:p.velocityX,velocityY:p.velocityY,displacementX:s,displacementY:t,touch:n,touchEvent:a,isVertical:p.isVertical}),p.isVertical?c(p.element,"verticalflick",{duration:r,velocityY:p.velocityY,displacementY:t,touch:n,touchEvent:a}):c(p.element,"horizontalflick",{duration:r,velocityX:p.velocityX,displacementX:s,touch:n,touchEvent:a}))}"pressing"===p.status&&c(p.element,"pressend",{touch:n,touchEvent:a}),delete l[o]}}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}function h(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var m=a.changedTouches[i],n=m.identifier,o=l[n];o&&(o.pressingHandler&&(clearTimeout(o.pressingHandler),o.pressingHandler=null),"panning"===o.status&&c(o.element,"panend",{touch:m,touchEvent:a}),"pressing"===o.status&&c(o.element,"pressend",{touch:m,touchEvent:a}),delete l[n])}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}var i=a.document,j=i.documentElement,k=Array.prototype.slice,l={},m=null;j.addEventListener("touchstart",e,!1)}(window,window.lib||(window.lib={}));!function(a,b){function c(){b.scroll.outputDebugLog&&console.debug.apply(console,arguments)}function d(a){var b=a.getBoundingClientRect();if(!b){b={},b.width=a.offsetWidth,b.height=a.offsetHeight,b.left=a.offsetLeft,b.top=a.offsetTop;for(var c=a.offsetParent;c;)b.left+=c.offsetLeft,b.top+=c.offsetTop,c=c.offsetParent;b.right=b.left+b.width,b.bottom=b.top+b.height}return b}function e(a){return 0-a.options[a.axis+"Padding1"]}function f(a){var b=d(a.element),c=d(a.viewport),f=e(a);if("y"===a.axis)var g=0-b.height+c.height;else var g=0-b.width+c.width;return Math.min(g+a.options[a.axis+"Padding2"],f)}function g(a,b){return b>a.minScrollOffset?b-a.minScrollOffset:b<a.maxScrollOffset?b-a.maxScrollOffset:void 0}function h(a,b){return b>a.minScrollOffset?b=a.minScrollOffset:b<a.maxScrollOffset&&(b=a.maxScrollOffset),b}function i(a,b,d){c(a.element.scrollId,b,d);var e=m.createEvent("HTMLEvents");if(e.initEvent(b,!1,!0),e.scrollObj=a,d)for(var f in d)e[f]=d[f];a.element.dispatchEvent(e),a.viewport.dispatchEvent(e)}function j(a){var b,c={x:0,y:0},d=getComputedStyle(a.element).webkitTransform;return"none"!==d&&(b=d.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/)||d.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/))&&(c.x=parseFloat(b[1])||0,c.y=parseFloat(b[2])||0),c}function k(a,b){return q?"translate3d("+a+"px, "+b+"px, 0)":"translate("+a+"px, "+b+"px)"}function l(a,l){function m(a){return C||H?(a.preventDefault(),a.stopPropagation(),!1):!0}function q(a){C||H||setTimeout(function(){var b=document.createEvent("HTMLEvents");b.initEvent("niceclick",!0,!0),a.target.dispatchEvent(b)},300)}function t(a,b){E=null,clearTimeout(F),F=setTimeout(function(){E&&(E=null,r(a))},b||400),E=a}function u(){if(B.enabled){H&&A(),a.style.webkitBackfaceVisibility="hidden",a.style.webkitTransformStyle="preserve-3d";var b=j(B);a.style.webkitTransform=k(b.x,b.y),a.style.webkitTransition="",E=null,clearTimeout(F)}}function v(){if(B.enabled){var b=j(B)[B.axis],c=g(B,b);if(""===a.style.webkitTransition&&c){var d=h(B,b);c>0?i(B,"y"===B.axis?"pulldownend":"pullrightend"):0>c&&i(B,"y"===B.axis?"pullupend":"pullleftend"),a.style.webkitTransition="-webkit-transform 0.4s ease 0",a.style.webkitTransform="translate"+B.axis.toUpperCase()+"("+d.toFixed(0)+"px)",t(A,400),r(function(){H&&B.enabled&&(i(B,"scrolling"),r(arguments.callee))})}else H&&A()}}function w(a){B.enabled&&("y"!==B.axis&&a.isVertical||"x"===B.axis&&a.isVertical||(B.transformOffset=j(B),B.minScrollOffset=e(B),B.maxScrollOffset=f(B),G=2.5,J=!0,H=!0,I=!1,i(B,"scrollstart"),K=a["displacement"+B.axis.toUpperCase()]))}function x(b){if(B.enabled&&("y"===B.axis&&b.isVertical||"x"===B.axis&&!b.isVertical)){b.stopPropagation();var c=b["displacement"+B.axis.toUpperCase()];if(Math.abs(c-K)<5)return b.stopPropagation(),void 0;K=c;var d=B.transformOffset[B.axis]+c;d>B.minScrollOffset?(d=B.minScrollOffset+(d-B.minScrollOffset)/G,G*=1.003):d<B.maxScrollOffset&&(d=B.maxScrollOffset-(B.maxScrollOffset-d)/G,G*=1.003),G>4&&(G=4);var e=g(B,d);e&&(i(B,e>0?"y"===B.axis?"pulldown":"pullright":"y"===B.axis?"pullup":"pullleft",{boundaryOffset:Math.abs(e)}),B.options.noBounce&&(d=h(B,d))),a.style.webkitTransition="",a.style.webkitTransform="y"===B.axis?k(B.transformOffset.x,d):k(d,B.transformOffset.y),i(B,"scrolling")}}function y(a){B.enabled&&("y"!==B.axis&&a.isVertical||"x"===B.axis&&a.isVertical)}function z(d){if(B.enabled&&("y"===B.axis&&d.isVertical||"x"===B.axis&&!d.isVertical)){d.stopPropagation(),J=!0;var e,f,h,k,m,n,o,q,s,u,v,w,x,y,z,C,D;k=j(B)[B.axis];var E=g(B,k);if(!E){e=d["velocity"+B.axis.toUpperCase()];var F=2,G=.0015;l.inertia&&p[l.inertia]&&(F=p[l.inertia][0],G=p[l.inertia][1]),e>F&&(e=F),-F>e&&(e=-F),f=G*(e/Math.abs(e)),n=new b.motion({v:e,a:-f}),h=n.t,m=k+n.s;var K=g(B,m);if(K){c("惯性计算超出了边缘",K),o=e,q=f,K>0?(u=B.minScrollOffset,w=1):(u=B.maxScrollOffset,w=-1),v=new b.motion({v:w*o,a:-w*q,s:Math.abs(u-k)}),s=v.t;var L=v.generateCubicBezier();x=o-q*s,y=.03*(x/Math.abs(x)),D=new b.motion({v:x,a:-y}),z=D.t,C=u+D.s;{D.generateCubicBezier()}l.noBounce?(c("没有回弹效果"),k!==u?(a.style.webkitTransition="-webkit-transform "+(s/1e3).toFixed(2)+"s cubic-bezier("+L+") 0",a.style.webkitTransform="translate"+B.axis.toUpperCase()+"("+u.toFixed(0)+"px)",t(A,1e3*(s/1e3).toFixed(2))):A()):k!==C?(c("惯性滚动","s="+C.toFixed(0),"t="+((s+z)/1e3).toFixed(2)),a.style.webkitTransition="-webkit-transform "+((s+z)/1e3).toFixed(2)+"s ease-out 0",a.style.webkitTransform="translate"+B.axis.toUpperCase()+"("+C.toFixed(0)+"px)",t(function(){B.enabled&&(c("惯性回弹","s="+u.toFixed(0),"t=400"),C!==u?(a.style.webkitTransition="-webkit-transform 0.4s ease 0",a.style.webkitTransform="translate"+B.axis.toUpperCase()+"("+u.toFixed(0)+"px)",t(A,400)):A())},1e3*((s+z)/1e3).toFixed(2))):A()}else{c("惯性计算没有超出边缘");var M=n.generateCubicBezier();a.style.webkitTransition="-webkit-transform "+(h/1e3).toFixed(2)+"s cubic-bezier("+M+") 0",a.style.webkitTransform="translate"+B.axis.toUpperCase()+"("+m.toFixed(0)+"px)",t(A,1e3*(h/1e3).toFixed(2))}I=!0,r(function(){H&&I&&B.enabled&&(i(B,"scrolling",{afterFlick:!0}),r(arguments.callee))})}}}function A(){B.enabled&&(J=!1,setTimeout(function(){!J&&H&&(H=!1,I=!1,a.style.webkitTransition="",i(B,"scrollend"))},50))}var B=this;if(l=l||{},l.noBounce=!!l.noBounce,l.padding=l.padding||{},l.isPrevent=null==l.isPrevent?!0:!!l.isPrevent,l.isFixScrollendClick=null==l.isFixScrollendClick?!0:!!l.isFixScrollendClick,l.padding?(l.yPadding1=-l.padding.top||0,l.yPadding2=-l.padding.bottom||0,l.xPadding1=-l.padding.left||0,l.xPadding2=-l.padding.right||0):(l.yPadding1=0,l.yPadding2=0,l.xPadding1=0,l.xPadding2=0),l.margin?(l.yMargin1=-l.margin.top||0,l.yMargin2=-l.margin.bottom||0,l.xMargin1=-l.margin.left||0,l.xMargin2=-l.margin.right||0):(l.yMargin1=0,l.yMargin2=0,l.xMargin1=0,l.xMargin2=0),l.direction=l.direction||"y",l.inertia=l.inertia||"normal",this.options=l,B.axis=l.direction,this.element=a,this.viewport=a.parentNode,this.plugins={},this.viewport.addEventListener("touchstart",u,!1),this.viewport.addEventListener("touchend",v,!1),this.viewport.addEventListener("touchcancel",v,!1),this.viewport.addEventListener("panstart",w,!1),this.viewport.addEventListener("pan",x,!1),this.viewport.addEventListener("panend",y,!1),this.viewport.addEventListener("flick",z,!1),this.element.style.webkitBackfaceVisibility="hidden",this.element.style.webkitTransformStyle="preserve-3d",this.element.scrollId=setTimeout(function(){n[B.element.scrollId+""]=B},1),l.isPrevent&&(this.viewport.addEventListener("touchstart",function(){s=!0},!1),B.viewport.addEventListener("touchend",function(){s=!1},!1)),l.isFixScrollendClick){var C,D;this.viewport.addEventListener("scrolling",function(){C=!0,D&&clearTimeout(D),D=setTimeout(function(){C=!1},400)},!1),this.viewport.addEventListener("click",m,!1),this.viewport.addEventListener("tap",q,!1)}var E,F=0;a.addEventListener("webkitTransitionEnd",function(a){if(E){var b=E;E=null,clearTimeout(F),r(function(){b(a)})}},!1);var G,H,I,J;Object.defineProperty(this,"isScrolling",{get:function(){return!!H}});var K,L={init:function(){return this.enable(),this.refresh(),this.scrollTo(0),this},enable:function(){return this.enabled=!0,this},disable:function(){var a=this.element;return this.enabled=!1,r(function(){a.style.webkitTransform=getComputedStyle(a).webkitTransform}),this},getScrollWidth:function(){return d(this.element).width},getScrollHeight:function(){return d(this.element).height},getScrollLeft:function(){return-j(this).x-this.options.xPadding1},getScrollTop:function(){return-j(this).y-this.options.yPadding1},getMaxScrollLeft:function(){return-B.maxScrollOffset-this.options.xPadding1},getMaxScrollTop:function(){return-B.maxScrollOffset-this.options.yPadding1},getBoundaryOffset:function(){return Math.abs(g(this,j(this)[this.axis])||0)},refresh:function(){var a=this.element,b="y"===this.axis,c=b?"height":"width";if(null!=this.options[c])a.style[c]=this.options[c]+"px";else if(a.childElementCount>0){var g,h,k=a.firstElementChild,l=a.lastElementChild;if(document.createRange&&(g=document.createRange(),g.selectNodeContents(a),h=d(g)),h)a.style[c]=h[c]+"px";else if(k&&l){for(;k&&0===d(k)[c]&&k.nextElementSibling;)k=k.nextElementSibling;for(;l&&l!==k&&0===d(l)[c]&&l.previousElementSibling;)l=l.previousElementSibling;a.style[c]=d(l)[b?"bottom":"right"]-d(k)[b?"top":"left"]+"px"}else a.style[c]="0"}else a.style[c]="auto",a.style[c]=d(a)[c]+"px";return this.transformOffset=j(this),this.minScrollOffset=e(this),this.maxScrollOffset=f(this),this.scrollTo(-this.transformOffset[this.axis]-this.options[this.axis+"Padding1"]),i(this,"contentrefresh"),this},offset:function(a){var b=d(this.element),c=d(a);if("y"===this.axis){var e={top:c.top-b.top-this.options.yPadding1,left:c.left-b.left,right:b.right-c.right,width:c.width,height:c.height};e.bottom=e.top+e.height}else{var e={top:c.top-b.top,bottom:b.bottom-c.bottom,left:c.left-b.left-this.options.xPadding1,width:c.width,height:c.height};e.right=e.left+e.width}return e},getRect:function(a){var b=d(this.viewport),c=d(a);if("y"===this.axis){var e={top:c.top-b.top,left:c.left-b.left,right:b.right-c.right,width:c.width,height:c.height};e.bottom=e.top+e.height}else{var e={top:c.top-b.top,bottom:b.bottom-c.bottom,left:c.left-b.left,width:c.width,height:c.height};e.right=e.left+e.width}return e},isInView:function(a){var b=d(this.viewport),c=this.getRect(a);return"y"===this.axis?b.top<c.bottom&&b.bottom>c.top:b.left<c.right&&b.right>c.left},scrollTo:function(a,b){var c=this,d=this.element;return a=-a-this.options[this.axis+"Padding1"],a=h(this,a),H=!0,b===!0?(d.style.webkitTransition="-webkit-transform 0.4s ease 0",t(A,400),r(function(){H&&c.enabled&&(i(c,"scrolling"),r(arguments.callee))})):(d.style.webkitTransition="",t(A,1)),d.style.webkitTransform="y"===this.axis?k(j(this).x,a):k(a,j(this).y),this},scrollToElement:function(a,b){var c=this.offset(a);return c=c["y"===this.axis?"top":"left"],this.scrollTo(c,b)},getViewWidth:function(){return d(this.viewport).width},getViewHeight:function(){return d(this.viewport).height},addPulldownHandler:function(a){var b=this;return this.element.addEventListener("pulldownend",function(c){b.disable(),a(c,function(){b.scrollTo(0,!0),b.enable()})},!1),this},addPullupHandler:function(a){var b=this;return this.element.addEventListener("pullupend",function(c){b.disable(),a(c,function(){b.scrollTo(b.getScrollHeight(),!0),b.enable()})},!1),this},addScrollstartHandler:function(a){return this.element.addEventListener("scrollstart",function(b){a(b)},!1),this},addScrollingHandler:function(a){return this.element.addEventListener("scrolling",function(b){a(b)},!1),this},addScrollendHandler:function(a){return this.element.addEventListener("scrollend",function(b){a(b)},!1),this},addEventListener:function(){this.element.addEventListener.apply(this.element,arguments)},removeEventListener:function(){this.element.removeEventListener.apply(this.element,arguments)},enablePlugin:function(a,b){var c=o[a];return c&&!this.plugins[a]&&(this.plugins[a]=!0,b=b||{},c.call(this,a,b)),this}};for(var M in L)this[M]=L[M];delete L}var m=a.document,n={},o={},p={normal:[2,.0015],slow:[1.5,.003],veryslow:[1.5,.005]},q="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a){setTimeout(a,16)}}(),s=!1;m.addEventListener("touchmove",function(a){return s?(a.preventDefault(),!1):!0},!1),b.scroll=function(a,b){if(1===arguments.length&&!(arguments[0]instanceof HTMLElement))if(b=arguments[0],b.scrollElement)a=b.scrollElement;else{if(!b.scrollWrap)throw new Error("no scroll element");a=b.scrollWrap.firstElementChild}if(!a.parentNode)throw new Error("wrong dom tree");if(b&&b.direction&&["x","y"].indexOf(b.direction)<0)throw new Error("wrong direction");var c;return c=a.scrollId?n[a.scrollId]:new l(a,b)},b.scroll.plugin=function(a,b){return b?(a=a.split(","),a.forEach(function(a){o[a]=b}),void 0):o[a]}}(window,window.lib||(window.lib={}));