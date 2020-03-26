let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function (app) {

// Main Routes
    app.get('/', HomeController.DerniersResultats);
    app.get('/accueil', HomeController.DerniersResultats);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/listerPilotes/:lettre', PiloteController.ListerPilotes);
    app.get('/detailDuPilote/:pilnum', PiloteController.DetailDuPilote);

    // circuits
    app.get('/circuits', CircuitController.ListerCircuit);
    app.get('/detailDuCircuit/:cirnum', CircuitController.DetailsDuCircuit);

// Ecuries
    app.get('/ecuries', EcurieController.ListerEcurie);
    app.get('/detailEcurie/:ecunum', EcurieController.DetailEcurie);

    //Résultats
    app.get('/resultats', ResultatController.ListerResultat);
    app.get('/detailDuResultat/:gpnum',ResultatController.DetailsDuResultat);


// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
