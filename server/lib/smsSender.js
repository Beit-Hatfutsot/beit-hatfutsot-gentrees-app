var smsApiKey = process.env.SMS_API_KEY,
    smsApiSecret = process.env.SMS_API_SECRET,
    request = require("request"),
    Q = require('q'),
    smsServerUrl = 'https://rest.nexmo.com/sms/json',
    from = 'Beit Hatfutsot';

exports = module.exports = {

    send: function (code, phoneNum) {
        console.log('smsSenderSend');

        var deferred = Q.defer();

        request({
            uri: smsServerUrl,
            method: "POST",
            form: {
                api_key: smsApiKey ,
                api_secret :smsApiSecret ,
                from:from,
                to:'972' + phoneNum.substr(1),
                text: code
            }
        }, function(error, response, body) {
            deferred.resolve(JSON.parse(body));
        });

        return deferred.promise;

    }
};
