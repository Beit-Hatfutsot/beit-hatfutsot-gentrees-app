'use strict';

angular.module('gt.app').directive('gtBrother',
    [ function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                brother: '=',
                number: '=',
                title:'=',
                labelText:'='
            },
            templateUrl: 'modules/gt.app/directives/brother.html',
            link: function (scope,$scope, element, attrs) {



                if(!scope.number)
                    scope.number = 0;

                  scope.$watch('number', function (newValue, oldValue) {
                      //newValue = parseInt($filter('number')(newValue)) || 0;
                      newValue = newValue *1;
                      oldValue = oldValue || 0;

                    if (newValue === oldValue) {
                        return;
                    }

                    if (!newValue || newValue === 0) {
                        scope.brother = [];
                        return;
                    }

                    if (newValue > 0) {
                        if (newValue > oldValue) {
                            for (var x = scope.brother.length; x < newValue; x++) {
                                scope.brother.push({isAlive: true});
                                console.log(123,scope.brother);
                            }
                        }
                        else {
                            for (var y = scope.brother.length; y > newValue; y--) {
                                scope.brother.pop();
                            }
                        }
                    }
                }) ;


            }
        };

    }]);