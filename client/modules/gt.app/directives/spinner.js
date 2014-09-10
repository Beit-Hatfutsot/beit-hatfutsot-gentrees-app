'use strict';

angular.module('gt.app').directive('gtSpinner', [function () {

        return {
            restrict: 'E',
            scope: {
                model: '='
            },
            template: '<div class="loading-backdrop" ng-show="model"><i class="fa fa-spinner fa-spin"></i></div>'
        };

    }]);