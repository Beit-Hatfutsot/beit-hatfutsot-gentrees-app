'use strict';

angular.module('gt.app').directive('gtPerson',
    [function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
              model: '=',
              tittle: '@'
            },
            templateUrl: 'modules/gt.app/directives/person.html',
            controller: ['$scope', function ($scope) {

            }]
        };

    }]);