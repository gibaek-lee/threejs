(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{444:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(70);var o=n(125),r=n(443),c=n(449),l=n(448);function d(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,d=e.isPhysicallyCorrectLight,h=void 0!==d&&d,m=Object(o.e)(null),v=Object(o.e)(null),f=Object(o.e)(null),w=Object(o.e)(null),y=Object(o.e)(null),canvas=Object(o.e)(void 0),M=Object(o.e)(null),x=Object(o.e)(null),C=Object(o.e)(null),O=Object(o.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),L=Object(o.a)((function(){return!!v.value&&!!M.value&&!!w.value}));Object(o.g)(canvas,(function(){j(),P()})),Object(o.d)((function(){window.addEventListener("resize",(function(){O.value.width=window.innerWidth,O.value.height=window.innerHeight,w.value&&(w.value.aspect=O.value.width/O.value.height,w.value.updateProjectionMatrix()),M.value&&(M.value.setSize(O.value.width,O.value.height),M.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var j=function(){v.value=new r.xb,f.value=new r.i(1),f.value.position.set(2.01,.01,2.01),w.value=new r.kb(75,O.value.width/O.value.height,.1,200),w.value.position.set(4,20,60),y.value=new r.Hb,M.value=new r.Nb({canvas:canvas.value,antialias:!0}),M.value.setSize(O.value.width,O.value.height),M.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),M.value.setClearColor("#262837"),M.value.physicallyCorrectLights=h,n&&(x.value=new l.a(w.value,canvas.value),x.value.enableDamping=!0),C.value=new r.r},P=function(){m.value=new c.a({closed:!1,width:350}),m.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,o=void 0===n?"":n,r="canvas.webgl";o&&(r+=".".concat(o)),canvas.value=t.$el.querySelector(r)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(L.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:m,scene:v,renderer:M,axesHelper:f,cameraOrbit:w,orbitControl:x,windowSizes:O,clock:C,textureLoader:y}}},447:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return d}));var o,r=n(3),c=n(443);function l(e,t){var n,l=t.type,d=void 0===l?o.ambient:l,h=t.color,m=void 0===h?16777215:h,v=t.intensity,f=void 0===v?.3:v,w=t.position3,y=void 0===w?new c.Lb(0,0,0):w,M=(n={},Object(r.a)(n,o.ambient,(function(){return new c.b(m,f)})),Object(r.a)(n,o.directional,(function(){return new c.v(m,f)})),Object(r.a)(n,o.point,(function(){return new c.mb(m,f)})),n)[d||o.ambient]();return M.position.set(y.x,y.y,y.z),e.add(M),M}!function(e){e[e.ambient=0]="ambient",e[e.directional=1]="directional",e[e.point=2]="point"}(o||(o={}));n(9);function d(e){var t=e.scene,n=e.renderer,o=e.recieveMesh,r=e.castMeshs,l=e.light,d=e.isUseCameraHelper;n.shadowMap.enabled=!0,n.shadowMap.type=c.jb,o&&(o.receiveShadow=!0),r.forEach((function(e){"Group"===e.type?e.children.forEach((function(e){e.castShadow=!0,e.receiveShadow=!0})):e.castShadow=!0})),l.castShadow=!0,l.shadow.mapSize.width=1024,l.shadow.mapSize.height=1024,l.shadow.camera.near=1,l.shadow.camera.far=60,"OrthographicCamera"===l.shadow.camera.type&&(l.shadow.camera.top=10,l.shadow.camera.right=10,l.shadow.camera.bottom=-10,l.shadow.camera.left=-10),l.shadow.normalBias=.05;var h=null;d&&((h=new c.o(l.shadow.camera)).visible=!0,t.add(h));return{toggleVisiblePointLightCameraHelper:function(){h&&(h.visible=!h.visible)}}}},460:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return h}));var o,r=n(3),c=(n(19),n(443)),l=n(464),d=n(465);n(9),n(31),n(159),n(27),n(30);function h(e){var t,n=e.loaderType,h=void 0===n?o.DEFAULT:n,m=e.targetModelPath,v=void 0===m?"":m,f=e.successCallback,w=void 0===f?function(){}:f;(t={},Object(r.a)(t,o.DEFAULT,(function(){return new Promise((function(e){e(new l.a)}))})),Object(r.a)(t,o.DRACO,(function(){return new Promise((function(e){var t=new d.a,n=document.location.origin;t.setDecoderPath("".concat(n,"/threejs/draco/"));var o=new l.a;o.setDRACOLoader(t),e(o)}))})),Object(r.a)(t,o.BINARY,(function(){return new Promise((function(e){return e(!1)}))})),Object(r.a)(t,o.EMBEDDED,(function(){return new Promise((function(e){return e(!1)}))})),t)[h]().then((function(e){e.load(v,(function(e){console.log("model load success",e);var t=null,n=null;e.animations.length>0&&(n=function(e){var t=e.mixer,n=e.animations,o={},c=[];n.forEach((function(e){var n=e.name;Object.assign(o,Object(r.a)({},n,(function(){c.forEach((function(data){data.name!==n&&data.action.stop()}));var o=null;c.every((function(a){return a.name!==n}))&&(o=t.clipAction(e),c.push({name:n,action:o}));var r=c.find((function(a){return a.name===n}));r&&r.action.play()})))})),Object.assign(o,{stop:function(){c.forEach((function(data){data.action.stop()}))}});var l=function(e){var t=n.reduce((function(a,e){return a.concat([e.name])}),[])[Number(e.key)-1];(o[t]||o.stop)()};return window.addEventListener("keydown",l),{invokeClipAction:o,destroyClipEvent:function(){window.removeEventListener("keydown",l)}}}({mixer:t=new c.d(e.scene),animations:e.animations})),w({gltf:e,animationMixer:t,changeAnimation:n})}))}))}!function(e){e.DEFAULT="glTF",e.DRACO="Draco",e.BINARY="Binary",e.EMBEDDED="Embedded"}(o||(o={}))},467:function(e,t,n){var content=n(493);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("2476ecf8",content,!0,{sourceMap:!1})},492:function(e,t,n){"use strict";n(467)},493:function(e,t,n){var o=n(20)(!1);o.push([e.i,".custom-model-blender-container[data-v-6dcf6dbe]{height:100%}.custom-model-blender-container .col-controls[data-v-6dcf6dbe]{flex-grow:unset}.custom-model-blender-container .col-controls .animation-change-box>div[data-v-6dcf6dbe]{width:50px;height:50px;margin-bottom:10px;word-break:break-all;padding:5px;font-size:12px;text-align:center}.custom-model-blender-container .col-controls .animation-change-box>div[data-v-6dcf6dbe]:hover{cursor:pointer}.custom-model-blender-container .col-controls .animation-change-box__survey[data-v-6dcf6dbe]{background-color:#00f}.custom-model-blender-container .col-controls .animation-change-box__walk[data-v-6dcf6dbe]{background-color:green}.custom-model-blender-container .col-controls .animation-change-box__run[data-v-6dcf6dbe]{background-color:orange}.custom-model-blender-container .col-controls .animation-change-box__stop[data-v-6dcf6dbe]{background-color:red}.custom-model-blender-container .col-canvas[data-v-6dcf6dbe]{flex-grow:inherit;position:relative}",""]),e.exports=o},552:function(e,t,n){"use strict";n.r(t);n(31),n(30);var o=n(2),r=n(443),c=n(444),l=n(447),d=n(460),h=Object(o.d)({setup:function(e,t){var n=Object(c.a)({context:t,isOrbitControl:!0,isPhysicallyCorrectLight:!0});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,orbitControl:n.orbitControl,windowSizes:n.windowSizes,clock:n.clock}},data:function(){return{idAnimationFrame:null,prevTime:0,selectorCanvasWrap:"custom-model-blender",guiParams:{},ambientLight:null,directionalLight:null,iGLTF:null,environmentMap:null}},head:function(){return{title:"Custom Model Blender",meta:[{hid:"description",name:"description",content:"Import Custom Model using blender & realistic render"}]}},watch:{guiParams:{deep:!0,handler:function(e,t){var n=e.intensityAmbientLight,o=e.intensityDirectionalLight,r=e.positionDirectionalLight,c=e.scaleHamburger,l=e.rotateYHamburger,d=e.envMapIntensity,h=e.toneMappingExposure;if(n&&(this.ambientLight.intensity=n),o&&(this.directionalLight.intensity=o),r){var m=r.x,v=r.y,f=r.z;this.directionalLight.position.set(m,v,f)}this.iGLTF&&(c&&this.iGLTF.scene.scale.set(c,c,c),l&&(this.iGLTF.scene.rotation.y=l),d&&this.updateAllMeshes({envMap:this.environmentMap,envMapIntensity:d})),h&&(this.renderer.toneMappingExposure=h)}}},mounted:function(){var e=this;this.setCanvas({vm:this}),this.registerRenderTickCanvas((function(){e.initUtils(),e.setStyleDatGui(),e.tick()}))},beforeDestroy:function(){window.cancelAnimationFrame(this.idAnimationFrame),document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy()},methods:{initUtils:function(){var e=this;this.guiParams=Object.assign({intensityAmbientLight:1,intensityDirectionalLight:1,positionDirectionalLight:{x:-20.25,y:10,z:-20.25},scaleHamburger:1,rotateYHamburger:.25*Math.PI,envMapIntensity:7,toneMapping:3,toneMappingExposure:3},{}),this.gui.add(this.guiParams,"intensityAmbientLight").min(0).max(1).step(.01),this.gui.add(this.guiParams,"intensityDirectionalLight").min(0).max(1).step(.01),this.gui.add(this.guiParams.positionDirectionalLight,"x").min(-25).max(25).step(.01).name("lightX"),this.gui.add(this.guiParams.positionDirectionalLight,"y").min(0).max(10).step(.01).name("lightY"),this.gui.add(this.guiParams.positionDirectionalLight,"z").min(-25).max(25).step(.01).name("lightZ"),this.gui.add(this.guiParams,"scaleHamburger").min(.01).max(2).step(.001),this.gui.add(this.guiParams,"rotateYHamburger").min(-Math.PI).max(Math.PI).step(.001),this.gui.add(this.guiParams,"envMapIntensity").min(0).max(10).step(.001),this.gui.add(this.guiParams,"toneMapping",{No:r.fb,Linear:r.Q,Reinhard:r.vb,Cineon:r.p,ACESFilmic:r.a}).onFinishChange((function(){e.renderer.toneMapping=Number(e.guiParams.toneMapping),e.updateAllMeshes({envMap:e.environmentMap,envMapIntensity:e.guiParams.envMapIntensity})})),this.gui.add(this.guiParams,"toneMappingExposure").min(0).max(10).step(.001),this.ambientLight=Object(l.b)(this.scene,{type:l.a.ambient,intensity:this.guiParams.intensityAmbientLight}),this.directionalLight=Object(l.b)(this.scene,{type:l.a.directional,intensity:this.guiParams.intensityDirectionalLight,position3:this.guiParams.positionDirectionalLIght}),this.renderer.outputEncoding=r.Ob,this.renderer.toneMapping=this.guiParams.toneMapping,this.renderer.toneMappingExposure=this.guiParams.toneMappingExposure;var t=new r.u,n=document.location.origin,o="".concat(n,"/threejs/textures/environmentMap");this.environmentMap=t.load(["".concat(o,"/px.jpg"),"".concat(o,"/nx.jpg"),"".concat(o,"/py.jpg"),"".concat(o,"/ny.jpg"),"".concat(o,"/pz.jpg"),"".concat(o,"/nz.jpg")]),this.environmentMap.encoding=r.Ob,this.scene.background=this.environmentMap,this.scene.environment=this.environmentMap,Object(d.b)({loaderType:d.a.DRACO,targetModelPath:"/threejs/models/hamburger/hamburger.glb",successCallback:function(t){var n=t.gltf;e.iGLTF=n;var o=e.guiParams.scaleHamburger;n.scene.scale.set(o,o,o),n.scene.position.y=2,n.scene.rotation.y=e.guiParams.rotateYHamburger,e.scene.add(n.scene),e.updateAllMeshes({envMap:e.environmentMap,envMapIntensity:e.guiParams.envMapIntensity});Object(l.c)({scene:e.scene,renderer:e.renderer,castMeshs:[e.iGLTF.scene],light:e.directionalLight,isUseCameraHelper:!0}).toggleVisiblePointLightCameraHelper}}),this.cameraOrbit.position.set(0,20,20)},tick:function(){var e=this.clock.getElapsedTime();this.prevTime;this.prevTime=e,this.orbitControl.update(),this.renderer.render(this.scene,this.cameraOrbit),this.idAnimationFrame=window.requestAnimationFrame(this.tick)},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)},updateAllMeshes:function(e){var t=e.envMap,n=e.envMapIntensity;this.scene.traverse((function(e){e instanceof r.X&&e.material instanceof r.ab&&(e.material.envMap=t,e.material.envMapIntensity=n)}))}}}),m=(n(492),n(46)),v=n(58),f=n.n(v),w=n(454),y=n(453),component=Object(m.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{class:e.selectorCanvasWrap+"-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap},[n("canvas",{staticClass:"webgl"})])],1)}),[],!1,null,"6dcf6dbe",null);t.default=component.exports;f()(component,{VCol:w.a,VRow:y.a})}}]);