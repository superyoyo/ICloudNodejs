/**
 * Created by lj88868 on 2016/6/17.
 */
var dbutil = require('../util/dbutil')
exports.dealRequest = function(request, cb){
     var className = request.body.className;
     var objectId = request.body.objectId;
     var sql = 'delete from ' + className + ' where id = ' + objectId;
     dbutil.execute(sql, function(err, res){
         cb(err, res);
     });
}