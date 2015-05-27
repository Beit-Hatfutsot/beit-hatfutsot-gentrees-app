'use strict';
angular.module('gt.app').controller('gtHomeCtrl', [
    '$scope', '$filter', 'gtRegistrationSvc', '$state', '$timeout', '$location', '$anchorScroll', function ($scope, $filter, regSvc, $state, $timeout, $location, $anchorScroll) {

        var scrollToTop = function () {
            $location.hash('top');
            $anchorScroll();
        };

        $scope.focusThis = function ($event) {
            angular.element($event.currentTarget).find("input:first").focus();
            angular.element($event.currentTarget).find("input:first").select();
        };

        $scope.registrationCode = undefined;

        $scope.step = 1;

        $scope.stepCount = 5;

        $scope.next = function () {
            if ($scope.step === $scope.stepCount) {
                //$scope.save();
                $scope.isSaveTreeOpen = true;
                scrollToTop();
                return;
            }
            $scope.step++;
            scrollToTop();
        };

        $scope.disabled = function () {
            var persons = _.flatten(_.values(_.omit($scope.model, 'numBrothers', 'numMomsBrothers', 'numDadsBrothers', 'image','savingLocation')));
            var allValid = _.all(persons, function (p) {
                return p.isMale != null && !_.isEmpty(p.firstName) && (p.isWife || !_.isEmpty(p.lastName));
            });


            return $scope.step === $scope.stepCount && !allValid;
        };

        $scope.back = function () {
            $scope.step--;
            scrollToTop();
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
        $scope.model.savingLocation =  $scope.savingTreeLocationList[0].value;

        $scope.save = function () {
            $scope.loading = true;

            $scope.model.image = {};
            _.each($scope.model, function (value, key) {
                if (key === 'brothers' || key === 'dadsBrothers' || key === 'momsBrothers' || key ==='savingLocation') {
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


            var successMessage = 'Your data has been successfully saved ';
            successMessage += $scope.model.savingLocation == 'beitHatfutsot' ? 'Beit Hatfutsot' :'Other';

            console.log('$scope.model',$scope.model);

            return regSvc.saveModel($scope.model,successMessage).then(
                function () {
                    $timeout(function () {
                        $scope.step = 1;
                        $scope.isSaveTreeOpen = false;
                        scrollToTop();
                    }, 100);
                }).finally(function () {
                    $scope.loading = false;
                });
        };


    }]);