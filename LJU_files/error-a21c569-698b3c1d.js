webpackJsonp([1,6],{130:function(e,t,a){function r(e){e.preventDefault(),window.location.href=window.location.href}function o(e){e.preventDefault(),n.get("router").reload()}var n=a(23),l=a(111),s=a(79);e.exports=s.extend({template:a(131),css:a(134),ModelClass:l,className:"error g-box-full g-background-default g-shadow-inset",events:{"click .error__reload":r,"click .error__back":o},getTemplateData:function(e){return{message:e.message,is_widget_ready:n.get("widgetReady")}}})}});