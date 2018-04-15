const eventMockData = {
  valid: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    date: '2027/10/27',
    time: '19:59',
    description: 'The largest gathering of premier schools',
    centerId: 1,
  },
  validEdit: {
    name: 'The Nigeria Education Exhibition',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    date: new Date('2027/10/27'),
    time: '19:59',
    description: 'The largest gathering of premier schools',
    centerId: 1,
  },
  validlogin: {
    username: 'randomUser',
    password: 'password'
  },
  invalid: {
    noName: {
      name: '',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      centerId: 1,
    },
    noImage: {
      name: 'The Nigeria Education Fair',
      image: '',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      centerId: 1,
    },
    noDate: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      centerId: 1,
    },
    pastDate: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: new Date(),
      time: '09:00',
      description: 'The largest gathering of premier schools',
      centerId: 1,
    },
    noTime: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '',
      description: 'The largest gathering of premier schools',
      centerId: 1,
    },
    noDesc: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: '',
      centerId: 1,
    },
    noCenterId: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      centerId: '',
    },
  }
};

export default eventMockData;
