'use strict';

angular.module('gt.app').factory('gtDialogsSvc',
    [
        '$modal',

        function ($modal) {


            function showMessage(message, title, isError){
                return $modal.open({
                    size: 'sm',
                    templateUrl: 'modules/gt.app/views/partials/messageDialog.html',
                    controller: ['$scope', '$modalInstance', function($scope, $modalInstance){
                        $scope.message = message;
                        $scope.title = title;
                        $scope.isError = isError;

                        $scope.ok = function(){
                            $modalInstance.dismiss();
                        };
                    }]
                })
                .result;
            }

            var exports = {

                showMessage: showMessage
            };

            return exports;

        }
    ]
);