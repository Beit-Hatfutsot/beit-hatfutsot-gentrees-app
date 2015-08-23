var savedFilesDir = process.env.SAVED_FILES_DIR || (__dirname + '/../../'),
    mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/gentreeDb',
    emailTplPath = process.env.EMAIL_BODY_TPL_PATH || (__dirname + '/email/emailTpl.html');

var emailSender = require('./emailSender'),
    smsSender = require('./smsSender'),
    Q = require('q'),
    gedcom = require('./gedcom'),
    fs = require('fs'),
    _ = require('lodash')
path = require('path'),
    MongoClient = require('mongodb').MongoClient;


var collPromise = (function () {
        return Q.ninvoke(MongoClient, 'connect', mongoURL).then(function (db) {
            return db.collection('registrations');
        }).catch(function (err) {
            console.error(err.message, err.stack);
            process.exit(1);
        });
    })(),
    collInvoke = function () {
        var args = Array.prototype.slice.call(arguments),
            methodName = args.shift();
        return collPromise.then(function (coll) {
            return Q.npost(coll, methodName, args);
        });
    };

var emailTpl = _.template(fs.readFileSync(emailTplPath, 'utf-8'));

function generateCode(length) {
    var text = '',
        possible = "01234567890123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


exports.sendMail = function (deviceId, email, baseUrl) {

    var code = generateCode(4);

    return saveDeviceIdAndCode(deviceId, code).then(function () {
        console.log('sending email');
        console.log('code', code);
        // remove only when try to register
        return emailSender.send({
            to: email,
            html: emailTpl({code: code, baseUrl: baseUrl})
        })
            .then(function () {
                console.log('completed sending email');
                return null;
            }).catch(function (err) {
                console.log('Cant sending email 1', err);
                throw new Error('Cant sending email');
            });
    });
};

function saveDeviceIdAndCode(deviceId, code) {

    return collInvoke('findOne', {_id: deviceId}).then(function (doc) {

        if (doc && doc.smsSendingCount >= 10) {
            throw new Error('Cant sending sms more than 10 times');
        }

        var query = {_id: deviceId},
            data = {
                _id: deviceId,
                code: code,
                createdAt: new Date(),
                confirmedAt: null,
                smsSendingCount: doc ? doc.smsSendingCount + 1 : 0
            },
            options = {upsert: true};

        return collInvoke('update', query, data, options)
    });

}

exports.sendSMS = function (deviceId, phoneNum) {

    var code = generateCode(4);
    return saveDeviceIdAndCode(deviceId, code).then(function () {
        return smsSender.send(code, phoneNum)
            .then(function (res) {
                if (res.messages[0].status != 0) {
                    throw new Error('Cant sending sms');
                }
            }).catch(function (err) {
                throw new Error('Cant sending sms');
            });
    });
};


exports.confirm = function (deviceId, code) {

    return collInvoke('findOne', {_id: deviceId, code: code}).then(function (doc) {

        if (!doc) {
            throw new Error('Invalid code or deviceId');
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


exports.save = function (deviceId, code, model) {

    /*var fileName = Date.now() + deviceId;
     var filePath =  path.join(savedFilesDir, Date.now() + deviceId);

     return collInvoke('findOne', {_id: deviceId, code: code}).then(function (doc) {

     _.each(model.image, function (value, key) {
     var base64Data = value.replace(/^data:image\/jpeg;base64,/, "");
     fs.writeFile(filePath + '_' + key + '.jpg', base64Data, 'base64');
     });

     var gedcomText = gedcom(model, fileName);

     if (!doc) {
     throw new Error('Invalid code or deviceId.');
     }

     return Q.nfcall(fs.writeFile, filePath + '.ged', gedcomText);

     });*/
};


// For Testing
/*exports.getTreesByDeviceId = function (deviceId) {
 return collInvoke('findOne', {_id: deviceId}).then(function (doc) {
 *//*  delete doc.familyTrees;
 delete doc.queryData;
 collInvoke('update', {_id: deviceId}, doc).then(function (doc) {
 });*//*
 return doc;
 });
 };*/

exports.saveTree = function (deviceId, model) {
    return collInvoke('findOne', {_id: deviceId}).then(function (doc) {

        var nowDate = new Date();
        if (!doc.familyTrees) {
            doc.familyTrees = [];
            model.dateAdded = nowDate;
        }

        model.dateUpdate = nowDate;
        model.dateAdded = model.dateAdded || doc.familyTrees[0].dateAdded;

        doc.familyTrees.push(model);

        console.log(' model.dateUpdate', model.dateUpdate);
        doc.queryData = {
            me: model.me,
            savingLocation: model.savingLocation,
            dateAdded: model.dateAdded,
            dateUpdate: model.dateUpdate
        };

        collInvoke('update', {_id: deviceId}, doc).then(function (doc) {
        });

        // createReport(model, deviceId);

        return null;
    });
};


/*


 function createReport(model, deviceId) {


 var headerList = ['firstName', 'lastName', 'email', 'phone', 'DateAdded', 'DateUpdate', 'savingLocation', 'isNewFolder'];
 var header = 'First Name' + '\t' + 'Last Name' + '\t' + 'Email' + '\t' + 'Phone' + '\t' + 'Date Added' + '\t' + 'Date Update' + '\t' + 'Nation' + '\t' + 'New Folder' + '\t' + 'Link To Gedcom' + '\n';

 var userDetails = '';
 _.each(headerList, function (v) {
 if (model[v]) {
 userDetails += model[v] + '\t'
 } else {
 userDetails += model.me[v] + '\t'
 }
 });

 var linkToGedcom = filePath + '.ged' + '\t';

 var result = header + userDetails + linkToGedcom;
 Q.nfcall(fs.writeFile, filePath + '.xls', result);
 }

 */
