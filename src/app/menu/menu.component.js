(function () {
  'use strict';

  angular
    .module('angularApp')
    .component('menu', {
      templateUrl: 'app/menu/menu.html',
      controller: 'MenuController as mc',
      bindings: {
        categories: "=",
        nomCategorieSelectionnee: "=",
        lectureActive: "="
      }
    });

})();
