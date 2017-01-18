(function () {
  'use strict';

  angular.module('configuration', [
    'pascalprecht.translate'
  ]);

  //configure the translation service
  angular.module('configuration').config(function ($translateProvider) {

    //this will load asynchronously the needed languages
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/messages_',
      suffix: '.json'
    });

    $translateProvider.registerAvailableLanguageKeys(
      ['fr', 'en'],
      {
        'en*': 'en',
        'fr*': 'fr',
        '*': 'fr' // default value must be last !
      }
    );

    $translateProvider.fallbackLanguage('fr');
    $translateProvider.determinePreferredLanguage();

    $translateProvider.useSanitizeValueStrategy('escapeParameters');

  });

})();
