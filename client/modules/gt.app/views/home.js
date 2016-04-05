'use strict';


angular.module('gt.app').controller('gtHomeCtrl', [
    '$scope', '$filter', 'gtRegistrationSvc', '$state', '$timeout', '$location', '$anchorScroll', 'Analytics', function ($scope, $filter, regSvc, $state, $timeout, $location, $anchorScroll, Analytics) {

        $scope.step = 1;
        $scope.stepCount = 5;
        $scope.isComplite = [];
        $scope.registrationCode = undefined;

        var brothersViewWasVisited = false;
        var publishStartDate;
        var analyticsKeys = {
            0: 'Sign up',
            1: 'Update events',
            2: 'Add Personal Details',
            3: 'Mother\'s side',
            4: 'Father\'s side',
            5: 'Siblings'
        };

        var scrollToTop = function () {
            $location.hash('top');
            $anchorScroll();
        };

        $scope.progressBarStep = [
            [
                {column: 'me', field: ['firstName', 'lastName', 'isMale']}
            ],
            [
                {column: 'mom', field: ['firstName']},
                {column: 'momsDad', field: ['firstName', 'lastName']},
                {column: 'momsMom', field: ['firstName']},
                {column: 'momsBrothers', field: ['firstName', 'lastName', 'isMale']}
            ],
            [
                {column: 'dad', field: ['firstName', 'lastName']},
                {column: 'dadsDad', field: ['firstName', 'lastName']},
                {column: 'dadsMom', field: ['firstName']},
                {column: 'dadsBrothers', field: ['firstName', 'lastName', 'isMale']}
            ],
            [
                {column: 'brothers', field: ['firstName', 'lastName', 'isMale']}
            ]
        ];

        $scope.focusThis = function ($event) {
            angular.element($event.currentTarget).find('input:first').focus();
            angular.element($event.currentTarget).find('input:first').select();
        };

        $scope.save = function () {

            var persons = _.flatten(_.values(_.omit($scope.model, 'numBrothers', 'numMomsBrothers', 'numDadsBrothers', 'image', 'savingLocation')));

            var allValid = _.all(persons, function (p) {
                return (p.isMale === false || p.isMale === true) && !_.isEmpty(p.firstName) && (p.isWife || !_.isEmpty(p.lastName));
            });


            if (!allValid) {
                var element = $('input.ng-invalid:first');
                var scrollDest = element.offset().top - 40;
                $('body').stop().animate({scrollTop: scrollDest}, '300');

            } else {
                // if true do this
                Analytics.trackEvent('IDFtrees', 'Review Details', countInputWithValue(persons));
                $state.go('savingTree',{publishStartDate:publishStartDate});
            }
        };

        $scope.next = function () {
            $scope.step++;

            if ($scope.step > 4) {
                brothersViewWasVisited = true;

            }
            scrollToTop();
            Analytics.trackEvent('IDFtrees', analyticsKeys[$scope.step]);
        };

        $scope.back = function () {
            $scope.step--;
            scrollToTop();
        };

        $scope.setProgressBarWidth = function (progress, inedx) {

            var totalField = 0;
            var validFiled = 0;

            _.each(progress, function (value) {
                _.each(value.field, function (f) {
                    if (value.column === 'momsBrothers' || value.column === 'dadsBrothers' || value.column === 'brothers') {

                        if (value.column === 'brothers' && !brothersViewWasVisited) {
                            totalField = 1;
                            validFiled = 0;
                        } else {
                            _.each($scope.model[value.column], function (brother) {
                                totalField++;
                                if (brother[f] || brother[f] === false) {
                                    validFiled++;
                                }
                            });
                        }

                    } else {
                        totalField++;
                        if ($scope.model[value.column][f] || $scope.model[value.column][f] === false) {
                            validFiled++;
                        }
                    }

                });
            });

            var width = validFiled / totalField * 100;

            $scope.isComplite[inedx] = validFiled === totalField;

            return {
                width: width + '%'
            };
        };

        $scope.disabled = function () {

            var model = _.omit($scope.model, 'numBrothers', 'numMomsBrothers', 'numDadsBrothers', 'image', 'savingLocation');

            var persons = _.flatten(_.values(_.omit($scope.model, 'numBrothers', 'numMomsBrothers', 'numDadsBrothers', 'image', 'savingLocation')));
            var allValid = _.all(persons, function (p) {
                return (p.isMale === false || p.isMale === true) && !_.isEmpty(p.firstName) && (p.isWife || !_.isEmpty(p.lastName));
            });

            return $scope.step === $scope.stepCount && !allValid;
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

        function countInputWithValue(persons) {
            var count = 0;
            var ignoreInput = ['isWife', 'isAliveNotEditable', 'isMaleNotEditable', 'image'];
            _.each(persons, function (person) {
                _.each(person, function (value, name) {
                    if (ignoreInput.indexOf(name) === -1) {
                        count++;
                    }
                    if (name === 'image' && localStorage.getItem('image' + value)) {
                        count++;
                    }
                });
            });
            return count;
        }

        function init() {
            publishStartDate = new Date();

            var analyticsKey = 1;
            if(!localStorage.getItem('isNotFirstTime')){
                localStorage.setItem('isNotFirstTime',true);
                analyticsKey = 0;
            }

            $scope.isImageStepProgressingSeen = localStorage.getItem('imageStepProgressing');



            Analytics.trackEvent('IDFtrees', analyticsKeys[analyticsKey]);
        }

        init();


    }]);