
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('centers', [
      {
        name: 'Protea Hotel',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        description: 'The polished hotel is 9 km from the city centre, 4 km from Murtala Muhammed International Airport and 6 km from Ikeja City Mall, Featuring plush modern decor, the rooms come with free Wi-Fi, flat-screen TVs and minibars, as well as in-room safes, and tea and coffeemaking facilities, while suites add separate living rooms.Amenities include an outdoor pool, a fitness centre and massage treatments, as well as a sophisticated regional restaurant and a 24-hour cocktail bar.',
        type: 'Exquisite',
        location: 'Ikeja',
        facility: 'Swimming Pool',
        capacity: 1000,
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sheba Event center',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        description: 'Sheba Event Centre are perfect for events like weddings, birthday ,parties, trainings, conferences, exhibitions, product launches, meetings, and entertainment events.',
        type: 'Classic',
        location: 'Ikeja',
        facility: 'Parking Space',
        price: 10000,
        capacity: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true }),

  down: queryInterface => queryInterface.bulkDelete('centers', null, {})
};
