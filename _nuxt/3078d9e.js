(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{445:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));n(70);var r=n(125),o=n(443),c=n(449),l=n(448);function v(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,v=e.isPhysicallyCorrectLight,d=void 0!==v&&v,f=Object(r.e)(null),h=Object(r.e)(null),w=Object(r.e)(null),O=Object(r.e)(null),j=Object(r.e)(null),canvas=Object(r.e)(void 0),m=Object(r.e)(null),y=Object(r.e)(null),C=Object(r.e)(null),S=Object(r.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),x=Object(r.a)((function(){return!!h.value&&!!m.value&&!!O.value}));Object(r.g)(canvas,(function(){k(),P()})),Object(r.d)((function(){window.addEventListener("resize",(function(){S.value.width=window.innerWidth,S.value.height=window.innerHeight,O.value&&(O.value.aspect=S.value.width/S.value.height,O.value.updateProjectionMatrix()),m.value&&(m.value.setSize(S.value.width,S.value.height),m.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var k=function(){h.value=new o.wb,w.value=new o.i(1),w.value.position.set(2.01,.01,2.01),O.value=new o.kb(75,S.value.width/S.value.height,.1,200),O.value.position.set(4,20,60),j.value=new o.Gb,m.value=new o.Mb({canvas:canvas.value,antialias:!0}),m.value.setSize(S.value.width,S.value.height),m.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),m.value.setClearColor("#262837"),m.value.physicallyCorrectLights=d,n&&(y.value=new l.a(O.value,canvas.value),y.value.enableDamping=!0),C.value=new o.r},P=function(){f.value=new c.a({closed:!1,width:350}),f.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,r=void 0===n?"":n,o="canvas.webgl";r&&(o+=".".concat(r)),canvas.value=t.$el.querySelector(o)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(x.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:f,scene:h,renderer:m,axesHelper:w,cameraOrbit:O,orbitControl:y,windowSizes:S,clock:C,textureLoader:j}}},446:function(e,t,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("6eb620e4",content,!0,{sourceMap:!1})},450:function(e,t,n){"use strict";n(446)},451:function(e,t,n){var r=n(20)(!1);r.push([e.i,".threejs-experiment-container[data-v-0cebc660]{height:100%}.threejs-experiment-container .col-controls[data-v-0cebc660]{flex-grow:unset}.threejs-experiment-container .col-canvas[data-v-0cebc660]{flex-grow:inherit;position:relative}.threejs-experiment-container .col-canvas__thumbnail[data-v-0cebc660]{width:30%;margin:auto}.threejs-experiment-container .col-canvas__thumbnail>p[data-v-0cebc660]{position:absolute;bottom:0;left:50%;transform:translate(-50%)}",""]),e.exports=r},452:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(445),c=Object(r.d)({setup:function(e,t){var n=Object(o.a)({context:t,isOrbitControl:!1});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,canvas:n.canvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,windowSizes:n.windowSizes,clock:n.clock,textureLoader:n.textureLoader}},data:function(){return{idAnimationFrame:null,selectorCanvasWrap:"custom-selector",thumbnailSrc:"/threejs/images/*.png",isHoverToStart:!1,isInit:!1}},computed:{selectorCanvasId:function(){return"".concat(this.selectorCanvasWrap,"_canvas")}},beforeDestroy:function(){(window.cancelAnimationFrame(this.idAnimationFrame),this.gui)&&(document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy())},methods:{initUtils:function(){},tick:function(){},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)},onRemoveThumbnail:function(){this.isHoverToStart=!0},onMouseEnterCanvas:function(){var e=this;this.setCanvas({vm:this,selectorCanvasId:this.selectorCanvasId}),this.registerRenderTickCanvas((function(){e.isInit||(e.isInit=!0,e.initUtils(),e.setStyleDatGui()),e.clock.start(),e.tick()}))},onMouseOutCanvas:function(){window.cancelAnimationFrame(this.idAnimationFrame),this.clock.stop()}}}),l=(n(450),n(46)),v=n(58),d=n.n(v),f=n(454),h=n(453),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticClass:"threejs-experiment-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap,on:{mouseenter:e.onRemoveThumbnail}},[e.isHoverToStart?n("canvas",{staticClass:"webgl",class:e.selectorCanvasId,on:{mouseenter:e.onMouseEnterCanvas,mouseout:e.onMouseOutCanvas}}):n("div",{staticClass:"col-canvas__thumbnail"},[n("img",{attrs:{src:e.thumbnailSrc,width:"auto",height:"180px"}}),e._v(" "),n("p",[e._v("Hover your mouse over the screen to start")])])])],1)}),[],!1,null,"0cebc660",null);t.default=component.exports;d()(component,{VCol:f.a,VRow:h.a})},453:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(57),n(75),n(27),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(9),n(268),n(0)),c=n(88),l=n(1);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=["sm","md","lg","xl"],h=["start","end","center"];function w(e,t){return f.reduce((function(n,r){return n[e+Object(l.r)(r)]=t(),n}),{})}var O=function(e){return[].concat(h,["baseline","stretch"]).includes(e)},j=w("align",(function(){return{type:String,default:null,validator:O}})),m=function(e){return[].concat(h,["space-between","space-around"]).includes(e)},y=w("justify",(function(){return{type:String,default:null,validator:m}})),C=function(e){return[].concat(h,["space-between","space-around","stretch"]).includes(e)},S=w("alignContent",(function(){return{type:String,default:null,validator:C}})),x={align:Object.keys(j),justify:Object.keys(y),alignContent:Object.keys(S)},k={align:"align",justify:"justify",alignContent:"align-content"};function P(e,t,n){var r=k[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var E=new Map;t.a=o.default.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:O}},j),{},{justify:{type:String,default:null,validator:m}},y),{},{alignContent:{type:String,default:null,validator:C}},S),render:function(e,t){var n=t.props,data=t.data,o=t.children,l="";for(var v in n)l+=String(n[v]);var d=E.get(l);return d||function(){var e,t;for(t in d=[],x)x[t].forEach((function(e){var r=n[e],o=P(t,e,r);o&&d.push(o)}));d.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),E.set(l,d)}(),e(n.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},454:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(30),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(57),n(9),n(71),n(268),n(0)),c=n(88),l=n(1);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=["sm","md","lg","xl"],h=f.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),w=f.reduce((function(e,t){return e["offset"+Object(l.r)(t)]={type:[String,Number],default:null},e}),{}),O=f.reduce((function(e,t){return e["order"+Object(l.r)(t)]={type:[String,Number],default:null},e}),{}),j={col:Object.keys(h),offset:Object.keys(w),order:Object.keys(O)};function m(e,t,n){var r=e;if(null!=n&&!1!==n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return"col"!==e||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var y=new Map;t.a=o.default.extend({name:"v-col",functional:!0,props:d(d(d(d({cols:{type:[Boolean,String,Number],default:!1}},h),{},{offset:{type:[String,Number],default:null}},w),{},{order:{type:[String,Number],default:null}},O),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,data=t.data,o=t.children,l=(t.parent,"");for(var v in n)l+=String(n[v]);var d=y.get(l);return d||function(){var e,t;for(t in d=[],j)j[t].forEach((function(e){var r=n[e],o=m(t,e,r);o&&d.push(o)}));var o=d.some((function(e){return e.startsWith("col-")}));d.push((e={col:!o||!n.cols},Object(r.a)(e,"col-".concat(n.cols),n.cols),Object(r.a)(e,"offset-".concat(n.offset),n.offset),Object(r.a)(e,"order-".concat(n.order),n.order),Object(r.a)(e,"align-self-".concat(n.alignSelf),n.alignSelf),e)),y.set(l,d)}(),e(n.tag,Object(c.a)(data,{class:d}),o)}})}}]);