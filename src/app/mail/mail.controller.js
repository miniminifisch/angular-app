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
      console.log(vm.lectureActive);
      vm.lectureActive = false;
      console.log(vm.lectureActive);
    }
  }

})();
