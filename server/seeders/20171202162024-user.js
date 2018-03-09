const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        surname: 'admin',
        firstname: 'admin',
        email: 'admin@eventmanager.com',
        username: 'admin',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        surname: 'user',
        firstname: 'user',
        email: 'user@eventmanager.com',
        username: 'user',
        password: bcrypt.hashSync('password', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        surname: 'amande',
        firstname: 'felix',
        email: 'amafelslick@yahoo.com',
        username: 'felglitz',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        surname: 'yup',
        firstname: 'yup',
        email: 'yup@yup.com',
        username: 'yup',
        password: bcrypt.hashSync('yupppppp', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { individualHooks: true });
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
