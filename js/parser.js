var couleurs = {
		"noir":0x000000,
		"gris":0xaaaaaa,
		"blanc":0xffffff,
		"rouge":0xff0000,
		"vert":0x00ff00,
		"bleu":0x0000ff
		} ; 
function colorier(coul){
	return (couleurs[coul] || 0xffffff) ; 
}

function chargerDocument(){
	var oReq = new XMLHttpRequest() ; 
	oReq.onload = parser ; 
	oReq.open("get","scene.json",true) ; 
	oReq.send() ; 
}

function parser(){

	var obj = JSON.parse(this.responseText) ; 
	console.log("==> ", obj) ; 
	data = obj ; 

	var objets    = data.objets ; 
	var actions   = data.actions ; 
	var relations = data.relations ;  

	var _obj, obj ; 
	var _act ; 

	for(var i=0; i<objets.length; i++){
		_obj = objets[i] ; 
		var nom    = _obj.nom ; 
		var params = _obj.params ; 

		if(_obj.type == "groupe" ){
			var groupe        = creerGroupe(nom) ;
			enregistrerDansAnnuaire(nom,groupe) ;  
			
		} else
		if(_obj.type == "sol" ){
			console.log("SOL : ",nom) ; 
			var largeur    = params.largeur ;
			var profondeur = params.profondeur ; 
			var materiau   = chercherDansAnnuaire(params.materiau) ; 
			var sol        = creerSol(nom,largeur,profondeur,materiau) ;
			enregistrerDansAnnuaire(nom,sol) ;  
			
		} else
		if(_obj.type == "esc"){
			console.log("ESCALIER : ",nom) ;
			console.log(_obj) ;
			var length    = params.length ; 
			var height   = params.height ;
			var width = params.width ;     
			var esc   = creerEscalier(nom, height, width, length) ; 
			enregistrerDansAnnuaire(nom,esc) ; 
		} else 
		if(_obj.type == "sphere"){
			console.log("SPHERE : ",nom) ;
			console.log(_obj) ;
			var rayon    = params.rayon ; 
			var subdiv   = params.subdivisions ;   
			var materiau = chercherDansAnnuaire(params.materiau) ;   
			var sph   = creerSphere(nom,rayon,subdiv,materiau) ; 
			enregistrerDansAnnuaire(nom,sph) ; 
		} else
		if(_obj.type == "salle"){
			console.log("SALLE : ",nom) ;
			console.log(_obj) ;
			var length    = params.length ; 
			var depth   = params.depth ;   
			var artist = params.artist ;   
			var salle   = creerSalle(nom,length,depth,artist) ; 
			enregistrerDansAnnuaire(nom,salle) ; 
		} else
		if(_obj.type == "graph"){
			console.log("GRAPH : ",nom) ;
			console.log(_obj) ;
			var rayon    = params.rayon ; 
			var hauteur   = params.hauteur ;
			var num = params.num ;   
			var materiau = chercherDansAnnuaire(params.materiau) ;   
			var gph   = creerGraph(nom,rayon,hauteur,materiau, num) ; 
			enregistrerDansAnnuaire(nom,gph) ; 
		} else 
		if(_obj.type == "cloison"){
			var largeur   = params.largeur ;
			var hauteur   = params.hauteur ; 
			var epaisseur = params.epaisseur ;
			var materiau  = chercherDansAnnuaire(params.materiau) || materiauBlanc ;
			var cloison   = creerCloison(nom,largeur,hauteur,epaisseur,materiau) ; 
			enregistrerDansAnnuaire(nom, cloison) ;   
		} else
		if(_obj.type == "poster"){
			var largeur = params.largeur ;
			var hauteur = params.hauteur ; 
			var url     = params.url ; 
			var poster  = creerPoster(nom,largeur,hauteur,url) ;  
			enregistrerDansAnnuaire(nom, poster) ; 
		} else
		if(_obj.type == "texte"){
			var largeur = params.largeur ;
			var hauteur = params.hauteur ; 
			var desc    = params.texte ; 
			var texte   = creerText(desc,largeur,hauteur) ;  
			enregistrerDansAnnuaire(nom, texte) ; 
		} else
		if(_obj.type == "axes"){
            var longueur = params.longueur || 1 ; 
			var axes     = creerAxes(longueur) ;  
			enregistrerDansAnnuaire(nom, axes) ; 
		} else
		if(_obj.type == "lambert"){
			console.log("LAMBERT : ", nom, params.couleur) ; 
			var materiau = creerLambert(colorier(params.couleur)) ; 
			enregistrerDansAnnuaire(nom,materiau) ; 
		} else 
		if(_obj.type == "lambertTexture"){
			var nx = params.nx || 1 ; 
			var ny = params.ny || 1 ; 
			var materiau = creerLambertTexture(params.image,colorier(params.couleur),nx, ny) ; 
			console.log("Lambert texturé : ",materiau) ; 
			enregistrerDansAnnuaire(nom, materiau) ; 
		} else
		if(_obj.type == "soleil"){
			var soleil = creerSoleil() ; 
			enregistrerDansAnnuaire(nom, soleil) ; 	
		} else
		if(_obj.type == "ampoule"){
			var couleur     = colorier(params.couleur) || 0xffffff ; 
			var intensite   = params.intensite || 1.0 ; 
			var portee      = params.portee || 3.0 ; 
			var attenuation = params.attenuation || 1.0 ;   
			var ampoule = creerSourcePonctuelle(couleur, intensite, portee, attenuation) ; 
			enregistrerDansAnnuaire(nom, ampoule) ; 
		} else 
		if(_obj.type == "audio"){
			var loop        = params.loop     || false ; 
			var volume      = params.volume   || 1.0 ;
			var distance    = params.distance || 20.0 ;
			var url         = params.url      || "" ; 
			var audio = creerSourceAudio3d(listener,url,loop, volume, distance) ;   
			enregistrerDansAnnuaire(nom,audio) ; 
		}		
			
	} ; 

	console.log("Fin de traitement des objets") ; 

	for(var i=0; i<actions.length; i++){
		_act = actions[i] ;
		var objet  = chercherDansAnnuaire(_act.objet) ;
		var fonc   = _act.fonc ;
		var params = _act.params ; 

		if(fonc == "placerXYZ"){
			objet.position.set(params.x, params.y, params.z) ; 
		} else
		if(fonc == "orienterY"){
			objet.rotation.y = params.angle ; 
		} else

		if(fonc == "orienterX"){
			objet.rotation.x = params.angle ; 
		}
	}


	for(var i=0; i<relations.length; i++){
		_rel = relations[i] ; 
		var sujet = chercherDansAnnuaire(_rel.sujet) ; 
		var objet = chercherDansAnnuaire(_rel.objet) ; 
		console.log("sujet : ", sujet) ; 
		console.log("objet : ", objet) ; 
		if(_rel.rel == "parentDe"){
			sujet.add(objet) ; 
		}
	}



}
