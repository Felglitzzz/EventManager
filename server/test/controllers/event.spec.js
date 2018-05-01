import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import app from '../../index';
import db from '../../models';
import eventMockData from '../helpers/eventMockData';
import tokenData from '../helpers/tokenData';

chai.use(chaiHttp);
const request = chai.request(app);

const userToken = tokenData.userToken();
let eventId;

describe('EVENT API TEST', () => {
  // teardown and setup database
  before((done) => {
    db.event.sync({ force: true }).then(() => done());
  });

  describe('Event API', () => {
    it('expect to return 400 if date is past', (done) => {
      request
        .post('/api/v1/events')
        .send(eventMockData.pastDate)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(400);
          expect(message).to.equal('Date is past, Please choose a future date!');
          done();
        });
    });

    it('should create event and return the created event', (done) => {
      request
        .post('/api/v1/events')
        .send(eventMockData.valid)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          eventId = res.body.event.id;
          expect(res).to.have.status(201);
          expect(message).to.equal('Event Created!');
          done();
        });
    });

    it('should return 409 if event date is taken', (done) => {
      request
        .post('/api/v1/events')
        .send(eventMockData.sameDate)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          console.log('ero', err);
          const { message } = res.body;
          expect(res).to.have.status(409);
          expect(message).to.equal(`This center has already being booked from ${moment(eventMockData.valid.startDate).format('LL')} to ${moment(eventMockData.valid.endDate).format('LL')}, kindly book another date`);
          done();
        });
    });

    it('should return an array of events', (done) => {
      request
        .get('/api/v1/events')
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Events Found!');
          done();
        });
    });

    it('should return one event', (done) => {
      request
        .get(`/api/v1/events/${eventId}`)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Event Found!');
          expect(event).to.equal(event);
          done();
        });
    });

    it('should return 404 if eventId provided is not in the database for getting one event', (done) => {
      const invalidEventId = 9999999;
      request
        .get(`/api/v1/events/${invalidEventId}`)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Event Not Found!');
          done();
        });
    });

    it('should return 404 if eventId provided is not in the database for edit event api', (done) => {
      const invalidEventId = 9999999;
      request
        .put(`/api/v1/events/${invalidEventId}`)
        .send(eventMockData.editData)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Event Not Found!');
          done();
        });
    });

    it('should edit event and return edited event', (done) => {
      request
        .put(`/api/v1/events/${eventId}`)
        .send(eventMockData.editData)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message, event } = res.body;
          expect(res).to.have.status(200);
          expect(message).to.equal('Event Update Successful');
          expect(event).to.equal(event);
          done();
        });
    });

    it('should return 404 if eventId provided is not in the database for delete event api', (done) => {
      const invalidEventId = 9999;
      request
        .delete(`/api/v1/events/${invalidEventId}`)
        .set('Authorization', userToken)
        .set('Accept', 'Application/json')
        .end((err, res) => {
          const { message } = res.body;
          expect(res).to.have.status(404);
          expect(message).to.equal('Event Not Found!');
          done();
        });
    });

    it('should delete event and return 200', (done) => {
      request
        .delete(`/api/v1/events/${eventId}`)
        .set('Authorization', userToken)
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
