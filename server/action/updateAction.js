/**
 * Created by lj88868 on 2016/6/17.
 */
var dbutil = require('../util/dbutil');
var strutil = require('../util/stringUtil');

exports.dealRequest = function(request, cb){
    var className= request.body.className;
    var objectId = request.body.objectId;
    var terms = request.body.data;
    var fileds = '';
    var sql = 'update ' + className + ' ';
    terms = JSON.parse(terms);
    for(var key in terms){
        if(fileds == ''){
            if(strutil.isString(terms[key])){
                fileds += 'set ' + key + '= \'' + terms[key] + '\'';
            }else{
                fileds += 'set ' + key + '=' + terms[key];
            }
        }else{
            if(strutil.isString(terms[key])){
                fileds += ', ' + key + '= \'' + terms[key] + '\'';
            }else{
                fileds += ', ' + key + '=' + terms[key];
            }
        }
    }
    sql += fileds;
    sql += ' where id = ' + objectId;
    dbutil.execute(sql, function(err, res){
        cb(err, res);
    });
}