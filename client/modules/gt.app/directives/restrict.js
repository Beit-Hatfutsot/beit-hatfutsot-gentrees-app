'use strict';

angular.module('gt.app').directive('restrict', ['$parse', function ($parse) {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, controller) {

            scope.$watch(attr.ngModel, function (value) {
                if (!value) {
                    return;
                }

                switch (attr.restrict) {
                    case 'alphanumeric':
                        value = value.replace(/\W/g, '');
                        break;
                    case 'hebrew':
                        var chars = value.match(/[\u0590-\u05FF]/gi);
                        if (chars) {
                            value = chars.join('');
                        }
                        break;
                }


                $parse(attr.ngModel).assign(scope, value);
            });
        }
    }

}]);
