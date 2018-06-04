const URL = 'http://localhost:1991';

module.exports = {
  'Logged in User should be able to create event by clicking the \'create event\' button': (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'servaly')
      .setValue('input[name=password]', 'password')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 4000)
      .assert.visible('.main-panel')
      .assert.containsText('div.sidebar > div > div > ul > a:nth-of-type(2)', 'Centers')
      .assert.containsText('div.sidebar > div > div > ul > a:nth-of-type(3)', 'My Events')
      .assert.containsText('div.sidebar > div > div > ul > a:nth-of-type(4)', 'Create Events')
      .assert.containsText('div.sidebar > div > div > ul > li', 'Logout')
      .click('div.sidebar > div > div > ul > a:nth-of-type(4)')
      .waitForElementVisible('.form-width.mx-auto.bg-white', 2000)
      .assert.visible('#eventform')
      .setValue('input[name=name]', 'FIFA Gala')
      .assert.visible("select[name=centerId] option[value='1']")
      .click("select[name=centerId] option[value='1']")
      .assert.visible('input[name=startDate]')
      .setValue('input[name=startDate]', '19/10/2020')
      .assert.visible('input[name=endDate]')
      .setValue('input[name=endDate]', '21/10/2020')
      .assert.visible('input[name=image]')
      .setValue('input[name=image]', '/Users/felglitzzz/Desktop/stecphoto-wedding-ring.jpg')
      .assert.visible('#createEventSubmit')
      .click('#createEventSubmit')
      .pause(10000)
      .end();
  },

  'Logged in User should be able to edit event by clicking edit event button': (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'servaly')
      .setValue('input[name=password]', 'password')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 4000)
      .assert.visible('.row > div > .card-deck .card')
      .assert.elementPresent('#editEventButton')
      .click('#editEventButton')
      .pause(5000)
      .assert.visible('#editeventform')
      .assert.containsText('#editeventform', 'EDIT EVENT')
      .clearValue('input[name=name]')
      .pause(2000)
      .setValue('input[name=name]', 'UEFA Galas')
      .pause(1000)
      .click('#editEventSubmit')
      .waitForElementNotPresent('#editeventForm', 2000)
      .pause(2000);
  },

  'Logged in user should be able to delete an event': (browser) => {
    browser
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 2000)
      .assert.visible('.row > div > .card-deck .card')
      .assert.elementPresent('#deleteEventButton')
      .click('#deleteEventButton')
      .pause(2000)
      .assert.visible('div.swal-modal')
      .assert.visible('div.swal-footer > div:nth-of-type(2)')
      .click('div.swal-footer > div:nth-of-type(2)')
      .waitForElementVisible('div.swal-footer .swal-button-container', 5000)
      .pause(1000)
      .end();
  },

  'Logged in User sees no event when none is found': (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'servaly')
      .setValue('input[name=password]', 'password')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.no-padding-hr.mb-3.hoverable', 4000)
      .waitForElementVisible('body', 2000)
      .assert.visible('div.main-panel > div > div:nth-of-type(2)')
      .assert.containsText('div.main-panel > div > div:nth-of-type(2)', 'You have no upcoming events!')
      .assert.containsText('div.main-panel > div > div:nth-of-type(2)', 'Let\'s change that')
      .pause(1000)
      .end();
  },
};
