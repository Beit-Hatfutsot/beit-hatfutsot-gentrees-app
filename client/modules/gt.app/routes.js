'use strict';

angular.module('gt.app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('home', {
                url: '/',
                templateUrl: 'modules/gt.app/views/home.html',
                controller: 'gtHomeCtrl'
            });
    }
]);