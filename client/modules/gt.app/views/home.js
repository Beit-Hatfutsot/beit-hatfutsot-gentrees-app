'use strict';

angular.module('gt.app').controller('gtHomeCtrl',
    ['$scope', 'gtRegistrationSvc', function ($scope, regSvc) {

        $scope.registrationCode = undefined;

        $scope.isRegistrationConfirmed = function(){
            return regSvc.confirmed;
        };

        $scope.resendRegistrationMail = function () {
            regSvc.sendMail($scope.model.email);
        };

        $scope.confirmRegistration = function () {
            regSvc.confirm($scope.registrationCode);
        }

    }]);
