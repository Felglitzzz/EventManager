module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('events', [
      {
        name: 'The Nigeria Education Fair',
        image: 'https://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        startDate: new Date('2019-03-25'),
        endDate: new Date('2019-03-27'),
        status: 'pending',
        userId: 1,
        centerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Legacy Awards',
        image: 'https://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg',
        startDate: new Date('2018-11-25'),
        endDate: new Date('2018-11-27'),
        status: 'accepted',
        userId: 1,
        centerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Legacy',
        image: 'https://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg',
        startDate: new Date('2018-11-25'),
        endDate: new Date('2018-11-27'),
        status: 'cancelled',
        userId: 1,
        centerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { individualHooks: true }),

  down: queryInterface => queryInterface.bulkDelete('events', null, {})
};
