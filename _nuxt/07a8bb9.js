(window.webpackJsonp=window.webpackJsonp||[]).push([[14,15,25],{444:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(70);var r=n(125),o=n(443),c=n(449),l=n(448);function d(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,d=e.isPhysicallyCorrectLight,v=void 0!==d&&d,h=Object(r.e)(null),f=Object(r.e)(null),m=Object(r.e)(null),w=Object(r.e)(null),O=Object(r.e)(null),canvas=Object(r.e)(void 0),j=Object(r.e)(null),y=Object(r.e)(null),C=Object(r.e)(null),S=Object(r.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),x=Object(r.a)((function(){return!!f.value&&!!j.value&&!!w.value}));Object(r.g)(canvas,(function(){k(),M()})),Object(r.d)((function(){window.addEventListener("resize",(function(){S.value.width=window.innerWidth,S.value.height=window.innerHeight,w.value&&(w.value.aspect=S.value.width/S.value.height,w.value.updateProjectionMatrix()),j.value&&(j.value.setSize(S.value.width,S.value.height),j.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var k=function(){f.value=new o.xb,m.value=new o.i(1),m.value.position.set(2.01,.01,2.01),w.value=new o.kb(75,S.value.width/S.value.height,.1,200),w.value.position.set(4,20,60),O.value=new o.Hb,j.value=new o.Nb({canvas:canvas.value,antialias:!0}),j.value.setSize(S.value.width,S.value.height),j.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),j.value.setClearColor("#262837"),j.value.physicallyCorrectLights=v,n&&(y.value=new l.a(w.value,canvas.value),y.value.enableDamping=!0),C.value=new o.r},M=function(){h.value=new c.a({closed:!1,width:350}),h.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,r=void 0===n?"":n,o="canvas.webgl";r&&(o+=".".concat(r)),canvas.value=t.$el.querySelector(o)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(x.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:h,scene:f,renderer:j,axesHelper:m,cameraOrbit:w,orbitControl:y,windowSizes:S,clock:C,textureLoader:O}}},446:function(e,t,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("6eb620e4",content,!0,{sourceMap:!1})},447:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var r,o=n(3),c=n(443);function l(e,t){var n,l=t.type,d=void 0===l?r.ambient:l,v=t.color,h=void 0===v?16777215:v,f=t.intensity,m=void 0===f?.3:f,w=t.position3,O=void 0===w?new c.Lb(0,0,0):w,j=(n={},Object(o.a)(n,r.ambient,(function(){return new c.b(h,m)})),Object(o.a)(n,r.directional,(function(){return new c.v(h,m)})),Object(o.a)(n,r.point,(function(){return new c.mb(h,m)})),n)[d||r.ambient]();return j.position.set(O.x,O.y,O.z),e.add(j),j}!function(e){e[e.ambient=0]="ambient",e[e.directional=1]="directional",e[e.point=2]="point"}(r||(r={}));n(9);function d(e){var t=e.scene,n=e.renderer,r=e.recieveMesh,o=e.castMeshs,l=e.light,d=e.isUseCameraHelper;n.shadowMap.enabled=!0,n.shadowMap.type=c.jb,r&&(r.receiveShadow=!0),o.forEach((function(e){"Group"===e.type?e.children.forEach((function(e){e.castShadow=!0,e.receiveShadow=!0})):e.castShadow=!0})),l.castShadow=!0,l.shadow.mapSize.width=1024,l.shadow.mapSize.height=1024,l.shadow.camera.near=1,l.shadow.camera.far=60,"OrthographicCamera"===l.shadow.camera.type&&(l.shadow.camera.top=10,l.shadow.camera.right=10,l.shadow.camera.bottom=-10,l.shadow.camera.left=-10),l.shadow.normalBias=.05;var v=null;d&&((v=new c.o(l.shadow.camera)).visible=!0,t.add(v));return{toggleVisiblePointLightCameraHelper:function(){v&&(v.visible=!v.visible)}}}},450:function(e,t,n){"use strict";n(446)},451:function(e,t,n){var r=n(20)(!1);r.push([e.i,".threejs-experiment-container[data-v-0cebc660]{height:100%}.threejs-experiment-container .col-controls[data-v-0cebc660]{flex-grow:unset}.threejs-experiment-container .col-canvas[data-v-0cebc660]{flex-grow:inherit;position:relative}.threejs-experiment-container .col-canvas__thumbnail[data-v-0cebc660]{width:30%;margin:auto}.threejs-experiment-container .col-canvas__thumbnail>p[data-v-0cebc660]{position:absolute;bottom:0;left:50%;transform:translate(-50%)}",""]),e.exports=r},452:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(444),c=Object(r.d)({setup:function(e,t){var n=Object(o.a)({context:t,isOrbitControl:!1});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,canvas:n.canvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,windowSizes:n.windowSizes,clock:n.clock,textureLoader:n.textureLoader}},data:function(){return{idAnimationFrame:null,selectorCanvasWrap:"custom-selector",thumbnailSrc:"/threejs/images/*.png",isHoverToStart:!1,isInit:!1}},computed:{selectorCanvasId:function(){return"".concat(this.selectorCanvasWrap,"_canvas")}},beforeDestroy:function(){(window.cancelAnimationFrame(this.idAnimationFrame),this.gui)&&(document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy())},methods:{initUtils:function(){},tick:function(){},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)},onRemoveThumbnail:function(){this.isHoverToStart=!0},onMouseEnterCanvas:function(){var e=this;this.setCanvas({vm:this,selectorCanvasId:this.selectorCanvasId}),this.registerRenderTickCanvas((function(){e.isInit||(e.isInit=!0,e.initUtils(),e.setStyleDatGui()),e.clock.start(),e.tick()}))},onMouseOutCanvas:function(){window.cancelAnimationFrame(this.idAnimationFrame),this.clock.stop()}}}),l=(n(450),n(46)),d=n(58),v=n.n(d),h=n(454),f=n(453),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticClass:"threejs-experiment-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap,on:{mouseenter:e.onRemoveThumbnail}},[e.isHoverToStart?n("canvas",{staticClass:"webgl",class:e.selectorCanvasId,on:{mouseenter:e.onMouseEnterCanvas,mouseout:e.onMouseOutCanvas}}):n("div",{staticClass:"col-canvas__thumbnail"},[n("img",{attrs:{src:e.thumbnailSrc,width:"auto",height:"180px"}}),e._v(" "),n("p",[e._v("Hover your mouse over the screen to start")])])])],1)}),[],!1,null,"0cebc660",null);t.default=component.exports;v()(component,{VCol:h.a,VRow:f.a})},453:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(57),n(75),n(27),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(9),n(268),n(0)),c=n(88),l=n(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var h=["sm","md","lg","xl"],f=["start","end","center"];function m(e,t){return h.reduce((function(n,r){return n[e+Object(l.r)(r)]=t(),n}),{})}var w=function(e){return[].concat(f,["baseline","stretch"]).includes(e)},O=m("align",(function(){return{type:String,default:null,validator:w}})),j=function(e){return[].concat(f,["space-between","space-around"]).includes(e)},y=m("justify",(function(){return{type:String,default:null,validator:j}})),C=function(e){return[].concat(f,["space-between","space-around","stretch"]).includes(e)},S=m("alignContent",(function(){return{type:String,default:null,validator:C}})),x={align:Object.keys(O),justify:Object.keys(y),alignContent:Object.keys(S)},k={align:"align",justify:"justify",alignContent:"align-content"};function M(e,t,n){var r=k[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var P=new Map;t.a=o.default.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},O),{},{justify:{type:String,default:null,validator:j}},y),{},{alignContent:{type:String,default:null,validator:C}},S),render:function(e,t){var n=t.props,data=t.data,o=t.children,l="";for(var d in n)l+=String(n[d]);var v=P.get(l);return v||function(){var e,t;for(t in v=[],x)x[t].forEach((function(e){var r=n[e],o=M(t,e,r);o&&v.push(o)}));v.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),P.set(l,v)}(),e(n.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},454:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(30),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(57),n(9),n(71),n(268),n(0)),c=n(88),l=n(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var h=["sm","md","lg","xl"],f=h.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),m=h.reduce((function(e,t){return e["offset"+Object(l.r)(t)]={type:[String,Number],default:null},e}),{}),w=h.reduce((function(e,t){return e["order"+Object(l.r)(t)]={type:[String,Number],default:null},e}),{}),O={col:Object.keys(f),offset:Object.keys(m),order:Object.keys(w)};function j(e,t,n){var r=e;if(null!=n&&!1!==n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return"col"!==e||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var y=new Map;t.a=o.default.extend({name:"v-col",functional:!0,props:v(v(v(v({cols:{type:[Boolean,String,Number],default:!1}},f),{},{offset:{type:[String,Number],default:null}},m),{},{order:{type:[String,Number],default:null}},w),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,data=t.data,o=t.children,l=(t.parent,"");for(var d in n)l+=String(n[d]);var v=y.get(l);return v||function(){var e,t;for(t in v=[],O)O[t].forEach((function(e){var r=n[e],o=j(t,e,r);o&&v.push(o)}));var o=v.some((function(e){return e.startsWith("col-")}));v.push((e={col:!o||!n.cols},Object(r.a)(e,"col-".concat(n.cols),n.cols),Object(r.a)(e,"offset-".concat(n.offset),n.offset),Object(r.a)(e,"order-".concat(n.order),n.order),Object(r.a)(e,"align-self-".concat(n.alignSelf),n.alignSelf),e)),y.set(l,v)}(),e(n.tag,Object(c.a)(data,{class:v}),o)}})},541:function(e,t,n){"use strict";n.r(t);n(31);var r=n(443),o=n(2),c=n(452),l=n(447);var d=Object(o.d)({extends:c.default,data:function(){return{selectorCanvasWrap:"camera-lookat-target",thumbnailSrc:"/threejs/images/thumbnail_camera-lookat-target.png",runComposable:null}},methods:{initUtils:function(){var e=function(e,t){var n=new r.ab;n.roughness=.7;var o=new r.X(new r.lb(10,10),n);o.rotation.x=.5*-Math.PI,o.position.y=0;var c=new r.X(new r.Bb(.5,32,32),n);e.add(c,o);var l=new r.Lb(1,1,1);return{plane:o,sphere:c,material:n,runRotSphereWtCamera:function(e){var t=e.elapsedTime,n=e.cameraOrbit;c.position.set(2*Math.cos(t)+l.x,1,2*Math.sin(t)+l.z),n.position.set(4*Math.cos(t)+l.x,3,4*Math.sin(t)+l.z),n.lookAt(c.position)}}}(this.scene,this.textureLoader),t=e.plane,n=e.sphere,o=e.material,c=e.runRotSphereWtCamera,d=Object(l.b)(this.scene,{type:l.a.ambient}),v=Object(l.b)(this.scene,{type:l.a.point,position3:new r.Lb(3,3,3)});Object(l.c)({scene:this.scene,renderer:this.renderer,recieveMesh:t,castMeshs:[n],light:v,isUseCameraHelper:!0}).toggleVisiblePointLightCameraHelper;this.runComposable=c,this.gui.add(d,"intensity").min(0).max(1).step(.001).name("Intensity Ambient Light"),this.gui.add(o,"metalness").min(0).max(1).step(.001).name("Metalness Material of Meshes"),this.gui.add(o,"roughness").min(0).max(1).step(.001).name("Roughness Material of Meshes"),this.axesHelper.position.set(0,.1,0),this.scene.add(this.axesHelper)},tick:function(){var e=this.clock.getElapsedTime();this.runComposable({elapsedTime:e,cameraOrbit:this.cameraOrbit}),this.renderer.render(this.scene,this.cameraOrbit),this.idAnimationFrame=window.requestAnimationFrame(this.tick)}}}),v=n(46),component=Object(v.a)(d,undefined,undefined,!1,null,null,null);t.default=component.exports}}]);