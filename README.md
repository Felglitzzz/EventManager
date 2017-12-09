# EventManager

[![Build Status](https://travis-ci.org/Felglitzzz/EventManager.svg?branch=develop)](https://travis-ci.org/Felglitzzz/EventManager)
[![Coverage Status](https://coveralls.io/repos/github/Felglitzzz/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/Felglitzzz/EventManager?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/e5c68bb9b0cd8eef37cf/maintainability)](https://codeclimate.com/github/Felglitzzz/EventManager/maintainability)

EventManager is a light-weight app that allows users to manage and book centres for their events.

## Development
The application is built with:
* Backend
    - NodeJS and ExpressJS frameworks
    - Sequelize for ORM.
    - PostgreSQL as our relational database
* Frontend
    - React/Redux
* Postman

## Installation
* Install `node` and `postgres`
* Clone the repository
* Switch to project directory `cd ~/path/to/EventManager`
* Type `npm install` to install dependencies
* Type `npm test` to run test
* Start app locally with `npm dev:start`
* Start app in development mode with `npm start`
* Consume via postman

## Take a Peek
* UI is hosted on https://felglitzzz.github.io/EventManager/template
* API is hosted on https://eventmanager-app.herokuapp.com/api/v1

## Features
* A landing page- for all users registered or unregistered.
* Sign up page- where unregistered user to create an account.
* Sign in page- where registered users gain access and manage their accounts.
* Authenticated user page- This UI provides the interface for a signed in user to carry out authorised task.
* Add event section- an interface for authenticated user to add an event.
* Modify event section- provides interface for authenticated user to modify an event.
* Delete event section- provides interface for authenticated user to delete an event.
* Admin page- where signed in admin can carry out some task.
* Add new center section- provides interface for authenticated admin to add new event center.
* Modify center details section- where admin can modify event center.
* Center-Event Log Section- where user can view a center with its slated events.

## Endpoints and Actions
| Verb     | Endpoint                 | Action                    |
| :------- | :----------------------- | :------------------------ |
| POST     | /users/                  | Creates new user          |
| POST     | /users/login             | Logs a user in            |
| POST     | /events/                 | Creates an event          |
| PUT      | /events/<eventId>        | Modifies an event         |
| DELETE   | /events/<eventId>        | Deletes an event          |
| POST     | /centers/                | Adds a new center         |
| GET      | /centers/                | Gets all centers          |
| GET      | /centers/<centerId>      | Gets a single center      |
| PUT      | /centers/<centerId>      | Modifies a center         |









