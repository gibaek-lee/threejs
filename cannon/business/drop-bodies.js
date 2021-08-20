// self를 Worker domain으로 인지하지 못하므로 self를 그냥 사용하지 않고 재정의 해줘야 한다.
var ctx = self;
/**
 * fixme
 * 1. static 폴더에 있으므로 nuxt 빌드를 거치지 않아 파일이 버전관리 되지 안아 캐싱 문제를 일으킬 수 있다. shell script를 짜서 npm run generate에 이어 해시 스트링을 붙이는 과정을 추가하던지, 아니면 nuxt 빌드 패스 안으로 넣는 것을 고민하자.
 * 2. cannon.js 폴더가 static으로 들어가고 있어 코드 분석에 javascript 비율이 지나치게 높아져 있다. nuxt 빌드 패스 내부로 넣는 방법을 고민하자.
 * 3. 타입 추적이 어려우므로 typescript 도입 방법이 필요하다. 역시 nuxt 빌드 패스 안으로 넣는 방법을 고민하자.
 */
var world;
var defaultMaterial;
var bodiesBefore = [];
ctx.onmessage = function (event) {
    var invokeModeAction = {
        init: function () {
            var physicsLibUrl = event.data.physicsLibUrl;
            if (!physicsLibUrl) {
                self.console.error('physicsLibUrl is not defined');
                return;
            }
            try {
                world = initPhysicsWorld(physicsLibUrl);
            }
            catch (e) {
                self.console.log(e.message);
            }
            initWorldMaterialContact(world);
            ctx.postMessage({ isWorldReady: true }, []);
        },
        recieve: function () {
            var _a = event.data, action = _a.action, // todo 컴포넌트 tick에서 보내는 행동 인터페이스 작성 - 'step' |
            dt = _a.dt, timeSinceLastCalled = _a.timeSinceLastCalled, maxSubSteps = _a.maxSubSteps, _b = _a.physicsObjects, physicsObjects = _b === void 0 ? [] : _b;
            var positions = event.data.positions;
            var quaternions = event.data.quaternions;
            createNewBody(physicsObjects);
            if (action === 'step') {
                worldStepCalculate({
                    dt: dt,
                    timeSinceLastCalled: timeSinceLastCalled,
                    maxSubSteps: maxSubSteps,
                    positions: positions,
                    quaternions: quaternions
                });
                ctx.postMessage({
                    isWorldReady: true,
                    positions: positions,
                    quaternions: quaternions
                }, [positions.buffer, quaternions.buffer]);
            }
        },
        error: function () {
            self.console.error('mode worker onmessage is not defined');
        }
    };
    var mode = world ? 'recieve' : 'init';
    var invoker = invokeModeAction[mode] || invokeModeAction.error;
    invoker();
};
function initPhysicsWorld(physicsLibUrl) {
    self.importScripts(physicsLibUrl); // fixme Worker interface에 WorkerGlobalScope 인터페이스가 정의 안되어 있다
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    // 최적화
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;
    //
    self.console.log('@@@canon world generated', world, CANNON);
    return world;
}
function initWorldMaterialContact(world) {
    defaultMaterial = new CANNON.Material('default');
    var defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
        friction: 0.1,
        restitution: 0.7
    });
    world.addContactMaterial(defaultContactMaterial);
}
function createFloorBody() {
    var floorShape = new CANNON.Plane();
    var floorBody = new CANNON.Body({
        mass: 0,
        position: new CANNON.Vec3(0, 0, 0),
        shape: floorShape,
        material: defaultMaterial
    });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
    world.addBody(floorBody);
}
function createSphereBody(radius) {
    if (radius === void 0) { radius = 0.5; }
    var sphereShape = new CANNON.Sphere(radius);
    var sphereBody = new CANNON.Body({
        mass: 1,
        shape: sphereShape,
        material: defaultMaterial
    });
    var heightDefault = 3;
    sphereBody.position.set(Math.random() * 3 - radius, Math.random() * 6 + heightDefault, Math.random() * 3 - radius);
    world.addBody(sphereBody);
}
function createNewBody(physicsObjects) {
    var diffBodies = physicsObjects.slice(bodiesBefore.length);
    if (diffBodies.length > 0) {
        bodiesBefore = physicsObjects;
        if (diffBodies.includes('PlaneGeometry')) {
            createFloorBody();
        }
        if (diffBodies.includes('SphereGeometry')) {
            createSphereBody();
        }
    }
}
function worldStepCalculate(_a) {
    var dt = _a.dt, timeSinceLastCalled = _a.timeSinceLastCalled, maxSubSteps = _a.maxSubSteps, positions = _a.positions, quaternions = _a.quaternions;
    world.step(dt, timeSinceLastCalled, maxSubSteps);
    world.bodies.forEach(function (wBody, index) {
        if (wBody.shapes[0].type === CANNON.Shape.types.SPHERE) {
            positions[3 * (index - 1) + 0] = wBody.position.x;
            positions[3 * (index - 1) + 1] = wBody.position.y;
            positions[3 * (index - 1) + 2] = wBody.position.z;
        }
        if (wBody.shapes[0].type === CANNON.Shape.types.BOX) {
            positions[3 * (index - 1) + 0] = wBody.position.x;
            positions[3 * (index - 1) + 1] = wBody.position.y;
            positions[3 * (index - 1) + 2] = wBody.position.z;
            quaternions[4 * (index - 1) + 0] = wBody.quaternion.x;
            quaternions[4 * (index - 1) + 1] = wBody.quaternion.y;
            quaternions[4 * (index - 1) + 2] = wBody.quaternion.z;
            quaternions[4 * (index - 1) + 3] = wBody.quaternion.w;
        }
    });
}
