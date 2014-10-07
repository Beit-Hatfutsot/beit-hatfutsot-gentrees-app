'use strict';

angular.module('gt.app').controller('gtConfirmCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.resend = function(){
            regSvc.sendMail($scope.model.me.email);
        };

        $scope.confirm = function () {
            regSvc.confirm($scope.code).then(
                function () {
                    $state.go('home');
                });
        };

    }]);