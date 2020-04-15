let model = require('../models/ecurie.js');
let async = require('async');
   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcuries = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcuries( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcuries = result;

    response.render('gestionDesEcuries', response);
});
};




module.exports.FormModifEcurie = function (request, response) {
    let data = request.params.ecunum;


    async.parallel([
            function (callback) {
                model.getDetailsEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerPays(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getPaysEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerFourn(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getFournEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.ecurie = result[0][0];
            response.listePays = result[1];
            response.paysEcurie = result[2][0];
            response.listeFourn=result[3];
            response.fournEcurie=result[4][0];


            response.render('modifierEcurie', response);
        }
    )
};



module.exports.FormAjoutEcurie = function (request, response) {
    async.parallel([
            function (callback) {
                model.listerPays(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerFourn(function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listePays = result[0];
            response.listeFourn = result[1];



            response.render('ajouterEcurie', response);
        }
    )


};



module.exports.AjouterEcurie = function (request, response) {
    response.title = 'Liste des circuits';

    var fpnum = request.body.fpnum;
    var ecunom = request.body.ecunom;
    var ecunomdir = request.body.ecunomdir;
    var ecuadrsiege = request.body.ecuadrsiege;
    var ecupoints = request.body.ecupoints;
    var paynum = request.body.paynum;
    var ecuadresseimage = request.body.ecuadresseimage;

    var post = [fpnum,ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,ecuadresseimage];


    async.parallel([
            function (callback){
                model.ajouterEcurie(post,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.listerPays(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.listerFourn(function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listePays = result[1];
            response.listeFourn = result[2];



            response.render('ajouterEcurie', response);
        }
    )
}

module.exports.ModifierEcurie = function (request, response) {
    let data = request.params.ecunum;

    var fpnum = request.body.fpnum;
    var ecunom = request.body.ecunom;
    var ecunomdir = request.body.ecunomdir;
    var ecuadrsiege = request.body.ecuadrsiege;
    var ecupoints = request.body.ecupoints;
    var paynum = request.body.paynum;
    var ecuadresseimage = request.body.ecuadresseimage;

    var post = [fpnum,ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,ecuadresseimage];

    async.parallel([
            function (callback){
                model.modifierEcurie(data,post,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getListeEcuries(function (err, result) {
                    callback(null, result)
                });
            },

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeEcuries = result[1];


            response.render('gestionDesEcuries', response);
        }
    )
}

module.exports.SupprimerEcurie = function (request, response) {
    let data = request.params.ecunum;
    response.title = 'Liste des circuits';


    async.parallel([
            function (callback){
                model.supprimerEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getListeEcuries(function (err, result) {
                    callback(null, result)
                });
            },

        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeEcuries = result[1];


            response.render('gestionDesEcuries', response);
        }
    )
};


