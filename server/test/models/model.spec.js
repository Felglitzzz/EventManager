import { expect } from 'chai';
import db from '../../models';
import userMockData from '../helpers/userMockData';
import centerMockData from '../helpers/centerMockData';
import eventMockData from '../helpers/eventMockData';

describe('MODEL TEST:', () => {
  describe('User Model', () => {
    it('should create a new user', (done) => {
      db.user.create(userMockData.seed)
        .then((User) => {
          expect(User).to.have.property('id');
          expect(User).to.have.property('surname');
          expect(User).to.have.property('firstname');
          expect(User).to.have.property('username');
          expect(User).to.have.property('email');
          expect(User).to.have.property('password');
          expect(User.surname).to.equal(userMockData.seed.surname);
          expect(User.firstname).to.equal(userMockData.seed.firstname);
          expect(User.email).to.equal(userMockData.seed.email);
          expect(User.username).to.equal(userMockData.seed.username);
          done();
        });
    });
  });

  describe('Center Model', () => {
    it('should create a new center', (done) => {
      db.center.create(centerMockData.seed)
        .then((Center) => {
          expect(Center).to.have.property('name');
          expect(Center).to.have.property('image');
          expect(Center).to.have.property('description');
          expect(Center).to.have.property('type');
          expect(Center).to.have.property('capacity');
          expect(Center).to.have.property('type');
          expect(Center).to.have.property('price');
          expect(Center).to.have.property('location');
          expect(Center.name).to.equal(centerMockData.seed.name);
          expect(Center.image).to.equal(centerMockData.seed.image);
          expect(Center.type).to.equal(centerMockData.seed.type);
          expect(Center.location).to.equal(centerMockData.seed.location);
          expect(Center.capacity).to.equal(centerMockData.seed.capacity);
          expect(Center.price).to.equal(centerMockData.seed.price);
          expect(Center.description).to.equal(centerMockData.seed.description);
          done();
        });
    });
  });

  describe('Event Model', () => {
    it('should create a new event', (done) => {
      db.event.create(eventMockData.seed)
        .then((Event) => {
          expect(Event).to.have.property('name');
          expect(Event).to.have.property('image');
          expect(Event).to.have.property('status');
          expect(Event).to.have.property('startDate');
          expect(Event).to.have.property('endDate');
          expect(Event).to.have.property('userId');
          expect(Event).to.have.property('centerId');
          expect(Event.name).to.equal(eventMockData.seed.name);
          expect(Event.image).to.equal(eventMockData.seed.image);
          expect(Event.userId).to.equal(eventMockData.seed.userId);
          expect(Event.centerId).to.equal(eventMockData.seed.centerId);
          expect(Event.status).to.equal(eventMockData.seed.status);
          done();
        });
    });
  });

  after((done) => {
    db.event.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }).then(() => done());

    db.center.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }).then(() => done());
  });
});

