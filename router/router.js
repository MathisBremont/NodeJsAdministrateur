let LoginController = require('./../controllers/LoginController');
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function (app) {

    // Main Routes
    app.get('/', HomeController.DerniersResultats);
    app.get('/accueil', HomeController.DerniersResultats);

    // pilotes
    app.get('/gestionDesPilotes', PiloteController.ListerPilotes);

    app.get('/ajouterPilote',PiloteController.FormAjoutPilote);
    app.post('/ajouterPilote',PiloteController.AjouterPilote);

    app.get('/modifierPilote/:pilnum',PiloteController.FormModifPilote);
    app.post('/modifierPilote/:pilnum',PiloteController.ModifierPilote);

    app.get('/supprimerPilote/:pilnum',PiloteController.SupprimerPilote);



    // circuits
    app.get('/gestionDesCircuits', CircuitController.ListerCircuits);

    app.get('/ajouterCircuit',CircuitController.FormAjoutCircuit);
    app.post('/ajouterCircuit', CircuitController.AjouterCircuit);

    app.get('/modifierCircuit/:cirnum', CircuitController.FormModifCircuit);
    app.post('/modifierCircuit/:cirnum', CircuitController.ModifierCircuit);

    app.get('/supprimerCircuit/:cirnum',CircuitController.SupprimerCircuit);




    // Ecuries
    app.get('/gestionDesEcuries', EcurieController.ListerEcuries);

    app.get('/ajouterEcurie',EcurieController.FormAjoutEcurie);
    app.post('/ajouterEcurie', EcurieController.AjouterEcurie);

    app.get('/modifierEcurie/:ecunum', EcurieController.FormModifEcurie);
    app.post('/modifierEcurie/:ecunum', EcurieController.ModifierEcurie);

    app.get('/supprimerEcurie/:ecunum',EcurieController.SupprimerEcurie);


    //Résultats
    app.get('/resultats', ResultatController.ListerResultat);
    app.get('/saisirResultats/:gpnum',ResultatController.DetailsDuResultat);
    app.get('/gestionDesResultats', ResultatController.ListerGrandPrix);
    app.post('/gestionDesResultats', ResultatController.ResultatsSelonGP);
    app.get('/saisirResultats/:gpnum', ResultatController.ResultatsSelonGP);
    /*app.post('saisirResultats/:gpnum', ResultatController.ResultatsSelonGP);*/

    //Sponsors
    app.get('/gestionDesSponsors', SponsorController.ListeSponsors);
    app.get('/ajouterSponsor', SponsorController.ListeEcuries);

    //Login
    app.get('/login',LoginController.VerifIdentifiant);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
