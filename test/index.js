const path = require('path');
const request = require('supertest');
const express = require('express');
const router = require('../');

const routesPath = path.join(__dirname, 'server', 'routes');

const createApp = (config = routesPath) => {
  const app = express();

  router(app, config);

  return app;
};

let app;

describe('Test all endpoint', () => {
  context('when `options` is a string', () => {
    before(() => {
      app = createApp();
    });

    it('should respond 200 on /', (done) => {
      request(app)
        .get('/')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /contact', (done) => {
      request(app)
        .get('/contact')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /book', (done) => {
      request(app)
        .get('/book')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /book/4', (done) => {
      request(app)
        .get('/book/4')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it('should respond 200 on /books', (done) => {
      request(app)
        .get('/books')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /books/4', (done) => {
      request(app)
        .get('/books/4')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it('should respond 200 on /user', (done) => {
      request(app)
        .get('/user')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
  });

  context('when `useFilenameAsRoot` is true', () => {
    before(() => {
      app = createApp({
        location: routesPath,
        useFilenameAsRoot: true
      });
    });

    it('should respond 200 on /', (done) => {
      request(app)
        .get('/')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /contact', (done) => {
      request(app)
        .get('/contact')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /books/books', (done) => {
      request(app)
        .get('/books/books')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /books/books/4', (done) => {
      request(app)
        .get('/books/books/4')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it('should respond 200 on /books', (done) => {
      request(app)
        .get('/books')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /books/4', (done) => {
      request(app)
        .get('/books/4')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it('should respond 200 on /user/user', (done) => {
      request(app)
        .get('/user/user')
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });
  });
});
