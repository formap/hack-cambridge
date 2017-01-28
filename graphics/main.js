var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var object;
var earthScale = 0.0029;

var pointSize  = 0.1;
var esPoint = new THREE.Mesh(new THREE.BoxGeometry(pointSize, pointSize, pointSize), new THREE.LineBasicMaterial({color: 0xff0000}));
esPoint.position.set(0, 1, 0);
scene.add(esPoint);


var caPoint = new THREE.Mesh(new THREE.BoxGeometry(pointSize, pointSize, pointSize), new THREE.LineBasicMaterial({color: 0xff0000}));
caPoint.position.set(0, 0, 1);
scene.add(caPoint);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x00B2D6));

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var player = new THREE.Object3D();
scene.add(player);

player.add(esPoint);
player.add(caPoint);
/*
var geometry = new THREE.CubeGeometry(71, 71, 71); // Create a 20 by 20 by 20 cube.
var material = new THREE.MeshBasicMaterial({ color: 0x0000FF });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/
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
        //cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
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
var loader = new THREE.OBJLoader();
var matLoader = new THREE.MTLLoader();
matLoader.setPath('models/');
matLoader.load('earth.mtl', function(materials) {
  loader.setMaterials(materials);
  loader.load('models/earth.obj', function(obj) {
    object = obj;
    //object.rotation.y = 0.05;
    //object.rotation.x = -90;
    object.scale.set(earthScale, earthScale, earthScale);
    object.position.set(0, 0, 0);
    //scene.add(object);
    player.add(object);
  });
});

camera.position.set(0, 0, 3);

// Lightning
var light = new THREE.PointLight(0xffffff, 6.0, 200);
light.position.set(-5, 10, 80);
scene.add(light);

// JSON files available globally
function loadGeoData() {
    var esLat = 40;
    //esLat =  Math.PI/2 - esLat * Math.PI / 180 - Math.PI * 0.01;
    var esLon = -4;
    //esLon -= 90;
    //esLon = 2 * Math.PI - esLon * Math.PI / 180 + Math.PI * 0.06;
    esPoint.position.set(0, 0, 0);
    esPoint.rotation.x = esLat;
    esPoint.rotation.y = esLon;
    esPoint.position.set(0, 1, 0);
    var caLat = 0;
    //caLat =  Math.PI/2 - caLat * Math.PI / 180 - Math.PI * 0.01;
    var caLon = 0;
    //caLon -= 90;
    //caLon = 2 * Math.PI - caLon * Math.PI / 180 + Math.PI * 0.06;
    //var r = 35.5;
    var r = 1;
    /*
    esPoint.position.x = r * Math.cos(esLon) * Math.sin(esLat);
    esPoint.position.y  = r * Math.cos(esLon);
    esPoint.position.z = r * Math.sin(esLon) * Math.sin(esLat);
    caPoint.position.x = r * Math.cos(caLon) * Math.sin(caLat);
    caPoint.position.y = r * Math.cos(caLon);
    caPoint.position.z = r * Math.sin(caLon) * Math.sin(caLat);
    

    esPoint.position.x = r * Math.cos(esLon) * Math.sin(esLat);
    esPoint.position.y  = r * Math.sin(esLon) * Math.sin(esLat);
    esPoint.position.z = r * Math.cos(esLat);
    caPoint.position.x = r * Math.cos(caLon) * Math.sin(caLat);
    caPoint.position.y = r * Math.sin(caLon) * Math.sin(caLat);
    caPoint.position.z = r * Math.cos(caLat);
    
    /*
        x = r cos(phi) sin(theta)
        y = r sin(phi) sin(theta)
        z = r cos(theta)
        theta == latitude
        phi == longitude
    */
    // Draw coordinate
    /*
    var material = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        esPoint,
        new THREE.Vector3( -5, 2, 0),
        caPoint
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
    */
}

loadGeoData();

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
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
