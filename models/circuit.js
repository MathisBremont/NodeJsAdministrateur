/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeCircuits = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs FROM circuit ORDER BY cirnom";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.ajouterCircuit = function (post,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="INSERT INTO circuit(paynum,cirnom,cirlongueur,cirnbspectateurs,ciradresseimage,cirtext) values (?,?,?,?,?,?)";
            connexion.query(sql,post, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.modifierCircuit = function (data,post,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL

            let sql ="Update circuit set paynum=?,cirnom=?,cirlongueur=?,cirnbspectateurs=?,ciradresseimage=?,cirtext=? where cirnum="+data;
            connexion.query(sql,post, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.listerPays = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select paynum,paynom from pays";
            connexion.query(sql,callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailsCircuit = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select cirnum,paynum,cirnom,cirlongueur,cirnbspectateurs,ciradresseimage,cirtext from circuit where cirnum="+data;
            connexion.query(sql,callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getPaysCircuit = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select c.paynum,paynom from pays p inner join circuit c on c.paynum=p.paynum where c.cirnum="+data;
            connexion.query(sql,callback);

            connexion.release();
        }
    });
};

module.exports.supprimerCircuit = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="DELETE from circuit where cirnum ="+data;
            connexion.query(sql,callback);
            console.log(sql);
            connexion.release();
        }
    });
};