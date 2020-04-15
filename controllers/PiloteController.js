let model = require('../models/pilote.js');
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S



module.exports.ListerPilotes = function (request, response) {
    response.title = 'Liste des circuits';
    model.getListePilotes(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePilotes = result;
        //console.log(result);
        response.render('gestionDesPilotes', response);
    });
}


module.exports.AjouterPilote = function (request, response) {
    response.title = 'Liste des circuits';

    var paynum = request.body.paynum;
    var pilnom = request.body.pilnom;
    var pilprenom = request.body.pilprenom;
    var pildatenais = request.body.pildatenais;
    var pilpoints = request.body.pilpoints;
    var pilpoids = request.body.pilpoids;
    var piltaille = request.body.piltaille;
    var piltexte = request.body.piltexte;
    var ecunum = request.body.ecunum;

    console.log("pildatenais : "+pildatenais);
    var post = [paynum,pilnom,pilprenom,pildatenais,pilpoints,pilpoids,piltaille,piltexte,ecunum];

    async.parallel([
            function (callback){
                model.ajouterPilote(post,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.listerNatios(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.listerEcuries(function (err, result) {
                    callback(null, result)
                });
            },

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeNatios = result[1];
            response.listeEcuries = result[2];



            response.render('ajouterPilote', response);
        }
    )
}


module.exports.FormAjoutPilote = function (request, response) {
    async.parallel([
            function (callback) {
                model.listerNatios(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerEcuries(function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeNatios = result[0];
            response.listeEcuries = result[1];



            response.render('ajouterPilote', response);
        }
    )


};


module.exports.ModifierPilote = function (request, response) {

    let data = request.params.pilnum;

    var paynum = request.body.paynum;
    var pilnom = request.body.pilnom;
    var pilprenom = request.body.pilprenom;
    var pildatenais = request.body.pildatenais;
    var pilpoints = request.body.pilpoints;
    var pilpoids = request.body.pilpoids;
    var piltaille = request.body.piltaille;
    var piltexte = request.body.piltexte;
    var ecunum = request.body.ecunum;



    var post = [paynum,pilnom,pilprenom,pildatenais,pilpoints,pilpoids,piltaille,piltexte,ecunum];


    console.log(post);

    async.parallel([
            function (callback){
                model.modifierPilote(data,post,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getListePilotes(function (err, result) {
                    callback(null, result)
                });
            },

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listePilotes = result[1];


            response.render('gestionDesPilotes', response);
        }
    )
}

module.exports.FormModifPilote = function (request, response) {
    let data = request.params.pilnum;


    async.parallel([
            function (callback) {
                model.getDetailsPilote(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerNatios(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getNatioPilote(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerEcuries(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getEcuPilote(data,function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.pilote = result[0][0];
            response.listeNatios = result[1];
            response.natioPilote = result[2][0];
            response.listeEcuries = result[3];
            response.ecuPilote = result[4][0];


            response.render('modifierPilote', response);
        }
    )
};




module.exports.SupprimerPilote = function (request, response) {
    let data = request.params.pilnum;
    response.title = 'Liste des circuits';


    async.parallel([
            function (callback){
                model.supprimerPilote(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getListePilotes(function (err, result) {
                    callback(null, result)
                });
            },

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listePilotes = result[1];


            response.render('gestionDesPilotes', response);
        }
    )
};







