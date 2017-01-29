var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var object;
var earthScale = 0.0029;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x00B2D6));

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var player = new THREE.Object3D();


// Controls
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

const toRadians = (angle) => {
    return angle * (Math.PI / 180);
};

const toDegrees = (angle) => {
    return angle * (180 / Math.PI);
};

const renderArea = renderer.domElement;

renderArea.addEventListener('mousedown', (e) => {
    isDragging = true;
});

renderArea.addEventListener('mousemove', (e) => {
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {

        let deltaRotationQuaternion = new THREE.Quaternion().
        setFromEuler(
            new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ')
        );

        player.quaternion.multiplyQuaternions(deltaRotationQuaternion, player.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});

// Load earth
var earth = new THREE.Object3D();
var earthPivot1 = new THREE.Object3D();
var earthPivot2 = new THREE.Object3D();
var loader = new THREE.OBJLoader();
var matLoader = new THREE.MTLLoader();
matLoader.setPath('models/');
matLoader.load('earth.mtl', function(materials) {
  loader.setMaterials(materials);
  loader.load('models/earth.obj', function(obj) {
    object = obj;

    object.scale.set(earthScale, earthScale, earthScale);
    object.position.set(0, 0, 0);
    earthPivot1.add(object);
    earthPivot2.add(object);
    //earth.add(object);
    player.add(earthPivot1);
    player.add(earthPivot2);
    //player.add(earth);

  });
});

camera.position.set(0, 0, 3);

// Lightning
var light = new THREE.PointLight(0xffffff, 6.0, 200);
light.position.set(-5, 10, 80);
scene.add(light);


// JSON files available globally
function addPoint1(locationCoords) {
    var p1 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.05), new THREE.LineBasicMaterial({color: 0xff0000}));
    p1.position.set(0, 0, 1);
    var location = locationCoords;
    earthPivot1.add(p1);
    earthPivot1.rotation.x = toRadians(-location.lat);
    earthPivot1.rotation.y = toRadians(location.lon);
  }

var pointyEarth = new THREE.Object3D();

function addPoint2(locationCoords) {
    var p2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.05), new THREE.LineBasicMaterial({color: 0xff0000}));
    p2.position.set(0, 0, 1);
    var location = locationCoords;
    earthPivot2.add(p2);
    earthPivot2.rotation.x = toRadians(-location.lat);
    earthPivot2.rotation.y = toRadians(location.lon);

    }
addPoint1(latlonFile.countries.ES);

addPoint2(latlonFile.countries.AR);
scene.add(player);

// Start!
document.body.appendChild(renderer.domElement);
render();
animate();

// Helpers
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    //  if (object) object.rotation.y += Math.PI / 200;
    renderer.sortObjects = false;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
