'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var password = 'pass1234';

var mockData = {
  admin: {
    signup: {
      surname: _faker2.default.name.lastName(0),
      firstname: _faker2.default.name.firstName(0),
      email: _faker2.default.internet.email(),
      username: 'admin',
      password: 'password',
      isAdmin: true
    },
    validLogin: {
      username: 'admin',
      password: 'password'
    },
    inValidLogin: {
      noUsername: {
        username: '',
        password: password
      },
      noPassword: {
        username: 'admin',
        password: ''
      },
      invalidUsername: {
        username: 'admn',
        password: password
      },
      invalidPassword: {
        username: 'admin',
        password: 'pasword'
      }
    }
  },
  validUser: {
    signup: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    login: {
      username: 'randomUser',
      password: 'password'
    }
  },

  invalidLoginData: {
    noUsername: {
      username: '',
      password: 'password'
    },

    noPassword: {
      username: 'randomUser',
      password: ''
    }
  },

  invalidSignupData: {
    noSurname: {
      surname: '',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    invalidSurname: {
      surname: 'Random5',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    invalidSurnameLen: {
      surname: 'Ra',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    noFirstname: {
      surname: 'Random',
      firstname: '',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    invalidFirstname: {
      surname: 'Random',
      firstname: 'User5',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    invalidFirstnameLen: {
      surname: 'Random',
      firstname: 'Us',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    noUsername: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: '',
      password: 'password',
      passwordConfirm: 'password'
    },
    invalidUsernameLen: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'ra',
      password: 'password',
      passwordConfirm: 'password'
    },
    noEmail: {
      surname: 'Random',
      firstname: 'User',
      email: '',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    invalidEmail: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    noPassword: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: '',
      passwordConfirm: 'password'
    },
    invalidPasswordLen: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'passwo',
      passwordConfirm: 'passwo'
    },
    invalidpasswordConfirm: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'passwodd'
    },
    noPasswordConfirm: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: ''
    },
    usernameExist: {
      surname: 'Random',
      firstname: 'User',
      email: 'rand@gmail.com',
      username: 'randomUser',
      password: 'password',
      passwordConfirm: 'password'
    },
    emailExist: {
      surname: 'Random',
      firstname: 'User',
      email: 'randomuser@gmail.com',
      username: 'randomey',
      password: 'password',
      passwordConfirm: 'password'
    }
  }
};

exports.default = mockData;
//# sourceMappingURL=userMockData.js.map