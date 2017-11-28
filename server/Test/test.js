import chaiHttp from 'chai-http';
import chai from 'chai';
import server from '../../index';


const expect = chai.expect;

chai.use(chaiHttp);

describe('', () => {
  it('it should GET all Centers', (done) => {
    chai.request(server)
      .get('/api/v1/centers')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('', () => {
  it('it should not create center', (done) => {
    chai.request(server)
      .post('/api/v1/centers')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.message).to.equal('Please fill in the required field');
        done();
      });
  });
});

describe('Events', () => {
  it('it should not create event', (done) => {
    chai.request(server)
      .post('/api/v1/events')
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.message).to.equal('Please fill in the required field');
        done();
      });
  });
});

// describe('', () => {
//   it('it should create events', (done) => {
//     chai.request(server)
//       .post('/api/v1/events')
//       .send({
//         event_title: 'NodeJs Interactive Seminar',
//         event_location: 'Maitama, Abuja',
//         event_date: '28-12-17',
//         event_organizers: 'Amande Group of Companies',
//         event_center: 'Felglitz Hall',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });
// });

describe('Event', () => {
  it('it should update event', (done) => {
    chai.request(server)
      .put('/api/v1/events/1')
      .send({
        event_title: 'NodeJs Interactive Seminar',
        event_location: 'Maitama, Abuja',
        event_date: '28-12-17',
        event_organizers: 'Amande Group of Companies',
        event_center: 'Felglitz Hall',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Event updated!');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
describe('Event', () => {
  it('it should delete event', (done) => {
    chai.request(server)
      .delete('/api/v1/events/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
