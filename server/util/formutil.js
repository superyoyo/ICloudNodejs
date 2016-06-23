/**
 * Created by lj88868 on 2016/6/23.
 */
var formidable = require('formidable');

exports.parseRequest = function(req, cb){
    var form = new formidable.IncomingForm();
    var fields = [];
    form
        .on('field', function(field, value) {
            fields.push([field, value]);
        })
       .on('end', function() {
            cb(fields);
        });
    form.parse(req);
}