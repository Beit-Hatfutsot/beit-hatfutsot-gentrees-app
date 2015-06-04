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
                    controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                        $scope.header = header;


                        $scope.dates = {

                            year: {
                                title: 'Year',
                                value: 0,
                                min: 1700,
                                max: 2100
                            },
                            mounth: {
                                title: 'Mounth',
                                value: 0,
                                min: 1,
                                max: 12
                            },
                            day: {
                                title: 'Day',
                                value: 0,
                                min: 1,
                                max: 31
                            }
                        };

                        console.log(date)

                        if (date) {
                            var temp = date.split('/');
                            $scope.dates.day.value = temp[0] * 1;
                            $scope.dates.mounth.value = temp[1] * 1;
                            $scope.dates.year.value = temp[2] * 1;
                        }

                        $scope.ok = function () {

                            var day = $scope.dates.day.value;
                            var mounth = $scope.dates.mounth.value;
                            var year = $scope.dates.year.value;

                            if (!year)
                                return;

                            mounth = mounth || 0;
                            day = day || 0;

                            var result = day + '/' + mounth + '/' + year;
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