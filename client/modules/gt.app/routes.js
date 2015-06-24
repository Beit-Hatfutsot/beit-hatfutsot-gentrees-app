'use strict';

angular.module('gt.app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/welcome');

          var states = {'welcome':['init'], 'register':['init', 'pending'],'usageterms':['init', 'pending'], 'confirm':['pending'], 'home':['confirmed'], 'savingTree':['confirmed'], 'savedTree':['confirmed']};

        _.each(states, function(statuses, stateName){
                $stateProvider.
                state(stateName, {
                    url: '/' + stateName ,
                    templateUrl: 'modules/gt.app/views/'+ stateName +'.html',
                    controller: 'gt' + stateName.substr(0,1).toUpperCase() + stateName.substr(1) + 'Ctrl',
                    data: {
                        allowedStatuses: statuses
                    }
                });
        });
    }
]);


