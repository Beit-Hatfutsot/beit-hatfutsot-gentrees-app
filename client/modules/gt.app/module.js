'use strict';

angular.module('gt.app', ['uuid', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils']);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['gt.app']);
});

angular.module('gt.app').run(['$templateCache', '$state', '$rootScope', 'gtRegistrationSvc',
    function ($templateCache, $state, $rootScope, regSvc) {
        $templateCache.put('shell.html', '<div ng-include="\'/modules/gt.app/views/shell.html\'"></div>');


        $rootScope.model = JSON.parse(localStorage.model || '{}');

        $rootScope.$watch('model', function () {
            localStorage.model = JSON.stringify($rootScope.model);
        }, true);


        $rootScope.$on('$stateChangeStart', function (event, toState) {

            var status = regSvc.status,
                allowedStatuses = toState.data.allowedStatuses;

            if (!_.contains(allowedStatuses, status)) {
                event.preventDefault();
                var newState = _.findLast($state.get(), function (s) {
                    return s.data &&  _.contains(s.data.allowedStatuses, status);
                });
                $state.go(newState);
            }
        });

    }]);