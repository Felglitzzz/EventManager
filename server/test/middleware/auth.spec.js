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

describe('MIDDLEWARE TEST:', () => {
  describe('Auth Middleware for', () => {
    describe('POST Center Endpoint', () => {
      it('should return 403 when token for user that is not an admin is provided', (done) => {
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

    describe('PUT Center Endpoint', () => {
      it('should return 403 when token for user that is not an admin is provided', (done) => {
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

    describe('DELETE Center Endpoint', () => {
      it('should return 403 when token for user that is not an admin is provided', (done) => {
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

      it('should return 401 if no admin token is provided', (done) => {
        request
          .delete('/api/v1/centers/:centerId')
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(401);
            expect(message).to.equal('You do not have the permission to access this page!');
            done();
          });
      });

      it('should return 401 if invalid token is given', (done) => {
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

  describe('Auth Middleware for', () => {
    describe('POST Event Endpoint', () => {
      it('should return 401 when token for a user is not provided', (done) => {
        request
          .post('/api/v1/events')
          .send(eventMockData.valid)
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(401);
            expect(message).to.equal('You do not have permission to access this page');
            done();
          });
      });

      it('should return 401 if token for d user is invalid', (done) => {
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
  });
});
