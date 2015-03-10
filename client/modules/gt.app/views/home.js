'use strict';

angular.module('gt.app').controller('gtHomeCtrl', [
    '$scope', '$filter', 'gtRegistrationSvc', '$state', '$timeout', '$location', '$anchorScroll', function ($scope, $filter, regSvc, $state, $timeout, $location, $anchorScroll) {

        var scrollToTop = function () {
            $location.hash('top');
            $anchorScroll();
        };

        $scope.focusThis = function($event){
            angular.element($event.currentTarget).find("input:first").focus();
            angular.element($event.currentTarget).find("input:first").select();
        };

        $scope.registrationCode = undefined;

        $scope.step = 1;

        $scope.stepCount = 5;

        $scope.next = function () {
            if($scope.step === $scope.stepCount){
                $scope.save();
                return;
            }
            $scope.step++;
            scrollToTop();
        };

        $scope.disabled = function(){
           var persons =_.flatten(_.values(_.omit($scope.model, 'numBrothers')));
            var allValid = _.all(persons, function(p){
                return  p.isMale != null && !_.isEmpty(p.firstName) && (p.isWife || !_.isEmpty(p.lastName));
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

        $scope.save = function () {
            $scope.loading = true;

            return regSvc.saveModel($scope.model).then(
                function () {
                    $timeout(function () {
                        $scope.step = 1;
                        scrollToTop();
                    }, 100);
                }).finally(function(){
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
                        $scope.model.brothers.push({isAlive: true});
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