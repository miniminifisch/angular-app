(function () {
  'use strict';

  angular
    .module('angularApp')
    .controller('MailsListeController', MailsListeController);

  /* @ngInject */
  function MailsListeController() {
    var vm = this;

    _(vm.mails).forEach(function(mail){
      _(vm.categories).forEach(function(categorie){
        if(categorie.nom === mail.category){
          mail.codeCouleur = categorie.codeCouleur;
        }
      });
    });

    vm.lireMail = lireMail;

    function lireMail(mail){
      vm.mailSelectionne = mail;
      vm.lectureActive=true;
    }
    
    
  }

})();
