'use strict';

angular.module('gt.app').controller('gtConfirmCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.confirm = function () {
            regSvc.confirm($scope.code).then(
                function () {
                    $state.go('home');
                },
                function (err) {

                });
        }

    }]);