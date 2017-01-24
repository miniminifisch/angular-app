(function() {
  'use strict';

  angular
    .module('angularApp')
    .config(RouteConfiguration);

  /* @ngInject */
  function RouteConfiguration ($routeProvider) {

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

})();
