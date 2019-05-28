class Laparoscopic{
    constructor(scene, speed = 0.5, rot = 0.5){
        this.scene = scene;
        this.toolLeft;
        this.toolRight;
        this.boundingBoxes = [];
        this.targets = [];
        this.mouse = new THREE.Vector2();
        this.speed = speed;
        this.rotSpeed = this.degreeToRad(rot);
        this.score = 0;
    }

    init(){
        this.createTools();
        document.addEventListener("keydown", this.onDocumentKeyDown.bind(this), false);
      
    }

    createTools(){
        this.createLeftTool();
        this.createRightTool();
    }

    createLeftTool(){
        let mainPivot = new THREE.Group();
        mainPivot.position.z += 35;
        mainPivot.position.x -= 10.5;
        this.scene.add(mainPivot);
    
        var geometry = new THREE.CylinderGeometry( 1, 1, 60, 32 );
        var material = new THREE.MeshBasicMaterial( {color: new THREE.Color("rgb(180,180,180)")} );
        var tool = new THREE.Mesh( geometry, material );
        tool.position.z -= 30;
        tool.rotation.x = Math.PI/2;
        this.scene.add(tool);
        mainPivot.add( tool );
        
        var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var point1 = new THREE.Mesh( geometry, material );
        this.scene.add( point1 );
        point1.position.y += 0.25;
        point1.position.z -= 2;
    
        point1.geometry.computeBoundingBox();
        var point1BB = new THREE.Box3(
        point1.geometry.boundingBox.min,
        point1.geometry.boundingBox.max);
    
        var helper1 = new THREE.Box3Helper( point1BB, 0xffff00 );
        this.scene.add( helper1 );
    
        let bb1 = {
            mesh: point1,
            bb: point1BB,
            helper: helper1,
            type: "point"
        }
    
        this.boundingBoxes.push(bb1);
        
        var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var point2 = new THREE.Mesh( geometry, material );
        this.scene.add( point2 );
        point2.position.y -= 0.25;
        point2.position.z -= 2;
    
        point2.geometry.computeBoundingBox();
        var point2BB = new THREE.Box3(
        point2.geometry.boundingBox.min,
        point2.geometry.boundingBox.max);
    
        var helper = new THREE.Box3Helper( point2BB, 0xffff00 );
        this.scene.add( helper );
    
        let bb2 = {
            mesh: point2,
            bb: point2BB,
            helper: helper,
            type: "point"
        }
    
        this.boundingBoxes.push(bb2);
        
        let leftPivots = new THREE.Group();
        
        var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let pivot1 = new THREE.Mesh( geometry, material );
        this.scene.add( pivot1 );
        pivot1.position.z += 2;
        pivot1.add(point1);
        
        var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let pivot2 = new THREE.Mesh( geometry, material );
        this.scene.add( pivot2 );
        pivot2.position.z += 2;
        pivot2.add(point2);
    
        leftPivots.position.y = -32;
        leftPivots.rotation.x = -Math.PI/2;
        
        leftPivots.add(pivot1);
        leftPivots.add(pivot2);
    
        tool.add(leftPivots);
    
        this.toolLeft = {
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
    
    createRightTool(){
    
        let mainPivot = new THREE.Group();
        mainPivot.position.z += 35;
        mainPivot.position.x += 10.5;
        this.scene.add(mainPivot);
    
        var geometry = new THREE.CylinderGeometry( 1, 1, 60, 32 );
        var material = new THREE.MeshBasicMaterial( {color: new THREE.Color("rgb(180,180,180)")} );
        var tool = new THREE.Mesh( geometry, material );
        tool.position.z -= 30;
        tool.rotation.x = Math.PI/2;
        this.scene.add(tool);
        mainPivot.add( tool );
        
        var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var point1 = new THREE.Mesh( geometry, material );
        this.scene.add( point1 );
        point1.position.y += 0.25;
        point1.position.z -= 2;
    
        point1.geometry.computeBoundingBox();
        var point1BB = new THREE.Box3(
        point1.geometry.boundingBox.min,
        point1.geometry.boundingBox.max);
    
        var helper1 = new THREE.Box3Helper( point1BB, 0xffff00 );
        this.scene.add( helper1 );
    
        let bb1 = {
            mesh: point1,
            bb: point1BB,
            helper: helper1,
            type: "point"
        }
    
        this.boundingBoxes.push(bb1);
        
        var geometry = new THREE.BoxGeometry( 0.5, 0.5, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var point2 = new THREE.Mesh( geometry, material );
        this.scene.add( point2 );
        point2.position.y -= 0.25;
        point2.position.z -= 2;
    
        point2.geometry.computeBoundingBox();
        var point2BB = new THREE.Box3(
        point2.geometry.boundingBox.min,
        point2.geometry.boundingBox.max);
    
        var helper = new THREE.Box3Helper( point2BB, 0xffff00 );
        this.scene.add( helper );
    
        let bb2 = {
            mesh: point2,
            bb: point2BB,
            helper: helper,
            type: "point"
        }
    
        this.boundingBoxes.push(bb2);
        
        let rightPivots = new THREE.Group();
        
        var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let pivot1 = new THREE.Mesh( geometry, material );
        this.scene.add( pivot1 );
        pivot1.position.z += 2;
        pivot1.add(point1);
        
        var geometry = new THREE.SphereGeometry( 0.2, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        let pivot2 = new THREE.Mesh( geometry, material );
        this.scene.add( pivot2 );
        pivot2.position.z += 2;
        pivot2.add(point2);
    
        rightPivots.position.y = -32;
        rightPivots.rotation.x = -Math.PI/2;
        
        rightPivots.add(pivot1);
        rightPivots.add(pivot2);
    
        tool.add(rightPivots);
    
        this.toolRight = {
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

    createTarget(type, n, interaction){

        
       

        for(let i = 0; i < n; i++){
            let target;
            if(interaction == "hold"){
                var geometry = new THREE.DodecahedronGeometry(1);
                var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                target = new THREE.Mesh( geometry, material );
                
            }else if(interaction == "touch"){
                var geometry = new THREE.CircleGeometry( 1, 32 )
                var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                target = new THREE.Mesh( geometry, material );
            }
            
            let x = Math.floor((Math.random() * 20));
            let y = Math.floor((Math.random() * 20));
            let z = -Math.floor((Math.random() * 30));
            target.position.set(x, y, z);
            this.scene.add( target );
            
            target.geometry.computeBoundingBox();
            var targetBB = new THREE.Box3(
            target.geometry.boundingBox.min,
            target.geometry.boundingBox.max);
            
            let bbR = {
                mesh: target,
                bb: targetBB,
                type: type,
                int: interaction
            }
            let helper = new THREE.Box3Helper( targetBB, 0xffff00 );
            scene.add( helper );

            this.targets.push(bbR);
        }   

    }

    updateBoundingBoxes(){
        for(let i = 0; i < this.boundingBoxes.length; i++){
            this.boundingBoxes[i].bb = this.boundingBoxes[i].bb.setFromObject(this.boundingBoxes[i].mesh);
        }
        for(let i = 0; i < this.targets.length; i++){
            this.targets[i].bb = this.targets[i].bb.setFromObject(this.targets[i].mesh);
        }
    }
    
    checkCollision(){
       
        for(let i = 0; i < this.targets.length; i++){
           let alreadyGrabbed = false;
           
            if(this.boundingBoxes[0].bb.intersectsBox(this.targets[i].bb) && this.boundingBoxes[1].bb.intersectsBox(this.targets[i].bb)){
                
                if(this.targets[i].int == "hold"){
                    let openingLeft = Math.floor(this.boundingBoxes[0].bb.max.y - this.boundingBoxes[0].bb.min.y * 2 );
                    if( openingLeft >= 1 && openingLeft < 1.5){
                        
                        let grabbed = {
                            target: i,
                            box: this.targets[i]
                        }
                        this.toolLeft.tool.add(this.targets[i].mesh);
                        this.targets[i].mesh.position.set(0,-32,0);
                        this.toolLeft.targetGrabbed = grabbed;
                        this.toolLeft.grabbed = 1;
                        this.targets.splice(i, 1);
                        alreadyGrabbed = true;
                    }      
                }else if(this.targets[i].int == "touch"){
                    
                    let x = Math.floor((Math.random() * 20));
                    let y = Math.floor((Math.random() * 20));
                    let z = -Math.floor((Math.random() * 30));
                    this.targets[i].mesh.position.set(x, y, z);
                    this.score++;
                }  

            }
            
            if(this.boundingBoxes[2].bb.intersectsBox(this.targets[i].bb) && this.boundingBoxes[3].bb.intersectsBox(this.targets[i].bb)){

                if(this.targets[i].int == "hold"){
                    if(!alreadyGrabbed){
                        let openingRight = Math.floor(this.boundingBoxes[2].bb.max.y - this.boundingBoxes[2].bb.min.y * 2 );
                        if( openingRight >= 1 && openingRight < 1.5){
                            
                            let grabbed = {
                                target: i,
                                box: this.targets[i]
                            }
                            this.toolRight.tool.add(this.targets[i].mesh);
                            this.targets[i].mesh.position.set(0,-32,0);
                            this.toolRight.targetGrabbed = grabbed;
                            this.toolRight.grabbed = 1;
                            this.targets.splice(i, 1);
                        }
                    }
                }else if(this.targets[i].int == "touch"){
                    let x = Math.floor((Math.random() * 20));
                    let y = Math.floor((Math.random() * 20));
                    let z = -Math.floor((Math.random() * 30));
                    this.targets[i].mesh.position.set(x, y, z);
                    this.score++;
                }   

            }


        }
    }
    
    checkIfHold(){
        
        if( this.toolLeft.grabbed == 1){
            let openingLeft = Math.floor(this.boundingBoxes[0].bb.max.y - this.boundingBoxes[0].bb.min.y * 2 );
            if(openingLeft > 1.5){
                this.scene.add(this.toolLeft.targetGrabbed.box.mesh);
                this.toolLeft.targetGrabbed.box.mesh.position.set(0,0,0);
                this.toolLeft.targetGrabbed.box.mesh.localToWorld(this.toolLeft.targetGrabbed.box.mesh.position);
                
                this.toolLeft.tool.remove(this.toolLeft.targetGrabbed.box.mesh);
                
                this.toolLeft.grabbed = 0;
    
                this.targets.splice(this.toolLeft.targetGrabbed.target, 0, this.toolLeft.targetGrabbed.box);
    
                this.toolLeft.targetGrabbed = null;
            }
        }
        if( this.toolRight.grabbed == 1){
            let openingRight = Math.floor(this.boundingBoxes[2].bb.max.y - this.boundingBoxes[2].bb.min.y * 2 );
            if(openingRight > 1.5){
                this.scene.add(this.toolRight.targetGrabbed.box.mesh);
                this.toolRight.targetGrabbed.box.mesh.position.set(0,0,0);
                this.toolRight.targetGrabbed.box.mesh.localToWorld(this.toolRight.targetGrabbed.box.mesh.position);
                
                this.toolRight.tool.remove(this.toolRight.targetGrabbed.box.mesh);
                
                this.toolRight.grabbed = 0;
    
                this.targets.splice(this.toolRight.targetGrabbed.target, 0, this.toolRight.targetGrabbed.box);
    
                this.toolRight.targetGrabbed = null;
            }
        }
    }

    radToDegree(r){
        return r * 180/Math.PI;
    }
    
    degreeToRad(d){
        return d * Math.PI/180;
    }

    onDocumentKeyDown(event) {
        let keyCode = event.which;
        
        if (keyCode == 87) {//W
            this.toolLeft.tool.translateY(-this.speed);
        } else if (keyCode == 83) {//S
            this.toolLeft.tool.translateY(this.speed);
        } else if (keyCode == 65) {//A
            this.toolLeft.mainPivot.rotation.y += this.rotSpeed;
        } else if (keyCode == 68) {//D
            this.toolLeft.mainPivot.rotation.y -= this.rotSpeed;
        }else if (keyCode == 81) {//Q
            this.toolLeft.mainPivot.rotation.x += this.rotSpeed;
        }else if (keyCode == 69) {//E
            this.toolLeft.mainPivot.rotation.x -= this.rotSpeed;
        }else if(keyCode == 16){//shift
            if( this.toolLeft.pivot1.rotation.x < this.degreeToRad(90)){
                this.toolLeft.pivot1.rotation.x += this.rotSpeed;
                this.toolLeft.pivot2.rotation.x -= this.rotSpeed;
            }
        }else if(keyCode == 17){//ctrl
            if(this.toolLeft.pivot1.rotation.x > 0){
                this.toolLeft.pivot1.rotation.x -= this.rotSpeed;
                this.toolLeft.pivot2.rotation.x += this.rotSpeed;
            }         
        }

        if (keyCode == 79) {//O
            this.toolRight.tool.translateY(-this.speed);
        } else if (keyCode == 76) {//L
            this.toolRight.tool.translateY(this.speed);
        } else if (keyCode == 75) {//K
            this.toolRight.mainPivot.rotation.y += this.rotSpeed;
        } else if (keyCode == 186) {//Ç
            this.toolRight.mainPivot.rotation.y -= this.rotSpeed;
        }else if (keyCode == 73) {//I
            this.toolRight.mainPivot.rotation.x += this.rotSpeed;
        }else if (keyCode == 80) {//P
            this.toolRight.mainPivot.rotation.x -= this.rotSpeed;
        }else if(keyCode == 78){//N
            if( this.toolRight.pivot1.rotation.x < this.degreeToRad(90)){
                this.toolRight.pivot1.rotation.x += this.rotSpeed;
                this.toolRight.pivot2.rotation.x -= this.rotSpeed;
            }
        }else if(keyCode == 77){//M
            if(this.toolRight.pivot1.rotation.x > 0){
                this.toolRight.pivot1.rotation.x -= this.rotSpeed;
                this.toolRight.pivot2.rotation.x += this.rotSpeed;
            }     
        }
    }

    update(n){
        if(n == 1){
            this.checkIfHold();
        }

        this.updateBoundingBoxes();
        this.checkCollision();
        

        
    }

















}