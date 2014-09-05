var Datastore = require('nedb'),
    emailSender = require('./emailSender'),
    Q = require('q'),
    registrationsDb = new Datastore({ filename: __dirname + '/../data/registrations.db' });

registrationsDb.loadDatabase();

var update = Q.nbind(registrationsDb.update, registrationsDb),
    find = Q.nbind(registrationsDb.findOne, registrationsDb);

function generateCode(length) {
    var text = '',
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789__--++^^%%$$##@@!!";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


exports.sendMail = function (deviceId, email) {

    var code = generateCode(6),
        query = {_id: deviceId},
        data = {_id: deviceId, code: code, createdAt: new Date(), confirmedAt: null},
        options = {upsert: true};

    return update(query, data, options)
        .then(function () {
            return emailSender.send({
                to: email,
                html: 'Your code is "' + code + '".'
            })
            .then(function () {
                return {};
            });
        });
};

exports.confirm = function (deviceId, code) {

    return find({_id: deviceId, code: code}).then(function (doc) {

        if (doc) {
            if (!doc.confirmedAt) {
                doc.confirmedAt = new Date();
                return update({_id: deviceId}, doc).then(function () {
                    return true;
                });
            }
            return true;
        }

        return false;

    });
};

