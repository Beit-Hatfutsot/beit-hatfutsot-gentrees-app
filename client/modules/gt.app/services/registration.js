'use strict';

angular.module('gt.app').factory('gtRegistrationSvc',
    [
        '$http', 'rfc4122', '$rootScope', 'gtDialogsSvc',

        function ($http, rfc4122, $rootScope, dialogsSvc) {

            function wrap(promise, title, successMessage){
                $rootScope.showSpinner = true;
                promise.finally(function(){
                    $rootScope.showSpinner = false;
                });
                return promise.then(
                    function(data){
                        if(successMessage){
                            return dialogsSvc.showMessage(successMessage, title, false).then(function(){
                                return data;
                            });
                        }
                        return data;
                    }).catch(function(err){
                        return dialogsSvc.showMessage(err.message  || err.data.message  || (err.data && err.data.response) || err.statusText || err, title, true).then(function(){
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

                sendSMS: function (confirmPassword) {
                    var baseUrl ='https://rest.nexmo.com/sms/json';
                    var phoneNum = angular.fromJson(localStorage.model).me.phone;

                   // "https://rest.nexmo.com/sms/json?api_key={api_key}&api_secret={api_secret}&from=MyCompany20&to=447525856424&text=D%c3%a9j%c3%a0+vu"



                    var deviceId = localStorage.deviceId || rfc4122.v4();

                    return $http.post('api/v1/registration/sms', {deviceId:deviceId})
                        .then(function (res) {
                            console.log('sms res',res);
                            var from = 'Beit Hatfutsot';
                            var to = phoneNum;
                            var text = res.data.confirmCode;

                            localStorage.deviceId = deviceId;

                            // remove when try to register localy
                            //return $http.get(baseUrl ,{ params: { api_key: res.apiKey ,api_secret :res.apiSecret ,from:from,to:to,text:text}}).then(function (res) {
                            //
                            //    localStorage.deviceId = deviceId;
                            //
                            //}).catch(function(err){
                            //    console.log('sms nexmo err',err);
                            //    throw  new Error('Cant sending sms');
                            //});
                        });

                },


                saveModel : function(model){
                    return $http.post('api/v1/save', {
                        deviceId: localStorage.deviceId,
                        code: localStorage.confirimationCode,
                        model: model
                    });
                },
                saveTree : function(model){
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
                sendSMS: function (email) {
                    return wrap(functions.sendSMS(email), 'Confirm Email');
                },
                saveModel : function(model,message){
                    return wrap(functions.saveModel(model), 'Save Tree', message);
                },
                saveTree : function(model){
                    return functions.saveTree(model);
                }
            };

            return exports;

        }
    ]
);