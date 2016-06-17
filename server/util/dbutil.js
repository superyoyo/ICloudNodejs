/**
 * Created by lj88868 on 2016/6/17.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'wechat',
    port : '3306'
});

//var insert = 'insert into user (phone, email, password, name, userId) values (\'15601295139\', \'1984398319@qq.com\', \'000000\', \'JackLee\', 123456789)';


exports.execute = function(sql, cb){
    console.log('sql:' + sql);
    pool.getConnection(function(err, conn){
        if(err){
            console.log('pool' + err);
            cb(err, undefined);
            return;
        }
        conn.query(sql, function(err1, res1){
            cb(err1, res1);
            conn.release();
        });
    });
}


