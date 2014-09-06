'use strict';

angular.module('gt.app').factory('gtRegistrationSvc',
    [
        '$http', 'rfc4122',

        function ($http, rfc4122) {


            var exports = {

                get status() {
                    if (localStorage.confirimationCode) {
                        return 'confirmed';
                    }
                    if (localStorage.deviceId) {
                        return 'pending';
                    }
                    return 'init';
                },

                confirm: function (code) {
                    return $http.post('api/v1/registration/confirm', {code: code, deviceId: localStorage.deviceId})
                        .then(function (result) {
                            if (Boolean(result)) {
                                localStorage.confirimationCode = code;
                                return true;
                            }
                            return false;
                        });
                },

                sendMail: function (email) {
                    var deviceId = localStorage.deviceId || rfc4122.v4();
                    return $http.post('api/v1/registration/mail', {deviceId: deviceId, email: email})
                        .then(function () {
                            localStorage.deviceId = deviceId;
                        });
                },

                saveModel : function(model){
                    return $http.post('api/v1/save', {
                            deviceId: localStorage.deviceId,
                            code: localStorage.confirimationCode,
                            model: model
                        });
                }
            };

            return exports;

        }
    ]
);