import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import centerMockData from '../helpers/centerMockData';
import eventMockData from '../helpers/eventMockData';
import tokenData from '../helpers/tokenData';

chai.use(chaiHttp);
const request = chai.request(app);

const userToken = tokenData.userToken();
const { invalidAdminToken, invalidUserToken } = tokenData;

describe('MIDDLEWARE AUTH TEST:', () => {
  describe('Auth Middleware For Center Endpoint', () => {
    describe('POST', () => {
      it('should return 403 when user token is provided for create center endpoint', (done) => {
        request
          .post('/api/v1/centers')
          .send(centerMockData.valid)
          .set('Authorization', userToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(403);
            expect(message).to.equal('You do not have the permission to access this page!');
            done();
          });
      });
    });

    describe('PUT', () => {
      it('should return 403 if user token is provided', (done) => {
        request
          .put('/api/v1/centers/:centerId')
          .send(centerMockData.editData)
          .set('Authorization', userToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(403);
            expect(message).to.equal('You do not have the permission to access this page!');
            done();
          });
      });
    });

    describe('DELETE', () => {
      it('should return 403 if user token is provided', (done) => {
        request
          .delete('/api/v1/centers/:centerId')
          .set('Authorization', userToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(403);
            expect(message).to.equal('You do not have the permission to access this page!');
            done();
          });
      });

      it('should return 403 if no admin token is provided', (done) => {
        request
          .delete('/api/v1/centers/:centerId')
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(403);
            expect(message).to.equal('You do not have the permission to access this page!');
            done();
          });
      });

      it('should return 403 if invalid token is given', (done) => {
        request
          .delete('/api/v1/centers/:centerId')
          .set('Authorization', invalidAdminToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(401);
            expect(message).to.equal('Invalid Token/Unauthorised!');
            done();
          });
      });
    });
  });

  describe('Auth Middleware for Event Endpoint', () => {
    describe('POST', () => {
      it('should return 401 if user token is not provided', (done) => {
        request
          .post('/api/v1/events')
          .send(eventMockData.valid)
          .end((err, res) => {
            const { error } = res.body;
            expect(res).to.have.status(401);
            expect(error).to.equal('You do not have permission to access this page');
            done();
          });
      });

      it('should return 401 if user token is ', (done) => {
        request
          .post('/api/v1/events')
          .send(eventMockData.valid)
          .set('Authorization', invalidUserToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(401);
            expect(message).to.equal('Invalid Token/Unauthorised!');
            done();
          });
      });
    });

    describe('GET', () => {});

    describe('PUT', () => {});

    describe('DELETE', () => {});
  });
});
