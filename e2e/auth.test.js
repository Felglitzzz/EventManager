const URL = 'http://localhost:1991';

module.exports = {
  'User receives error when signup form is not properly filled': (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(2)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(2)')
      .waitForElementVisible('#signupModal', 3000)
      .setValue('input[name=surname]', 'Rachael')
      .setValue('input[name=firstname]', 'Victoria')
      .setValue('input[name=email]', 'rachvic')
      .setValue('input[id=password]', 'password')
      .setValue('input[name=passwordConfirm]', 'passwrd')
      .pause(2000)
      .assert.visible('.modal-footer #signupSubmit')
      .click('.modal-footer #signupSubmit')
      .waitForElementVisible('.alert-danger', 5000)
      .end();
  },

  'User receives error when signin form is not properly filled': (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.visible('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .click('nav.navbar-expand-lg > div > form:nth-of-type(1)')
      .waitForElementVisible('#signinModal', 3000)
      .setValue('input[name=username]', 'user')
      .pause(2000)
      .assert.visible('.modal-footer #signinSubmit')
      .click('.modal-footer #signinSubmit')
      .waitForElementVisible('.alert-danger', 3000);
  },

  'User gets logged in when input fields are correctly filled': (browser) => {
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
  },

  'Logged in user should be able to log out by clicking the logout button': (browser) => {
    browser
      .waitForElementVisible('div.sidebar > div > div > ul > li', 3000)
      .assert.containsText('#logout', 'Logout')
      .click('#logout')
      .pause(2000)
      .waitForElementNotPresent('div.sidebar > div > div > ul > li', 3000)
      .assert.containsText(
        '.half_screen .carousel.slide .carousel-inner .carousel-item',
        'We help your event communicate beauty'
      )
      .end();
  }
};

