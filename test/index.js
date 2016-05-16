var request = require('supertest');

var app = require('./server/app').getApp;

describe('Test all endpoint', function() {
    it('should respond 200 on /', function(done) {
        request(app)
            .get('/')
            .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /contact', function(done) {
        request(app)
            .get('/contact')
            .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /book', function(done) {
        request(app)
            .get('/book')
            .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /book/4', function(done) {
        request(app)
            .get('/book/4')
            .expect(200, done); // note that we're passing the done as parameter to the expect
    });
    it('should respond 200 on /user', function(done) {
        request(app)
            .get('/user')
            .expect(200, done); // note that we're passing the done as parameter to the expect
    });
});
