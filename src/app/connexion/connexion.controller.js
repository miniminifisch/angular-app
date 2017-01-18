(function () {
  'use strict';

  angular
    .module('vtc')
    .controller('ConnexionController', ConnexionController);

  /* @ngInject */
  function ConnexionController($http) {
    var vm = this;
    vm.user = {};

    vm.submit = function () {
      $http.get('mock/user.json').then(function(response){
        console.log(response.data);
        console.log(vm.user);
      });
    }

  }

})();
