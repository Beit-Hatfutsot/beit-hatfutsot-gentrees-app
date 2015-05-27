'use strict';

angular.module('gt.app').controller('gtRegisterCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.phoneFormat = '/^[0-9]{9,10}$/';

        $scope.register = function(){

            regSvc.sendMail($scope.model.me.email).then(function(){
                $state.go('confirm');
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