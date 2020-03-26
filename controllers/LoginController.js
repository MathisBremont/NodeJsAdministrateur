let model = require('../models/login.js');

let async = require('async');

module.exports.VerifIdentifiant = function (request, response) {
    response.title = 'Vérification des identifiants';
    model.getIdentifiant(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.identifiant = result;
        //console.log(result);
        response.render('login', response);
    });
};