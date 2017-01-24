(function () {
  'use strict';

  angular
    .module('angularApp')
    .component('mail', {
      templateUrl: 'app/mail/mail.html',
      controller: 'MailController as mc',
      bindings: {
        mailSelectionne : '=',
        lectureActive : '='
      }
    });

})();
