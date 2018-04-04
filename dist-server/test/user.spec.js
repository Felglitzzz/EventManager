'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _userMockData = require('./helpers/userMockData');

var _userMockData2 = _interopRequireDefault(_userMockData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var request = _chai2.default.request(_index2.default);

describe('UserAccess Test', function () {
  // teardown and setup database
  before(function (done) {
    _models2.default.user.sync({ force: true }).then(function () {
      return done();
    });
  });

  before(function (done) {
    _models2.default.user.create(_userMockData2.default.admin.signup).then(function () {
      return done();
    });
  });

  describe('Admin test', function () {
    it('expect admin user to be able to login with valid data', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.admin.validLogin).end(function (err, res) {
        var _res$body = res.body,
            message = _res$body.message,
            token = _res$body.token;

        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(message).to.equal('User logged in');
        (0, _chai.expect)(token).to.have.length.above(0);
        done();
      });
    });
    it('expect to return 400 if the username field is missing for login', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.admin.inValidLogin.noUsername).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.username).to.equal('Username is Required');
        done();
      });
    });

    it('expect to return 400 if the password field is missing for admin login', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.admin.inValidLogin.noPassword).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.password).to.equal('Password is Required');
        done();
      });
    });
    it('should not login for admin with an incorrect username', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.admin.inValidLogin.invalidUsername).end(function (err, res) {
        var error = res.body.error;

        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(error).to.equal('Username/Password Incorrect');
        done();
      });
    });

    it('should not login for admin with an incorrect password', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.admin.inValidLogin.invalidPassword).end(function (err, res) {
        var error = res.body.error;

        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(error).to.equal('Username/Password Incorrect');
        done();
      });
    });
  });

  describe('User test', function () {
    it('expect user to be able to signup with valid data', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.validUser.signup).end(function (err, res) {
        var _res$body2 = res.body,
            message = _res$body2.message,
            token = _res$body2.token;

        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body).to.have.property('message');
        (0, _chai.expect)(message).to.equal('User created');
        (0, _chai.expect)(token).to.have.length.above(0);
        done();
      });
    });

    it('Should not register a new user with an already existing email', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.emailExist).end(function (err, res) {
        var error = res.body.error;

        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(error).to.equal('A user with this email exists');
        done();
      });
    });

    it('Should not register a new user with an already existing username', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.usernameExist).end(function (err, res) {
        var error = res.body.error;

        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(error).to.equal('Username taken, Please use another');
        done();
      });
    });

    it('expect to return 400 if the surname field is missing for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.noSurname).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.surname).to.equal('Surname is Required');
        done();
      });
    });

    it('expect to return 400 if the surname field is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidSurname).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.surname).to.equal('Surname can only contain letters');
        done();
      });
    });

    it('expect to return 400 if the length of the surname field is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidSurnameLen).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.surname).to.equal('Surname should be more than two characters');
        done();
      });
    });

    it('expect to return 400 if the firstname field is missing for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.noFirstname).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.firstname).to.equal('Firstname is Required');
        done();
      });
    });

    it('expect to return 400 if the firstname field is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidFirstname).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.firstname).to.equal('Firstname can only contain letters');
        done();
      });
    });

    it('expect to return 400 if the length of the firstname field is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidFirstnameLen).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.firstname).to.equal('Firstname should be more than two characters');
        done();
      });
    });

    it('expect to return 400 if the email field is missing for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.noEmail).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.email).to.equal('Email is Required');
        done();
      });
    });

    it('expect to return 400 if the email is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidEmail).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.email).to.equal('Invalid email, Enter a valid email, like so: you@mail.com');
        done();
      });
    });

    it('expect to return 400 if the username field is missing for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.noUsername).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.username).to.equal('Username is Required');
        done();
      });
    });

    it('expect to return 400 if the length of the username field is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidUsernameLen).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.username).to.equal('Username should be more than two characters');
        done();
      });
    });

    it('expect to return 400 if the password field is missing for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.noPassword).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.password).to.equal('Password is Required');
        done();
      });
    });

    it('expect to return 400 if the length of the password field is invalid for sign up', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidPasswordLen).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.password).to.equal('Password should not be less than 8 characers');
        done();
      });
    });

    it('expect to return 400 if confirm password field is missing', function (done) {
      request.post('/api/v1/users').send(_userMockData2.default.invalidSignupData.invalidpasswordConfirm).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.password).to.equal('Passwords must match');
        done();
      });
    });

    it('expect user to be able to login with valid data', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.validUser.login).end(function (err, res) {
        var _res$body3 = res.body,
            message = _res$body3.message,
            token = _res$body3.token;

        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(message).to.equal('User logged in');
        (0, _chai.expect)(token).to.have.length.above(0);
        done();
      });
    });

    it('should not login if the username field is missing', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.invalidLoginData.noUsername).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.username).to.equal('Username is Required');
        done();
      });
    });

    it('should not login if the password field is missing', function (done) {
      request.post('/api/v1/users/login').send(_userMockData2.default.invalidLoginData.noPassword).end(function (err, res) {
        var errors = res.body.errors;

        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(errors.password).to.equal('Password is Required');
        done();
      });
    });
  });
});
//# sourceMappingURL=user.spec.js.map