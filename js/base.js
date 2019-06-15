function creerGroupe(nom){
	var groupe  = new THREE.Group() ; 
	groupe.name = nom ; 
	return groupe ; 
}


function creerAxes(l){
    return new THREE.AxisHelper(l) ; 
}
	

function creerSol(nom,largeur,hauteur,materiau){
	var geo   = new THREE.PlaneGeometry(
					largeur,hauteur,
					Math.floor(largeur/10.0)+1, Math.floor(hauteur/10)+1) ; 
	var mesh  = new THREE.Mesh(geo,materiau) ; 
	mesh.name = nom ;
	mesh.rotation.x = - Math.PI / 2 ;
	return mesh ;   
}

function creerCloison(nom,largeur, hauteur, epaisseur, materiau){
	var geo  = new THREE.BoxGeometry(largeur, hauteur, epaisseur) ; 
	var mesh = new THREE.Mesh(geo, materiau) ;
	var groupe = new THREE.Group() ; 
	groupe.name = nom ;
	groupe.add(mesh) ; 
	mesh.position.set(0,hauteur/2.0,0) ;  
	return groupe ;  	
}


function creerSphere(nom,rayon, subdivisions, materiau){
	var geo  = new THREE.SphereGeometry(rayon, subdivisions, subdivisions) ; 
	var mesh = new THREE.Mesh(geo, materiau) ; 
	mesh.name = nom ; 
	return mesh ;  
}

function creerGraph(nom, radius, hateur, materiau, num){
	var groupe = new THREE.Group();
	groupe.name = nom;
	var i;
	z = 0;
	dz = hateur/(num);
	spheres = []
	spheres.push(creerSphere('sphere_0', radius, 32, materiau));
	groupe.add(spheres[0]);
	for( i = 1; i < num+1; i++){
		z=i* dz;
		spheres.push(creerSphere(nom.concat('sphere_', i.toString()), 0.25, 16, materiau));
		spheres[i].position.set(Math.cos(i), Math.sin(i), i*dz);
		groupe.add(spheres[i]);
	}
	groupe.rotateX(-1.57);
	return groupe;
}

function creerAtomium(name, length){
	var groupe = new THREE.Group()
	groupe.name = name;
	material = creerLambertTexture("assets/textures/murs/metal.jpg", 0xaaaaaa, 1, 1);
	for(var i = 0; i < 8; i++){
		sphere = creerSphere(name.concat('sphere_', i.toString()), length/4, 16, material);
		sphere.position.set(Math.pow(-1, i)*length/2, Math.pow(-1, Math.floor(i/2))*length/2, Math.pow(-1, Math.floor(i/4))*length/2);
		groupe.add(sphere);
	}
	return groupe;
}

function creerSalle(nom, length, depth, artist){
	var group = new THREE.Group();
	concrete = creerLambertTexture("assets/textures/murs/concrete.jpg", 0xaaaaaa, 1, 1);
	walls = []
	walls.push(creerCloison(nom.concat('_wall_front'), length - 2.5, 3, 0.1, concrete));
	walls.push(creerCloison(nom.concat('_wall_back'), length, 3, 0.1, concrete));
	walls.push(creerCloison(nom.concat('_wall_right'), depth, 3, 0.1, concrete));
	walls.push(creerCloison(nom.concat('_wall_left'), depth, 3, 0.1, concrete));
	walls[0].position.set(-1.25, 0, 0);
	walls[1].rotateY(3.14);
	walls[1].position.set(0, 0, depth);
	walls[2].rotateY(-1.57)
	walls[2].position.set(length/2, 0, depth/2);
	walls[3].rotateY(1.57)
	walls[3].position.set(-length/2, 0, depth/2);
	url = "assets/posters/";
	for (var i =0; i < walls.length; i++){
		var poster;
		switch(i){
			case 1:
				for(var j = 1; j<3;j++){
					poster = creerPoster(nom.concat('_poster_',j),2,2,url.concat(artist,'/',artist,j.toString(),'.png'));
					walls[i].add(poster);
					poster.position.set(length/4*Math.pow(-1,j), 1.5,0.1);
				}
				break;
			case 2:
				var posters = [];
				posters.push(creerPoster(nom.concat('_poster_3'),2,2,url.concat(artist,'/',artist,'3.png')));
				posters.push(creerPoster(nom.concat('_poster_4'),2,2,url.concat(artist,'/',artist,'4.png')));
				posters.push(creerPoster(nom.concat('_poster_5'),2,2,url.concat(artist,'/',artist,'5.png')));
				posters[0].position.set(-depth/3, 1.5, 0.1);
				posters[1].position.set(0, 1.5, 0.1);
				posters[2].position.set(depth/3, 1.5, 0.1);
				for(var j = 0; j < posters.length; j++){
					walls[i].add(posters[j]);
				}
				break;
			case 3:
				var posters = [];
				posters.push(creerPoster(nom.concat('_poster_6'),2,2,url.concat(artist,'/',artist,'6.png')));
				posters.push(creerPoster(nom.concat('_poster_7'),2,2,url.concat(artist,'/',artist,'7.png')));
				posters.push(creerPoster(nom.concat('_poster_8'),2,2,url.concat(artist,'/',artist,'8.png')));
				posters[0].position.set(-depth/3, 1.5, 0.1);
				posters[1].position.set(0, 1.5, 0.1);
				posters[2].position.set(depth/3, 1.5, 0.1);
				for(var j = 0; j < posters.length; j++){
					walls[i].add(posters[j]);
				}
				break;
		}
		group.add(walls[i])
	}
	return group;


}

function creerEscalier(nom, height,width, length){
	var groupe = new THREE.Group();
	riser = 0.18; //18 cm
	nSteps = Math.floor(height/riser);
	tread = length/(nSteps-1);
	concrete = creerLambertTexture("assets/textures/murs/concrete.jpg", 0xaaaaaa, 1, 1);
	floor = creerLambertTexture("assets/textures/sols_plafonds/parquet2.jpg", 0xaaaaaa, 1, 1);
	for(var i = 0; i < nSteps; i++){
		rStep = creerCloison(nom.concat('_riser_', i.toString()), width, riser, 0.1, concrete);
		rStep.position.set(0,i*riser,i*tread - tread + 0.05);
		tStep = creerCloison(nom.concat('_tread_', i.toString()), width, 0.1, tread, concrete);
		tStep.position.set(0,(i+1)*riser,i*tread - tread/2);
		sideStep_l = creerCloison(nom.concat('_sideL_', i.toString()), 0.1, riser*(i+1), tread, concrete);
		sideStep_r = creerCloison(nom.concat('_sideR_', i.toString()), 0.1, riser*(i+1), tread, concrete);
		sideStep_l.position.set(width/2 - 0.05, 0, i*tread- tread/2);
		sideStep_r.position.set(-width/2 + 0.05, 0, i*tread- tread/2);
		upStep = creerSol(nom.concat('_up_', i.toString()), width, tread, floor);
		upStep.position.set(0,(i+1)*riser+0.1,i*tread- tread/2)
		groupe.add(rStep);
		groupe.add(tStep);
		groupe.add(sideStep_l);
		groupe.add(sideStep_r);
		groupe.add(upStep);
		
	}
	return groupe;
}

function creerPoster(nom,largeur, hauteur, nomImage){
	var geo   = new THREE.PlaneGeometry(largeur, hauteur) ; 
	var mat   = creerLambertTexture(nomImage, 0xffffff) ; 
	var mesh  = new THREE.Mesh(geo, mat) ; 
	mesh.name = nom ;
	return mesh ;   
}

function creerPoster1(nom,largeur, hauteur, nomImage){
	var geo    = new THREE.PlaneGeometry(largeur, hauteur) ; 
	var mat    = creerLambertTexture(nomImage, 0xffffff) ; 
	var mesh   = new THREE.Mesh(geo, mat) ; 
	mesh.name = "poster_"+nom ;
	var dos    = new THREE.Mesh(geo, materiauBlanc) ; 
	dos.rotation.y = Math.PI ; 
	dos.position.z = -0.01 ; 
	mesh.position.z = 0.01 ; 

	var groupe = new THREE.Group() ; 
	groupe.add(mesh) ; 
	groupe.add(dos) ;  
	groupe.name  = nom ;
	return groupe ;   
}

function creerText(description,largeur,hauteur){
	canvas = document.createElement('canvas')
	context = canvas.getContext('2d');
	canvas.width=1000
	canvas.heigth=5
	context.font = '80pt Arial';
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width - 0, canvas.height - 0);
	context.fillStyle = 'black';
    	context.textAlign = "center";
    	context.textBaseline = "middle";
    	context.fillText(description, canvas.width / 2, canvas.height / 2);

	var geometry = new THREE.PlaneGeometry(largeur*0.9, hauteur*0.1) ; 
	texture = new THREE.CanvasTexture(canvas);
	var material = new THREE.MeshLambertMaterial({color:0xffffff,map:texture}) ;
	var mesh = new THREE.Mesh(geometry,material)
    return mesh;
}





// ===================
// Création de sources
// ===================

function creerSourcePonctuelle(couleur, intensite, portee, attenuation){
	var light = new THREE.PointLight(couleur,intensite,portee,attenuation) ; 
	return light ; 
}

function creerSoleil(){
	var h = new THREE.HemisphereLight(0xffffbb,0x080820,1) ; 
	return h ; 
}

function creerSourceAudio3d(listener, fileName, loop, volume, distance){
	sound = new THREE.PositionalAudio(listener) ; 
	var audioLoader = new THREE.AudioLoader() ; 
	audioLoader.load(
				fileName,
   				function(buffer){
					//var _loop     = params["loop"]     || false ; 
					//var _volume   = params["volume"]   || 1.0 ;
					//var _distance = params["distance"] || 20 ;
					sound.setBuffer(buffer) ; 
					sound.setLoop(loop) ; 
					sound.setVolume(volume) ;
					sound.setRefDistance(distance) ;  
					sound.play() ; 
				}) ;
	return sound ;
}



// =====================
// Création de matériaux
// =====================

var textureLoader = new THREE.TextureLoader() ; 

var materiauBlanc  = creerLambert(0xffffff) ; 
var materiauRouge  = creerLambert(0xff0000) ;

function creerLambert(couleur){
  	var mat = new THREE.MeshLambertMaterial({color:couleur}) ; 
	return mat ; 
}

function creerLambertTexture(nomImage,couleur,nx,ny){
	var texture = textureLoader.load(nomImage) ; 
	var mat = new THREE.MeshLambertMaterial({color:couleur,map:texture}) ; 
	nx = nx ||   1 ; 
	ny = ny ||   1 ; 
	mat.map.wrapS = THREE.RepeatWrapping ;
	mat.map.wrapT = THREE.RepeatWrapping ;
	mat.map.repeat.set(nx,ny) ; 
	return mat ; 
}


// ======================
// Traitements des meshes
// ======================

function placerXYZ(mesh,x,y,z){
	mesh.translateX(x) ; 
	mesh.translateY(y) ; 
	mesh.translateZ(z) ; 
}

function orienterY(mesh,y){
	mesh.rotateY(y) ; 
}

function orienterX(mesh, x){
	mesh.rotateX(x);
}

function parentDe(pere,fils){
	pere.add(fils) ; 
}




// =============================
// Sélection par lancer de rayon
// =============================

var projector   = new THREE.Projector() ;
var listeIntersection = [] ; 

var camPos = null;
var camDir = null;
