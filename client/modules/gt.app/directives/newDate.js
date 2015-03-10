'use strict';

angular.module('gt.app').directive('gtNewDate',
    ['$timeout', function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'modules/gt.app/directives/newDate.html',
            link: function (scope, element, attrs) {

                scope.isOpen = false;
                scope.date ={};
                if(scope.model)
                {
                    var temp = scope.model.split('/');
                    scope.date['day'] = temp[0] * 1;
                    scope.date['mounth'] = temp[1] * 1;
                    scope.date['year'] = temp[2] * 1;
                }
                scope.save = function(){
                    if(!scope.date['day'])
                        scope.date['day'] = 0;

                    if(!scope.date['mounth'])
                        scope.date['mounth'] = 0;

                    if(!scope.date['year'])
                        scope.date['year'] = 0;

                    scope.model = scope.date['day'] +'/' + scope.date['mounth'] +'/' + scope.date['year'];
                    scope.isOpen = false;
                };

            }
        };

    }]);