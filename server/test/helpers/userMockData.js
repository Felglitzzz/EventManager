const userMockData = {
  admin: {
    signup: {
      valid: {
        surname: 'amande',
        firstname: 'felix',
        email: 'felix.amande@andela.com',
        username: 'admin',
        password: 'password',
        isAdmin: true
      }
    },
    login: {
      valid: {
        username: 'admin',
        password: 'password'
      },
      noUsername: {
        username: '',
        password: 'password'
      },
      noPassword: {
        username: 'admin',
        password: ''
      }
    }
  },

  user: {
    login: {
      valid: {
        username: 'randomUser',
        password: 'password'
      },
      noUsername: {
        username: '',
        password: 'password'
      },
      noPassword: {
        username: 'randomUser',
        password: ''
      },
      incorrectUsername: {
        username: 'use',
        password: 'password'
      },
      incorrectPassword: {
        username: 'admin',
        password: 'pasword'
      }
    },
    signup: {
      valid: {
        surname: 'Random',
        firstname: 'User',
        email: 'randomuser@gmail.com',
        username: 'randomUser',
        password: 'password',
        passwordConfirm: 'password'
      },
      noSurname: {
        surname: '',
        firstname: 'User',
        email: 'randomuser@gmail.com',
        username: 'randomUser',
        password: 'password',
        passwordConfirm: 'password'
      },
      surnameWithNumber: {
        surname: 'Random5',
        firstname: 'User',
        email: 'randomuser@gmail.com',
        username: 'randomUser',
        password: 'password',
        passwordConfirm: 'password'
      },
      incorrectSurnameLength: {
        surname: 'R',
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
      firstnameWithNumber: {
        surname: 'Random',
        firstname: 'User5',
        email: 'randomuser@gmail.com',
        username: 'randomUser',
        password: 'password',
        passwordConfirm: 'password'
      },
      incorrectFirstnameLength: {
        surname: 'Random',
        firstname: 'U',
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
      incorrectUsernameLength: {
        surname: 'Random',
        firstname: 'User',
        email: 'randomuser@gmail.com',
        username: 'r',
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
      incorrectPasswordLength: {
        surname: 'Random',
        firstname: 'User',
        email: 'randomuser@gmail.com',
        username: 'randomUser',
        password: 'passwo',
        passwordConfirm: 'passwo'
      },
      incorrectpasswordConfirm: {
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
  }
};

export default userMockData;
