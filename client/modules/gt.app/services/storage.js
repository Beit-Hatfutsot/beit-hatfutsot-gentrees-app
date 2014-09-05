'use strict';

angular.module('gt.app').factory('gtStorageSvc',
    [
        function () {

            return {

                loadModel : function(){
                    return JSON.parse(localStorage.gtModel || '{}');
                },

                storeModel : function(model){
                    localStorage.gtModel = JSON.stringify(model);
                }
            };

        }
    ]
);