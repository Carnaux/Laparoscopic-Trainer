var objects = [];

var boundingBoxes = [];

var targets = [];

var targetBoundingBoxes = [];

var targetsGrabbed = [];

var toolLeft;
var toolRight;

var mouse = new THREE.Vector2();

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


createLeftTool();
createRightTool();

createTarget(1);



camera.position.z = 30;
camera.position.y = 20;
camera.lookAt(0,0,0);

document.addEventListener("keydown", onDocumentKeyDown, false);
window.addEventListener( 'resize', onWindowResize, false );



animate();

function animate() {
    requestAnimationFrame( animate );
    
    updateBoundingBoxes();

    checkCollision();

    checkIfHold();

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

function radToDegree(r){
    return r * 180/Math.PI;
}

function degreeToRad(d){
    return d * Math.PI/180;
}


var speed = 0.5;
var rotSpeed = degreeToRad(0.5);


function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 87) {//W
        toolLeft.tool.translateY(-speed);
    } else if (keyCode == 83) {//S
        toolLeft.tool.translateY(speed);
    } else if (keyCode == 65) {//A
        toolLeft.mainPivot.rotation.y += rotSpeed;
    } else if (keyCode == 68) {//D
        toolLeft.mainPivot.rotation.y -= rotSpeed;
    }else if (keyCode == 81) {//Q
        toolLeft.mainPivot.rotation.x += rotSpeed;
    }else if (keyCode == 69) {//E
        toolLeft.mainPivot.rotation.x -= rotSpeed;
    }else if(keyCode == 16){//shift
        if( toolLeft.pivot1.rotation.x < degreeToRad(90)){
            toolLeft.pivot1.rotation.x += rotSpeed;
            toolLeft.pivot2.rotation.x -= rotSpeed;
        }
    }else if(keyCode == 17){//ctrl
        if(toolLeft.pivot1.rotation.x > 0){
            toolLeft.pivot1.rotation.x -= rotSpeed;
            toolLeft.pivot2.rotation.x += rotSpeed;
        }
        
    }



    if (keyCode == 79) {//O
        toolRight.tool.translateY(-speed);
    } else if (keyCode == 76) {//L
        toolRight.tool.translateY(speed);
    } else if (keyCode == 75) {//K
        toolRight.mainPivot.rotation.y += rotSpeed;
    } else if (keyCode == 186) {//Ç
        toolRight.mainPivot.rotation.y -= rotSpeed;
    }else if (keyCode == 73) {//I
        toolRight.mainPivot.rotation.x += rotSpeed;
    }else if (keyCode == 80) {//P
        toolRight.mainPivot.rotation.x -= rotSpeed;
    }else if(keyCode == 78){//N
        if( toolRight.pivot1.rotation.x < degreeToRad(90)){
            toolRight.pivot1.rotation.x += rotSpeed;
            toolRight.pivot2.rotation.x -= rotSpeed;
        }
    }else if(keyCode == 77){//M
        if(toolRight.pivot1.rotation.x > 0){
            toolRight.pivot1.rotation.x -= rotSpeed;
            toolRight.pivot2.rotation.x += rotSpeed;
        }
        
    }


};

function createLeftTool(){
    let mainPivot = new THREE.Group();
    mainPivot.position.z += 35;
    mainPivot.position.x -= 10.5;
    scene.add(mainPivot);

    var geometry = new THREE.CylinderGeometry( 1, 1, 60, 32 );
    var material = new THREE.MeshBasicMaterial( {color: new THREE.Color("rgb(180,180,180)")} );
    var tool = new THREE.Mesh( geometry, material );
    tool.position.z -= 30;
    tool.rotation.x = Math.PI/2;
    scene.add(tool);
    mainPivot.add( tool );
    
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var point1 = new THREE.Mesh( geometry, material );
    scene.add( point1 );
    point1.position.y += 0.25;
    point1.position.z -= 2;

    point1.geometry.computeBoundingBox();
    var point1BB = new THREE.Box3(
    point1.geometry.boundingBox.min,
    point1.geometry.boundingBox.max);

    var helper1 = new THREE.Box3Helper( point1BB, 0xffff00 );
    scene.add( helper1 );

    let bb1 = {
        mesh: point1,
        bb: point1BB,
        helper: helper1,
        type: "point"
    }

    boundingBoxes.push(bb1);
    
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var point2 = new THREE.Mesh( geometry, material );
    scene.add( point2 );
    point2.position.y -= 0.25;
    point2.position.z -= 2;

    point2.geometry.computeBoundingBox();
    var point2BB = new THREE.Box3(
    point2.geometry.boundingBox.min,
    point2.geometry.boundingBox.max);

    var helper = new THREE.Box3Helper( point2BB, 0xffff00 );
    scene.add( helper );

    let bb2 = {
        mesh: point2,
        bb: point2BB,
        helper: helper,
        type: "point"
    }

    boundingBoxes.push(bb2);
    
    let leftPivots = new THREE.Group();
    
    var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    pivot1 = new THREE.Mesh( geometry, material );
    scene.add( pivot1 );
    pivot1.position.z += 2;
    pivot1.add(point1);
    
    var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    pivot2 = new THREE.Mesh( geometry, material );
    scene.add( pivot2 );
    pivot2.position.z += 2;
    pivot2.add(point2);

    leftPivots.position.y = -32;
    leftPivots.rotation.x = -Math.PI/2;
    
    leftPivots.add(pivot1);
    leftPivots.add(pivot2);

    tool.add(leftPivots);

    toolLeft = {
        mainPivot: mainPivot,
        tool: tool,
        pointTop: point1,
        pointBottom: point2,
        pivot1: pivot1,
        p1bb: point1BB,
        pivot2: pivot2,
        p2bb: point2BB,
        pivotPoint: leftPivots,
        grabbed: 0,
        targetGrabbed: null
    }
}

function createRightTool(){

    let mainPivot = new THREE.Group();
    mainPivot.position.z += 35;
    mainPivot.position.x += 10.5;
    scene.add(mainPivot);

    var geometry = new THREE.CylinderGeometry( 1, 1, 60, 32 );
    var material = new THREE.MeshBasicMaterial( {color: new THREE.Color("rgb(180,180,180)")} );
    var tool = new THREE.Mesh( geometry, material );
    tool.position.z -= 30;
    tool.rotation.x = Math.PI/2;
    scene.add(tool);
    mainPivot.add( tool );
    
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var point1 = new THREE.Mesh( geometry, material );
    scene.add( point1 );
    point1.position.y += 0.25;
    point1.position.z -= 2;

    point1.geometry.computeBoundingBox();
    var point1BB = new THREE.Box3(
    point1.geometry.boundingBox.min,
    point1.geometry.boundingBox.max);

    var helper1 = new THREE.Box3Helper( point1BB, 0xffff00 );
    scene.add( helper1 );

    let bb1 = {
        mesh: point1,
        bb: point1BB,
        helper: helper1,
        type: "point"
    }

    boundingBoxes.push(bb1);
    
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var point2 = new THREE.Mesh( geometry, material );
    scene.add( point2 );
    point2.position.y -= 0.25;
    point2.position.z -= 2;

    point2.geometry.computeBoundingBox();
    var point2BB = new THREE.Box3(
    point2.geometry.boundingBox.min,
    point2.geometry.boundingBox.max);

    var helper = new THREE.Box3Helper( point2BB, 0xffff00 );
    scene.add( helper );

    let bb2 = {
        mesh: point2,
        bb: point2BB,
        helper: helper,
        type: "point"
    }

    boundingBoxes.push(bb2);
    
    let rightPivots = new THREE.Group();
    
    var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    pivot1 = new THREE.Mesh( geometry, material );
    scene.add( pivot1 );
    pivot1.position.z += 2;
    pivot1.add(point1);
    
    var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    pivot2 = new THREE.Mesh( geometry, material );
    scene.add( pivot2 );
    pivot2.position.z += 2;
    pivot2.add(point2);

    rightPivots.position.y = -32;
    rightPivots.rotation.x = -Math.PI/2;
    
    rightPivots.add(pivot1);
    rightPivots.add(pivot2);

    tool.add(rightPivots);

    toolRight = {
        mainPivot: mainPivot,
        tool: tool,
        pointTop: point1,
        pointBottom: point2,
        pivot1: pivot1,
        p1bb: point1BB,
        pivot2: pivot2,
        p2bb: point2BB,
        pivotPoint: rightPivots,
        grabbed: 0,
        targetGrabbed: null
    }
}

function createTarget(n){
    for(let i = 0; i < n; i++){
        var geometry = new THREE.DodecahedronGeometry(1);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var rock = new THREE.Mesh( geometry, material );
        scene.add( rock );
        targets.push(rock);
        
        rock.geometry.computeBoundingBox();
        var rockBB = new THREE.Box3(
        rock.geometry.boundingBox.min,
        rock.geometry.boundingBox.max);
        
        let bbR = {
            mesh: rock,
            bb: rockBB
        }
        
        targetBoundingBoxes.push(bbR);
    }   
}

function updateBoundingBoxes(){
    for(let i = 0; i < boundingBoxes.length; i++){
        boundingBoxes[i].bb = boundingBoxes[i].bb.setFromObject(boundingBoxes[i].mesh);
    }
    for(let i = 0; i < targetBoundingBoxes.length; i++){
        targetBoundingBoxes[i].bb = targetBoundingBoxes[i].bb.setFromObject(targetBoundingBoxes[i].mesh);
    }
}

function checkCollision(){
    for(let i = 0; i < targetBoundingBoxes.length; i++){
       let alreadyGrabbed = false;
        if(boundingBoxes[0].bb.intersectsBox(targetBoundingBoxes[i].bb) && boundingBoxes[1].bb.intersectsBox(targetBoundingBoxes[i].bb)){
            let openingLeft = Math.floor(boundingBoxes[0].bb.max.y - boundingBoxes[0].bb.min.y * 2 );
            if( openingLeft >= 1 && openingLeft < 1.5){
                
                let grabbed = {
                    target: i,
                    box: targetBoundingBoxes[i]
                }
                toolLeft.tool.add(targetBoundingBoxes[i].mesh);
                targetBoundingBoxes[i].mesh.position.set(0,-32,0);
                toolLeft.targetGrabbed = grabbed;
                toolLeft.grabbed = 1;
                targetBoundingBoxes.splice(i, 1);
                alreadyGrabbed = true;
            }
        }

            if(!alreadyGrabbed){
                if(boundingBoxes[2].bb.intersectsBox(targetBoundingBoxes[i].bb) && boundingBoxes[3].bb.intersectsBox(targetBoundingBoxes[i].bb)){
                    let openingRight = Math.floor(boundingBoxes[2].bb.max.y - boundingBoxes[2].bb.min.y * 2 );
                    if( openingRight >= 1 && openingRight < 1.5){
                        
                        let grabbed = {
                            target: i,
                            box: targetBoundingBoxes[i]
                        }
                        toolRight.tool.add(targetBoundingBoxes[i].mesh);
                        targetBoundingBoxes[i].mesh.position.set(0,-32,0);
                        toolRight.targetGrabbed = grabbed;
                        toolRight.grabbed = 1;
                        targetBoundingBoxes.splice(i, 1);
                    }
                }
            }
            
        
    }
}

function checkIfHold(){
    
    if( toolLeft.grabbed == 1){
        let openingLeft = Math.floor(boundingBoxes[0].bb.max.y - boundingBoxes[0].bb.min.y * 2 );
        if(openingLeft > 1.5){
            scene.add(toolLeft.targetGrabbed.box.mesh);
            toolLeft.targetGrabbed.box.mesh.position.set(0,0,0);
            toolLeft.targetGrabbed.box.mesh.localToWorld(toolLeft.targetGrabbed.box.mesh.position);
            
            toolLeft.tool.remove(toolLeft.targetGrabbed.box.mesh);
            
            toolLeft.grabbed = 0;

            targetBoundingBoxes.splice(toolLeft.targetGrabbed.target, 0, toolLeft.targetGrabbed.box);

            toolLeft.targetGrabbed = null;
        }
    }
    if( toolRight.grabbed == 1){
        let openingRight = Math.floor(boundingBoxes[2].bb.max.y - boundingBoxes[2].bb.min.y * 2 );
        if(openingRight > 1.5){
            scene.add(toolRight.targetGrabbed.box.mesh);
            toolRight.targetGrabbed.box.mesh.position.set(0,0,0);
            toolRight.targetGrabbed.box.mesh.localToWorld(toolRight.targetGrabbed.box.mesh.position);
            
            toolRight.tool.remove(toolRight.targetGrabbed.box.mesh);
            
            toolRight.grabbed = 0;

            targetBoundingBoxes.splice(toolRight.targetGrabbed.target, 0, toolRight.targetGrabbed.box);

            toolRight.targetGrabbed = null;
        }
    }
}