/**
 * Created by lj88868 on 2016/6/17.
 */
var dbutil = require('../util/dbutil');

exports.dealRequest = function(request, cb){
    var className = request.body.className;
    var keys = request.body.keys;
    console.log(JSON.parse(keys)[0]);
    var sql = '';
    if(keys != null){
        sql += 'select id';
        keys = JSON.parse(keys);
        for(var i =0;i < keys.length; i++){
            var key = keys[i];
            console.log(key);
            sql += ',' + key;
        }
        sql += ' from ' + className + ' ';
    }else{
        sql = 'select * from ' + className + ' ';
    }
    sql += ' where id = ' + request.body.objectId;
    dbutil.execute(sql, function(err, res){
        if(err){
            cb(err, res);
        }else{
            for(var i in res){
                res[i].className = className;
            }
            cb(err, res);
        }
    });
}