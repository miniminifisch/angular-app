(function () {
  'use strict';

  angular
    .module('angularApp')
    .controller('PrincipalController', PrincipalController);

  /* @ngInject */
  function PrincipalController() {

    var vm = this;
    vm.mails;
    vm.mailSelectionne = null;
    vm.nomCategorieSelectionnee = "";
    vm.lectureActive = false;
  }

})();
