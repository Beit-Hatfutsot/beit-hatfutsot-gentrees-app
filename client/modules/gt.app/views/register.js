'use strict';

angular.module('gt.app').controller('gtRegisterCtrl',
    ['$scope', '$state', 'gtRegistrationSvc', function ($scope, $state, regSvc) {

        $scope.register = function(){
            regSvc.sendMail($scope.model.email).then(function(){
                $state.go('confirm');
            });
        }

    }]);