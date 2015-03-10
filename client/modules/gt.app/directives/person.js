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

               // $scope.model.isMale = null;

                $scope.focusThis = function($event){
                    angular.element($event.currentTarget).find("input:first").focus();
                }

            }]
        };

    }]);