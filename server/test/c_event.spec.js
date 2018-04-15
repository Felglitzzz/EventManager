
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import db from '../models';
import eventMockData from './helpers/eventMockData';

chai.use(chaiHttp);
const request = chai.request(app);

let token;
let eventId;

describe('EVENT API TEST', () => {
  // teardown and setup database
  before((done) => {
    db.event.sync({ force: true })
      .then(() => done());
  });

  describe('Testing event endpoints', () => {
    it('expect to return 200 if login input data is valid', (done) => {
      request
        .post('/api/v1/users/login')
        .send(eventMockData.validlogin)
        .end((err, res) => {
          token = res.body.token;
          expect(res).to.have.status(200);
          expect(token).to.have.length.above(0);
          expect(res.body.message).to.equal('User logged in');
          done();
        });
    });

    it('expect to return 400 if the event name is missing', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.invalid.noName)
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
        .send(eventMockData.invalid.noImage)
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
        .send(eventMockData.invalid.noDate)
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
        .send(eventMockData.invalid.noTime)
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
        .send(eventMockData.invalid.noDesc)
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
        .send(eventMockData.invalid.noCenterId)
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
        .send(eventMockData.valid)
        .end((err, res) => {
          const { error } = res.body;
          expect(res).to.have.status(401);
          expect(error).to.equal('You do not have permission to access this page');
          done();
        });
    });

    it('expect to return 400 if date is past', (done) => {
      request
        .post('/api/v1/events')
        .send(eventMockData.invalid.pastDate)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(400);
          expect(message).to.equal('Date is past, Please choose a future date!');
          done();
        });
    });

    it('expect to create event and return 201 if input data is valid and token is provided', (done) => {
      request
        .post('/api/v1/events')
        .send(eventMockData.valid)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          eventId = res.body.event.id;
          expect(res).to.have.status(201);
          expect(message).to.equal('Event Created!');
          done();
        });
    });

    it('expect to return 409 if date is taken', (done) => {
      request
        .post('/api/v1/events')
        .send(eventMockData.valid)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(409);
          expect(message).to.equal(`center has already being booked for ${eventMockData.valid.date}, kindly book another date`);
          done();
        });
    });


    it('expect to get all events and return 200 for authenticated user', (done) => {
      request
        .get('/api/v1/events')
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Events Found!');
          done();
        });
    });

    it('expect to get one event and return 200 for authenticated user', (done) => {
      request
        .get(`/api/v1/events/${eventId}`)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Event Found!');
          expect(event).to.equal(event);
          done();
        });
    });

    it('expect return 400 if eventId provided is not in the database for getting one event', (done) => {
      const invalidEventId = 9999999;
      request
        .get(`/api/v1/events/${invalidEventId}`)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Event Not Found!');
          expect(event).to.be.undefined;
          done();
        });
    });

    it('expect return 401 if user token is invalid', (done) => {
      const invalidtoken = 'eyJhbGciOiJddIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyYW5kb21Vc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyMzghdhcyODA5NywiZXhwIjoxNTIzODE0NDk3fQ.H9CJo_lXs_sR-tgZOFlMsm5zW0hduAD5zoX1GgxRhybQh4';
      request
        .post('/api/v1/events')
        .send(eventMockData.valid)
        .set('Authorization', invalidtoken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(401);
          expect(message).to.equal('Invalid Token/Unauthorised!');
          expect(event).to.be.undefined;
          done();
        });
    });

    it('expect return 404 if eventId provided is not in the database for edit event api', (done) => {
      const invalidEventId = 9999999;
      request
        .put(`/api/v1/events/${invalidEventId}`)
        .send(eventMockData.validEdit)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Event Not Found!');
          expect(event).to.be.undefined;
          done();
        });
    });

    it('expect to edit event and return 200 for authenticated user', (done) => {
      request
        .put(`/api/v1/events/${eventId}`)
        .send(eventMockData.valid)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Event Update Successful');
          expect(event).to.equal(event);
          done();
        });
    });

    it('expect return 404 if eventId provided is not in the database for delete event api', (done) => {
      const invalidEventId = 9999999;
      request
        .delete(`/api/v1/events/${invalidEventId}`)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Event Not Found!');
          expect(event).to.be.undefined;
          done();
        });
    });

    it('expect return 200 id delete event is successful', (done) => {
      request
        .delete(`/api/v1/events/${eventId}`)
        .set('Authorization', token)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Event Successfully Deleted!');
          expect(eventId).to.equal(eventId);
          done();
        });
    });
  });
});
