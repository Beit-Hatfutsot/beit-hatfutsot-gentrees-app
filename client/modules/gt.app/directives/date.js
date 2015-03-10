'use strict';

angular.module('gt.app').directive('gtDate',
    [ function ($timeout) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'modules/gt.app/directives/date.html',
            link: function (scope, element, attrs) {

                var dom1 = element.children('input[readonly]')[0],
                    dom2 = element.children('input.hidden')[0];

                jQuery(dom2).mobiscroll().date({
                    theme: 'mobiscroll',
                    display: 'bottom',
                    mode: 'scroller',
                    dateOrder: 'yy mm dd',
                    dateFormat: 'dd/mm/yy'
                });

                jQuery(dom1).on('click tap', function(){
                    jQuery(dom2).mobiscroll('show');
                });
            }
        };

    }]);