var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var object;
var earthScale = 0.1;
var esPoint = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.LineBasicMaterial());
esPoint.position.set(0, 0, 40);
scene.add(esPoint);
var caPoint = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.LineBasicMaterial());
caPoint.position.set(1, 1, 40);
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
        esPoint.quaternion.multiplyQuaternions(deltaRotationQuaternion, esPoint.quaternion);
        caPoint.quaternion.multiplyQuaternions(deltaRotationQuaternion, caPoint.quaternion);
    }

    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});
/*
var mouseX = 0,
  mouseY = 0,
  pmouseX = 0,
  pmouseY = 0;
var pressX = 0,
  pressY = 0;

var dragging = false;

var rotateX = 0,
  rotateY = 0;
var rotateVX = 0,
  rotateVY = 0;
var rotateXMax = 90 * Math.PI / 180;

var rotateTargetX = undefined;
var rotateTargetY = undefined;

function onDocumentMouseMove(event) {

  pmouseX = mouseX;
  pmouseY = mouseY;

  mouseX = event.clientX - window.innerWidth * 0.5;
  mouseY = event.clientY - window.innerHeight * 0.5;

  if (dragging) {
    camera.position.x -= (mouseX - pmouseX) * .5;
    camera.position.y += (mouseY - pmouseY) * .5;
  }
}

function onDocumentMouseDown(event) {
  if (event.target.className.indexOf('noMapDrag') !== -1) {
    return;
  }
  dragging = true;
  pressX = mouseX;
  pressY = mouseY;
  rotateTargetX = undefined;
  rotateTargetX = undefined;
}

function onDocumentMouseUp(event) {
  d3Graphs.zoomBtnMouseup();
  dragging = false;
  histogramPressed = false;
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    dragging = true;
    mouseX = event.touches[0].pageX - window.innerWidth * 0.5;
    mouseY = event.touches[0].pageY - window.innerHeight * 0.5;
    pmouseX = mouseX;
    pmouseY = mouseY;
    rotateTargetX = undefined;
    rotateTargetX = undefined;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    pmouseX = mouseX;
    pmouseY = mouseY;

    mouseX = event.touches[0].pageX - window.innerWidth * 0.5;
    mouseY = event.touches[0].pageY - window.innerHeight * 0.5;

    rotateVY += (mouseX - pmouseX) / 2 * Math.PI / 180 * 0.3;
    rotateVX += (mouseY - pmouseY) / 2 * Math.PI / 180 * 0.3;
    rotateTargetX = undefined;
    rotateTargetX = undefined;
  }
}

function onDocumentTouchEnd(event) {
    dragging = false;
}

function onClick(event) {
  //	make the rest not work if the event was actually a drag style click
  if (Math.abs(pressX - mouseX) > 3 || Math.abs(pressY - mouseY) > 3)
    return;

  var pickColorIndex = getPickColor();
  //	find it
  for (var i in countryColorMap) {
    var countryCode = i;
    var countryColorIndex = countryColorMap[i];
    if (pickColorIndex == countryColorIndex) {
      // console.log("selecting code " + countryCode);
      var countryName = countryLookup[countryCode];
      // console.log("converts to " + countryName);
      if (countryName === undefined)
        return;
      if ($.inArray(countryName, selectableCountries) <= -1)
        return;
      // console.log(countryName);
      var selection = selectionData;
      selection.selectedCountry = countryName;
      selectVisualization(timeBins, selection.selectedYear, [selection.selectedCountry], selection.getExportCategories(), selection.getImportCategories());
      // console.log('selecting ' + countryName + ' from click');
      return;
    }
  }
}

function onKeyDown(event) {}

function handleMWheel(delta) {
  camera.scale.z += delta * 0.1;
  camera.scale.z = constrain(camera.scale.z, 0.7, 5.0);
}

function onMouseWheel(event) {
  var delta = 0;

  if (event.wheelDelta) {
    delta = event.wheelDelta / 120;
  }
  else if (event.detail) {
    delta = -event.detail / 3;
  }

  if (delta)
    handleMWheel(delta);

  event.returnValue = false;
}

function onDocumentResize(e) {}
*/

// Our world
var loader = new THREE.OBJLoader();
var matLoader = new THREE.MTLLoader();
matLoader.setPath('models/');
matLoader.load('earth.mtl', function(materials) {
  loader.setMaterials(materials);
  loader.load('models/earth.obj', function(obj) {
    object = obj;
    //object.rotation.y = 0.05;
    object.scale.set(earthScale, earthScale, earthScale);
    object.position.set(0, 0, 0);
    //scene.add(object);
    player.add(object);
  });
});

camera.position.set(0, 0, 100);

// Lightning
var light = new THREE.PointLight(0xffffff, 6.0, 200);
light.position.set(-5, 10, 80);
scene.add(light);

// JSON files available globally
function loadGeoData() {
    console.log(isoFile);
    console.log(latlonFile);
    var esLat = 40;
    esLat =  Math.PI/2 - esLat * Math.PI / 180 - Math.PI * 0.01;
    var esLon = -4;
    esLon -= 90;
    esLon = 2 * Math.PI - esLon * Math.PI / 180 + Math.PI * 0.06;
    var caLat = 60;
    caLat =  Math.PI/2 - caLat * Math.PI / 180 - Math.PI * 0.01;
    var caLon = -95;
    caLon -= 90;
    caLon = 2 * Math.PI - caLon * Math.PI / 180 + Math.PI * 0.06;
    //var r = 35.5;
    var r = 100;
    esPoint.x = r * Math.cos(esLon) * Math.sin(esLat);
    esPoint.y  = r * Math.cos(esLon);
    esPoint.z = r * Math.sin(esLon) * Math.sin(esLat);
    caPoint.x = r * Math.cos(caLon) * Math.sin(caLat);
    caPoint.y = r * Math.cos(caLon);
    caPoint.z = r * Math.sin(caLon) * Math.sin(caLat);
    /*
        x = r cos(phi) sin(theta)
        y = r sin(phi) sin(theta)
        z = r cos(theta)
        theta == latitude
        phi == longitude
    */
    // Draw coordinate
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
