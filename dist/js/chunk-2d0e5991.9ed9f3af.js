(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5991"],{"94bb":function(e,t,n){"use strict";n.r(t);var o=n("7a23");const a={class:"container"},c={class:"jumbotron"};function r(e,t,n,r,s,d){const b=Object(o["resolveComponent"])("SidebarVue");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",a,[Object(o["createVNode"])(b),Object(o["createElementVNode"])("header",c,[Object(o["createElementVNode"])("h3",null,Object(o["toDisplayString"])(s.content),1)])])}var s=n("1f57"),d={name:"Moderator",data(){return{content:""}},mounted(){s["a"].getModeratorBoard().then(e=>{this.content=e.data},e=>{this.content=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()})}},b=n("6b0d"),i=n.n(b);const l=i()(d,[["render",r]]);t["default"]=l}}]);
//# sourceMappingURL=chunk-2d0e5991.9ed9f3af.js.map