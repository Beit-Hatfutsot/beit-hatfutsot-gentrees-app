'use strict';

angular.module('gt.app').controller('gtSavedTreeCtrl', ['$scope', '$state', function ($scope, $timeout) {

  if(!localStorage.getItem('imageStepProgressing')){
      localStorage.setItem('imageStepProgressing',true);
  }

}]);