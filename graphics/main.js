var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var object;
var earthScale = 0.0029;

var pointSize  = 0.05;

renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setClearColor(new THREE.Color(0x00B2D6));
renderer.setClearColor(new THREE.Color(0x003366));

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var player = new THREE.Object3D();

scene.add(player);


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
var world1 = new THREE.Object3D();
var earth1 = new THREE.Object3D();
var world2 = new THREE.Object3D();
var earth2 = new THREE.Object3D();
var loader = new THREE.OBJLoader();
var matLoader = new THREE.MTLLoader();
var loader2 = new THREE.OBJLoader();
var matLoader2 = new THREE.MTLLoader();
matLoader.setPath('models/');
matLoader.load('earth.mtl', function(materials) {
  loader.setMaterials(materials);
  loader.load('models/earth.obj', function(obj) {
    object = obj;

    object.scale.set(earthScale, earthScale, earthScale);
    object.position.set(0, 0, 0);
    earth1.add(object);
    world1.add(earth1);
  });
});


matLoader2.setPath('models/');
matLoader2.load('earth.mtl', function(materials) {
  loader2.setMaterials(materials);
  loader2.load('models/earth.obj', function(obj) {
    object = obj;

    object.scale.set(earthScale, earthScale, earthScale);
    object.position.set(0, 0, 0);
    earth2.add(object);
    world2.add(earth2);
  });
});


camera.position.set(0, 0, 3);

// Lightning
var light = new THREE.PointLight(0xffffff, 6.0, 200);
light.position.set(-15, 15, 20);
scene.add(light);

// JSON files available globally
function loadGeoData1(locationCoords) {

    var p1 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.05), new THREE.LineBasicMaterial({color: 0xff0000}));
    p1.position.set(0, 0, 1);
    world1.add(p1);
    earth1.rotation.x = toRadians(locationCoords.lat);
    earth1.rotation.y = toRadians(-locationCoords.lon);
    }

function loadGeoData2(locationCoords) {

    var p2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.01, 0.05), new THREE.LineBasicMaterial({color: 0xff0000}));
    p2.position.set(0, 0, 1);
    world2.add(p2);
    earth2.rotation.x = toRadians(locationCoords.lat);
    earth2.rotation.y = toRadians(-locationCoords.lon);

    }

loadGeoData1(latlonFile.countries.IT,latlonFile.countries.AR );
player.add(world1);
loadGeoData2(latlonFile.countries.AR);
//player.add(world2);

// Start!
document.getElementById('threeContainer').appendChild(renderer.domElement);
render();
animate();

// Helpers
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    //  if (object) object.rotation.y += Math.PI / 200;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
