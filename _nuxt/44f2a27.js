(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{445:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));n(70);var r=n(125),o=n(443),c=n(449),l=n(448);function h(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,h=e.isPhysicallyCorrectLight,v=void 0!==h&&h,d=Object(r.e)(null),m=Object(r.e)(null),w=Object(r.e)(null),f=Object(r.e)(null),C=Object(r.e)(null),canvas=Object(r.e)(void 0),j=Object(r.e)(null),O=Object(r.e)(null),y=Object(r.e)(null),S=Object(r.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),x=Object(r.a)((function(){return!!m.value&&!!j.value&&!!f.value}));Object(r.g)(canvas,(function(){k(),M()})),Object(r.d)((function(){window.addEventListener("resize",(function(){S.value.width=window.innerWidth,S.value.height=window.innerHeight,f.value&&(f.value.aspect=S.value.width/S.value.height,f.value.updateProjectionMatrix()),j.value&&(j.value.setSize(S.value.width,S.value.height),j.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var k=function(){m.value=new o.wb,w.value=new o.i(1),w.value.position.set(2.01,.01,2.01),f.value=new o.kb(75,S.value.width/S.value.height,.1,200),f.value.position.set(4,20,60),C.value=new o.Gb,j.value=new o.Mb({canvas:canvas.value,antialias:!0}),j.value.setSize(S.value.width,S.value.height),j.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),j.value.setClearColor("#262837"),j.value.physicallyCorrectLights=v,n&&(O.value=new l.a(f.value,canvas.value),O.value.enableDamping=!0),y.value=new o.r},M=function(){d.value=new c.a({closed:!1,width:350}),d.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,r=void 0===n?"":n,o="canvas.webgl";r&&(o+=".".concat(r)),canvas.value=t.$el.querySelector(o)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(x.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:d,scene:m,renderer:j,axesHelper:w,cameraOrbit:f,orbitControl:O,windowSizes:S,clock:y,textureLoader:C}}},446:function(e,t,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("6eb620e4",content,!0,{sourceMap:!1})},447:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return h}));var r,o=n(3),c=n(443);function l(e,t){var n,l=t.type,h=void 0===l?r.ambient:l,v=t.color,d=void 0===v?16777215:v,m=t.intensity,w=void 0===m?.3:m,f=t.position3,C=void 0===f?new c.Kb(0,0,0):f,j=(n={},Object(o.a)(n,r.ambient,(function(){return new c.b(d,w)})),Object(o.a)(n,r.directional,(function(){return new c.v(d,w)})),Object(o.a)(n,r.point,(function(){return new c.mb(d,w)})),n)[h||r.ambient]();return j.position.set(C.x,C.y,C.z),e.add(j),j}!function(e){e[e.ambient=0]="ambient",e[e.directional=1]="directional",e[e.point=2]="point"}(r||(r={}));n(9);function h(e){var t=e.scene,n=e.renderer,r=e.recieveMesh,o=e.castMeshs,l=e.light,h=e.isUseCameraHelper;n.shadowMap.enabled=!0,n.shadowMap.type=c.jb,r&&(r.receiveShadow=!0),o.forEach((function(e){"Group"===e.type?e.children.forEach((function(e){e.castShadow=!0,e.receiveShadow=!0})):e.castShadow=!0})),l.castShadow=!0,l.shadow.mapSize.width=1024,l.shadow.mapSize.height=1024,l.shadow.camera.near=1,l.shadow.camera.far=60,"OrthographicCamera"===l.shadow.camera.type&&(l.shadow.camera.top=10,l.shadow.camera.right=10,l.shadow.camera.bottom=-10,l.shadow.camera.left=-10),l.shadow.normalBias=.05;var v=null;h&&((v=new c.o(l.shadow.camera)).visible=!0,t.add(v));return{toggleVisiblePointLightCameraHelper:function(){v&&(v.visible=!v.visible)}}}},450:function(e,t,n){"use strict";n(446)},451:function(e,t,n){var r=n(20)(!1);r.push([e.i,".threejs-experiment-container[data-v-0cebc660]{height:100%}.threejs-experiment-container .col-controls[data-v-0cebc660]{flex-grow:unset}.threejs-experiment-container .col-canvas[data-v-0cebc660]{flex-grow:inherit;position:relative}.threejs-experiment-container .col-canvas__thumbnail[data-v-0cebc660]{width:30%;margin:auto}.threejs-experiment-container .col-canvas__thumbnail>p[data-v-0cebc660]{position:absolute;bottom:0;left:50%;transform:translate(-50%)}",""]),e.exports=r},452:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(445),c=Object(r.d)({setup:function(e,t){var n=Object(o.a)({context:t,isOrbitControl:!1});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,canvas:n.canvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,windowSizes:n.windowSizes,clock:n.clock,textureLoader:n.textureLoader}},data:function(){return{idAnimationFrame:null,selectorCanvasWrap:"custom-selector",thumbnailSrc:"/threejs/images/*.png",isHoverToStart:!1,isInit:!1}},computed:{selectorCanvasId:function(){return"".concat(this.selectorCanvasWrap,"_canvas")}},beforeDestroy:function(){(window.cancelAnimationFrame(this.idAnimationFrame),this.gui)&&(document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy())},methods:{initUtils:function(){},tick:function(){},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)},onRemoveThumbnail:function(){this.isHoverToStart=!0},onMouseEnterCanvas:function(){var e=this;this.setCanvas({vm:this,selectorCanvasId:this.selectorCanvasId}),this.registerRenderTickCanvas((function(){e.isInit||(e.isInit=!0,e.initUtils(),e.setStyleDatGui()),e.clock.start(),e.tick()}))},onMouseOutCanvas:function(){window.cancelAnimationFrame(this.idAnimationFrame),this.clock.stop()}}}),l=(n(450),n(46)),h=n(58),v=n.n(h),d=n(454),m=n(453),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticClass:"threejs-experiment-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap,on:{mouseenter:e.onRemoveThumbnail}},[e.isHoverToStart?n("canvas",{staticClass:"webgl",class:e.selectorCanvasId,on:{mouseenter:e.onMouseEnterCanvas,mouseout:e.onMouseOutCanvas}}):n("div",{staticClass:"col-canvas__thumbnail"},[n("img",{attrs:{src:e.thumbnailSrc,width:"auto",height:"180px"}}),e._v(" "),n("p",[e._v("Hover your mouse over the screen to start")])])])],1)}),[],!1,null,"0cebc660",null);t.default=component.exports;v()(component,{VCol:d.a,VRow:m.a})},456:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));n(9);var r=n(443);function o(e){var canvas=e.canvas,t=e.isSetFromCamera,n=void 0!==t&&t,o=new r.tb,c=new r.Jb;return window.addEventListener("mousemove",(function(e){var t=e.target;if(!t||"CANVAS"===t.tagName){var n=canvas.getBoundingClientRect();c.set((e.clientX-n.left)/(n.right-n.left)*2-1,-(e.clientY-n.top)/(n.bottom-n.top)*2+1)}})),{raycasterRender:function(e){var t=e.origin,r=e.direction,l=e.camera,h=e.testObjects;n?o.setFromCamera(c,l):o.set(t,r),h.forEach((function(object){object.material&&object.material.color.set(16777215)})),o.intersectObjects(h).forEach((function(e){if(e.distance>0){var object=e.object;object.material.color.set(16711680),object.__raycastHoverCallback&&"function"==typeof object.__raycastHoverCallback&&object.__raycastHoverCallback()}}))}}}},539:function(e,t,n){"use strict";n.r(t);var r=n(78),o=(n(27),n(9),n(2)),c=n(443),l=n(452),h=n(456),v=n(447),d=Object(o.d)({extends:l.default,data:function(){return{selectorCanvasWrap:"raycast-hover-interaction",thumbnailSrc:"/threejs/images/thumbnail_raycast-hover-interaction.png",raycasterRender:function(){},raycastTestObjects:[]}},methods:{makeBasePlane:function(){var e=new c.ab;return e.roughness=.7,new c.X(new c.lb(20,20),e)},makeSimpleSphereMesh:function(){var e=new c.X(new c.Ab(.5,16,16),new c.ab);return e.roughness=.7,e},initUtils:function(){var e,t=this.makeBasePlane();t.rotation.x=.5*-Math.PI,t.position.y=0;var n=this.makeSimpleSphereMesh(),o=this.makeSimpleSphereMesh(),l=this.makeSimpleSphereMesh();n.position.x=-2,l.position.x=2,this.raycastTestObjects.push(n,o,l);Object(v.b)(this.scene,{type:v.a.ambient});var d=Object(v.b)(this.scene,{type:v.a.point,position3:new c.Kb(0,5,0)});Object(v.c)({scene:this.scene,renderer:this.renderer,recieveMesh:t,castMeshs:this.raycastTestObjects,light:d,isUseCameraHelper:!0}).toggleVisiblePointLightCameraHelper;this.raycasterRender=Object(h.a)({canvas:this.canvas,isSetFromCamera:!0}).raycasterRender,this.cameraOrbit.position.set(0,2,5),(e=this.scene).add.apply(e,[t].concat(Object(r.a)(this.raycastTestObjects)))},tick:function(){var e=this.clock.getElapsedTime();this.raycastTestObjects.forEach((function(t,n){var r=.4*(n+1);t.position.y=3*Math.sin(e*r)+1})),this.raycasterRender({camera:this.cameraOrbit,testObjects:this.raycastTestObjects}),this.renderer.render(this.scene,this.cameraOrbit),this.idAnimationFrame=window.requestAnimationFrame(this.tick)}}}),m=n(46),component=Object(m.a)(d,undefined,undefined,!1,null,null,null);t.default=component.exports}}]);