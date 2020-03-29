let model = require('../models/resultat.js');
const async = require("async");

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){

	response.title = 'Liste des résulats des grands prix';
	model.getDerniersResultats( function (err, result) {
		if (err) {
			// gestion de l'erreur
			console.log(err);
			return;
		}
		response.listeResultat = result;
		console.log(result);
		response.render('listerResultat', response);
	});


}

module.exports.DetailsDuResultat = function (request, response) {

	let data = request.params.gpnum;

	async.parallel([
			function (callback) {
				model.getDetailsResultat(data,function (err, result) {
					callback(null, result)
				});
			},
			function (callback) {
				model.getPoints( function(errE, resE){
					callback(null, resE);
				});
			},
		],
		function (err, result) {
			if (err) {
				console.log(err);
				return;
			}

			response.detailDuResultat = result[0];

			response.render('saisirResultats', response);
		}
	)
};





module.exports.Points=function(request,response){


	model.getPoints(function(err,result){
		if(err){
			console.log(err);
			return;
		}

		response.points=result;

		console.log(result);

		response.render('detailDuResultat', response);
	})
};

module.exports.ListerGrandPrix = function(request, response){

	response.title = 'Liste des grands prix';
	model.getGrandPrix( function (err, result) {
		if (err) {
			// gestion de l'erreur
			console.log(err);
			return;
		}
		response.listeResultats = result;

		response.render('gestionDesResultats', response);
	});


};


module.exports.ResultatsSelonGP = function (request, response) {

	let data = request.params.gpnum;


	/*var data = request.body.gpnum;*/
	var post=[data];
	console.log("ksqjbfihqrbgiaerzuhvfuieabgoyu              "+data);
	async.parallel([
			function (callback) {
				model.getPlaceEtPoints(function (err, result) {
					callback(null, result)
				});
			},
			function (callback) {
				model.getResultatsSelonGrandPrix(post,function(errE, resE){
					callback(null, resE);
				});
			},
		],
		function (err, result) {
			if (err) {
				console.log(err);
				return;
			}
			response.placeEtpoints = result[0];
			response.resultatsSelonGP = result[1];

			response.render('saisirResultats', response);
		}
	)
};
/*
module.exports.ResultatsSelonGP = function (request, response) {

	let data = request.params.gpnum;

	var pilnom = request.body.cirnom;
	var cirlongueur = request.body.cirlongueur;
	var ciradresseimage = request.body.ciradresseimage;
	var cirnbspectateurs = request.body.cirnbspectateurs;
	var cirtext = request.body.cirtext;
	var paynum = request.body.paynum;

	var post = [paynum,cirnom,cirlongueur,cirnbspectateurs,ciradresseimage,cirtext];


	async.parallel([
			function (callback) {
				model.getPlaceEtPoints(data,function (err, result) {
					callback(null, result)
				});
			},
			function (callback) {
				model.getResultatsSelonGrandPrix(data, post,function(errE, resE){
					callback(null, resE);
				});
			},
		],
		function (err, result) {
			if (err) {
				console.log(err);
				return;
			}

			response.placeEtpoints = result[0];
			response.resultatsSelonGP = result[1];

			response.render('saisirResultats', response);
		}
	)
};

*/
