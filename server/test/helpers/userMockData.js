import faker from 'faker';
import bcrypt from 'bcryptjs';

const password = 'pass123';

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
      password
    }
  },
  validUser: {
    signup: {
      surname: faker.name.lastName(0),
      firstname: faker.name.firstName(0),
      email: faker.internet.email(),
      username: 'randomUser',
      password: bcrypt.hashSync(password, 10)
    },
    login: {
      username: 'randomUser',
      password
    }
  },
  invalidUser: {
    signup: {
      surname: '',
      firstname: faker.name.firstName(0),
      email: '',
      username: '',
      password: bcrypt.hashSync(password, 10),
    },
    login: {
      username: '',
      password: ''
    }
  }
};

export default mockData;
