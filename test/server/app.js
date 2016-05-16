var app = require('express')();
var router = require('../..');

router(app, __dirname + '/routes');

module.exports.getApp = app;
