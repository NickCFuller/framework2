var framework={dejq:function(e){console.log(e)},makeQString:function(e){var t="";for(var o in e)object.hasOwnProperty(o)&&(t.length>0&&(t+="&"),t+=encodeURI(o+"="+object[o]));return t},rcall:function(e,t){var o=new XMLHttpRequest;o.open(t.hasOwnProperty("method")?t.method:"GET",e,!0),o.setRequestHeader("Content-Type",t.hasOwnProperty("type")?t.type:"application/x-www-form-urlencoded; charset=UTF-8"),o.onload=function(){this.status>=200&&this.status<400?t.hasOwnProperty("success")&&t.success(this.response):t.hasOwnProperty("fail")&&t.fail(this.response),t.hasOwnProperty("always")&&t.always(this.response)},o.onerror=function(){t.hasOwnProperty("fail")&&fail(this.response),t.hasOwnProperty("always")&&t.always(this.repsonse)},o.send(makeQString(data))},getJSON:function(e,t,o){var a=new XMLHttpRequest;a.open("GET",e,!0),a.onload=function(){this.status>=200&&this.status<400?t(JSON.parse(this.response)):o(this)},a.onerror=function(){o(this)},a.send()},mktoggle:function(e,t){return'<i class="'+e+" fas fa-toggle-"+(t?"on":"off")+'"></i>'},tick:function(e){return framework.mktoggle("",e)},toggle:function(e){e.classList.toggle("fa-toggle-off"),e.classList.toggle("fa-toggle-on")},dotoggle:function(e,t,o,a){e.preventDefault(),e.stopPropagation();let n=t.classList;if(!n.contains("fadis"))if(n.contains("htick")){const e=t.nextElementSibling;e.value=1==e.value?0:1,framework.toggle(t)}else{const e=$(t).parent().parent();$.ajax(base+"/ajax/toggle/"+o+"/"+e.data("id")+"//"+a,{method:putorpatch}).done((function(){framework.toggle(t)})).fail((function(e){bootbox.alert("<h3>Toggle failed</h3>"+e.responseText)}))}},deletebean:function(e,t,o,a,n,r=""){e.preventDefault(),e.stopPropagation(),""==r&&(r="this "+o),bootbox.confirm("Are you sure you you want to delete "+r+"?",(function(e){e&&$.ajax(base+"/ajax/bean/"+o+"/"+a+"/",{method:"DELETE"}).done(n).fail((function(e){bootbox.alert("<h3>Delete failed</h3>"+e.responseText)}))}))},editcall:function(e){const t=base+"/ajax/"+e.op+"/"+e.bean+"/"+e.pk+"/"+e.name+"/";return $.ajax(t,{method:putorpatch,data:{value:e.value}})},removeNode:function(e){var t=[e];if(e.hasAttribute("rowspan")){let o=parseInt(e.getAttribute("rowspan"))-1;for(;o>0;)t[o]=t[o-1].elementSibling}for(let e of t)e.parentNode.removeChild(e)},fadetodel:function(e){e.classList.add("fader"),e.style.opacity="0",setTimeout((function(){framework.removeNode(e)}),1500)},dodelbean:function(e,t,o,a="",n="tr"){let r=t.closest(n);framework.deletebean(e,t,o,r.getAttribute("data-id"),(function(){framework.fadetodel(r)}),a)},tableClick:function(e){e.preventDefault();const t=$(e.target);e.data.clicks.forEach((function(o){let[a,n,r]=o;t.hasClass(a)&&n(e,e.target,e.data.bean,r)}))},goedit:function(e,t,o){window.location.href=base+"/admin/edit/"+o+"/"+t.parent().parent().data("id")+"/"},goview:function(e,t,o){window.location.href=base+"/admin/view/"+o+"/"+t.parent().parent().data("id")+"/"},beanCreate:function(e,t,o,a){$.post(base+"/ajax/bean/"+e+"/",t).done(o).fail((function(t){bootbox.alert("<h3>Failed to create new "+e+"</h3>"+t.responseText)})).always((function(){$(a).attr("disabled",!1)}))},addMore:function(e){e.preventDefault(),$("#mrow").before($("#example").clone()),$("input,textarea",$("#mrow").prev()).val(""),$("option",$("#mrow").prev()).prop("selected",!1)},easeInOut:function(e,t,o,a,n){return Math.ceil(e+Math.pow(1/o*a,n)*(t-e))},doBGFade:function(e,t,o,a,n,r,s){e.bgFadeInt&&window.clearInterval(e.bgFadeInt);let i=0;e.bgFadeInt=window.setInterval((function(){e.css("backgroundcolor","rgb("+framework.easeInOut(t[0],o[0],n,i,s)+","+framework.easeInOut(t[1],o[1],n,i,s)+","+framework.easeInOut(t[2],o[2],n,i,s)+")"),i+=1,i>n&&(e.css("backgroundcolor",a),window.clearInterval(e.bgFadeInt))}),r)}};