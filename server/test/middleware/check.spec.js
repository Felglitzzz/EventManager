import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import tokenData from '../helpers/tokenData';

chai.use(chaiHttp);
const request = chai.request(app);

const userToken = tokenData.userToken();

describe('MIDDLEWARE TEST', () => {
  describe('Check Middleware for', () => {
    describe('POST Event Endpoint', () => {
      it('should return 400 if endDate is before startDate', (done) => {
        request
          .post('/api/v1/events')
          .send({
            name: 'The Legacy Awards',
            image: 'https://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg',
            startDate: new Date('2018-11-29'),
            endDate: new Date('2018-11-27'),
            userId: 2,
            centerId: 1,
            status: 'pending',
          })
          .set('Authorization', userToken)
          .set('Accept', 'Application/json')
          .end((err, res) => {
            const { message } = res.body;
            expect(res).to.have.status(400);
            expect(message).to.equal('End date should come after start date');
          });
        done();
      });
    });
  });
});
