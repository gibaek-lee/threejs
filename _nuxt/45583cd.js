(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{444:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(70);var o=n(125),r=n(443),c=n(449),l=n(448);function d(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,d=e.isPhysicallyCorrectLight,m=void 0!==d&&d,v=Object(o.e)(null),h=Object(o.e)(null),w=Object(o.e)(null),f=Object(o.e)(null),y=Object(o.e)(null),canvas=Object(o.e)(void 0),C=Object(o.e)(null),k=Object(o.e)(null),x=Object(o.e)(null),O=Object(o.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),j=Object(o.a)((function(){return!!h.value&&!!C.value&&!!f.value}));Object(o.g)(canvas,(function(){E(),S()})),Object(o.d)((function(){window.addEventListener("resize",(function(){O.value.width=window.innerWidth,O.value.height=window.innerHeight,f.value&&(f.value.aspect=O.value.width/O.value.height,f.value.updateProjectionMatrix()),C.value&&(C.value.setSize(O.value.width,O.value.height),C.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var E=function(){h.value=new r.xb,w.value=new r.i(1),w.value.position.set(2.01,.01,2.01),f.value=new r.kb(75,O.value.width/O.value.height,.1,200),f.value.position.set(4,20,60),y.value=new r.Hb,C.value=new r.Nb({canvas:canvas.value,antialias:!0}),C.value.setSize(O.value.width,O.value.height),C.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),C.value.setClearColor("#262837"),C.value.physicallyCorrectLights=m,n&&(k.value=new l.a(f.value,canvas.value),k.value.enableDamping=!0),x.value=new r.r},S=function(){v.value=new c.a({closed:!1,width:350}),v.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,o=void 0===n?"":n,r="canvas.webgl";o&&(r+=".".concat(o)),canvas.value=t.$el.querySelector(r)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(j.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:v,scene:h,renderer:C,axesHelper:w,cameraOrbit:f,orbitControl:k,windowSizes:O,clock:x,textureLoader:y}}},446:function(e,t,n){var content=n(451);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("6eb620e4",content,!0,{sourceMap:!1})},447:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var o,r=n(3),c=n(443);function l(e,t){var n,l=t.type,d=void 0===l?o.ambient:l,m=t.color,v=void 0===m?16777215:m,h=t.intensity,w=void 0===h?.3:h,f=t.position3,y=void 0===f?new c.Lb(0,0,0):f,C=(n={},Object(r.a)(n,o.ambient,(function(){return new c.b(v,w)})),Object(r.a)(n,o.directional,(function(){return new c.v(v,w)})),Object(r.a)(n,o.point,(function(){return new c.mb(v,w)})),n)[d||o.ambient]();return C.position.set(y.x,y.y,y.z),e.add(C),C}!function(e){e[e.ambient=0]="ambient",e[e.directional=1]="directional",e[e.point=2]="point"}(o||(o={}));n(9);function d(e){var t=e.scene,n=e.renderer,o=e.recieveMesh,r=e.castMeshs,l=e.light,d=e.isUseCameraHelper;n.shadowMap.enabled=!0,n.shadowMap.type=c.jb,o&&(o.receiveShadow=!0),r.forEach((function(e){"Group"===e.type?e.children.forEach((function(e){e.castShadow=!0,e.receiveShadow=!0})):e.castShadow=!0})),l.castShadow=!0,l.shadow.mapSize.width=1024,l.shadow.mapSize.height=1024,l.shadow.camera.near=1,l.shadow.camera.far=60,"OrthographicCamera"===l.shadow.camera.type&&(l.shadow.camera.top=10,l.shadow.camera.right=10,l.shadow.camera.bottom=-10,l.shadow.camera.left=-10),l.shadow.normalBias=.05;var m=null;d&&((m=new c.o(l.shadow.camera)).visible=!0,t.add(m));return{toggleVisiblePointLightCameraHelper:function(){m&&(m.visible=!m.visible)}}}},450:function(e,t,n){"use strict";n(446)},451:function(e,t,n){var o=n(20)(!1);o.push([e.i,".threejs-experiment-container[data-v-0cebc660]{height:100%}.threejs-experiment-container .col-controls[data-v-0cebc660]{flex-grow:unset}.threejs-experiment-container .col-canvas[data-v-0cebc660]{flex-grow:inherit;position:relative}.threejs-experiment-container .col-canvas__thumbnail[data-v-0cebc660]{width:30%;margin:auto}.threejs-experiment-container .col-canvas__thumbnail>p[data-v-0cebc660]{position:absolute;bottom:0;left:50%;transform:translate(-50%)}",""]),e.exports=o},452:function(e,t,n){"use strict";n.r(t);var o=n(2),r=n(444),c=Object(o.d)({setup:function(e,t){var n=Object(r.a)({context:t,isOrbitControl:!1});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,canvas:n.canvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,windowSizes:n.windowSizes,clock:n.clock,textureLoader:n.textureLoader}},data:function(){return{idAnimationFrame:null,selectorCanvasWrap:"custom-selector",thumbnailSrc:"/threejs/images/*.png",isHoverToStart:!1,isInit:!1}},computed:{selectorCanvasId:function(){return"".concat(this.selectorCanvasWrap,"_canvas")}},beforeDestroy:function(){(window.cancelAnimationFrame(this.idAnimationFrame),this.gui)&&(document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy())},methods:{initUtils:function(){},tick:function(){},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)},onRemoveThumbnail:function(){this.isHoverToStart=!0},onMouseEnterCanvas:function(){var e=this;this.setCanvas({vm:this,selectorCanvasId:this.selectorCanvasId}),this.registerRenderTickCanvas((function(){e.isInit||(e.isInit=!0,e.initUtils(),e.setStyleDatGui()),e.clock.start(),e.tick()}))},onMouseOutCanvas:function(){window.cancelAnimationFrame(this.idAnimationFrame),this.clock.stop()}}}),l=(n(450),n(46)),d=n(58),m=n.n(d),v=n(454),h=n(453),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticClass:"threejs-experiment-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap,on:{mouseenter:e.onRemoveThumbnail}},[e.isHoverToStart?n("canvas",{staticClass:"webgl",class:e.selectorCanvasId,on:{mouseenter:e.onMouseEnterCanvas,mouseout:e.onMouseOutCanvas}}):n("div",{staticClass:"col-canvas__thumbnail"},[n("img",{attrs:{src:e.thumbnailSrc,width:"auto",height:"180px"}}),e._v(" "),n("p",[e._v("Hover your mouse over the screen to start")])])])],1)}),[],!1,null,"0cebc660",null);t.default=component.exports;m()(component,{VCol:v.a,VRow:h.a})},456:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(9);var o=n(443);function r(e){var canvas=e.canvas,t=e.isSetFromCamera,n=void 0!==t&&t,r=new o.ub,c=new o.Kb;return window.addEventListener("mousemove",(function(e){var t=e.target;if(!t||"CANVAS"===t.tagName){var n=canvas.getBoundingClientRect();c.set((e.clientX-n.left)/(n.right-n.left)*2-1,-(e.clientY-n.top)/(n.bottom-n.top)*2+1)}})),{raycasterRender:function(e){var t=e.origin,o=e.direction,l=e.camera,d=e.testObjects;n?r.setFromCamera(c,l):r.set(t,o),d.forEach((function(object){object.material&&object.material.color.set(16777215)})),r.intersectObjects(d).forEach((function(e){if(e.distance>0){var object=e.object;object.material.color.set(16711680),object.__raycastHoverCallback&&"function"==typeof object.__raycastHoverCallback&&object.__raycastHoverCallback()}}))}}}},540:function(e,t,n){"use strict";n.r(t);var o=n(78),r=(n(27),n(31),n(2)),c=n(443),l=n(452),d=n(447);n(448);var m=n(3);const v=new c.x(0,0,0,"YXZ"),h=new c.Lb,w={type:"change"},f={type:"lock"},y={type:"unlock"},C=Math.PI/2;class k extends c.y{constructor(e,t){super(),void 0===t&&(console.warn('THREE.PointerLockControls: The second parameter "domElement" is now mandatory.'),t=document.body),this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI;const n=this;function o(t){if(!1===n.isLocked)return;const o=t.movementX||t.mozMovementX||t.webkitMovementX||0,r=t.movementY||t.mozMovementY||t.webkitMovementY||0;v.setFromQuaternion(e.quaternion),v.y-=.002*o,v.x-=.002*r,v.x=Math.max(C-n.maxPolarAngle,Math.min(C-n.minPolarAngle,v.x)),e.quaternion.setFromEuler(v),n.dispatchEvent(w)}function r(){n.domElement.ownerDocument.pointerLockElement===n.domElement?(n.dispatchEvent(f),n.isLocked=!0):(n.dispatchEvent(y),n.isLocked=!1)}function l(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}this.connect=function(){n.domElement.ownerDocument.addEventListener("mousemove",o),n.domElement.ownerDocument.addEventListener("pointerlockchange",r),n.domElement.ownerDocument.addEventListener("pointerlockerror",l)},this.disconnect=function(){n.domElement.ownerDocument.removeEventListener("mousemove",o),n.domElement.ownerDocument.removeEventListener("pointerlockchange",r),n.domElement.ownerDocument.removeEventListener("pointerlockerror",l)},this.dispose=function(){this.disconnect()},this.getObject=function(){return e},this.getDirection=function(){const t=new c.Lb(0,0,-1);return function(n){return n.copy(t).applyQuaternion(e.quaternion)}}(),this.moveForward=function(t){h.setFromMatrixColumn(e.matrix,0),h.crossVectors(e.up,h),e.position.addScaledVector(h,t)},this.moveRight=function(t){h.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(h,t)},this.lock=function(){this.domElement.requestPointerLock()},this.unlock=function(){n.domElement.ownerDocument.exitPointerLock()},this.connect()}}var x;!function(e){e.p="partial"}(x||(x={}));var O=n(456),j=Object(r.d)({extends:l.default,data:function(){return{selectorCanvasWrap:"normal-vector-directional-transition",thumbnailSrc:"/threejs/images/thumbnail_normal-vector-directional-transition.png",raycasterRender:function(){},raycastTestObjects:[]}},methods:{makeBasePlane:function(){var e=new c.ab;return e.roughness=.7,new c.X(new c.lb(20,20),e)},makeSimpleSphereMesh:function(){var e=new c.X(new c.Bb(.5,16,16),new c.ab);return e.roughness=.7,e},raycastHoverCallback:function(e,t){var n=t.geometry.parameters.radius;if(!(e.position.distanceTo(t.position)<n+.02)){var o=new c.Lb;o.subVectors(t.position,e.position).normalize(),e.position.add(o.multiplyScalar(.01))}},initUtils:function(){var e,t=this;(function(e){e.vm;var t=e.camera,canvas=e.canvas,n=e.options,o=n.mode,r=void 0===o?x.p:o,c=(n.deltaMove,new k(t,canvas)),l=Object(m.a)({},x.p,(function(){c.isLocked?c.unlock():c.lock()}));return canvas.addEventListener("click",l[r]),window.addEventListener("keydown",(function(e){switch(e.key){case"Escape":c.unlock()}})),{controls:c}})({vm:this,canvas:this.canvas,camera:this.cameraOrbit,options:{mode:x.p,deltaMove:.1}}).controls;this.raycasterRender=Object(O.a)({canvas:this.canvas,isSetFromCamera:!0}).raycasterRender;var n=this.makeBasePlane();n.rotation.x=.5*-Math.PI,n.position.y=0;var r=this.makeSimpleSphereMesh(),l=this.makeSimpleSphereMesh();r.position.x=-4,l.position.x=4,r.__raycastHoverCallback=function(){return t.raycastHoverCallback(t.cameraOrbit,r)},l.__raycastHoverCallback=function(){return t.raycastHoverCallback(t.cameraOrbit,l)},this.raycastTestObjects.push(r,l),this.cameraOrbit.position.set(n.position.x,n.position.y+2,n.position.z+n.geometry.parameters.width/2),this.axesHelper.position.set(0,n.position.y+.001,0),(e=this.scene).add.apply(e,[n].concat(Object(o.a)(this.raycastTestObjects),[this.axesHelper]));var v=Object(d.b)(this.scene,{type:d.a.ambient}),h=Object(d.b)(this.scene,{type:d.a.point,position3:new c.Lb(0,5,0)});Object(d.c)({scene:this.scene,renderer:this.renderer,recieveMesh:n,castMeshs:this.raycastTestObjects,light:h,isUseCameraHelper:!0}).toggleVisiblePointLightCameraHelper;this.gui.add(v,"intensity").min(0).max(1).step(.001).name("Intensity Ambient Light")},tick:function(){this.clock.getElapsedTime();this.raycasterRender({camera:this.cameraOrbit,testObjects:this.raycastTestObjects}),this.renderer.render(this.scene,this.cameraOrbit),this.idAnimationFrame=window.requestAnimationFrame(this.tick)}}}),E=n(46),component=Object(E.a)(j,undefined,undefined,!1,null,null,null);t.default=component.exports}}]);