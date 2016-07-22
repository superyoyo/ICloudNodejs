/**
 * Created by lj88868 on 2016/7/22.
 */

module.exports = {
    dealResponse : function (code, message, data, res){
        res.status(200);
        res.set('ContentType', 'text/plain');
        var result = {
            code : code,
            message : message,
            data : data
        }
        res.send(result);
        res.end();
    }
};