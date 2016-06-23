/**
 * Created by lj88868 on 2016/6/22.
 */
var co = require('co');
var OSS = require('ali-oss');
var fs = require('fs');

var client = new OSS({
    region : 'oss-cn-beijing',
    accessKeyId : 'CcgN622fLiBcfWw1',
    accessKeySecret : 'h4IesYay1FMXD04mGmqUqhv9jkchyp'
});

/**
 * 获取所有的bucket
 */
exports.bucketList = function(cb){
    co(function* () {
        var result = yield client.listBuckets();
        cb(result.buckets, undefined);
    }).catch(function (err) {
        cb(undefined, err);
    });
}

/**
 * 根据bucket的名字获取下面的所有文件
 * @param bucketName 要上传到的bucket
 * @param cb 回调 result err
 */
exports.getBuketFiles = function(bucketName, cb){
    co(function* () {
        client.useBucket(bucketName);
        var result = yield client.list({
            'max-keys': 5
        });
        cb(result.objects, undefined);
    }).catch(function (err) {
        cb(undefined, err);
    });
}

/**
 * 上传文件 客户端传递流过来，然后服务器写入到oss
 * @param bucketName 要上传到的bucket
 * @param stream 客户端传递过来的流
 * @param object_key 上传到服务器的名字
 * @param contentLength 文件的长度
 * @param cb 回调 result err
 */
exports.uploadFile = function(bucketName, object_key, file_path, cb){
    co(function* () {
        client.useBucket(bucketName);

        // don't use 'chunked encoding'
        var stream = fs.createReadStream(file_path);
        var size = fs.statSync(file_path).size;

        var result = yield client.putStream(
            object_key, stream, {contentLength: size});
        cb(result, undefined);
    }).catch(function (err) {
        cb(undefined, err);
    });
};


