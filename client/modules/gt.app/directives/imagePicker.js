'use strict';
var count =0;
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

                count++;

                if(!scope.model)
                    scope.model = count;

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

                if(localStorage.getItem('image'+scope.model))
                    scope.createImage(localStorage.getItem('image'+scope.model));

                $(imageInput).change(function(){
                    var file = $(imageInput)[0].files[0];
                    var reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e) {

                            var image = new Image();
                            image.src = e.target.result;

                            var width = 300 ;
                            var height = 300 ;
                            if(image.height > image.width)
                                width = width * (image.width/image.height);
                             else
                                height = height * (image.height/image.width);

                            var canvas = document.createElement('canvas'),
                            ctx = canvas.getContext('2d');
                             canvas.width = width;
                             canvas.height =  height;
                            ctx.drawImage(image, 0, 0, width, height);
                            localStorage.setItem('image'+scope.model,canvas.toDataURL("image/jpeg", 0.5));

                            //localStorage.setItem('image'+scope.model,e.target.result);
                            scope.createImage(e.target.result);
                        };
                    })(file);
                    reader.readAsDataURL(file);
                })
            }
        };

    }]);