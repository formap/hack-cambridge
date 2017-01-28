var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var object;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x00B2D6));

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var player = new THREE.Object3D();
scene.add(player);

// Controls
var controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );
controls.minDistance = 75;
controls.maxDistance = 1000;
controls.enablePan = false;

// Our world
var loader = new THREE.OBJLoader();
var matLoader = new THREE.MTLLoader();
matLoader.setPath('models/');
matLoader.load('earth.mtl', function(materials) {
  loader.setMaterials(materials);
  loader.load('models/earth.obj', function(obj) {
    object = obj;
    //object.rotation.y = 0.05;
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 0, 0);
    //scene.add(object);
    player.add(object);
  });
});

camera.position.set(0, 0, 100);

var light = new THREE.PointLight(0xffffff, 6.0, 200);
light.position.set(-5, 10, 80);
scene.add(light);

// Start!
document.body.appendChild(renderer.domElement);
render();

// Helpers
function render() {
    //if (object) object.rotation.y += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}