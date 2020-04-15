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
module.exports.getListeEcuries = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT ecunum, fpnum, ecunom, ecunomdir, ecuadrsiege, ecupoints,paynum,ecuadresseimage FROM ecurie ORDER BY ecunom";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailsEcurie = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select ecunum,fpnum,ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,ecuadresseimage from ecurie where ecunum="+data;
            connexion.query(sql,callback);

            console.log(sql);
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


            let sql ="Select paynum,paynom from pays order by paynom";
            connexion.query(sql,callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.getPaysEcurie = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select e.paynum,paynom from pays p inner join ecurie e on e.paynum=p.paynum where e.ecunum="+data;
            connexion.query(sql,callback);

            connexion.release();
        }
    });
};



module.exports.listerFourn = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select fpnum,fpnom from fourn_pneu order by fpnom";
            connexion.query(sql,callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.getFournEcurie = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select e.fpnum,fpnom from ecurie e inner join fourn_pneu f on f.fpnum=e.fpnum where ecunum="+data;
            connexion.query(sql,callback);

            connexion.release();
        }
    });
};

module.exports.ajouterEcurie = function (post,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="INSERT INTO ecurie(fpnum,ecunom,ecunomdir,ecuadrsiege,ecupoints,paynum,ecuadresseimage) values (?,?,?,?,?,?,?)";
            connexion.query(sql,post, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.modifierEcurie = function (data,post,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL

            let sql ="Update ecurie set fpnum=?,ecunom=?,ecunomdir=?,ecuadrsiege=?,ecupoints=?,paynum=?,ecuadresseimage=? where ecunum="+data;
            connexion.query(sql,post, callback);
            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.supprimerEcurie = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="DELETE from ecurie where ecunum ="+data;
            connexion.query(sql,callback);
            console.log(sql);
            connexion.release();
        }
    });
};





