var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

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
matLoader.load('globe.mtl', function(materials) {
  loader.setMaterials(materials);
  loader.load('models/globe.obj', function(object) {
    object.rotation.y = Math.PI;
    object.scale.set(0.5, 0.5, 0.5);
    object.position.set(0, 0, 0);
    //scene.add(object);
    player.add(object);
  });
});

camera.position.set(0, 0, 20);

scene.add(new THREE.AmbientLight(0xffffff));

// Start!
document.body.appendChild(renderer.domElement);
render();
animation();

// Helpers
function animation() {
    controls.update(0.1);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}