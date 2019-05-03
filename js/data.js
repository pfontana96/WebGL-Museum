 var data = {
	"objets" : [
			
			
			{"type":"soleil" , "nom":"soleil"    , "params":{}},
			{"type":"ampoule", "nom":"ampoule01" , "params":{"couleur":0xff0000,"intensite":2.0,"portee":5.0,"attenuation":2.0}},

			{"type":"lambert", "nom":"materiauBleu","params":{"couleur":0x0000ff}},
			{"type":"lambert", "nom":"materiauBlanc","params":{"couleur":0xffffff}},
			{"type":"lambertTexture", "nom":"textureDante",
                                                  "params":{"image":"assets/textures/murs/dante.jpg",
                                                  "couleur":0xaaaaaa,"nx":1,"ny":1}},
			{"type":"lambertTexture", "nom":"textureSol",
                                                  "params":{"image":"assets/textures/sols_plafonds/parquet2.jpg",
                                                  "couleur":0xaaaaaa,"nx":50,"ny":50}},

			{"type":"groupe",  "nom":"gr01","params":{}},
			{"type":"sphere",  "nom":"sph01",       
                                           "params":{"rayon":0.5,"subdivisions":16,"materiau":"materiauBleu"}},
			{"type":"sphere",  "nom":"sph02",       
                                           "params":{"rayon":0.5,"subdivisions":16,"materiau":"materiauBlanc"}},
			{"type":"sphere",  "nom":"sph03",       
                                           "params":{"rayon":0.5,"subdivisions":16,"materiau":"textureDante"}},
			{"type":"sol",     "nom":"sol",         
                                           "params":{"largeur":100.0,"profondeur":100.0,"materiau":"textureSol"}},

			{"type":"poster", "nom":"poster01",
                                           "params":{"largeur":2.0, 
                                                     "hauteur":2.0,
                                                     "epaisseur":0.5,
                                                     "url":"assets/posters/trevarez/cuisine.jpg"}},
			{"type":"poster", "nom":"poster02",
                                           "params":{"largeur":2.0, 
                                                     "hauteur":2.0,
                                                     "epaisseur":0.5,
                                                     "url":"assets/posters/trevarez/coffre-charbon.jpg"}},
			{"type":"texte", "nom":"texte01",
                                           "params":{"largeur":10.0, 
                                                     "hauteur":10.0,
                                                     "texte":"BONJOUR héhé"}},

			{"type":"cloison", "nom":"cloison01",
                                           "params":{"largeur":10.0, 
                                                     "hauteur":3.0,
						     "epaisseur":0.1,
                                                     "materiau":"textureDante"}},
			{"type":"cloison", "nom":"cloison02",
                                           "params":{"largeur":10.0, 
                                                     "hauteur":3.0,
                                                     "epaisseur":0.1,
                                                     "materiau":"textureDante"}}
			

		    ],
	"actions" : [
			{"fonc":"placerXYZ", "objet":"ampoule01", "params":{"x":1, "y":3,"z":3}},
			{"fonc":"orienterY", "objet":"gr01", "params":{"angle":Math.PI/4.0}},
			{"fonc":"placerXYZ", "objet":"gr01", "params":{"x":-2, "y":-0.5,"z":3}},
			{"fonc":"placerXYZ", "objet":"sol", "params":{"x":0, "y":-0.01,"z":0}},
			{"fonc":"placerXYZ", "objet":"sph01", "params":{"x":2, "y":2,"z":3}},
			{"fonc":"placerXYZ", "objet":"sph02", "params":{"x":-2,"y":2,"z":3}},
			{"fonc":"placerXYZ", "objet":"sph03", "params":{"x":0, "y":2,"z":3}},
			{"fonc":"placerXYZ", "objet":"poster01", "params":{"x":0, "y":1.7,"z":0.3}},
			{"fonc":"placerXYZ", "objet":"poster02", "params":{"x":2.5, "y":1.7,"z":0.3}},
			{"fonc":"placerXYZ", "objet":"texte01", "params":{"x":0, "y":5.0,"z":0.6}},
			{"fonc":"orienterY", "objet":"cloison02", "params":{"angle":Math.PI/2.0}},
			{"fonc":"placerXYZ", "objet":"cloison02", "params":{"x":-10.0, "y":0,"z":0}}

		    ],
	"relations" : [
			{"rel":"parentDe","sujet":"scene","objet":"soleil"},
			{"rel":"parentDe","sujet":"scene","objet":"ampoule01"},
			{"rel":"parentDe","sujet":"scene","objet":"sph01"},
			{"rel":"parentDe","sujet":"gr01","objet":"sph02"},
			{"rel":"parentDe","sujet":"gr01","objet":"sph03"},
			{"rel":"parentDe","sujet":"scene","objet":"gr01"},
			{"rel":"parentDe","sujet":"scene","objet":"sol"},
			{"rel":"parentDe","sujet":"cloison02","objet":"poster01"},
			{"rel":"parentDe","sujet":"cloison02","objet":"poster02"},
			{"rel":"parentDe","sujet":"cloison01","objet":"texte01"},
			{"rel":"parentDe","sujet":"scene","objet":"cloison01"},
			{"rel":"parentDe","sujet":"scene","objet":"cloison02"}
		      ]
} ; 
