let LoginController = require('./../controllers/LoginController');
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
    app.get('/gestionDesPilotes', PiloteController.DetailDuPilote);
    app.get('/nomEcurie', PiloteController.nomEcurie);

    // circuits
    app.get('/circuits', CircuitController.ListerCircuit);
    app.get('/ajouterCircuit',CircuitController.ListerPays);
    app.post('/ajouterCircuit', CircuitController.AjouterCircuit);
    app.get('/modifierCircuit/:cirnum', CircuitController.DetailsDuCircuit);
    app.post('/modifierCircuit/:cirnum', CircuitController.ModifierCircuit);
    app.get('/supprimerCircuit/:cirnum',CircuitController.SupprimerCircuit);


    // Ecuries
    app.get('/ecuries', EcurieController.ListerEcurie);
    app.get('/detailEcurie/:ecunum', EcurieController.DetailEcurie);
    app.get('/gestionDesEcuries', EcurieController.DetailDeEcurie);
    app.get('/ajouterEcurie', EcurieController.PasserAjouterEcurie)

    //Résultats
    app.get('/resultats', ResultatController.ListerResultat);
    app.get('/detailDuResultat/:gpnum',ResultatController.DetailsDuResultat);


    //Login
    app.get('/login',LoginController.VerifIdentifiant);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
