var Router = require('express').Router();

Router.get('/', function(req, res) {
    res.end('user');
});

module.exports = Router;
