'use strict';

angular.module('gt.app').controller('gtHomeCtrl', ['$scope', '$filter', 'gtRegistrationSvc', function ($scope, $filter, regSvc) {

        $scope.registrationCode = undefined;

        $scope.isRegistrationConfirmed = function(){
            return regSvc.confirmed;
        };

        $scope.resendRegistrationMail = function () {
            regSvc.sendMail($scope.model.email);
        };

        $scope.confirmRegistration = function () {
            regSvc.confirm($scope.registrationCode);
        };

        $scope.$watch('model.numBrothers', function (newValue, oldValue) {
            newValue = parseInt($filter('number')(newValue)) || 0;
            oldValue = oldValue || 0;

            if (newValue == oldValue) {
                return;
            }

            if (!newValue || newValue == 0) {
                $scope.model.brothers = [];
                return;
            }

            if (newValue > 0) {
                if (newValue > oldValue){
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