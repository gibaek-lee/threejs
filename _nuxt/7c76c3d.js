(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{444:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));n(70);var r=n(125),o=n(443),l=n(449),c=n(448);function d(e){e.context;var t=e.isOrbitControl,n=void 0!==t&&t,d=e.isPhysicallyCorrectLight,f=void 0!==d&&d,v=Object(r.e)(null),m=Object(r.e)(null),h=Object(r.e)(null),w=Object(r.e)(null),y=Object(r.e)(null),canvas=Object(r.e)(void 0),O=Object(r.e)(null),j=Object(r.e)(null),x=Object(r.e)(null),C=Object(r.a)((function(){return{width:window.innerWidth,height:window.innerHeight}})),S=Object(r.a)((function(){return!!m.value&&!!O.value&&!!w.value}));Object(r.g)(canvas,(function(){P(),E()})),Object(r.d)((function(){window.addEventListener("resize",(function(){C.value.width=window.innerWidth,C.value.height=window.innerHeight,w.value&&(w.value.aspect=C.value.width/C.value.height,w.value.updateProjectionMatrix()),O.value&&(O.value.setSize(C.value.width,C.value.height),O.value.setPixelRatio(Math.min(window.devicePixelRatio,2)))}))}));var P=function(){m.value=new o.xb,h.value=new o.i(1),h.value.position.set(2.01,.01,2.01),w.value=new o.kb(75,C.value.width/C.value.height,.1,200),w.value.position.set(4,20,60),y.value=new o.Hb,O.value=new o.Nb({canvas:canvas.value,antialias:!0}),O.value.setSize(C.value.width,C.value.height),O.value.setPixelRatio(Math.min(window.devicePixelRatio,2)),O.value.setClearColor("#262837"),O.value.physicallyCorrectLights=f,n&&(j.value=new c.a(w.value,canvas.value),j.value.enableDamping=!0),x.value=new o.r},E=function(){v.value=new l.a({closed:!1,width:350}),v.value.parentSelector="div.dg.ac"};return{setCanvas:function(e){var t=e.vm,n=e.selectorCanvasId,r=void 0===n?"":n,o="canvas.webgl";r&&(o+=".".concat(r)),canvas.value=t.$el.querySelector(o)||void 0},registerRenderTickCanvas:function(e){var t=0,n=window.setInterval((function(){if(S.value)return e(),void window.clearInterval(n);t+=1,console.log("waiting UseWebgl init...",t),t>60&&(window.clearInterval(n),console.error("failed to init UseWebgl"))}),100)},canvas:canvas,gui:v,scene:m,renderer:O,axesHelper:h,cameraOrbit:w,orbitControl:j,windowSizes:C,clock:x,textureLoader:y}}},453:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(57),n(75),n(27),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(9),n(268),n(0)),l=n(88),c=n(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=["sm","md","lg","xl"],m=["start","end","center"];function h(e,t){return v.reduce((function(n,r){return n[e+Object(c.r)(r)]=t(),n}),{})}var w=function(e){return[].concat(m,["baseline","stretch"]).includes(e)},y=h("align",(function(){return{type:String,default:null,validator:w}})),O=function(e){return[].concat(m,["space-between","space-around"]).includes(e)},j=h("justify",(function(){return{type:String,default:null,validator:O}})),x=function(e){return[].concat(m,["space-between","space-around","stretch"]).includes(e)},C=h("alignContent",(function(){return{type:String,default:null,validator:x}})),S={align:Object.keys(y),justify:Object.keys(j),alignContent:Object.keys(C)},P={align:"align",justify:"justify",alignContent:"align-content"};function E(e,t,n){var r=P[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var M=new Map;t.a=o.default.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},y),{},{justify:{type:String,default:null,validator:O}},j),{},{alignContent:{type:String,default:null,validator:x}},C),render:function(e,t){var n=t.props,data=t.data,o=t.children,c="";for(var d in n)c+=String(n[d]);var f=M.get(c);return f||function(){var e,t;for(t in f=[],S)S[t].forEach((function(e){var r=n[e],o=E(t,e,r);o&&f.push(o)}));f.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),M.set(c,f)}(),e(n.tag,Object(l.a)(data,{staticClass:"row",class:f}),o)}})},454:function(e,t,n){"use strict";n(8),n(10),n(15),n(16);var r=n(3),o=(n(30),n(11),n(36),n(63),n(269),n(19),n(39),n(270),n(271),n(272),n(273),n(274),n(275),n(276),n(277),n(278),n(279),n(280),n(281),n(282),n(45),n(57),n(9),n(71),n(268),n(0)),l=n(88),c=n(1);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=["sm","md","lg","xl"],m=v.reduce((function(e,t){return e[t]={type:[Boolean,String,Number],default:!1},e}),{}),h=v.reduce((function(e,t){return e["offset"+Object(c.r)(t)]={type:[String,Number],default:null},e}),{}),w=v.reduce((function(e,t){return e["order"+Object(c.r)(t)]={type:[String,Number],default:null},e}),{}),y={col:Object.keys(m),offset:Object.keys(h),order:Object.keys(w)};function O(e,t,n){var r=e;if(null!=n&&!1!==n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return"col"!==e||""!==n&&!0!==n?(r+="-".concat(n)).toLowerCase():r.toLowerCase()}}var j=new Map;t.a=o.default.extend({name:"v-col",functional:!0,props:f(f(f(f({cols:{type:[Boolean,String,Number],default:!1}},m),{},{offset:{type:[String,Number],default:null}},h),{},{order:{type:[String,Number],default:null}},w),{},{alignSelf:{type:String,default:null,validator:function(e){return["auto","start","end","center","baseline","stretch"].includes(e)}},tag:{type:String,default:"div"}}),render:function(e,t){var n=t.props,data=t.data,o=t.children,c=(t.parent,"");for(var d in n)c+=String(n[d]);var f=j.get(c);return f||function(){var e,t;for(t in f=[],y)y[t].forEach((function(e){var r=n[e],o=O(t,e,r);o&&f.push(o)}));var o=f.some((function(e){return e.startsWith("col-")}));f.push((e={col:!o||!n.cols},Object(r.a)(e,"col-".concat(n.cols),n.cols),Object(r.a)(e,"offset-".concat(n.offset),n.offset),Object(r.a)(e,"order-".concat(n.order),n.order),Object(r.a)(e,"align-self-".concat(n.alignSelf),n.alignSelf),e)),j.set(c,f)}(),e(n.tag,Object(l.a)(data,{class:f}),o)}})},477:function(e,t,n){var content=n(539);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(21).default)("3207fb08",content,!0,{sourceMap:!1})},538:function(e,t,n){"use strict";n(477)},539:function(e,t,n){var r=n(20)(!1);r.push([e.i,".shader-basic-container[data-v-4ffa572e]{height:100%}.shader-basic-container .col-controls[data-v-4ffa572e]{flex-grow:unset}.shader-basic-container .col-canvas[data-v-4ffa572e]{flex-grow:inherit;position:relative}",""]),e.exports=r},547:function(e,t,n){"use strict";n.r(t);n(31);var r=n(2),o=n(443),l=n(444),c=Object(r.d)({setup:function(e,t){var n=Object(l.a)({context:t,isOrbitControl:!0});return{setCanvas:n.setCanvas,registerRenderTickCanvas:n.registerRenderTickCanvas,gui:n.gui,scene:n.scene,renderer:n.renderer,axesHelper:n.axesHelper,cameraOrbit:n.cameraOrbit,orbitControl:n.orbitControl,windowSizes:n.windowSizes,clock:n.clock,textureLoader:n.textureLoader}},data:function(){return{idAnimationFrame:null,selectorCanvasWrap:"shader-basic",deltaTime:0,material:null,guiParam:{timespeed:2,palette:"#FFA500"}}},head:function(){return{title:"Shader Basic",meta:[{hid:"description",name:"description",content:"apply vertext and fragment shader using glsl"}]}},watch:{deltaTime:function(e){this.material.uniforms.uTime.value=e*this.guiParam.timespeed,this.material.uniforms.uColor.value=new o.s(this.guiParam.palette)}},mounted:function(){var e=this;this.setCanvas({vm:this}),this.registerRenderTickCanvas((function(){e.initUtils(),e.setStyleDatGui(),e.tick()}))},beforeDestroy:function(){window.cancelAnimationFrame(this.idAnimationFrame),document.querySelector(this.gui.parentSelector).appendChild(this.gui.domElement),this.gui.destroy()},methods:{initUtils:function(){var e=new o.lb(60,60,128,128),t=document.location.origin,n=this.textureLoader.load("".concat(t,"/threejs/textures/flag-french.jpg"));this.material=new o.tb({vertexShader:"// OpenGL ES Shading Language Reference: https://www.shaderific.com/glsl\n\n// embeded glsl matrices\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\n\n// custom uniforms of threejs matrial\nuniform vec2 uFrequency;\nuniform float uTime;\n\n// embeded attribute of threejs geometry\nattribute vec3 position;\nattribute vec2 uv;\n\n// custom attribute of threejs gemometry(from geometry.setAttribute('customAttr'))\n// attribute <type> customAttr\n\n// data send to fragment shader which includes information of geometry\nvarying vec2 varyUV;\nvarying float varyElevation;\n\nvoid main() {\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\n  float MINIMIZE_SIZE = 0.1;\n  float TIME_SPEED = 2.0;\n  float AMPLITUDE = 2.0;\n  float elevation = AMPLITUDE * sin((modelPosition.x * MINIMIZE_SIZE) * uFrequency.x - uTime * TIME_SPEED);\n  elevation += AMPLITUDE * sin((modelPosition.y * MINIMIZE_SIZE) * uFrequency.y - uTime * TIME_SPEED);\n  modelPosition.z = elevation;\n\n  vec4 viewPosition = viewMatrix * modelPosition;\n  vec4 projectionPosition = projectionMatrix * viewPosition;\n\n  gl_Position = projectionPosition;\n\n  varyUV = uv;\n  varyElevation = elevation;\n}\n",fragmentShader:"precision mediump float;\n\n// custom uniforms of matrial\nuniform vec3 uColor;\nuniform sampler2D uTexture;\n\n// data comes from vertex shader which include geometry information\nvarying vec2 varyUV;\nvarying float varyElevation;\n\nvoid main() {\n  vec4 textureColor = texture2D(uTexture, varyUV);\n  textureColor.rgb *= varyElevation * 0.1 + 1.0;\n  gl_FragColor = textureColor; // vec4(uColor, 1.0);\n}\n",uniforms:{uFrequency:{value:new o.Kb(2,2)},uTime:{value:this.deltaTime},uColor:{value:new o.s("orange")},uTexture:{value:n}}}),this.material.side=o.w;var r=new o.X(e,this.material);r.scale.y=2/3,this.scene.add(r),this.gui.add(this.material.uniforms.uFrequency.value,"x").min(0).max(20).step(.01).name("freqX"),this.gui.add(this.material.uniforms.uFrequency.value,"y").min(0).max(20).step(.01).name("freqY"),this.gui.add(this.guiParam,"timespeed").min(0).max(10).step(.1).name("timespeed"),this.gui.addColor(this.guiParam,"palette")},tick:function(){var e=this.clock.getElapsedTime();this.deltaTime=e,this.orbitControl.update(),this.renderer.render(this.scene,this.cameraOrbit),this.idAnimationFrame=window.requestAnimationFrame(this.tick)},setStyleDatGui:function(){this.gui.domElement.style.cssText+="position: absolute; right: 0px; top: 0px;",this.$el.querySelector(".".concat(this.selectorCanvasWrap)).appendChild(this.gui.domElement)}}}),d=(n(538),n(46)),f=n(58),v=n.n(f),m=n(454),h=n(453),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{class:e.selectorCanvasWrap+"-container"},[n("v-col",{staticClass:"col-canvas",class:e.selectorCanvasWrap},[n("canvas",{staticClass:"webgl"})])],1)}),[],!1,null,"4ffa572e",null);t.default=component.exports;v()(component,{VCol:m.a,VRow:h.a})}}]);