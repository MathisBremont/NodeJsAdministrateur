let db = require('../configDb');


module.exports.getListePilotes = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT pilnum, paynum, pilnom, pilprenom,pildatenais,pilpigiste,pilpoints,pilpoids,piltaille,piltexte,ecunum FROM pilote ORDER BY pilnom";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailsPilote = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select pilnum, paynum, pilnom, pilprenom,pildatenais,pilpigiste,pilpoints,pilpoids,piltaille,piltexte,ecunum from pilote where pilnum="+data;
            connexion.query(sql,callback);


            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};


module.exports.ajouterPilote = function (post,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="INSERT INTO pilote(paynum,pilnom,pilprenom,pildatenais,pilpoints,pilpoids,piltaille,piltexte,ecunum) values (?,?,?,?,?,?,?,?,?)";
            connexion.query(sql,post, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.listerNatios = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select paynum,paynat from pays order by paynat";
            connexion.query(sql,callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNatioPilote = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select pi.paynum,paynat from pays p inner join pilote pi on pi.paynum=p.paynum where pilnum="+data;
            connexion.query(sql,callback);

            connexion.release();
        }
    });
};


module.exports.listerEcuries = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select ecunum,ecunom from ecurie order by ecunom";
            connexion.query(sql,callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getEcuPilote = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="Select p.ecunum,ecunom from ecurie e inner join pilote p on p.ecunum=e.ecunum where pilnum="+data;
            connexion.query(sql,callback);

            connexion.release();
        }
    });
};



module.exports.modifierPilote = function (data,post,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL

            let sql ="Update pilote set paynum=?,pilnom=?,pilprenom=?,pildatenais=?,pilpoints=?,pilpoids=?,piltaille=?,piltexte=?,ecunum=? where pilnum="+data;
            connexion.query(sql,post, callback);
            // la connexion retourne dans le pool
            console.log(sql);
            connexion.release();
        }
    });
};



module.exports.supprimerPilote = function (data,callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL


            let sql ="DELETE from pilote where pilnum="+data;
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};