describe('En-tête : ', function () {
  beforeAll(function () {
    browser.get("http://localhost:9000/");
  });

  describe('Affichage de l\'en-tête : ', function () {
    it('Le titre est présent', function () {
      expect(element(by.id('titre-en-tete')).isPresent()).toBe(true);
      expect(element(by.id('titre-en-tete')).getText()).toContain('Titre de l\'application');
    });
  });
});
