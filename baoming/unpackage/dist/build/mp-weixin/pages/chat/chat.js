(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chat/chat"],{"32ef":function(t,e,n){"use strict";var i=n("3d1e"),o=n.n(i);o.a},"3d1e":function(t,e,n){},"662e":function(t,e,n){"use strict";n.r(e);var i=n("a68e"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},9986:function(t,e,n){"use strict";n.r(e);var i=n("e797"),o=n("662e");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("32ef");var a,r=n("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=c.exports},a68e:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("95d2"));function o(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{title:"Hello",bl:!1,curRoutes:"",infoList:"",top_style:"",top_height:""}},created:function(){console.log(t.getMenuButtonBoundingClientRect());var e=t.getMenuButtonBoundingClientRect(),n=(e.height-40)/2;this.top_height="height:"+(e.top+n)+"px",this.top_style="top:"+(e.top+n)+"px"},onLoad:function(){var e=this,n=getCurrentPages(),o=n[n.length-1].route;this.curRoutes=o,t.request({url:i.default.WEBSITE_URL+"/api/competition/getConfig",success:function(t){0==t.data.code&&(e.infoList=t.data.data)}})},onShareAppMessage:function(t){return{title:this.infoList.share_title,path:this.curRoutes,imageUrl:this.infoList.share_cover}},onShareTimeline:function(t){return{title:this.infoList.share_title,path:this.curRoutes,imageUrl:this.infoList.share_cover}},onPullDownRefresh:function(){setTimeout((function(){t.reLaunch({url:"../chat/chat"})}),1e3)},methods:{news:function(){t.navigateTo({url:"../official_news/official_news?id=0"})},indexJump:function(e){t.navigateTo({url:"/pages/".concat(e,"/").concat(e)})}}};e.default=u}).call(this,n("543d")["default"])},ba18:function(t,e,n){"use strict";(function(t){n("9f11");i(n("66fd"));var e=i(n("9986"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e797:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},u=[]}},[["ba18","common/runtime","common/vendor"]]]);