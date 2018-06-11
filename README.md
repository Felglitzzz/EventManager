[![Build Status](https://travis-ci.org/Felglitzzz/EventManager.svg?branch=develop)](https://travis-ci.org/Felglitzzz/EventManager)
[![Coverage Status](https://coveralls.io/repos/github/Felglitzzz/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/Felglitzzz/EventManager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/e5c68bb9b0cd8eef37cf/maintainability)](https://codeclimate.com/github/Felglitzzz/EventManager/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e5c68bb9b0cd8eef37cf/test_coverage)](https://codeclimate.com/github/Felglitzzz/EventManager/test_coverage)
[![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)


# EventManager

EventManager is a light-weight app that allows users to manage and book centers for their events.

## API Documentation
Click [here](https://eventmanager-app.herokuapp.com/docs) to view our detailed API documentation

## Take a Peek

* API is hosted on https://eventmanager-app.herokuapp.com/api/v1
* Application is hosted on https://eventmanager-app.herokuapp.com

## Technologies Used

* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* [Postgres](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Semantic-ui-react]() - Official React integration for Semantic UI.
* [React](https://www.reactjs.org/) - A JavaScript library for building user interfaces by Facebook.
* [Redux](http://redux.js.org/) - A predictable state container for JavaScript apps.

## Features

* Users can see a landing page.
* Users can create accounts by signing
* Registered users can login with username and password.
* Registered users can add events to the application.
* Registered users can edit their events in the application.
* Registered users can delete their events in the application.
* Registered users can view all centers in the application.
* Registered users can view the details of a center and the events slated for that center
* Users get email notification when their events is declined by the admin
* Registered users with admin privileges can add a center
* Registered users with admin privileges can edit a center
* Registered users with admin privileges can delete a center

## Installation

1. Install [`node`](https://nodejs.org/en/download/), version 7 or greater

2. Install [`postgres`](https://www.postgresql.org/download/)

3. Clone the repository

    ```
    git clone https://github.com/Felglitzzz/EventManager.git
    ```

4. Navigate to the project directory

    ```
    cd ~/path/to/EventManager
    ```

5. Install all dependencies

    ```
    npm install
    ```

6. Configure Postgres

    ```
    configure your database settings for development and test in
    `./server/config/config.json` using .env.example file template
    ```

7.  Run database migrations

    ```
    $ sequelize db:migrate
    ```

8. Seed the database

    ```
    $ sequelize db:seed:all
    ```

9. Start the app

    ```
    npm start:dev:watch
    ```

10. Run the application on browser

    ```
    http://localhost:1991/
    ```

## Testing

- Run both client and server tests together

```sh
    npm test
```

#### Server-side tests

- Uses `Chai` and `Chai-Http`
- Have a test database

```sh
    npm run server-test
```

#### Client-side tests

- Uses `Jest` and `Enzyme`

```sh
    npm run client-test
```

#### End-to-End tests

- Uses `Nightwatch`

```sh
    npm run e2e-tests
```

## Limitations

- Users can only access full application features when they sign up or logged in
- Users can neither edit nor delete center
- Password reset feature is currently not available on the app
- Users cannot deactivate their accounts
- Users will have to obtain a new token every 24 hours
- Users cannot signup/sign-in with their social media accounts
- Search features is currently unavailable on the app
- Users cannot receive email notification when they sign-up
- Users cannot receive email notifications ehrn they create events 

## Contributing

If you are interested in contributing to development of this project, follow the instructions below to contribute.

* Fork the repository

* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description

* Raise a pull request against the develop branch

* Please see [Event Manager (Eventeria) wiki](https://github.com/Felglitzzz/EventManager/wiki) for project conventions


## FAQ

#### Who can contribute?

    Anyone can! Just follow the contribution guidelines above

#### Is there a set standard for PRs to this repository?

    Yes please check the project wiki for project conventions.

#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and is open for
    everybody
## License

This project is licensed under the [MIT License](https://github.com/Felglitzzz/EventManager/blob/develop/LICENSE)
