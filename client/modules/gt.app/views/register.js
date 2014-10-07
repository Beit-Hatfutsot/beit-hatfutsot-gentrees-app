'use strict';

angular.module('gt.app').controller('gtRegisterCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.register = function(){

            regSvc.sendMail($scope.model.me.email).then(function(){
                $scope.showSpinner=false;
                $state.go('confirm');
            });
            $scope.showSpinner=true;
        };

    }]);