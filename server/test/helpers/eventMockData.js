const eventMockData = {
  valid: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  editData: {
    name: 'The Nigeria Education Exhibition',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-06-25'),
    endDate: new Date('2019-06-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  sameDate: {
    name: 'The Nigeria Education Exhibition',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  noName: {
    name: '',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  noImage: {
    name: 'The Nigeria Education Fair',
    image: '',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  noStartDate: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },

  noEndDate: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: '',
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  pastDate: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2018-03-25'),
    endDate: new Date('2018-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  noTime: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: 1
  },
  noDesc: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: '',
    centerId: 1
  },
  noCenterId: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    startDate: new Date('2019-03-25'),
    endDate: new Date('2019-03-27'),
    description: 'The largest gathering of premier schools',
    centerId: ''
  }
};

export default eventMockData;
