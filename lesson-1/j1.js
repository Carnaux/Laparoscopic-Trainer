var objects = [];

var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(120,120,135)")
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
let renderDiv = document.getElementById("renderDiv");
renderDiv.appendChild( renderer.domElement );

var orbit = new THREE.OrbitControls( camera, renderDiv);
orbit.update();
orbit.addEventListener( 'change', render );

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

let lap = new Laparoscopic(scene);

lap.init();
lap.createTarget(1);

camera.position.z = 30;
camera.position.y = 20;
camera.lookAt(0,0,0);

window.addEventListener( 'resize', onWindowResize, false );

animate();

function animate() {
    requestAnimationFrame( animate );
    lap.update();

    render();
}

function render(){
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}// resize window



