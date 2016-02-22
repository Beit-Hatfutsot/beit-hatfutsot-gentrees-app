'use strict';

angular.module('gt.app').controller('gtWelcomeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.style = {
        backgroundColor: $rootScope.configOption.color
    };

}]);