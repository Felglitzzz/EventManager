const mockData = {
  users: {
    signupData: {
      surname: 'akinkuotu',
      firstname: 'muyiwa',
      email: 'muyiwa@gmail.com',
      username: 'nazzy',
      password: 'password',
    },

    signinData: {
      username: 'nazzy',
      password: 'password'
    },

    incorrectSigninData: {
      username: 'nazzy',
    },

    signupResponse: {
      message: 'User created',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoibmF6enkiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTI4MTEyMjEwLCJleHAiOjE1MjgxOTg2MTB9.K0gVO9VdJJwDlPDqMjdjFd4c8DGvRsnk2S_H3GYfTrY'
    },

    signupErrorResponse: {
      error: 'Username taken, Please use another'
    },

    signinErrorResponse: {
      error: 'Username/Password Incorrect'
    },

    signinResponse: {
      message: 'User logged in',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoibmF6enkiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTI4MTEyMjEwLCJleHAiOjE1MjgxOTg2MTB9.K0gVO9VdJJwDlPDqMjdjFd4c8DGvRsnk2S_H3GYfTrY'
    },

    userData: {
      type: 'User logged in',
      isAuthenticated: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJzZXJ2YWx5IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUyODI3MDg3MCwiZXhwIjoxNTI4MzU3MjcwfQ.wUypIfrg3apN6BEt9qf4tqQAbjDY808qMEEsuhMc8o4'
    }
  },

  events: {
    createEventData: {
      name: 'Dammy Event',
      centerId: 1,
      startDate: '2020-09-25',
      endDate: '2020-09-26',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
    },

    createEventResponse: {
      message: 'Event Created!',
      event: {
        status: 'pending',
        id: 18,
        name: 'Dammy Event',
        startDate: '2020-09-25T00:00:00.000Z',
        endDate: '2020-09-26T00:00:00.000Z',
        centerId: 1,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        userId: 1,
        updatedAt: '2018-06-04',
        createdAt: '2018-06-04'
      }
    },

    createEventErrorResponse: {
      error: 'You have already created an event with the name \'bjbh\''
    },

    updateEventData: {
      name: 'Dammy First Event',
      centerId: 1,
      startDate: '2020-09-25',
      endDate: '2020-09-26',
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg'
    },

    updateEventResponse: {
      message: 'Event Update Successful',
      modifiedEvent: {
        status: 'pending',
        id: 18,
        name: 'Dammy First Event',
        startDate: '2020-09-25T00:00:00.000Z',
        endDate: '2020-09-26T00:00:00.000Z',
        centerId: 1,
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        userId: 1,
        updatedAt: '2018-06-04',
        createdAt: '2018-06-04'
      }
    },

    eventsByCenterIdResponse: {
      message: 'Events Found!',
      eventseventsRetrieved: {
        count: 1,
        rows: [
          {
            id: 18,
            name: 'Dammy First Event',
            image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
            startDate: '2018-09-28T00:00:00.000Z',
            endDate: '2018-09-30T00:00:00.000Z',
            status: 'pending',
            userId: 3,
            centerId: 1,
            createdAt: '2018-05-21',
            updatedAt: '2018-05-21'
          },
        ],
      }
    },

    loadOneEventResponse: {
      message: 'Event Found!',
      event: {
        id: 29,
        name: 'ooooooop',
        image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
        startDate: '2018-05-24T00:00:00.000Z',
        endDate: '2018-05-26T00:00:00.000Z',
        status: 'cancelled',
        userId: 1,
        centerId: 6,
        createdAt: '2018-05-23',
        updatedAt: '2018-06-02',
        center: {
          id: 6,
          name: 'Bespoke',
          location: 'Lekki'
        }
      }
    },

    allEventsResponse: {
      events: {
        message: 'Events Found!',
        events: {
          count: 11,
          rows: [
            {
              id: 29,
              name: 'ooooooop',
              image: 'https://res.cloudinary.com/felglitz/image/upload/v1527113526/gtp7by5ybxchahusanxg.jpg',
              startDate: '2018-05-24T00:00:00.000Z',
              endDate: '2018-05-26T00:00:00.000Z',
              status: 'cancelled',
              userId: 1,
              centerId: 6,
              createdAt: '2018-05-23',
              updatedAt: '2018-06-02',
              center: {
                id: 6,
                name: 'Bespoke',
                location: 'Lekki'
              }
            },
            {
              id: 24,
              name: 'bjbh',
              image: 'https://res.cloudinary.com/felglitz/image/upload/v1527018735/grf3y6lx7ucuinguk3qe.jpg',
              startDate: '2018-05-22T00:00:00.000Z',
              endDate: '2018-05-22T00:00:00.000Z',
              status: 'pending',
              userId: 1,
              centerId: 4,
              createdAt: '2018-05-22',
              updatedAt: '2018-05-22',
              center: {
                id: 4,
                name: 'Dammy Hall',
                location: 'Maryland'
              }
            },
            {
              id: 21,
              name: 'nnnn',
              image: 'https://res.cloudinary.com/felglitz/image/upload/v1527008761/ymzva8jtwqfdrxcvzzll.jpg',
              startDate: '2018-09-29T00:00:00.000Z',
              endDate: '2018-09-29T00:00:00.000Z',
              status: 'cancelled',
              userId: 1,
              centerId: 4,
              createdAt: '2018-05-22',
              updatedAt: '2018-05-28',
              center: {
                id: 4,
                name: 'Dammy Hall',
                location: 'Maryland'
              }
            }
          ]
        },
        meta: {
          pagination: {
            currentPageUrl: 'http://localhost:1991/api/v1/events?page=1',
            next: 'http://localhost:1991/api/v1/events?page=2',
            currentPage: 1,
            totalPages: 4,
            offset: 0,
            limit: 3
          }
        }
      },
    },

    eventNotFound: {
      error: 'Event Not Found!'
    },

    deleteEventResponse: {
      message: 'Event Successfully Deleted!',
      eventId: 24
    },

    cancelEventResponse: {
      message: 'Message sent!',
      cancelled: true,
      eventId: 18
    },

    approveEventResponse: {
      message: 'Message sent!',
      cancelled: true,
      eventId: 18
    },

    eventsByCenterId: {
      message: 'Events Found!',
      events: {
        count: 3,
        rows: [
          {
            id: 15,
            name: 'Dammy First Event',
            image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
            startDate: '2018-09-28T00:00:00.000Z',
            endDate: '2018-09-30T00:00:00.000Z',
            status: 'pending',
            userId: 3,
            centerId: 1,
            createdAt: '2018-05-21',
            updatedAt: '2018-05-21'
          }
        ]
      },
      meta: {
        pagination: {
          currentPageUrl: 'http://localhost:1991/api/v1/events/center/1?page=1',
          currentPage: 1,
          totalPages: 1,
          offset: 0,
          limit: 3
        }
      }
    },
  },

  centers: {
    createCenterData: {
      name: 'Dammy Center',
      location: 'Maryland',
      capacity: 500,
      price: 1000,
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      type: 'Marquee',
      description: 'Dammy Center is in maryland',
      facilities: ['bar', 'casino']
    },

    createCenterResponse: {
      message: 'Center created!',
      center: {
        id: 3,
        name: 'Dammy Center',
        location: 'Maryland',
        capacity: 500,
        facilities: [
          'bar',
          'casino'
        ],
        type: 'Marquee',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        description: 'Dammy Center is in maryland',
        price: 1000,
        updatedAt: '2018-05-21',
        createdAt: '2018-05-21'
      }
    },

    createCenterErrorResponse: {
      error: 'A center with this name exists'
    },

    updateCenterData: {
      name: 'Dammy Hall',
      location: 'Maryland',
      capacity: 500,
      price: 1000,
      image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
      type: 'Marquee',
      description: 'Dammy Center is in maryland',
      facilities: ['bar', 'casino']
    },

    updateCenterResponse: {
      message: 'Center Update Successful',
      modifiedCenter: {
        id: 3,
        name: 'Dammy Hall',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        facilities: [
          'bar',
          'casino'
        ],
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        createdAt: '2018-05-21',
        updatedAt: '2018-05-21T13:19:50.115Z'
      }
    },

    loadCenterResponse: {
      message: 'Center Found!',
      center: {
        id: 3,
        name: 'Dammy Hall',
        location: 'Maryland',
        capacity: 500,
        price: 1000,
        facilities: [
          'bar',
          'casino'
        ],
        type: 'Marquee',
        description: 'Dammy Center is in maryland',
        image: 'http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg',
        createdAt: '2018-05-21',
        updatedAt: '2018-05-21',
        events: []
      }
    },

    centerNotFound: {
      error: 'Event Not Found!'
    },
  },

  images: {
    image: {
      public_id: 'gzbb0stg18b7cidiwxme',
      version: 1528357216,
      signature: '6c50c84758c59ccaefe0a81d38b79b00430d2422',
      width: 1392,
      height: 981,
      format: 'jpg',
      resource_type: 'image',
      created_at: '2018-06-07T07:40:16Z',
      tags: [],
      bytes: 336667,
      type: 'upload',
      etag: '93b5742275cbfd054a0db390afdd9725',
      placeholder: false,
      url: 'http://res.cloudinary.com/felglitz/image/upload/v1528357216/gzbb0stg18b7cidiwxme.jpg',
      secure_url: 'https://res.cloudinary.com/felglitz/image/upload/v1528357216/gzbb0stg18b7cidiwxme.jpg',
      original_filename: 'Black'
    }
  },

  imagePresetNotFound: {
    error: 'Preset Not Found!'
  },

};

export default mockData;
