'use strict';

angular.module('gt.app').config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

angular.module('gt.app').factory('gtRegistrationSvc',
    [
        '$http', 'rfc4122', '$rootScope', 'gtDialogsSvc',

        function ($http, rfc4122, $rootScope, dialogsSvc) {

            function wrap(promise, title, successMessage) {
                $rootScope.showSpinner = true;
                promise.finally(function () {
                    $rootScope.showSpinner = false;
                });
                return promise.then(
                    function (data) {
                        if (successMessage) {
                            return dialogsSvc.showMessage(successMessage, title, false).then(function () {
                                return data;
                            });
                        }
                        return data;
                    }).catch(function (err) {
                        return dialogsSvc.showMessage(err.message || err.data.message || (err.data && err.data.response) || err.statusText || err, title, true).then(function () {
                            return promise;
                        });
                    })
            }

            var functions = {
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

                sendSMS: function () {
                    var phoneNum = angular.fromJson(localStorage.model).me.phone;
                    var deviceId = localStorage.deviceId || rfc4122.v4();

                    return $http.post('api/v1/registration/sms', {deviceId: deviceId, phoneNum: phoneNum})
                        .then(function (res) {
                            localStorage.deviceId = deviceId;
                        })
                },

                saveModel: function (model) {
                    return $http.post('api/v1/save', {
                        deviceId: localStorage.deviceId,
                        code: localStorage.confirimationCode,
                        model: model
                    });
                },
                saveTree: function (model) {
                    return $http.post('api/v1/saveTree', {
                        deviceId: localStorage.deviceId,
                        model: model
                    });
                }
            };

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
                    return wrap(functions.confirm(code), 'Confirmation Code');
                },

                sendMail: function (email) {
                    return wrap(functions.sendMail(email), 'Confirm Email');
                },
                sendSMS: function () {
                    return wrap(functions.sendSMS(), 'Confirm SMS','SMS success');
                },
                saveModel: function (model, message) {
                    return wrap(functions.saveModel(model), 'Save Tree', message);
                },
                saveTree: function (model) {
                    return functions.saveTree(model);
                }
            };

            return exports;

        }
    ]
);