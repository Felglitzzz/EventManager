import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import mockData from './helpers/eventMockData';

chai.use(chaiHttp);
const request = chai.request(app);
console.log(process.env.NODE_ENV, 'environment');

// let token;

describe('EVENT API TEST', () => {
  //teardown and setup database
  before((done) => {
    db.event.sync({ force: true })
      .then(() => done());
  });

  // before((done) => {
  //   db.event.create(mockData.valid)
  //     .then(() => done());
  // });

  // console.log('tokennnnn', token);

  describe('Testing events endpoint', () => {
    let token;
    it('expect to return 200 if imput data is valid', (done) => {
      request
        .post('/api/v1/users/login')
        .send({
          username: 'randomUser',
          password: 'password',
        })
        .end((err, res) => {
          token = res.body.token;
          // console.log('tokkkkkkk', token);
          // console.log('tokennnnnyyyyyy', res.body);
          expect(res).to.have.status(200);
          expect(token).to.have.length.above(0);
          expect(res.body.message).to.equal('User logged in');
          done();
        });
    });

    it('expect to return 400 if the event name is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.invalid.noName)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.name).to.equal('Name is Required');
          done();
        });
    });

    it('expect to return 400 if the event image is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.invalid.noImage)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.image).to.equal('Image is Required');
          done();
        });
    });

    it('expect to return 400 if the event date is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.invalid.noDate)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.date).to.equal('Date is Required');
          done();
        });
    });

    it('expect to return 400 if the event time is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.invalid.noTime)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.time).to.equal('Time is Required');
          done();
        });
    });

    it('expect to return 400 if the event description is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.invalid.noDesc)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.description).to.equal('Description is Required');
          done();
        });
    });

    it('expect to return 400 if the location is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.invalid.noCenterId)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.centerId).to.equal('Location is Required');
          done();
        });
    });

    it('expect not to create event if input data is valid and token is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(mockData.valid)
        .end((err, res) => {
          console.log('errrrrr', err);
          console.log('messsss', res.body.message);
          console.log('middleware error', res.body.errors);
          console.log('server error', res.body.error);
          const { error } = res.body;
          expect(res).to.have.status(401);
          expect(error).to.equal('You do not have permission to access this page');
          done();
        });
    });
  });
});
