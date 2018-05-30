module.exports = {
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .url('http://localhost:1991')
      .waitForElementVisible('body', 5000)
      .assert.title('Eventeria');
    browser.end();
  }
};
