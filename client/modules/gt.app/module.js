(function () {

    'use strict';

    function createModel(){

        var mom = {isWife: true, isMale: false, isMaleNotEditable: true, isAlive: true},
            dad = {isMale: true, isMaleNotEditable: true, isAlive: true};

        return {
            me : {isAliveNotEditable: true, isAlive: true},
            dad: _.clone(dad),
            mom: _.clone(mom),
            momsDad : _.clone(dad),
            momsMom : _.clone(mom),
            dadsDad : _.clone(dad),
            dadsMom : _.clone(mom),
            numBrothers: 0,
            numMomsBrothers: 0,
            numDadsBrothers: 0,
            brothers: [],
            momsBrothers: [],
            dadsBrothers: []
        };
    }

    angular.module('gt.app', ['uuid','ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate','angular-google-analytics']);

    angular.element(document).ready(function () {
        setTimeout(function() {
            angular.bootstrap(document, ['gt.app']);
        }, 50);
    });

    angular.module('gt.app').config(function (AnalyticsProvider) {
        AnalyticsProvider.setAccount('UA-8676522-3');
        //AnalyticsProvider.enterDebugMode(true);
    });

    angular.module('gt.app').run(['$templateCache', '$state', '$rootScope', 'gtRegistrationSvc', '$translate',
        function ($templateCache, $state, $rootScope, regSvc, $translate) {
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

            $rootScope.configOption = {
              "color":"#888888",
              "externalLogo":"https://pre00.deviantart.net/fd16/th/pre/i/2016/224/4/7/cthulhu_logo_by_gr33nd3v1l-d30ozsr.png",
              "message": "Welcome to the Cthulu Israel Family Trees Project. You are invited to use this site to create your family tree in 4 simple steps ",
              "preferredLanguage": "en"
            };

            $translate.use($rootScope.configOption.preferredLanguage);

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