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

                $scope.openDateModal = function (date) {
                    dialogsSvc.openDateDialog('Date of Birth', $scope.model.dateOfBirth).then(function (data) {
                        data === 'delete' ? $scope.model.dateOfBirth = '' : $scope.model.dateOfBirth = data || $scope.model.dateOfBirth;
                    });
                };

            }]
        };

    }]);