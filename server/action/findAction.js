/**
 * Created by lj88868 on 2016/6/17.
 */
var dbutil = require('../util/dbutil')
var strutil = require('../util/stringUtil');

exports.dealRequest = function(request, cb){
    var className = request.body.className;
    var keys = request.body.keys;
    var sql = '';
    if(keys != undefined){
        sql = 'select ';
        var haveAll = false;
        keys = JSON.parse(keys);
        for(var i =0;i < keys.length; i++){
            var key = keys[i];

            if(key == '*'){
                haveAll = true;
            }
            if(i == 0){
                sql += key;
            }else{
                sql += ',' + key;
            }
        }
        if(!haveAll){
           sql += ',id';
        }
        sql += ' from ' + className;
        var filters = request.body.filters;
        filters = filters.substring(1, filters.length-1);
        console.log('filters:' + filters);
        if(filters != undefined){
            if(filters.length){
                filters = filters.split(',');
            }
            for(var i in filters){
                var filter = filters[i];
                var tag = filter.tag;
                var key = filter.key;
                var value = filter.value;
                if(i == 0){
                    sql +=' where ' + key + ' ' + tag + '';
                }else{
                    sql += ' and ' + key + ' ' + tag + '';
                }
                if(strutil.isString(value) && value != 'between'){
                    sql += '\'' + value + '\'';
                }else{
                    sql += value;
                }
            }
        }
        //orderby语句
        var orderby = request.body.orderBy
        if(orderby != undefined){
            sql += ' ' + orderby;
        }
        //limit语句
        var limit = request.body.limit;
        if(limit != undefined){
            sql += ' limit ' + limit;
        }
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
}