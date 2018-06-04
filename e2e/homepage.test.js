const URL = 'http://localhost:1991';

module.exports = {
  'Homepage Test': (browser) => {
    browser
      .url(`${URL}`)
      .waitForElementVisible('body', 3000)
      .assert.title('Eventeria')
      .assert.visible('.navbar.navbar-expand-lg.transparent.navbar-dark.bg-orange')
      .assert.visible('.half_screen .carousel.slide')
      .assert.containsText(
        '.half_screen .carousel.slide .carousel-inner .carousel-item',
        'We help your event communicate beauty'
      )
      .assert.containsText('.container-fluid .text-center.text-orange', 'What we do')
      .assert.visible('.container-fluid .text-center.lead', 'We are the leading event technology platform in Africa')
      .assert.visible('footer > div > ul > li')
      .assert.visible('footer > div > ul > li > a:nth-of-type(1)')
      .assert.visible('footer > div > ul > li > a:nth-of-type(2)')
      .assert.visible('footer > div > ul > li > a:nth-of-type(3)')
      .assert.visible('footer > div > ul > li > a:nth-of-type(4)')
      .assert.containsText('footer > div:nth-of-type(2)', '© 2018 Eventeria. All rights reserved')
      .pause(2000)
      .end();
  },

  'Show a 404 page for invalid routes': (browser) => {
    browser
      .url(`${URL}/invalidroutes`)
      .waitForElementVisible('body', 5000)
      .assert.visible('.z-depth-1.bloc')
      .assert.visible('.z-depth-1.bloc > img')
      .assert.visible('.fourohfour')
      .assert.containsText('.fourohfour', '404')
      .assert.containsText('.z-depth-1.bloc > div > h2', 'Ooops! Sorry, we can\'t find this page.')
      .assert.visible('.z-depth-1.bloc > div > a')
      .assert.containsText('.z-depth-1.bloc > div > a', 'Back Home')
      .click('#goToHome')
      .pause(3000)
      .waitForElementNotPresent('.z-depth-1.bloc', 3000)
      .waitForElementNotPresent('.z-depth-1.bloc > img', 3000)
      .waitForElementPresent('.half_screen .carousel.slide', 3000)
      .assert.visible('.half_screen .carousel.slide')
      .pause(2000)
      .end();
  }
};
