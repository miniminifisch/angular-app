(function () {
  'use strict';

  angular
    .module('angularApp')
    .config(RouteConfiguration);

  /* @ngInject */
  function RouteConfiguration($routeProvider) {

    $routeProvider.when('/', {
      template: '<principal mails="$resolve.mails" categories="$resolve.categories"></principal>',
      resolve: {
        /* @ngInject */
        mails: function ($http) {
          return $http.get('mock/mail.json').then(function (response) {
            var mails = _(response.data).forEach(function (mail) {
              mail.dateFormate = new Date(moment(mail.created_at, "DD/MM/YYYY hh:mm:ss"));
            });
            return mails;
          });
        },
        categories: function ($http) {
          return $http.get('mock/categories.json').then(function (response) {
            return response.data;
          });
        }
      }
    });
  }

})();
