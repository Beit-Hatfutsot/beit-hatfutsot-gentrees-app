'use strict';
angular.module('gt.app').controller('gtSavingTreeCtrl', [
    '$scope','$state','gtRegistrationSvc','$timeout', function ($scope,$state,regSvc,$timeout) {

        $scope.back = function(){
            $state.go('home');
        };

        $scope.savingTreeLocationList = [
            {
                title: 'Stockpile Beit Hatfutsot',
                value: 'beitHatfutsot'
            },
            {
                title: 'Stockpile Bedouin',
                value: 'bedouin'
            },
            {
                title: 'Stockpile Circassian',
                value: 'circassian'
            },
            {
                title: 'Stockpile Druse',
                value: 'druse'
            },
            {
                title: 'Stockpile Arab Christians',
                value: 'arabChristians'
            },
            {
                title: 'Stockpile Arab Muslim',
                value: ' arabMuslim'
            }
        ];
        $scope.model.savingLocation = $scope.savingTreeLocationList[0].value;

        $scope.save = function () {
            $scope.loading = true;

            $scope.model.image = {};
            _.each($scope.model, function (value, key) {
                if (key === 'brothers' || key === 'dadsBrothers' || key === 'momsBrothers' || key === 'savingLocation') {
                    _.each(value, function (v, k) {
                        if (v.image && localStorage.getItem('image' + v.image)) {
                            $scope.model.image[key + (k * 1 + 1)] = localStorage.getItem('image' + v.image);
                        }
                    });
                } else {
                    if (value.image && localStorage.getItem('image' + value.image)) {
                        $scope.model.image[key] = localStorage.getItem('image' + value.image);
                    }
                }
            });

            //var successMessage = 'Your data has been successfully saved ';
            //successMessage += $scope.model.savingLocation == 'beitHatfutsot' ? 'Beit Hatfutsot' : 'Other';

            regSvc.saveTree($scope.model).then(
                function () {
                    $timeout(function () {
                         $state.go('savedTree');
                    }, 100);
                }).finally(function () {
                    $scope.loading = false;
                });

        };

    }]);