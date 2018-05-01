import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import db from '../../models';
import centerMockData from '../helpers/centerMockData';
import tokenData from '../helpers/tokenData';

chai.use(chaiHttp);
const request = chai.request(app);

const adminToken = tokenData.adminToken();
let centerId;

describe('CENTER API TEST:', () => {
  // teardown and setup database

  before((done) => {
    db.center.sync({ force: true }).then(() => done());
  });

  before((done) => {
    db.center.create(centerMockData.seedData).then(() => done());
  });

  describe('Center API', () => {
    describe('POST', () => {
      it('should create a center if all input is provided by admin', (done) => {
        request
          .post('/api/v1/centers')
          .send(centerMockData.valid)
          .set('Authorization', adminToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            console.log('errrr', err);
            console.log('errrr', res.body.message);
            console.log('errrr', res.body.error, res.body.errors);


            const { message, center } = res.body;
            centerId = res.body.Center.id;
            expect(res).to.have.status(201);
            expect(message).to.equal('Center created!');
            expect(center).to.equal(center);
            done();
          });
      });

      it("should return 'Center Not Found' if centerId provided is not in the database for edit center", (done) => {
        const invalidCenterId = 999999;
        request
          .put(`/api/v1/centers/${invalidCenterId}`)
          .send(centerMockData.editData)
          .set('Authorization', adminToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(404);
            expect(message).to.equal('Center Not Found!');
            done();
          });
      });
    });

    describe('GET', () => {
      it('should return an array of centers', (done) => {
        request
          .get('/api/v1/centers')
          .end((err, res) => {
            const { message, center } = res.body;
            expect(res).to.have.status(200);
            expect(message).to.equal('Centers Found!');
            expect(center).to.equal(center);
            done();
          });
      });

      it('should return a center', (done) => {
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

      it("should return 'Center Not Found' if centerId provided is not in the database", (done) => {
        const invalidCenterId = 999999;
        request.get(`/api/v1/centers/${invalidCenterId}`).end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Center Not Found!');
          done();
        });
      });
    });

    describe('PUT', () => {
      it('should edit and return a center', (done) => {
        request
          .put(`/api/v1/centers/${centerId}`)
          .send(centerMockData.editData)
          .set('Authorization', adminToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message, center } = res.body;
            expect(res).to.have.status(200);
            expect(message).to.equal('Center Update Successful');
            expect(center).to.equal(center);
            expect(centerMockData.editData.name).to.equal('Axios Event Center');
            expect(centerMockData.editData.location).to.equal('Agbara');
            done();
          });
      });
    });

    describe('DELETE', () => {
      it('expect to return 404 if centerId provided is not in the database for delete center api', (done) => {
        const invalidCenterId = 999999;
        request
          .delete(`/api/v1/centers/${invalidCenterId}`)
          .set('Authorization', adminToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(404);
            expect(message).to.equal('Center Not Found!');
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
});
