module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('events', [
      {
        name: 'The Nigeria Education Fair',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        date: new Date(),
        time: '09:00:00 AM',
        description: 'The largest gathering of premier schools',
        userId: 1,
        centerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Legacy Awards',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg',
        date: new Date(),
        time: '10:00:00 AM',
        description: 'Celebration of teachers who indeed left legacies',
        userId: 2,
        centerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { individualHooks: true }),

  down: queryInterface => queryInterface.bulkDelete('events', null, {})
};
