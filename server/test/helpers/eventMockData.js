const mockData = {
  userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyYW5kb21Vc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyMzI1Mzk3OSwiZXhwIjoxNTIzMzQwMzc5fQ.XlgwMq8Eneuczp7yy4ZTnLRMVdGaXBsKxBZypYLRKRc',
  valid: {
    name: 'The Nigeria Education Fair',
    image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
    date: '2018-8-10',
    time: '09:00:00 AM',
    description: 'The largest gathering of premier schools',
    userId: 1,
    centerId: 1,
  },
  invalid: {
    noName: {
      name: '',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      userId: 1,
      centerId: 1,
    },
    noImage: {
      name: 'The Nigeria Education Fair',
      image: '',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      userId: 1,
      centerId: 1,
    },
    noDate: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      userId: 1,
      centerId: 1,
    },
    noTime: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '',
      description: 'The largest gathering of premier schools',
      userId: 1,
      centerId: 1,
    },
    noDesc: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: '',
      userId: 1,
      centerId: 1,
    },
    noCenterId: {
      name: 'The Nigeria Education Fair',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      date: '2018-08-10',
      time: '09:00:00 AM',
      description: 'The largest gathering of premier schools',
      userId: 1,
      centerId: '',
    },
  }
};

export default mockData;
