var savedFilesDir = process.env.SAVED_FILES_DIR ||  (__dirname + '/../../'),
    mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/gentreeDb',
    emailTplPath = process.env.EMAIL_BODY_TPL_PATH || (__dirname + '/email/emailTpl.html');

var emailSender = require('./emailSender'),
    Q = require('q'),
    gedcom = require('./gedcom'),
    fs = require('fs'),
    _ = require('lodash')
    path = require('path'),
    MongoClient = require('mongodb').MongoClient;


var collPromise = (function(){
        return  Q.ninvoke(MongoClient, 'connect', mongoURL).then(function(db){
            return db.collection('registrations');
        }).catch(function(err){
            console.err(err.message, err.stack);
            process.exit(1);
        });
    })(),
    collInvoke = function(){
        var args = Array.prototype.slice.call(arguments),
            methodName = args.shift();
        return collPromise.then(function(coll){
            return Q.npost(coll, methodName, args);
        });
    };

var emailTpl = _.template(fs.readFileSync(emailTplPath, 'utf-8'));

function generateCode(length) {
    var text = '',
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789__--++^^%%$$##@@!!";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


exports.sendMail = function (deviceId, email, baseUrl) {

    var code = generateCode(6),
        query = {_id: deviceId},
        data = {_id: deviceId, code: code, createdAt: new Date(), confirmedAt: null},
        options = {upsert: true};

    return collInvoke('update', query, data, options)
        .then(function () {
            console.log('sending email');
            return emailSender.send({
                to: email,
                html: emailTpl({code: code, baseUrl: baseUrl})
            })
            .then(function () {
                console.log('completed sending email');
                return null;
            });
        });
};

exports.confirm = function (deviceId, code) {

    return collInvoke('findOne', {_id: deviceId, code: code}).then(function (doc) {

        if (!doc) {
            throw new Error('Invalid code or deviceId.');
        }

        if (!doc.confirmedAt) {
            doc.confirmedAt = new Date();
            return collInvoke('update', {_id: deviceId}, doc).then(function () {
                return null;
            });
        }

        return null;

    });
};


exports.save = function(deviceId, code, model){

    var gedcomText = gedcom(model),
        filePath = path.join(savedFilesDir, Date.now() + deviceId + '.ged');

    return collInvoke('findOne', {_id: deviceId, code: code}).then(function (doc) {

        if (!doc) {
            throw new Error('Invalid code or deviceId.');
        }
        return Q.nfcall(fs.writeFile, filePath, gedcomText);

    });
}

