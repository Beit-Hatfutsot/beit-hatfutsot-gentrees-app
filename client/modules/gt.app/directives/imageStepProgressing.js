'use strict';

var HideImageStepProgressingTime = 5000;

angular.module('gt.app').directive('gtImageStepProgressing', function ($timeout) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                step: '='
            },
            templateUrl: 'modules/gt.app/directives/imageStepProgressing.html',
            link: function (scope) {

                var imageStepProgressingTimeout = null;

                scope.$watch('step',function(newValue,oldValue){
                    if(newValue > oldValue || newValue === oldValue){
                        openImageStepProgressing();
                    }
                });

                function openImageStepProgressing() {
                    scope.imageStepProgressing = true;

                    $timeout.cancel(imageStepProgressingTimeout);
                    imageStepProgressingTimeout = $timeout(function () {
                       scope.imageStepProgressing = false;
                    }, HideImageStepProgressingTime)
                }


            }
        };

    });