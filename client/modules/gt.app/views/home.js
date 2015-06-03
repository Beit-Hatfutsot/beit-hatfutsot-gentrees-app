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
                $state.go('savingTree' );
                return;
            }
            $scope.step++;
            scrollToTop();
        };

        $scope.disabled = function () {
            var persons = _.flatten(_.values(_.omit($scope.model, 'numBrothers', 'numMomsBrothers', 'numDadsBrothers', 'image', 'savingLocation')));
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




    }]);