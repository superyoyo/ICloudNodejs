var express = require('express');
var deleteAction = require('../server/action/deleteAction');
var findAction = require('../server/action/findAction');
var getAction = require('../server/action/getAction');
var saveAction = require('../server/action/saveAction');
var updateAction = require('../server/action/updateAction');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ICloud build you app fast and fast' });

});

router.post('/', function(req, resp, next){
    var action = req.body.action;
    if(action == 'save'){
        saveAction.dealRequest(req, function(err, res){
            if(err){
                resp.send(err.message + '');
            }else{
                resp.send(res.insertId);
            }
            resp.end();
        });
    }
    else if(action == 'delete'){
        deleteAction.dealRequest(req, function(err, res){
            if(err){
                resp.send(err.message);
            }else{
                console.log(res.affectedRows);
                resp.send(res.affectedRows + '');
            }
            resp.end();
        });
    }
    else if(action == 'update'){
        updateAction.dealRequest(req, function(err, res){
            if(err){
                resp.send(err.message);
            }else{
                resp.send(res.affectedRows + '');
            }
            resp.end();
        });
    }
    else if(action == 'get'){
        getAction.dealRequest(req, function(err, res){
            if(err){
                resp.send(err.message);
            }else{
                resp.send(JSON.stringify(res[0]));
            }
            resp.end();
        });
    }
    else if(action == 'find'){
        findAction.dealRequest(req, function(err, res){
            if(err){
                resp.send(err.message);
            }else{
                resp.send(JSON.stringify(res));
            }
            resp.end();
        });
    }
});

module.exports = router;
