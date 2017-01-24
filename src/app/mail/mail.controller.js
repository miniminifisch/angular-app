(function () {
  'use strict';

  angular
    .module('angularApp')
    .controller('MailController', MailController);

  /* @ngInject */
  function MailController() {
    var vm = this;

    vm.revenirAuxMails = revenirAuxMails;

    function revenirAuxMails(){
      vm.lectureActive = false;
    }
  }

})();
