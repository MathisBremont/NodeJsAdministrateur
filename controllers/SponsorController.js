let model = require('../models/sponsor.js');

// ////////////////////// L I S T E R     C I R C U I T S

let async = require('async');


module.exports.ListeSponsors = function (request, response) {
    response.title = 'Liste des circuits';
    model.getListeSponsors(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeSponsors = result;
        //console.log(result);
        response.render('gestionDesSponsors', response);
    });
};

module.exports.ListeEcuries = function (request, response) {
    response.title = 'Liste des circuits';
    model.getListeEcurie(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
        response.render('ajouterSponsor', response);
    });
};