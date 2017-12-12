import faker from 'faker';
import bcrypt from 'bcrypt';

const password = 'pass1234';

const mockData = {
  admin: {
    signup: {
      surname: faker.name.lastName(0),
      firstname: faker.name.firstName(0),
      email: faker.internet.email(),
      username: 'admin',
      password: bcrypt.hashSync(password, 10),
      isAdmin: true
    },
    login: {
      username: 'admin',
      password,
    }
  },
  validUser: {
    signup: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password
    },
    login: {
      username: 'randomUser',
      password
    },
    invalidLogin: {
      username: 'randomUser',
      password: 'pasword'
    }
  },
  invalidUser: {
    signup: {
      surname: '',
      firstname: faker.name.firstName(0),
      email: '',
      username: '',
      password
    },
  }
};

export default mockData;
