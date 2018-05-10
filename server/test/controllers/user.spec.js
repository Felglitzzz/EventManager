import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import db from '../../models';
import userMockData from '../helpers/userMockData';

chai.use(chaiHttp);
const request = chai.request(app);

describe('USER API TEST:', () => {
  // teardown and setup database

  before((done) => {
    db.user.sync({ force: true }).then(() => done());
  });

  before((done) => {
    db.user.create(userMockData.admin.signup.valid).then(() => done());
  });

  describe('User', () => {
    it('should be able to create account with valid input data', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.valid)
        .end((err, res) => {
          const { message, token } = res.body;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(message).to.equal('User created');
          expect(token).to.have.length.above(0);
          done();
        });
    });

    it('should be able to login with valid data', (done) => {
      request
        .post('/api/v1/users/login')
        .send(userMockData.user.login.valid)
        .end((err, res) => {
          const { message, token } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('User logged in');
          expect(token).to.have.length.above(0);
          done();
        });
    });

    it('should not be able to create a new account with an already existing email', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.emailExist)
        .end((err, res) => {
          const { message } = res.body;
          expect(res.status).to.equal(409);
          expect(message).to.equal('A user with this email exists');
          done();
        });
    });

    it('should not be able to register a new user with an already existing username', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.usernameExist)
        .end((err, res) => {
          const { message } = res.body;
          expect(res.status).to.equal(409);
          expect(message).to.equal('Username taken, Please use another');
          done();
        });
    });
  });
});
