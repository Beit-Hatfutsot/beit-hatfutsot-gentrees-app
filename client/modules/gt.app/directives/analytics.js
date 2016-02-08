'use strict';

angular.module('gt.app').directive('gtAnalyticsEvents',
    [function () {

        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attr) {

                if (attr.analyticsEventsType === 'load') {
                    console.log('Analytics load:', attr.gtAnalyticsEvents);
                    console.log('Event Time:', new Date());
                }

                if (attr.analyticsEventsType  === 'click') {
                    element.on('click', function () {
                        console.log('Analytics click: ', attr.gtAnalyticsEvents);
                        console.log('Event Time:', new Date());
                    });
                }

            }
        };

    }]);