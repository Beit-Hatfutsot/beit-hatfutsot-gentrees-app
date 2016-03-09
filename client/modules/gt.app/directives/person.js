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
            controller: ['$scope', 'gtDialogsSvc', function ($scope, dialogsSvc) {

                $scope.focusThis = function ($event) {
                    angular.element($event.currentTarget).find('input:first').focus();
                };

                $scope.openDateModal = function (title,column) {
                    dialogsSvc.openDateDialog(title,$scope.model[column]).then(function (result) {
                        result === 'delete' ?$scope.model[column] = '' :$scope.model[column] = result ||$scope.model[column];
                    });
                };

            }]
        };

    }]);