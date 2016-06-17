/**
 * Created by lj88868 on 2016/6/17.
 */
exports.isString = function(str){
    return ((str instanceof String) || (typeof str).toLowerCase() == 'string');
}