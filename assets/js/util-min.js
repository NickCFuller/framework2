class FWAjaxRQ{constructor(e){this.request=e}onloaded(){this.status>=200&&this.status<400?this.options.hasOwnProperty("success")&&this.options.success(this.response):this.options.hasOwnProperty("fail")&&this.options.fail(this.response),this.options.hasOwnProperty("always")&&this.options.always(this.response)}onfailed(){this.options.hasOwnProperty("fail")&&this.options.fail(this.response),this.options.hasOwnProperty("always")&&this.options.always(this.response)}done(e){return this.request.options.success=e,this}fail(e){return this.request.options.fail=e,this}always(e){return this.request.options.always=e,this}}var framework={makeQString:function(e){let t="",o="";for(var a in e)e.hasOwnProperty(a)&&(t+=o+encodeURI(a+"="+e[a]),o="&");return t},ajax:function(e,t){let o=new XMLHttpRequest,a=t.hasOwnProperty("method")?t.method:"GET",n=t.hasOwnProperty("data")?"object"==typeof t.data?framework.makeQString(t.data):t.data:"",s=t.hasOwnProperty("type")?t.type:""!==n?"application/x-www-form-urlencoded; charset=UTF-8":"text/plain; charset=UTF-8",r=new FWAjaxRQ(o);return o.options=t,o.open(a,e,!t.hasOwnProperty("async")||t.async),o.setRequestHeader("Content-Type",s),o.onload=r.onloaded,o.onerror=r.onfailed,o.send(n),r},getJSON:function(e,t,o){var a=new XMLHttpRequest;a.open("GET",e,!0),a.setRequestHeader("Accept","application/json"),a.onload=function(){this.status>=200&&this.status<400?t(JSON.parse(this.response)):o(this)},a.onerror=function(){o(this)},a.send()},mktoggle:function(e,t){return'<i class="'+e+" fas fa-toggle-"+(t?"on":"off")+'"></i>'},tick:function(e){return framework.mktoggle("",e)},toggle:function(e){fwdom.toggleClass([e],["fa-toggle-off","fa-toggle-on"])},dotoggle:function(e,t,o,a){fwdom.stop(e);let n=t.classList;if(!n.contains("fadis"))if(n.contains("htick")){const e=t.nextElementSibling;e.value=1==e.value?0:1,framework.toggle(t)}else{let e=t.closest("[data-id]");e instanceof jQuery&&(e=e[0]),framework.ajax(base+"/ajax/toggle/"+o+"/"+e.getAttribute("data-id")+"/"+a,{method:putorpatch}).done((function(){framework.toggle(t)})).fail((function(e){bootbox.alert("<h3>Toggle failed</h3>"+e.responseText)}))}},deletebean:function(e,t,o,a,n,s=""){fwdom.stop(e),""===s&&(s="this "+o),bootbox.confirm("Are you sure you you want to delete "+s+"?",(function(e){e&&framework.ajax(base+"/ajax/bean/"+o+"/"+a+"/",{method:"DELETE"}).done(n).fail((function(e){bootbox.alert("<h3>Delete failed</h3>"+e.responseText)}))}))},editcall:function(e){const t=base+"/ajax/"+e.op+"/"+e.bean+"/"+e.pk+"/"+e.name+"/";return framework.ajax(t,{method:putorpatch,data:{value:e.value}})},removeNode:function(e){var t=[e];if(e.hasAttribute("rowspan")){let o=parseInt(e.getAttribute("rowspan"))-1;for(;o>0;)t[o]=t[o-1].elementSibling}for(let e of t)e.parentNode.removeChild(e)},fadetodel:function(e,t=null){e.classList.add("fader"),e.style.opacity="0",setTimeout((function(){framework.removeNode(e),null!==t&&t()}),1500)},dodelbean:function(e,t,o,a="",n=null){let s=t.closest("[data-id]");s instanceof jQuery&&(s=s[0]),framework.deletebean(e,t,o,s.getAttribute("data-id"),(function(){framework.fadetodel(s,n)}),a)},tableClick:function(e){fwdom.stop(e);const t=e.target.classList;e.data.clicks.forEach((function(o){let[a,n,s]=o;t.contains(a)&&n(e,e.target,e.data.bean,s)}))},goedit:function(e,t,o){let a=t.closest("[data-id]");a instanceof jQuery&&(a=a[0]),window.location.href=base+"/admin/edit/"+o+"/"+a.getAttribute("data-id")+"/"},goLink:function(e){window.location.href=e.target.getAttribute("href")},goview:function(e,t,o){window.location.href=base+"/admin/view/"+o+"/"+t.parent().parent().data("id")+"/"},beanCreate:function(e,t,o,a){framework.ajax(base+"/ajax/bean/"+e+"/",{method:"POST",data:t}).done(o).fail((function(t){bootbox.alert("<h3>Failed to create new "+e+"</h3>"+t.responseText)})).always((function(){document.getElementById(a).disabled=!1}))},addMore:function(e){fwdom.stop(e);const t=document.getElementById("mrow"),o=t.previousElementSibling.cloneNode(!0);for(var a of o.getElementsByTagName("input"))"checkbox"==a.getAttribute("type")||"radio"==a.getAttribute("type")?a.checked=!1:a.value="";for(a of o.getElementsByTagName("textarea"))a.innerHTML="";for(a of o.getElementsByTagName("option"))a.selected=!1;for(a of o.getElementsByTagName("select"))a.children[0].selected=!0;t.parentNode.insertBefore(o,t)},easeInOut:function(e,t,o,a,n){return Math.ceil(e+Math.pow(1/o*a,n)*(t-e))},doBGFade:function(e,t,o,a,n,s,r){e.bgFadeInt&&window.clearInterval(e.bgFadeInt);let i=0;e.bgFadeInt=window.setInterval((function(){e.css("backgroundcolor","rgb("+framework.easeInOut(t[0],o[0],n,i,r)+","+framework.easeInOut(t[1],o[1],n,i,r)+","+framework.easeInOut(t[2],o[2],n,i,r)+")"),i+=1,i>n&&(e.css("backgroundcolor",a),window.clearInterval(e.bgFadeInt))}),s)}};
//# sourceMappingURL=util-min.js.map