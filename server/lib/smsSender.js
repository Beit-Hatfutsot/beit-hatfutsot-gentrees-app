var savedFilesDir = process.env.SAVED_FILES_DIR || (__dirname + '/../../'),
    path = require('path'),
    fs = require('fs'),
    request = require("request"),
    Q = require('q');

var smsServerUrl = 'https://rest.nexmo.com/sms/json',
      from = 'Beit Hatfutsot',
      filePath = path.join(savedFilesDir, 'SmsApiKey.txt');

exports = module.exports = {

    send: function (code, phoneNum) {

        return Q.nfcall(fs.readFile, filePath, "utf-8").then(function (data) {
            var to = '972' + phoneNum.substr(1),
                text = code,
                fileData = JSON.parse(data);

            var deferred = Q.defer();

            request({
                uri: smsServerUrl,
                method: "POST",
                form: {
                    api_key: fileData.apiKey ,
                    api_secret :fileData.apiSecret ,
                    from:from,
                    to:to,
                    text:text
                }
            }, function(error, response, body) {
                deferred.resolve(JSON.parse(body));
            });

            return deferred.promise;

        }).fail(function (err) {
            console.error('Error received:', err);
        });

    }
};
