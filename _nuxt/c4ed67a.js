(window.webpackJsonp=window.webpackJsonp||[]).push([[12,13,23],{445:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(70);var r=n(125),o=n(443),c=n(451),l=n(448);function d(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,d=Object(r.e)(null),v=Object(r.e)(null),f=Object(r.e)(null),h=Object(r.e)(null),m=Object(r.e)(null),canvas=Object(r.e)(void 0),w=Object(r.e)(null),O=Object(r.e)(null),j=Object(r.e)(null),y=Object(r.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),C=Object(r.a)((function(){return!!v.value&&!!w.value&&!!h.value}));Object(r.g)(canvas,(function(){S(),x()})),Object(r.d)((function(){window.addEventListener("resize",(function(){y.value.width=window.innerWidth,y.value.height=window.innerHeight,h.value&&(h.value.aspect=y.value.width/y.value.height,h.value.updateProjectionMatrix()),w.value&&(w.value.setSize(y.value.width,y.value.height),w.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var S=function(){v.value=new o.qb,f.value=new o.h(1),f.value.position.set(2.01,.01,2.01),h.value=new o.fb(75,y.value.width/y.value.height,.1,200),h.value.position.set(4,20,60),m.value=new o.Ab,w.value=new o.Gb({canvas:canvas.value}),w.value.setSize(y.value.width,y.value.height),w.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),w.value.setClearColor("#262837"),n&&(O.value=new l.a(h.value,canvas.value),O.value.enableDamping=!0),j.value=new o.p},x=function(){d.value=new c.a({closed:!1,width:350}),d.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,r=void 0===n?"":n,o="canvas.webgl";r&&(o+=".".concat(r)),canvas.value=t.$el.querySelector(o)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(C.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:d,scene:v,renderer:w,axesHelper:f,cameraOrbit:h,orbitControl:O,windowSizes:y,clock:j,textureLoader:m}}},446:function(e,t,n){var content=n(450);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("6eb620e4",content,!0,{sourceMap:!1})},447:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return l}));n(9);var r=n(443);function o(e){var t=e.scene,n=e.renderer,o=e.recieveMesh,c=e.castMeshs,l=e.light,d=e.isUseCameraHelper;n.shadowMap.enabled=!0,n.shadowMap.type=r.eb,o.receiveShadow=!0,c.forEach((function(e){e.castShadow=!0})),l.castShadow=!0,l.shadow.mapSize.width=1024,l.shadow.mapSize.height=1024,l.shadow.camera.near=1,l.shadow.camera.far=10;var v=null;d&&((v=new r.n(l.shadow.camera)).visible=!0,t.add(v));return{toggleVisiblePointLightCameraHelper:function(){v&&(v.visible=!v.visible)}}}function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{color:16777215,intensity:.3},n=new r.a(t.color,t.intensity);return e.add(n),{ambientLight:n}}function l(e){var t=e.scene,n=new r.hb(16777215,.3);return n.position.set(1,1,1),t.add(n),{pointLight:n}}},449:function(e,t,n){"use strict";n(446)},450:function(e,t,n){var r=n(20)(!1);r.push([e.i,".threejs-experiment-container[data-v-0cebc660]{height:100%}.threejs-experiment-container .col-controls[data-v-0cebc660]{flex-grow:unset}.threejs-experiment-container .col-canvas[data-v-0cebc660]{flex-grow:inherit;position:relative}.threejs-experiment-container .col-canvas__thumbnail[data-v-0cebc660]{width:30%;margin:auto}.threejs-experiment-container .col-canvas__thumbnail>p[data-v-0cebc660]{position:absolute;bottom:0;left:50%;transform:translate(-50%)}",""]),e.exports=r},452:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(445),c=Object(r.d)({setup:function(e,t){var n=Object(o.a)({context:t,isOrbitControl:!1});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,canvas:n.canvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,windowSizes:n.windowSizes,clock:n.clock,textureLoader:n.textureLoader}},data:function(){return{idAnimationFrame:null,selectorCanvasWrap:"custom-selector",thumbnailSrc:"/threejs/images/*.png",isHoverToStart:!1,isInit:!1}},computed:{selectorCanvasId:function(){return"".concat(this.selectorCanvasWrap,"_canvas")}},beforeDestroy:function(){(window.cancelAnimationFrame(this.idAnimationFrame),this.gui)&&(document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy())},methods:{initUtils:function(){},tick:function(){},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)},onRemoveThumbnail:function(){this.isHoverToStart=!0},onMouseEnterCanvas:function(){var e=this;this.setCanvas({vm:this,selectorCanvasId:this.selectorCanvasId}),this.registerRenderTickCanvas((function(){e.isInit||(e.isInit=!0,e.initUtils(),e.setStyleDatGui()),e.clock.start(),e.tick()}))},onMouseOutCanvas:function(){window.cancelAnimationFrame(this.idAnimationFrame),this.clock.stop()}}}),l=(n(449),n(46)),d=n(58),v=n.n(d),f=n(454),h=n(453),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticClass:"threejs-experiment-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap,on:{mouseenter:e.onRemoveThumbnail}},[e.isHoverToStart?n("canvas",{staticClass:"webgl",class:e.selectorCanvasId,on:{mouseenter:e.onMouseEnterCanvas,mouseout:e.onMouseOutCanvas}}):n("div",{staticClass:"col-canvas__thumbnail"},[n("img",{attrs:{src:e.thumbnailSrc,width:"auto",height:"180px"}}),e._v(" "),n("p",[e._v("Hover your mouse over the screen to start")])])])],1)}),[],!1,null,"0cebc660",null);t.default=component.exports;v()(component,{VCol:f.a,VRow:h.a})},453:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(57),n(75),n(27),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(9),n(268),n(0)),c=n(88),l=n(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=["sm","md","lg","xl"],h=["start","end","center"];function m(e,t){return f.reduce((function(n,r){return n[e+Object(l.r)(r)]=t(),n}),{})}var w=function(e){return[].concat(h,["baseline","stretch"]).includes(e)},O=m("align",(function(){return{type:String,default:null,validator:w}})),j=function(e){return[].concat(h,["space-between","space-around"]).includes(e)},y=m("justify",(function(){return{type:String,default:null,validator:j}})),C=function(e){return[].concat(h,["space-between","space-around","stretch"]).includes(e)},S=m("alignContent",(function(){return{type:String,default:null,validator:C}})),x={align:Object.keys(O),justify:Object.keys(y),alignContent:Object.keys(S)},k={align:"align",justify:"justify",alignContent:"align-content"};function M(e,t,n){var r=k[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var P=new Map;t.a=o.default.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},O),{},{justify:{type:String,default:null,validator:j}},y),{},{alignContent:{type:String,default:null,validator:C}},S),render:function(e,t){var n=t.props,data=t.data,o=t.children,l="";for(var d in n)l+=String(n[d]);var v=P.get(l);return v||function(){var e,t;for(t in v=[],x)x[t].forEach((function(e){var r=n[e],o=M(t,e,r);o&&v.push(o)}));v.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),P.set(l,v)}(),e(n.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},454:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(30),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(57),n(9),n(71),n(268),n(0)),c=n(88),l=n(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=["sm","md","lg","xl"],h=f.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),m=f.reduce((function(e,t){return e["offset"+Object(l.r)(t)]={type:[String,Number],default:null},e}),{}),w=f.reduce((function(e,t){return e["order"+Object(l.r)(t)]={type:[String,Number],default:null},e}),{}),O={col:Object.keys(h),offset:Object.keys(m),order:Object.keys(w)};function j(e,t,n){var r=e;if(null!=n&&!1!==n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return"col"!==e||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var y=new Map;t.a=o.default.extend({name:"v-col",functional:!0,props:v(v(v(v({cols:{type:[Boolean,String,Number],default:!1}},h),{},{offset:{type:[String,Number],default:null}},m),{},{order:{type:[String,Number],default:null}},w),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,data=t.data,o=t.children,l=(t.parent,"");for(var d in n)l+=String(n[d]);var v=y.get(l);return v||function(){var e,t;for(t in v=[],O)O[t].forEach((function(e){var r=n[e],o=j(t,e,r);o&&v.push(o)}));var o=v.some((function(e){return e.startsWith("col-")}));v.push((e={col:!o||!n.cols},Object(r.a)(e,"col-".concat(n.cols),n.cols),Object(r.a)(e,"offset-".concat(n.offset),n.offset),Object(r.a)(e,"order-".concat(n.order),n.order),Object(r.a)(e,"align-self-".concat(n.alignSelf),n.alignSelf),e)),y.set(l,v)}(),e(n.tag,Object(c.a)(data,{class:v}),o)}})},534:function(e,t,n){"use strict";n.r(t);n(31);var r=n(2),o=n(452),c=n(447),l=n(443);var d=Object(r.d)({extends:o.default,data:function(){return{selectorCanvasWrap:"camera-lookat-target",thumbnailSrc:"/threejs/images/thumbnail_camera-lookat-target.png",runComposable:null}},methods:{initUtils:function(){var e=function(e,t){var n=new l.W;n.roughness=.7;var r=new l.T(new l.gb(10,10),n);r.rotation.x=.5*-Math.PI,r.position.y=0;var o=new l.T(new l.ub(.5,32,32),n);e.add(o,r);var c=new l.Eb(1,1,1);return{plane:r,sphere:o,material:n,runRotSphereWtCamera:function(e){var t=e.elapsedTime,n=e.cameraOrbit;o.position.set(2*Math.cos(t)+c.x,1,2*Math.sin(t)+c.z),n.position.set(4*Math.cos(t)+c.x,3,4*Math.sin(t)+c.z),n.lookAt(o.position)}}}(this.scene,this.textureLoader),t=e.plane,n=e.sphere,r=e.material,o=e.runRotSphereWtCamera,d=Object(c.a)(this.scene).ambientLight,v=Object(c.b)({scene:this.scene}).pointLight;Object(c.c)({scene:this.scene,renderer:this.renderer,recieveMesh:t,castMeshs:[n],light:v,isUseCameraHelper:!0}).toggleVisiblePointLightCameraHelper;this.runComposable=o,v.position.set(3,3,3),this.gui.add(d,"intensity").min(0).max(1).step(.001).name("Intensity Ambient Light"),this.gui.add(r,"metalness").min(0).max(1).step(.001).name("Metalness Material of Meshes"),this.gui.add(r,"roughness").min(0).max(1).step(.001).name("Roughness Material of Meshes"),this.axesHelper.position.set(0,.1,0),this.scene.add(this.axesHelper)},tick:function(){var e=this.clock.getElapsedTime();this.runComposable({elapsedTime:e,cameraOrbit:this.cameraOrbit}),this.renderer.render(this.scene,this.cameraOrbit),this.idAnimationFrame=window.requestAnimationFrame(this.tick)}}}),v=n(46),component=Object(v.a)(d,undefined,undefined,!1,null,null,null);t.default=component.exports}}]);