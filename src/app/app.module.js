(function() {
  'use strict';

  angular.module('templates', []);

  angular.module('vtc', [
    'templates',
    'ngRoute',
    'pascalprecht.translate',
    'configuration',
    'ui.bootstrap',
    'ngSanitize',
    'ui.select',
    'properties'
  ]).run(function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function() {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  })
})();
