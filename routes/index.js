var express = require('express');
var deleteAction = require('../server/action/deleteAction');
var findAction = require('../server/action/findAction');
var getAction = require('../server/action/getAction');
var saveAction = require('../server/action/saveAction');
var updateAction = require('../server/action/updateAction');
var uploadAction = require('../server/action/uploadAction');
var formUtil = require('../server/util/formutil');
var response_util = require('../server/util/response_util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ICloud build you app fast and fast' });

});

router.post('/upload', function(req, resp, next){
    uploadAction.dealRequest(req, function(err, res){
        console.log(res);
        if(err){
            response_util.dealResponse(1, err, '', resp);
        }else{
            response_util.dealResponse(0, '', res, resp);
        }
    });
});

router.post('/', function(req, resp, next){
    var action = req.body.action;
    if(action == 'save'){
        saveAction.dealRequest(req, function(err, res){
            if(err){
                response_util.dealResponse(1, err.message, '', resp);
            }else{
                response_util.dealResponse(0, res.insertId, '', resp);
            }
        });
    }
    else if(action == 'delete'){
        deleteAction.dealRequest(req, function(err, res){
            if(err){
                response_util.dealResponse(1, err.message, '', resp);
            }else{
                console.log(res.affectedRows);
                response_util.dealResponse(0, res.affectedRows, '', resp);
            }
        });
    }
    else if(action == 'update'){
        updateAction.dealRequest(req, function(err, res){
            if(err){
                response_util.dealResponse(1, err.message, '', resp);
            }else{
                console.log(res.affectedRows);
                response_util.dealResponse(0, res.affectedRows, '', resp);
            }
        });
    }
    else if(action == 'get'){
        getAction.dealRequest(req, function(err, res){
            if(err){
                response_util.dealResponse(1, err.message, '', resp);
            }else{
                response_util.dealResponse(0, '', JSON.stringify(res[0]), resp);
            }
        });
    }
    else if(action == 'find'){
        findAction.dealRequest(req, function(err, res){
            if(err){

            }else{
                response_util.dealResponse(0, '', JSON.stringify(res), resp);
            }
        });
    }
});

module.exports = router;
