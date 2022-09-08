var redis = require('redis');
var express = require('express');

var router = express.Router();
router.get('/', function(req, res, next) { 
    res.end('Welcome to You in Home Page');
});



module.exports = router;