describe('Mails liste : ', function () {
  beforeAll(function () {
    browser.get("http://localhost:9000/");
  });

  describe('Signaletiques : ', function () {
    it('Possède un titre', function () {
      expect(browser.getTitle()).("VTC - Signalétiques");
    });
  });
});
