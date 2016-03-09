'use strict';

var HideImageStepProgressingTime = 6500;

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

                scope.close = function(){
                    $timeout.cancel(imageStepProgressingTimeout);
                    scope.imageStepProgressing = false;
                };

                function openImageStepProgressing() {
                    scope.imageStepProgressing = true;

                    $timeout.cancel(imageStepProgressingTimeout);
                    imageStepProgressingTimeout = $timeout(function () {
                       scope.imageStepProgressing = false;
                    }, HideImageStepProgressingTime);
                }

                //function checkOrientation(){
                //    scope.isLandscape =  window.orientation === 0 ;
                //}
                //checkOrientation();
                //
                //window.addEventListener('orientationchange', function() {
                //    checkOrientation();
                //}, false);

            }
        };

    });