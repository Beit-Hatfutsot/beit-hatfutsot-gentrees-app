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
            var persons =_.flatten(_.values(_.omit($scope.model, 'numBrothers', 'numMomsBrothers', 'numDadsBrothers', 'image')));
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

          $scope.model.image ={};
            _.each($scope.model,function(value,key) {
                if (key === 'brothers' || key === 'dadsBrothers' || key === 'momsBrothers') {
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


    }]);