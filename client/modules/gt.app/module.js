(function () {

    'use strict';

    function createModel(){

        var mom = {isWife: true, isMale: false, isMaleNotEditable: true, isAlive: true},
            dad = {isMale: false, isMaleNotEditable: true, isAlive: true};

        return {
            me : {isAliveNotEditable: true, isAlive: true},
            dad: _.clone(dad),
            mom: _.clone(mom),
            momsDad : _.clone(dad),
            momsMom : _.clone(mom),
            dadsDad : _.clone(dad),
            dadsMom : _.clone(mom),
            numBrothers: 0,
            brothers: []
        };
    }

    angular.module('gt.app', ['uuid', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate']);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['gt.app']);
    });

    angular.module('gt.app').run(['$templateCache', '$state', '$rootScope', 'gtRegistrationSvc',
        function ($templateCache, $state, $rootScope, regSvc) {
            $templateCache.put('shell.html', '<div ng-include="\'/modules/gt.app/views/shell.html\'"></div>');


            $rootScope.showSpinner = false;
            $rootScope.model = localStorage.model ? JSON.parse(localStorage.model) : createModel();

            $rootScope.$watch('model', function () {
                localStorage.model = JSON.stringify($rootScope.model);
            }, true);


            $rootScope.clear = function(){
              for(var k in localStorage){
                  delete localStorage[k];
              }
              $state.go('welcome');
            };

            $rootScope.$on('$stateChangeStart', function (event, toState) {

                var status = regSvc.status,
                    allowedStatuses = toState.data.allowedStatuses;

                if (!_.contains(allowedStatuses, status)) {
                    event.preventDefault();
                    var newState = _.findLast($state.get(), function (s) {
                        return s.data && _.contains(s.data.allowedStatuses, status);
                    });
                    $state.go(newState);
                }
            });

        }]);

})();