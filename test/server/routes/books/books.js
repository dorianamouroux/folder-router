var Router = require('express').Router();

Router.get('/', function(req, res) {
    res.end('books');
});

Router.get('/:id', function(req, res) {
    res.end('book = ' + req.params.id);
});

module.exports = Router;

module.exports.root = '/book';
