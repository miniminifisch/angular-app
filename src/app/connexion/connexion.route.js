(function () {
  'use strict';

  angular
    .module('vtc')
    .config(RouteConfiguration);

  /* @ngInject */
  function RouteConfiguration($routeProvider) {

    $routeProvider.when('/', {
      template: '<connexion></connexion>'
    });
  }

})();
