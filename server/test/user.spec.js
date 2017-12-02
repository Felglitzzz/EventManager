import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import mockData from './helpers/userMockData';

chai.use(chaiHttp);
const request = chai.request(app);

describe('User Test', () => {
  // teardown and setup database
  before((done) => {
    db.user.sync({ force: true })
      .then(() => {
        done();
      });
  });

  before((done) => {
    db.user.create(mockData.admin.signup)
      .then(() => {
        done();
      });
  });

  describe('Admin test', () => {
    it('Expects admin user to be able to login', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.login)
        .end((err, res) => {
          const { message, token } = res.body;

          expect(res).to.have.status(200);
          expect(message).to.equal('User logged in');
          expect(token).to.have.length.above(0);

          done();
        });
    });
  });

  describe('User test', () => {
    xit('expect user to be able to signup with valid data', (done) => {
      request
        .post('/api/v1/users')
        .send(mockData.admin.login)
        .end((err, res) => {
          const { message, token } = res.body;

          expect(res).to.have.status(200);
          expect(message).to.equal('User logged in');
          expect(token).to.have.length.above(0);

          done();
        });
    });
    xit('expect user to be able to signup with valid data', (done) => {
      request
        .post('/api/v1/users/login')
        .send(mockData.admin.login)
        .end((err, res) => {
          const { message, token } = res.body;

          expect(res).to.have.status(200);
          expect(message).to.equal('User logged in');
          expect(token).to.have.length.above(0);

          done();
        });
    });
  });
});
