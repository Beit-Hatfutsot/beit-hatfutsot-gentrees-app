var MongoClient = require('mongodb').MongoClient,
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    csvWriter = require('csv-write-stream');

const UTF8_BOM = '\uFEFF';

//  node export.js --output C:\Users\ofermusaipd\WebstormProjects\beithatfutsot\export\gedcom
//  node export.js --query_file query.json 
//  node export.js --db_name
//  node export.js 
//  node export.js --db_name gentreeDb  --users ofer

var mongoURL;
args = process.argv,
    dbName = getParam("--db_name"),
    userNames = getUserNames(),
    dateStart = getParam("--from_date") || "0",
    dateEnd = getParam("--to_date") || new Date().getTime(),
    outputPath = getParam("--output") || "./gedcom/",
    queryFile = getParam("--query_file"),
    dateNow = Date.now();

function getParam(str) {
    if (args.indexOf(str) != -1) {
        return args[args.indexOf(str) + 1];
    }
}

function getUserNames() {
    var userName = getParam("--users");
    if (!userName) return '';

    var userList = userName.split(',');
    var userNameQ = {$in: []};
    _.each(userList, function (v) {
        userNameQ['$in'].push(v);
    });
    return userNameQ;
}


function initDb() {

    if (dbName) {
        mongoURL = 'mongodb://localhost:27017/' + dbName;
        start();
    } else {
        console.log('db_name param is required ! ')
    }
}

initDb();

function start() {
    if (queryFile) {
        getQueryFromFile(queryFile);
    } else {
        getDataFromDB(getQueryFromParam());
    }
}


function getQueryFromFile() {
    fs.readFile(queryFile, 'utf8', function (err, data) {
        if (err) return {};

        var query = JSON.parse(data);
        getDataFromDB(query);
    });
}

function getQueryFromParam() {
    var userQuery;
    if (userNames) {
        userQuery = [
            //{"queryData.me.firstName": userNames},
            {"queryData.me.phone": userNames},
            {"queryData.me.email": userNames}
        ];

        return {
            $or: userQuery,
            "queryData.dateUpdate": {
                $gte: convertDateFromTimestamp(dateStart),
                $lt: convertDateFromTimestamp(dateEnd)
            }
        };

    } else {
        return {
            "queryData.dateUpdate": {
                $gte: convertDateFromTimestamp(dateStart),
                $lt: convertDateFromTimestamp(dateEnd)
            }
        };
    }

}

function convertDateFromTimestamp(date) {
    return new Date(date * 1000)
}

function getDataFromDB(query) {

    MongoClient.connect(mongoURL, function (err, db) {


        var collection = db.collection('registrations');

        collection.find(query).toArray(function (err, docs) {

            if (docs.length > 0) {
                createReport(docs, db);
                createGedcom(docs, db);
            } else {
                console.log('No match found');
                db.close();
            }

        });
    });
}

////////////////////////////////////////// report

var headerList = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    numOfNewPersons: 'New Persons',
    dateAdded: 'Date Added',
    dateUpdate: 'Date Update',
    savingLocation: 'Nation',
    isNewFolder: 'New Folder',
    gedcomLink: 'Gedcom Link'
};

var header = [];
_.each(headerList, function (v, k) {
    header.push(v);
});

function createReport(docs, db) {

    var data = _.groupBy(docs, function (v) {
        return v.queryData.savingLocation
    });

    _.each(data, function (locations, nation) {

        var writerCsv = csvWriter({headers: header});
        var fileName = 'summary_report';
        nation = checkNationality(nation,fileName);

        writerCsv.pipe(createFileStream(fileName, nation));

        _.each(locations, function (value) {
            var dataToWrite = {};
            setCalculatedDataProperty(value, nation);
            _.each(headerList, function (v, k) {
                dataToWrite[v] = value.queryData[k] || value.queryData.me[k];
            });
            writerCsv.write(dataToWrite)
        });
        writerCsv.end();
        console.log('Saving Succeed', dateNow + fileName);
    });

    db.close();
}



function createFileStream(fileName, dir) {
	console.log(fileName, dir)

    var filePath = path.join(outputPath, dir);

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
    var stream = fs.createWriteStream(path.join(filePath, fileName + '.csv'));
    stream.write(UTF8_BOM);
    return stream;
}

function setCalculatedDataProperty(value, nation) {
    value.queryData.numOfNewPersons = calculateNumOfNewPersons(value);
    value.queryData.gedcomLink = 'file://' + path.join(path.join(outputPath, nation), value._id + '.ged');
    value.queryData.isNewFolder = value.queryData.dateAdded == value.queryData.dateUpdate ? ' 1' : ' 0';
}

function calculateNumOfNewPersons(data) {


    if (!data.familyTrees)  return;

    var firstTree = data.familyTrees[data.familyTrees.length - 1];
    var firstTotal = firstTree.brothers && firstTree.brothers.length + firstTree.momsBrothers && firstTree.momsBrothers.length || 0 + firstTree.dadsBrothers && firstTree.dadsBrothers.length || 0;

    var result;
    if (data.familyTrees.length > 1) {
        var secondTree = data.familyTrees[data.familyTrees.length - 2];
        var secondTotal = secondTree.brothers && secondTree.brothers.length || 0 + secondTree.momsBrothers && secondTree.momsBrothers.length || 0 + secondTree.dadsBrothers && secondTree.dadsBrothers.length || 0;
        result = firstTotal - secondTotal;
    } else {
        result = firstTotal;
    }
    return result.toString();
}

////////////////////////////////////////// gedcom

var familyMap = {
    "me": {
        "famc": 'fam'
    },
    "dad": {
        "famc": 'dadsFam',
        "fams": 'fam'
    },
    "mom": {
        "famc": 'momsFam',
        "fams": 'fam'
    },
    "momsDad": {
        "fams": 'momsFam'
    },
    "momsMom": {
        "fams": 'momsFam'
    },
    "dadsDad": {
        "fams": 'dadsFam'
    },
    "dadsMom": {
        "fams": 'dadsFam'
    },
    "brothers": {
        "famc": 'famc'
    },
    "momsBrothers": {
        "famc": 'momsFam'
    },
    "dadsBrothers": {
        "famc": 'dadsFam'
    }
};

var clearBlankLines = function (str) {
    return str && str.split('\n').filter(function (l) {
            return Boolean(l);
        }).join('\n');
};

var familyTpl = function (model) {

    var arr = _.flatten([
        '0 HEAD',
        '1 GEDC',
        '2 VERS 5.5.1',
        '1 CHAR UTF-8',
        '0 @momsFam@ FAM',
        '1 HUSB @momsDad@',
        '1 WIFE @momsMom@',
        '1 CHIL @mom@',
        model.momsBrothers && model.momsBrothers.map(function (b, i) {
            return '1 CHIL @momsBrothers' + (i * 1 + 1) + '@';
        }),
        '0 @dadsFam@ FAM',
        '1 HUSB @dadsDad@',
        '1 WIFE @dadsMom@',
        '1 CHIL @dad@',
        model.dadsBrothers && model.dadsBrothers.map(function (b, i) {
            return '1 CHIL @dadsBrothers' + (i * 1 + 1) + '@';
        }),
        '0 @fam@ FAM',
        '1 HUSB @dad@',
        '1 WIFE @mom@',
        '1 CHIL @me@',
        model.brothers && model.brothers.map(function (b, i) {
            return '1 CHIL @brothers' + (i * 1 + 1) + '@';
        })
    ]);

    return arr.join('\n') + '\n';
};


var individualTpl = function (id, ind, fam, image, fileName) {

    var line = function (level, prop, value) {
        if (value === undefined) {
            return '';
        }
        return [level, prop, value].join(' ').trim();
    };

    return [
        [0, '@' + id + '@', 'INDI'],
        [1, 'NAME', ind.firstName + ' ' + (ind.lastName ? '/' + ind.lastName + '/' : '')],
        [1, 'EMAIL', ind.email],
        [1, 'PHON', ind.phone ? ind.phone : undefined],
        [1, 'SEX', ind.isMale ? 'M' : 'F'],
        [1, 'BIRT', ind.dateOfBirth || ind.placeOfBirth ? '' : undefined],
        [2, 'DATE', ind.dateOfBirth],
        [2, 'PLAC', ind.placeOfBirth],
        [1, 'DEAT', ind.dateOfDeath ? '' : undefined],
        [2, 'DATE', ind.dateOfDeath],
        [1, 'FAMC', fam.famc ? '@' + fam.famc + '@' : undefined],
        [1, 'FAMS', fam.fams ? '@' + fam.fams + '@' : undefined],
        [1, 'OBJE', image ? '' : undefined],
        [2, 'FORM', image ? 'jpg' : undefined],
        [2, 'FILE', image ? fileName + '_' + id + '.jpg' : undefined],
        [2, 'TITL', image ? fileName + '_' + id + '.jpg' : undefined],
        [2, '_TYPE', image ? 'PHOTO' : undefined],
        [2, '_PRIM', image ? 'Y' : undefined]
    ].map(
        function (args) {
            return line.apply(this, args);
        });
};

function addCommentToGetcoms(str) {
    return ['1 NOTE ' + str];
}


var ignoreKeys = ['numBrothers', 'numDadsBrothers', 'numMomsBrothers', 'image', 'savingLocation', 'isNewFolder', 'dateAdded', 'dateUpdate', 'numOfNewPersons'];
var gedcomFromModel = function (model, fileName) {

    var individualsGedcoms = _.flatten(_.map(model, function (v, k) {
            if (k === 'brothers' || k === 'dadsBrothers' || k === 'momsBrothers') {
                var fam = familyMap[k];
                return _.map(v, function (brother, index) {
                    var data = {id: k + (index + 1), fam: fam, ind: brother};
                    return individualTpl(data.id, data.ind, data.fam, model.image[k], fileName);
                });
            } else if (ignoreKeys.indexOf(k) > -1) {
                return '';
            } else {
                var data = {id: k, fam: familyMap[k], ind: v};
                return individualTpl(data.id, data.ind, data.fam, model.image[k], fileName);
            }
        })
    );

    var gedcom = familyTpl(model) + individualsGedcoms.join('\n') + addCommentToGetcoms('Stockpile ' + model.savingLocation) + '\n0 TRLR\n';

    return clearBlankLines(gedcom);
};


function createGedcom(docs, db) {

    _.each(docs, function (v) {
        if (v.familyTrees) {
            var model = v.familyTrees[v.familyTrees.length - 1];
            var fileName = v._id + '.ged';
            var gedcomText = gedcomFromModel(model, fileName);

            var dir = checkNationality(model.savingLocation,fileName);
            saveFile(fileName, dir, gedcomText);
        }
    });

    db.close();
}

function saveFile(fileName, dir, data) {

    var filePath = path.join(outputPath, dir);

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }

    fs.writeFile(path.join(filePath, fileName), data, function () {
        console.log('Saving Succeed', fileName);
    });
}


function checkNationality(dir,fileName){
    if(!dir || dir =='false'){
        console.log('Cant find file nationality, File Name:', fileName);
        console.log('Use default /"beitHatfutsot/"');
        dir = 'beitHatfutsot';
    }
    return dir;
}




