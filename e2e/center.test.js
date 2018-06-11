const faker = require('faker');

const URL = 'http://localhost:1991';
const centerName = faker.random.word();

module.exports = {
  AdminDashboard: (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'felglitz')
      .setValue('input[name=password]', 'password')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 3000)
      .assert.visible('div.sidebar > div > div > ul > a:nth-of-type(1)')
      .assert.containsText('div.sidebar > div > div > ul > a:nth-of-type(2)', 'My Centers')
      .assert.containsText('div.sidebar > div > div > ul > a:nth-of-type(3)', 'Create Centers')
      .assert.containsText('div.sidebar > div > div > ul > li', 'Logout')
      .assert.visible('.main-panel')
      .assert.visible('.row > div > .card-deck .card');
  },

  CreateCenter: (browser) => {
    browser
      .assert.containsText('div.sidebar > div > div > ul > a:nth-of-type(3)', 'Create Centers')
      .click('div.sidebar > div > div > ul > a:nth-of-type(3)')
      .waitForElementVisible('.form-width.mx-auto.bg-white', 2000)
      .assert.elementPresent('#createcenterform')
      .assert.containsText('#createcenterform', 'CREATE CENTER')
      .setValue('input[name=name]', centerName)
      .assert.visible('input[name=location]')
      .setValue('input[name=location]', 'Dubai')
      .assert.visible('input[name=price]')
      .setValue('input[name=price]', '2000')
      .assert.visible('input[name=capacity]')
      .setValue('input[name=capacity]', '500')
      .assert.visible('input[name=type]')
      .setValue('input[name=type]', 'Exquisite')
      .assert.visible('textarea[name=description]')
      .setValue('textarea[name=description]', 'Top-notch test center')
      .assert.visible('input[name=facilities]')
      .click('input[name=facilities]')
      .assert.visible('input[name=image]')
      .setValue('input[name=image]', '/Users/felglitzzz/Desktop/stecphoto-wedding-ring.jpg')
      .assert.visible('#createCenterSubmit')
      .click('#createCenterSubmit')
      .pause(10000)
      .end();
  },

  EditCenter: (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'felglitz')
      .setValue('input[name=password]', 'password')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 4000)
      .assert.visible('.main-panel')
      .assert.visible('.row > div > .card-deck .card')
      .assert.elementPresent('#editCenterButton')
      .click('#editCenterButton')
      .pause(3000)
      .assert.visible('#editcenterform')
      .assert.containsText('#editcenterform', 'EDIT CENTER')
      .clearValue('input[name=name]')
      .pause(500)
      .setValue('input[name=name]', centerName)
      .pause(500)
      .click('#editCenterSubmit')
      .waitForElementNotPresent('#editcenterform', 3000)
      .pause(2000)
      .end();
  },

  ViewCenter: (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'felglitz')
      .setValue('input[name=password]', 'password')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 4000)
      .assert.visible('.main-panel')
      .assert.visible('.row > div > .card-deck .card')
      .assert.elementPresent('#viewCenterButton')
      .click('#viewCenterButton')
      .pause(2000)
      .assert.visible('#facilities')
      .assert.containsText('#facilities', 'FACILITIES')
      .pause(2000);
  },

  ShowNoEventsForCenter: (browser) => {
    browser
      .assert.containsText('#centereventlog', 'CENTER-EVENT LOG')
      .assert.visible('#shownoevents')
      .assert.containsText('#shownoevents', 'has no events')
      .pause(2000)
      .end();
  },
};
