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
    form
        .on('field', function(field, value) {
            console.log(field, value);
            fields.push([field, value]);
            if(field == 'bucketName'){
                bucketName = value;
            }
        })
        .on('file', function(field, file) {
            console.log(field, file);
            files.push([field, file]);
        })
        .on('end', function() {
            console.log('-> upload done');
            console.log(files);
            console.log(fields);
            /*for(var i in files){
                var file = files[i];
                var name = file[0];
                var path = file[1].path;
                oss.uploadFile(bucketName, file[0], path, function(result, err){
                    console.log(result);
                });
            }*/
        });
    form.parse(req);
}