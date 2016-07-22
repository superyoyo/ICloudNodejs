/**
 * Created by lj88868 on 2016/6/22.
 */
var oss = require('../ali/oss/ossutil');
var formidable = require('formidable');

exports.dealRequest = function(req, cb){
    var form = new formidable.IncomingForm();
    var files = [];
    var fields = [];
    form.uploadDir = '../server/files';
    var bucketName = '';
    var fileName = '';
    form
        .on('field', function(field, value) {
            fields.push([field, value]);
            if(field == 'bucketName'){
                bucketName = value;
            }
            if(field == 'name'){
                fileName = value;
            }
        })
        .on('file', function(field, file) {
            files.push([field, file]);
        })
        .on('end', function() {
            console.log('-> upload done');
            if(files.length > 0){
                var file = files[0];
                if(file[0] == 'photo'){
                    file = file[1];
                    if(fileName == ''){
                        fileName = file.name;
                    }
                    var path = file.path;
                    oss.uploadFile(bucketName, fileName, path, function(result, err){
                        if(result.res.status == '200'){
                            console.log(result.url);
                            cb(err, result.url);
                            console.log('cb执行完毕');
                        }else{
                            cb(err, undefined);
                        }
                    });
                }else{
                    cb( '参数不全', undefined);
                }
            }else{
                cb( '参数不全', undefined);
            }
        });
    form.parse(req);
}