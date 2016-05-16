var Router = require('express').Router();

Router.get('/', function(req, res) {
    res.end('index');
});

Router.get('/contact', function(req, res) {
    res.end('contact');
});

module.exports = Router;
