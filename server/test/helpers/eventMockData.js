const eventMockData = {
  valid: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    centerId: 1,
    status: 'accepted'
  },
  editData: {
    name: 'The Nigeria Education Exhibition',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-06-18'),
    endDate: new Date('2019-06-27'),
    centerId: 1,
    status: 'accepted'
  },
  seed: {
    name: 'The Legacy Awards',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg',
    startDate: new Date('2018-11-25'),
    endDate: new Date('2018-11-27'),
    userId: 2,
    centerId: 1,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  sameDate: {
    name: 'The Nigeria Education Exhibition',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    centerId: 1,
    status: 'pending'
  },
  noName: {
    name: '',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    centerId: 1,
    status: 'pending'
  },
  noImage: {
    name: 'The Nigeria Education Fair',
    image: '',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    centerId: 1,
    status: 'pending'
  },
  noStartDate: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    endDate: new Date('2019-03-27'),
    centerId: 1,
    status: 'pending'
  },

  noEndDate: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: '',
    centerId: 1,
    status: 'pending'
  },
  pastDate: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2018-03-25'),
    endDate: new Date('2018-03-27'),
    centerId: 1,
    status: 'pending'
  },
  noTime: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    centerId: 1,
    status: 'pending'
  },
  // noDesc: {
  //   name: 'The Nigeria Education Fair',
  //   image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
  //   startDate: new Date('2019-03-25'),
  //   endDate: new Date('2019-03-27'),
  //   centerId: 1
  // },
  noCenterId: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    centerId: '',
    status: 'pending'
  }
};

export default eventMockData;
