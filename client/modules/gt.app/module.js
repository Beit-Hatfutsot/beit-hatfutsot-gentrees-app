'use strict';

angular.module('gt.app', ['uuid', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils']);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['gt.app']);
});

angular.module('gt.app').run(['$templateCache', '$state', '$rootScope', function($templateCache, $state, $rootScope){
    $templateCache.put('shell.html', '<div ng-include="\'/modules/gt.app/views/shell.html\'"></div>');


    $rootScope.model = JSON.parse(localStorage.model || '{}');

    $rootScope.$watch('model', function(){
        localStorage.model = JSON.stringify($rootScope.model);
    }, true);



}]);