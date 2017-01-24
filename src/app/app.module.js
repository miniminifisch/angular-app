(function() {
  'use strict';

  angular.module('templates', []);

  angular.module('angularApp', [
    'templates',
    'ngRoute',
    'pascalprecht.translate',
    'configuration',
    'ngSanitize'
  ]).run(function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function() {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();
    });
  })
})();
