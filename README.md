# folder-router

## Introduction
Folder-router is a tiny express router to get started with a new NodeJS project. You can put all your route files in a single directory, folder-router will be able to open and inject all your endpoint in your express instance. You can also put your file in sub directory and access it through sub-url.

## Installation

You need NPM to install folder-router in your NodeJS project.

```sh
$ npm install --save folder-router
```

You can now use it in your main server file.
The first parameters must be your express instance, the second one must be the location of your routes directory. I highly recommand to use absolute location.
```js
var app = require('express')();
var router = require('folder-router');

router(app, __dirname + '/routes');

app.listen(3000);
```

## Creating your routes

In your routes directory, you can create as much as file as you want, everything will be read and add to express by folder-router. A route file MUST export a express.Router() instance as below  :

routes/book.js
```js
var Router = require('express').Router();

Router.get('/book', function(req, res) {
	res.end('All Books !');
});

Router.get('/book/:id', function(req, res) {
	res.end('Books with id = ', req.params.id);
});

Router.post('/book', function(req, res) {
	res.end('Adding a new book')
});

module.exports = Router;
```
Here is the list of all end points :
- GET http://localhost:3000/book
- GET http://localhost:3000/book/5
- POST http://localhost:3000/book

-------------
Also, you can create a directory "book" and write your routes like so:
routes/book/book.js
```js
var Router = require('express').Router();

Router.get('/', function(req, res) {
	res.end('All Books !');
});

Router.get('/:id', function(req, res) {
	res.end('Books with id = ', req.params.id);
});

Router.post('/', function(req, res) {
	res.end('Adding a new book')
});

module.exports = Router;
```
The name of the file has no impact by default. The end point remains the same because it takes the name of the sub directory

---------

One other solution for that, you can exports the base url with the root variable

routes/book.js
```js
var Router = require('express').Router();

Router.get('/', function(req, res) {
	res.end('All Books !');
});

Router.get('/:id', function(req, res) {
	res.end('Books with id = ', req.params.id);
});

Router.post('/', function(req, res) {
	res.end('Adding a new book')
});

module.exports = Router;
module.exports.root = '/book'; // here
```

---------

If you want to use name files as part of the route as well, you can use `useFilenameAsRoot` option like so:

```js
var app = require('express')();
var router = require('folder-router');

router(app, {
	location: __dirname + '/routes',
	useFilenameAsRoot: true
});

app.listen(3000);
```

so now the endpoints will end up like:
Here is the list of all end points :
- GET http://localhost:3000/book/book
- GET http://localhost:3000/book/book/5
- POST http://localhost:3000/book/book

Take note that index.js files won't be used as part of the route, for example:

routes/book/index.js
```js
var Router = require('express').Router();

Router.get('/', function(req, res) {
	res.end('All Books !');
});

Router.get('/:id', function(req, res) {
	res.end('Books with id = ', req.params.id);
});

Router.post('/', function(req, res) {
	res.end('Adding a new book')
});
```
It will define the following routes:

- GET http://localhost:3000/book
- GET http://localhost:3000/book/5
- POST http://localhost:3000/book

## Tests

```
$ npm test
```
or 
```
$ mocha ./test
```

## Contribute
All ways to contribute to folder-router are highly appreciated:
- improving the readme
- writing features
- writing tests
- writing a tutorial
- troubleshooting reported issues

Thank you very much !
