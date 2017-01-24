(function () {
  'use strict';

  angular
    .module('angularApp')
    .component('mailsListe', {
      templateUrl: 'app/mailsListe/mailsListe.html',
      controller: 'MailsListeController as mlc',
      bindings: {
        mails : '=',
        mailSelectionne : '=',
        nomCategorieSelectionnee : '=',
        categories : '=',
        lectureActive: '='
      }
    });

})();
