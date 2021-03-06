
var KeyboardControls = function(object){
	this.object    = object ; 

	this.position  = new THREE.Vector3(1,1.7,5) ; 

	this.angle     = 0.0 ; 
	this.direction = new THREE.Vector3(1,0,0) ; 
	this.cible     = new THREE.Vector3(2,1.7,5) ; 

	this.vitesse   = 5.0 ; 

	this.plusHaut  = false ; 
	this.plusBas   = false ; 
	this.enAvant   = false ; 
	this.enArriere = false ; 
	this.aGauche   = false ; 
	this.aDroite   = false ; 
}


KeyboardControls.prototype.update = function(dt){


	if(this.plusHaut)
		this.position.y += this.vitesse * dt ; 

	if(this.plusBas)
		this.position.y -= this.vitesse * dt ; 

	if(this.aGauche)
		this.angle += 0.05 ; 


	if(this.aDroite)
		this.angle -= 0.05 ; 

	if(this.enAvant){
		this.position.x +=  this.vitesse * dt * Math.cos(this.angle) ; 
		this.position.z += -this.vitesse * dt * Math.sin(this.angle) ;  
	}

	if(this.enArriere){
		this.position.x -=  this.vitesse * dt * Math.cos(this.angle) ; 
		this.position.z -= -this.vitesse * dt * Math.sin(this.angle) ;  
	}
	
	this.object.position.copy(this.position) ; 

	this.direction.set(Math.cos(this.angle),0.0,-Math.sin(this.angle)) ; 
	

	if(mouseClicked) {
		this.object.position.set(ext.x,ext.y,ext.z);
		this.position.set(ext.x,ext.y,ext.z);
		this.cible.set(origin.x,origin.y,origin.z);
		this.direction.set(origin.x-ext.x,origin.y-ext.y,origin.z-ext.z) ; 
		this.angle = -Math.atan2(this.direction.z,this.direction.x);

		mouseClicked = false ; 

	} else {
		this.cible.set(this.position.x + Math.cos(this.angle), 
						this.position.y, 
						this.position.z - Math.sin(this.angle))	
		 
	} ;

	this.object.lookAt(this.cible) ; 

	
}


function keyUp(event){
	switch(event.keyCode){
		case 87 : // HAUT
			controls.plusHaut = false ; 
			break ; 
		case 83 : // BAS
			controls.plusBas = false ;
			break ; 
		case 37 : // GAUCHE
			controls.aGauche = false ; 
			break ; 
		case 38 : // AVANCE
			controls.enAvant = false ;
			break ; 
		case 39 : // DROITE
			controls.aDroite = false ;
			break ; 
		case 40 : // BAS
			controls.enArriere = false ;
			break ; 
	}
}



function keyDown(event){
	//mouseClicked=false;
	console.log("KEYDOWN") ; 
	switch(event.keyCode){
		case 87 : // HAUT
			controls.plusHaut = true ; 
			break ; 
		case 83 : // BAS
			controls.plusBas = true ;
			break ; 
		case 37 : // GAUCHE
			controls.aGauche = true ; 
			break ; 
		case 38 : // AVANCE
			controls.enAvant = true ;
			break ; 
		case 39 : // DROITE
			controls.aDroite = true ;
			break ; 
		case 40 : // BAS
			controls.enArriere = true ;
			break ; 
	}
}

var mouse     = new THREE.Vector2() ; 
var raycaster = new THREE.Raycaster() ; 
var mouseClicked = false ; 
var world = null ; 
var origin = new THREE.Vector3() ; 
var ext = new THREE.Vector3() ; 





function mouseMove(event){
}

function mouseDown(event){
	event.preventDefault() ; 
	mouse.x = (event.clientX/window.innerWidth)*2-1 ; 
	mouse.y = (-event.clientY/window.innerHeight)*2+1 ; 
	raycaster.setFromCamera(mouse,camera) ; 
	var intersects = raycaster.intersectObjects(scene.children,true) ;
	if(intersects.length>0){
		pointeur.position.set(intersects[0].point.x,intersects[0].point.y,+intersects[0].point.z) ; 
		mouseClicked = true ; 
		world  = intersects[0].object.matrixWorld;
		origin = new THREE.Vector3(0,0,0) ; 
		ext    = new THREE.Vector3(0,0,2) ; 
		origin.applyMatrix4(world) ; 
		ext.applyMatrix4(world) ; 
		
	}
}

var ObjectController = function(scene){
	this.scene = scene;
}

ObjectController.prototype.update = function(t){
	// Controle du ascenseur
	ElevatorController(this.scene.getObjectByName("ascenseur"), t);
	for(var i=1; i<4; i++){
		var str = "sal0";
		var salle = this.scene.getObjectByName(str.concat(i));
		DoorController(salle);
	}
	ADNController(scene.getObjectByName("ADN"));
	DecController(scene.getObjectByName("dec1"), t);
	DecController(scene.getObjectByName("dec2"), t);
	
}

function ElevatorController(elevator, t){
	
	elevator.position.y = 1.5*Math.sin(t);
	//elevator.translateY(-Math.cos(t)/18);
}

function AtomiumController(atomium, t){
	
}

function DoorController(salle){
	door = salle.getObjectByName("door");
	var dx = salle.position.x - 3.75 - camera.position.x;
	var dy = salle.position.y - camera.position.y;
	var dz = salle.position.z - camera.position.z;
	var targetAngle = 0;
	var targetX = 3.75;
	var targetZ = 0;
	if(Math.abs(dz)<2 && Math.abs(dx)<2 && Math.abs(dy)<3){
		targetAngle = -Math.PI/2;
		targetX -= 1.15;
		targetZ += 1.25;
	}
	door.position.x = targetX;
	door.position.z = targetZ;
	door.rotation.y = targetAngle;
}

function ADNController(adn){

	var dx = adn.position.x - 3.75 - camera.position.x;
	var dy = adn.position.y - camera.position.y;
	var dz = adn.position.z - camera.position.z;
	var delta = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2) + Math.pow(dz,2));
	if(delta < 15){
		adn.rotateZ(2/delta);
	}
}

function DecController(dec, t){
	sph = dec.getObjectByName("sphere");
	//sph.translateY(0.5*Math.sin(t));
	sph.position.y = 0.3*Math.sin(t) + 1.5;
}
