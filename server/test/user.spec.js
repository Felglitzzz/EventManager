import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import mockData from './helpers/userMockData';

chai.use(chaiHttp);
const request = chai.request(app);

describe('USER TEST', () => {
  // teardown and setup database
  before((done) => {
    db.user.sync({ force: true })
      .then(() => done());
  });

  before((done) => {
    db.user.create(mockData.admin.signup)
      .then(() => done());
  });

  describe('Admin test', () => {
    it('expect admin user to be able to login with valid data', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.validLogin)
        .end((err, res) => {
          const { message, token } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('User logged in');
          expect(token).to.have.length.above(0);
          done();
        });
    });
    it('expect to return 400 if the username field is missing for login', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.inValidLogin.noUsername)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username is Required');
          done();
        });
    });

    it('expect to return 400 if the password field is missing for admin login', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.inValidLogin.noPassword)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password is Required');
          done();
        });
    });
    it('should not login for admin with an incorrect username', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.inValidLogin.invalidUsername)
        .end((err, res) => {
          const { error } = res.body;
          expect(res).to.have.status(401);
          expect(error).to.equal('Username/Password Incorrect');
          done();
        });
    });

    it('should not login for admin with an incorrect password', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.inValidLogin.invalidPassword)
        .end((err, res) => {
          const { error } = res.body;
          expect(res).to.have.status(401);
          expect(error).to.equal('Username/Password Incorrect');
          done();
        });
    });
  });

  describe('User test', () => {
    it('expect user to be able to signup with valid data', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.validUser.signup)
        .end((err, res) => {
          const { message, token } = res.body;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(message).to.equal('User created');
          expect(token).to.have.length.above(0);
          done();
        });
    });

    it('Should not register a new user with an already existing email', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.emailExist)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error');
          expect(error).to.equal('A user with this email exists');
          done();
        });
    });

    it('Should not register a new user with an already existing username', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.usernameExist)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error');
          expect(error).to.equal('Username taken, Please use another');
          done();
        });
    });

    it('expect to return 400 if the surname field is missing for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.noSurname)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.surname).to.equal('Surname is Required');
          done();
        });
    });

    it('expect to return 400 if the surname field is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidSurname)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.surname).to.equal('Surname can only contain letters');
          done();
        });
    });

    it('expect to return 400 if the length of the surname field is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidSurnameLen)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.surname).to.equal('Surname should be more than two characters');
          done();
        });
    });

    it('expect to return 400 if the firstname field is missing for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.noFirstname)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.firstname).to.equal('Firstname is Required');
          done();
        });
    });

    it('expect to return 400 if the firstname field is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidFirstname)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.firstname).to.equal('Firstname can only contain letters');
          done();
        });
    });

    it('expect to return 400 if the length of the firstname field is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidFirstnameLen)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.firstname).to.equal('Firstname should be more than two characters');
          done();
        });
    });

    it('expect to return 400 if the email field is missing for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.noEmail)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.email).to.equal('Email is Required');
          done();
        });
    });

    it('expect to return 400 if the email is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidEmail)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.email).to.equal('Invalid email, Enter a valid email, like so: you@mail.com');
          done();
        });
    });

    it('expect to return 400 if the username field is missing for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.noUsername)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username is Required');
          done();
        });
    });

    it('expect to return 400 if the length of the username field is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidUsernameLen)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username should be more than two characters');
          done();
        });
    });

    it('expect to return 400 if the password field is missing for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.noPassword)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password is Required');
          done();
        });
    });

    it('expect to return 400 if the length of the password field is invalid for sign up', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidPasswordLen)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password should not be less than 8 characers');
          done();
        });
    });

    it('expect to return 400 if confirm password field is missing', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.invalidSignupData.invalidpasswordConfirm)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Passwords must match');
          done();
        });
    });

    it('expect user to be able to login with valid data', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.validUser.login)
        .end((err, res) => {
          const { message, token } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('User logged in');
          expect(token).to.have.length.above(0);
          done();
        });
    });

    it('should not login if the username field is missing', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.invalidLoginData.noUsername)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username is Required');
          done();
        });
    });

    it('should not login if the password field is missing', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.invalidLoginData.noPassword)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password is Required');
          done();
        });
    });
  });
});
