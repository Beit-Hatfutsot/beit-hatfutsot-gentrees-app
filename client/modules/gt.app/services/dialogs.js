'use strict';

angular.module('gt.app').factory('gtDialogsSvc',
    [
        '$modal',

        function ($modal) {

            function showMessage(message, title, isError) {
                return $modal.open({
                    size: 'sm',
                    templateUrl: 'modules/gt.app/views/partials/messageDialog.html',
                    controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                        $scope.message = message;
                        $scope.title = title;
                        $scope.isError = isError;

                        $scope.ok = function () {
                            $modalInstance.close();
                        };
                    }]
                })
                    .result;
            }

            function openDateDialog(header, date) {
                return $modal.open({
                    size: 'lg',
                    windowClass: 'date-modal',
                    templateUrl: 'modules/gt.app/views/partials/dateDialog.html',
                    controller: ['$scope', '$modalInstance', '$filter', function ($scope, $modalInstance, $filter) {
                        $scope.header = header;
                        $scope.dates = [
                            {
                                title: 'Day',
                                value: 0,
                                min: 1,
                                max: 31,
                                sort: 3
                            },
                            {
                                title: 'Mounth',
                                value: 0,
                                min: 1,
                                max: 12,
                                sort: 2
                            },
                            {
                                title: 'Year',
                                value: 0,
                                min: 1700,
                                max: 2100,
                                sort: 1
                            }
                        ];

                        if (date) {
                            var tempDates = date.split('/');
                            _.each(tempDates, function (v, i) {
                                $scope.dates[i].value = v * 1;
                            });
                        }

                        $scope.ok = function () {

                            var day = $scope.dates[0].value || 0;
                            var mounth = $scope.dates[1].value || 0;
                            var year = $scope.dates[2].value;

                            if (!year)
                                return;

                            var result = day + '/' + mounth + '/' + year;
                            var d = new Date(mounth + '/' + day + '/' + year);

                            $modalInstance.close(result);
                        };

                        $scope.close = function () {
                            $modalInstance.close();
                        };
                    }]
                })
                    .result;
            }

            var exports = {
                showMessage: showMessage,
                openDateDialog: openDateDialog
            };

            return exports;

        }
    ]
);