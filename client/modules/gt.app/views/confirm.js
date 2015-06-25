'use strict';

angular.module('gt.app').controller('gtConfirmCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.resend = function(){
            regSvc.sendSMS();
            //regSvc.sendMail($scope.model.me.email);
        };

        $scope.confirm = function () {
            regSvc.confirm($scope.code).then(
                function () {
                    $state.go('home');
                });
        };

        $scope.focusThis = function($event){
            $scope.thisWasBluered = true;
            angular.element($event.currentTarget).find("input:first").focus();
        };

        $scope.blurEv = function() {
            $scope.thisWasBluered = false;
        };
    }]);