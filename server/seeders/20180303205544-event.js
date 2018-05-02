module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('events', [
      {
        name: 'The Nigeria Education Fair',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        startDate: new Date('2019-03-25'),
        endDate: new Date('2019-03-27'),
        description: 'The largest gathering of premier schools',
        userId: 5,
        centerId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Legacy Awards',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg',
        startDate: new Date('2018-11-25'),
        endDate: new Date('2018-11-27'),
        description: 'Celebration of teachers who indeed left legacies',
        userId: 6,
        centerId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { individualHooks: true }),

  down: queryInterface => queryInterface.bulkDelete('events', null, {})
};
