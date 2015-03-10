'use strict';

angular.module('gt.app').directive('gtImagePicker',
    [ function () {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: 'modules/gt.app/directives/imagePicker.html',
            link: function (scope, element, attrs) {

                var imageInput = element[0].children[0];
                var span = element[0].children[1];
                var image = element[0].children[2];

                scope.chooseFile = function(e){
                    imageInput.click()
                };

                scope.createImage = function(src){
                    var i = new Image();
                    i.src = src;
                    $(i).css({'width':'80px','border-radius':'4px'});
                    $(image).empty();
                    $(image).append(i, null);

                    $(span).hide();
                };

                if(scope.model)
                    scope.createImage(scope.model);


                $(imageInput).change(function(){
                    var file = $(imageInput)[0].files[0];
                    var reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e) {
                            scope.model = e.target.result;
                            scope.createImage(e.target.result);
                        };
                    })(file);
                    reader.readAsDataURL(file);
                })
            }
        };

    }]);