exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  onPrepare: function() {
    browser.driver.manage().window().maximize();
  },
  maxSessions: 1,
  multiCapabilities: [{
      browserName: 'chrome'
  }, {
      browserName: 'firefox'
  }]
};
