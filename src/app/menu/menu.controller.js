(function () {
  'use strict';

  angular
    .module('angularApp')
    .controller('MenuController', MenuController);

  /* @ngInject */
  function MenuController($http) {
    var vm = this;
    vm.user = {};

    vm.trierParCategorie = trierParCategorie;

    function trierParCategorie(categorie){
      if(vm.nomCategorieSelectionnee!=categorie.nom){
        vm.nomCategorieSelectionnee = categorie.nom;
        desactiverLesCategories();
        categorie.selectionnee = true;
      } else {
        vm.nomCategorieSelectionnee = "";
        desactiverLesCategories();
      }
    }

    function desactiverLesCategories(){
      _(vm.categories).forEach(function(categorieDeLaListe){
        categorieDeLaListe.selectionnee = false;
      });
      console.log(vm.lectureActive);
    }
  }

})();
