'use strict';

angular.module('gt.app').factory('gtRegistrationSvc',
    [
        '$http', 'rfc4122',

        function ($http, rfc4122) {

            localStorage.deviceId = localStorage.deviceId || rfc4122.v4();

            var exports =  {

                get confirmed (){
                    return Boolean(localStorage.confirmed);
                },

                confirm : function(code){
                    return $http('api/v1/registration/confirm', {
                        json: true,
                        body: JSON.stringify({code: code, deviceId: localStorage.deviceId})
                    }).then(function(result){
                        localStorage.confirmed = Boolean(result.confirmed);
                    });
                },

                sendMail : function(email){
                    return $http('api/v1/registration/mail', {
                        json: true,
                        body: JSON.stringify({deviceId: localStorage.deviceId, email: email})
                    });
                }
            }

        }
    ]
);