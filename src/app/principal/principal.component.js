(function () {
  'use strict';

  angular
    .module('angularApp')
    .component('principal', {
      templateUrl: 'app/principal/principal.html',
      controller: 'PrincipalController as pc',
      bindings: {
        mails : '=',
        categories : "="
      }
    });

})();
