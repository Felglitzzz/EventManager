const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      surname: 'admin',
      firstname: 'admin',
      email: 'admin@eventmanager.com',
      username: 'admin',
      password: bcrypt.hashSync('password', 10),
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { individualHooks: true });
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
