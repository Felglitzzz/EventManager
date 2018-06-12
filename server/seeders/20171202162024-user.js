const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        surname: 'user',
        firstname: 'user',
        email: 'amandeolaoluwa@gmail.com',
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
        surname: 'Balogun',
        firstname: 'Delight',
        email: 'delight. balogun@andela.com',
        username: 'abbey',
        password: bcrypt.hashSync('password', 10),
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
