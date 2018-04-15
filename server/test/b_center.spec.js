import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import centerMockData from './helpers/centerMockData';

chai.use(chaiHttp);
const request = chai.request(app);

const invalidToken = 'eyJhbGciOiJIUzI1NtttiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWtttF0IjoxNTIzNTkwNDcxLCJleHAiOjE1MjM2NzY4NzF9.cBwY15Dttjb_PjF370vWOaN4-zZlG5zUPmZBIuhIn_QcY';
let adminToken;
let userToken;
let centerId;

describe('CENTER API TEST', () => {
  // teardown and setup database
  before((done) => {
    db.center.sync({ force: true })
      .then(() => done());
  });

  before((done) => {
    db.center.create(centerMockData.validseed)
      .then(() => done());
  });

  describe('Testing center endpoints', () => {
    it('expect to return 200 if user login data is valid', (done) => {
      request
        .post('/api/v1/users/login')
        .send(centerMockData.userlogin)
        .end((err, res) => {
          const { message } = res.body;
          userToken = res.body.token;
          expect(res).to.have.status(200);
          expect(userToken).to.have.length.above(0);
          expect(message).to.equal('User logged in');
          done();
        });
    });

    it('expect to return 200 if admin login data is valid', (done) => {
      request
        .post('/api/v1/users/login')
        .send(centerMockData.adminlogin)
        .end((err, res) => {
          const { message } = res.body;
          adminToken = res.body.token;
          expect(res).to.have.status(200);
          expect(adminToken).to.have.length.above(0);
          expect(message).to.equal('User logged in');
          done();
        });
    });

    it('expect to return 403 with user token for create center endpoint', (done) => {
      request
        .post('/api/v1/centers')
        .send(centerMockData.valid)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, center } = res.body;
          expect(res).to.have.status(403);
          expect(message).to.equal('You do not have the permission to access this page!');
          expect(center).to.be.undefined;
          done();
        });
    });

    it('expect to create center and return 201 with admin token', (done) => {
      request
        .post('/api/v1/centers')
        .send(centerMockData.valid)
        .set('Authorization', adminToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, center } = res.body;
          centerId = res.body.Center.id;
          expect(res).to.have.status(201);
          expect(message).to.equal('Center created!');
          expect(center).to.equal(center);
          done();
        });
    });

    it('expect to return 404 when center is not in the database', (done) => {
      const invalidCenterId = 999999;
      request
        .get(`/api/v1/centers/${invalidCenterId}`)
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Center Not Found!');
          done();
        });
    });

    it('expect to get all centers and return 200', (done) => {
      request
        .get('/api/v1/centers')
        .end((err, res) => {
          // console.log('errrr', err);
          // console.log('resError', res.body.error);
          // console.log('resErrors', res.body.errors);
          // console.log('resMessage', res.body.message);
          const { message, center } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Centers found!');
          expect(center).to.equal(center);
          done();
        });
    });

    it('expect to get one center and return 200', (done) => {
      request
        .get(`/api/v1/centers/${centerId}`)
        .end((err, res) => {
          const { message, center } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Center Found!');
          expect(center).to.equal(center);
          done();
        });
    });

    it('expect to return 403 if user is not admin for edit center api', (done) => {
      request
        .put(`/api/v1/centers/${centerId}`)
        .send(centerMockData.validEdit)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(403);
          expect(message).to.equal('You do not have the permission to access this page!');
          done();
        });
    });

    it('expect to return 404 if center provided is not in the database for edit center api', (done) => {
      const invalidCenterId = 999999;
      request
        .put(`/api/v1/centers/${invalidCenterId}`)
        .send(centerMockData.validEdit)
        .set('Authorization', adminToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, center } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Center Not Found!');
          expect(center).to.be.undefined;
          done();
        });
    });

    it('expect to edit center and return 200 for authenticated admin', (done) => {
      request
        .put(`/api/v1/centers/${centerId}`)
        .send(centerMockData.validEdit)
        .set('Authorization', adminToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, center } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Center Update Successful');
          expect(center).to.equal(center);
          expect(centerMockData.validEdit.name).to.equal('Axios Event Center');
          expect(centerMockData.validEdit.location).to.equal('Agbara');
          done();
        });
    });

    it('expect to return 403 if user is not admin for delete center api', (done) => {
      request
        .delete(`/api/v1/centers/${centerId}`)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(403);
          expect(message).to.equal('You do not have the permission to access this page!');
          done();
        });
    });

    it('expect to return 403 if admintoken is not provided for delete center api', (done) => {
      request
        .delete(`/api/v1/centers/${centerId}`)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(403);
          expect(message).to.equal('You do not have the permission to access this page!');
          done();
        });
    });

    it('expect to return 403 if invalid token is given for delete center api', (done) => {
      request
        .delete(`/api/v1/centers/${centerId}`)
        .set('Authorization', invalidToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(401);
          expect(message).to.equal('Invalid Token/Unauthorised!');
          done();
        });
    });

    it('expect to return 404 if centerId provided is not in the database for delete center api', (done) => {
      const invalidCenterId = 999999;
      request
        .delete(`/api/v1/centers/${invalidCenterId}`)
        .set('Authorization', adminToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, center } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Center Not Found!');
          expect(center).to.be.undefined;
          done();
        });
    });

    it('expect return 200 id delete event is successful', (done) => {
      request
        .delete(`/api/v1/centers/${centerId}`)
        .set('Authorization', adminToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Center Successfully Deleted!');
          done();
        });
    });
  });
});

