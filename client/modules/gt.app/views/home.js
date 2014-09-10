'use strict';

angular.module('gt.app').controller('gtHomeCtrl', ['$scope', '$filter', 'gtRegistrationSvc', '$state', '$timeout', function ($scope, $filter, regSvc, $state, $timeout) {

    $scope.loading = false;

    $scope.error = undefined;

    $scope.info = undefined;

    $scope.registrationCode = undefined;

    $scope.step = 1;

    $scope.stepCount = 5;

    $scope.next = function () {
        $scope.step++;
    };

    $scope.back = function () {
        $scope.step--;
    };

    $scope.isRegistrationConfirmed = function () {
        return regSvc.confirmed;
    };

    $scope.resendRegistrationMail = function () {
        regSvc.sendMail($scope.model.email);
    };

    $scope.confirmRegistration = function () {
        regSvc.confirm($scope.registrationCode);
    };

    $scope.save = function () {
        $scope.info = undefined;
        $scope.error = undefined;
        $scope.loading = true;

        return regSvc.saveModel().then(
            function () {
                $scope.info = 'Your data has been successfully saved.';
                $timeout(function(){
                    $state.go('welcome');
                }, 3500);
            },
            function (error) {
                $scope.error = error;
            })
            .finally(function () {
                $scope.loading = false;
            });
    };

    $scope.$watch('model.numBrothers', function (newValue, oldValue) {
        newValue = parseInt($filter('number')(newValue)) || 0;
        oldValue = oldValue || 0;

        if (newValue === oldValue) {
            return;
        }

        if (!newValue || newValue === 0) {
            $scope.model.brothers = [];
            return;
        }

        if (newValue > 0) {
            if (newValue > oldValue) {
                for (var x = $scope.model.brothers.length; x < newValue; x++) {
                    $scope.model.brothers.push({});
                }
            }
            else {
                for (var y = $scope.model.brothers.length; y > newValue; y--) {
                    $scope.model.brothers.pop();
                }
            }
        }
    });

}]);