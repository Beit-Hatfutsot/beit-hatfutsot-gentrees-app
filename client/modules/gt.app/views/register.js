'use strict';

angular.module('gt.app').controller('gtRegisterCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.phoneFormat = '/^0\\d{2}([-]{0,1})\\d{7}$/';

        $scope.register = function () {

                regSvc.sendSMS().then(function () {
                    $state.go('confirm');
                });

                //regSvc.sendMail($scope.model.me.email).then(function () {
                //    $state.go('confirm');
                //});
        };

        $scope.focusThis = function ($event) {
            $scope.thisWasBluered = true;
            angular.element($event.currentTarget).find("input:first").focus();
        };

        $scope.blurEv = function () {
            $scope.thisWasBluered = false;
        };

    }]);