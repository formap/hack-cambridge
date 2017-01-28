var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

camera.position.set(0, 0, 10);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x00B2D6));

window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Controls
var controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );
controls.minDistance = 75;
controls.maxDistance = 1000;
controls.enablePan = false;

// Our world
var loader = new THREE.ColladaLoader();

loader.load(
	// resource URL
	'models/earth.dae',
	// Function when resource is loaded
	function ( collada ) {
		scene.add( collada.scene );
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
);

// Start!
document.body.appendChild(renderer.domElement);
render();

// Helpers
function animate() {
    requestAnimationFrame( animate );
    controls.update();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

animate();