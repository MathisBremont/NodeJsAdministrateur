let model = require('../models/circuit.js');

// ////////////////////// L I S T E R     C I R C U I T S

let async = require('async');


module.exports.ListerCircuit = function (request, response) {
    response.title = 'Liste des circuits';
    model.getListeCircuits(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        //console.log(result);
        response.render('gestionDesCircuits', response);
    });
}

module.exports.AjouterCircuit = function (request, response) {
    response.title = 'Liste des circuits';

    var cirnom = request.body.cirnom;
    var cirlongueur = request.body.cirlongueur;
    var ciradresseimage = request.body.ciradresseimage;
    var cirnbspectateurs = request.body.cirnbspectateurs;
    var cirtext = request.body.cirtext;
    var paynum = request.body.paynum;

    var post = [paynum,cirnom,cirlongueur,cirnbspectateurs,ciradresseimage,cirtext];


    model.ajouterCircuit(post, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        //console.log(result);
        response.render('ajouterCircuit', response);
    });
}

module.exports.ModifierCircuit = function (request, response) {
    let data = request.params.cirnum;

    var cirnom = request.body.cirnom;
    var cirlongueur = request.body.cirlongueur;
    var ciradresseimage = request.body.ciradresseimage;
    var cirnbspectateurs = request.body.cirnbspectateurs;
    var cirtext = request.body.cirtext;
    var paynum = request.body.paynum;

    var post = [paynum,cirnom,cirlongueur,cirnbspectateurs,ciradresseimage,cirtext];


    model.modifierCircuit(data,post, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        //console.log(result);
        response.render('modifierCircuit', response);
    });
}





module.exports.DetailsDuCircuit = function (request, response) {
    let data = request.params.cirnum;


    async.parallel([
            function (callback) {
                model.getDetailsCircuit(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerPays(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getPaysCircuit(data,function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.circuit = result[0][0];
            response.listePays = result[1];
            response.paysCircuit = result[2][0];


            response.render('modifierCircuit', response);
        }
    )
};


module.exports.ListerPays = function (request, response) {

    response.title = 'Liste des circuits';



    model.listerPays(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePays = result;
        //console.log(result);
        response.render('ajouterCircuit', response);
    });


};


module.exports.SupprimerCircuit = function (request, response) {
    let data = request.params.cirnum;
    response.title = 'Liste des circuits';


    async.parallel([
            function (callback){
                model.supprimerCircuit(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getListeCircuits(function (err, result) {
                    callback(null, result)
                });
            },

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeCircuit = result[1];


            response.render('gestionDesCircuits', response);
        }
    )
};
