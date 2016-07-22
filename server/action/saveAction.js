/**
 * Created by lj88868 on 2016/6/17.
 */
var dbutil = require('../util/dbutil');
var strutil = require('../util/stringUtil');

exports.dealRequest = function(files, cb){
    var className = request.body.className;
    var data = request.body.data;
    var fileds = '';
    var values = '';
    data = JSON.parse(data);
    for(var filed in data){
        if(fileds == ''){
            fileds += '(' + filed;
        }else{
            fileds += ',' + filed;
        }
        if(values == ''){
            if(strutil.isString(data[filed])){
                values += '\'' + data[filed] + '\'';
            }else{
                values += data[filed];
            }
        }else{
            if(strutil.isString(data[filed])){
                values += ',\'' + data[filed] + '\'';
            }else{
                values += ',' + data[filed];
            }
        }
    }
    //拼成sql语句
    var sql = 'insert into ' + className + ' ' + fileds + ')values(' + values + ')';

    dbutil.execute(sql, function(err, res){
        cb(err, res);
    });
}