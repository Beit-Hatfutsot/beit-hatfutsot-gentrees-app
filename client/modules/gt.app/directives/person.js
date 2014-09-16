'use strict';

angular.module('gt.app').directive('gtPerson',
    [function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                title: '@',
                counter: '@'
            },
            templateUrl: 'modules/gt.app/directives/person.html',
            controller: ['$scope', function ($scope) {

            }]
        };

    }]);