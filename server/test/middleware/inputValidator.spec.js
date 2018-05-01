import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import userMockData from '../helpers/userMockData';
import eventMockData from '../helpers/eventMockData';
import tokenData from '../helpers/tokenData';

chai.use(chaiHttp);
const request = chai.request(app);
const userToken = tokenData.userToken();

describe('MIDDLEWARE VALIDATION TEST:', () => {
  describe('User', () => {
    it('should not be able to create account if surname field is not provided', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.noSurname)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.surname).to.equal('Surname is Required');
          done();
        });
    });

    it('should not be able to create account if surname field contains number', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.surnameWithNumber)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.surname).to.equal('Surname can only contain letters');
          done();
        });
    });

    it('should not be able to create account if the length of the surname field is one or below one', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.incorrectSurnameLength)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.surname).to.equal('Surname should be more than one character');
          done();
        });
    });

    it('should not be able to create account if firstname field is not provided', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.noFirstname)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.firstname).to.equal('Firstname is Required');
          done();
        });
    });

    it('should not be able to create account if firstname field contains number', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.firstnameWithNumber)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.firstname).to.equal('Firstname can only contain letters');
          done();
        });
    });

    it('should not be able to create account if the length of the firstname field is one or below one', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.incorrectFirstnameLength)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.firstname).to.equal('Firstname should be more than one character');
          done();
        });
    });

    it('should not be able to create account if email is not provided', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.noEmail)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.email).to.equal('Email is Required');
          done();
        });
    });

    it('should not be able to create account if email field is not valid', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.invalidEmail)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.email).to.equal('Invalid email, Enter a valid email, like so: you@mail.com');
          done();
        });
    });

    it('should not be able to create account if username is not provided', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.noUsername)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username is Required');
          done();
        });
    });

    it('should not be able to create account if the length of the username field is one or below one', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.incorrectUsernameLength)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username should be more than one character');
          done();
        });
    });

    it('should not be able to create account if password is not provided', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.noPassword)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password is Required');
          done();
        });
    });

    it('should not be able to create account if the length of the password field is seven or below seven', (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.incorrectPasswordLength)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password should not be less than 8 characers');
          done();
        });
    });

    it("should not be able to create account if 'password' and 'passwordConfirm' does not match", (done) => {
      request
        .post('/api/v1/users')
        .send(userMockData.user.signup.incorrectpasswordConfirm)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Passwords must match');
          done();
        });
    });

    it('should not be able to sign in if username is not provided', (done) => {
      request
        .post('/api/v1/users/login')
        .send(userMockData.user.login.noUsername)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.username).to.equal('Username is Required');
          done();
        });
    });

    it('should not be able to sign in if password is not provided', (done) => {
      request
        .post('/api/v1/users/login')
        .send(userMockData.user.login.noPassword)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.password).to.equal('Password is Required');
          done();
        });
    });
    it('should not be able to login if username is incorrect', (done) => {
      request
        .post('/api/v1/users/login')
        .send(userMockData.user.login.incorrectUsername)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { error } = res.body;
          expect(res).to.have.status(401);
          expect(error).to.equal('Username/Password Incorrect');
          done();
        });
    });

    it('should not be able to login if password is incorrect', (done) => {
      request
        .post('/api/v1/users/login')
        .send(userMockData.user.login.incorrectPassword)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { error } = res.body;
          expect(res).to.have.status(401);
          expect(error).to.equal('Username/Password Incorrect');
          done();
        });
    });
  });

  describe('Event', () => {
    it('should not create event if event name is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.noName)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.name).to.equal('Name is Required');
          done();
        });
    });

    it('should not create event if event image is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.noImage)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.image).to.equal('Image is Required');
          done();
        });
    });

    it('should not create event if event start date is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.noStartDate)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.startDate).to.equal('Start Date is Required');
          done();
        });
    });

    it('should not create event if event end date is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.noEndDate)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.endDate).to.equal('End Date is Required');
          done();
        });
    });

    it('should not create event if event description is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.noDesc)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.description).to.equal('Description is Required');
          done();
        });
    });

    it('should not create event if event centerId is not provided', (done) => {
      request
        .post('/api/v1/events/')
        .send(eventMockData.noCenterId)
        .set('Authorization', userToken)
        .end((err, res) => {
          const { errors } = res.body;
          expect(res).to.have.status(400);
          expect(errors.centerId).to.equal('Location is Required');
          done();
        });
    });
  });
});
