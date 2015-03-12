
var _ = require('lodash'),
    fs = require('fs');


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


var clearBlankLines = function(str){
    return str && str.split('\n').filter(function(l){return Boolean(l);}).join('\n');
}


//see http://wiki-en.genealogy.net/GEDCOM-Tags
//see http://genealogy.about.com/od/family_tree_software/a/Genealogy-Gedcom.htm
//see http://www.phpgedview.net/ged551-5.pdf


var familyTpl = function(model){

    var arr = _.flatten([
        '0 HEAD',
        '1 GEDC',
        '2 VERS 5.5.1',
        '1 CHAR UTF-8',
        '0 @momsFam@ FAM',
        '1 HUSB @momsDad@',
        '1 WIFE @momsMom@',
        '1 CHIL @mom@',
        model.momsBrothers.map(function(b, i){return '1 CHIL @momsBrothers' + (i*1+1) + '@';}),
        '0 @dadsFam@ FAM',
        '1 HUSB @dadsDad@',
        '1 WIFE @dadsMom@',
        '1 CHIL @dad@',
        model.dadsBrothers.map(function(b, i){return '1 CHIL @dadsBrothers' + (i*1+1) + '@';}),
        '0 @fam@ FAM',
        '1 HUSB @dad@',
        '1 WIFE @mom@',
        '1 CHIL @me@',
        model.brothers.map(function(b, i){return '1 CHIL @brothers' + (i*1+1) + '@';})
    ]);

    return arr.join('\n') + '\n';
};


var individualTpl = function(id, ind, fam,image,fileName){

    var line = function(level, prop, value){
        if(value === undefined){
            return '';
        }
        return [level, prop, value].join(' ').trim();
    }

    return [
        [0, '@' + id + '@', 'INDI'],
        [1, 'NAME', ind.firstName + ' ' + (ind.lastName ? '/'+ind.lastName +'/' : '')],
        [1, 'EMAIL', ind.email],
        [1, 'SEX', ind.isMale ? 'M' : 'F'],
        [1, 'BIRT', ind.dateOfBirth || ind.placeOfBirth ? '' : undefined],
        [2, 'DATE', ind.dateOfBirth],
        [2, 'PLAC', ind.placeOfBirth],
        [1, 'DEAT', ind.dateOfDeath ? '' : undefined],
        [2, 'DATE', ind.dateOfDeath],
        [1, 'FAMC',  fam.famc ? '@' + fam.famc + '@' : undefined],
        [1, 'FAMS', fam.fams ? '@' + fam.fams + '@' : undefined ],
        [1, 'OBJE', image ? '' : undefined],
        [2, 'FORM', image ? 'jpg' : undefined ],
        [2, 'FILE',  image ?  fileName +'_'+ id+'.jpg' : undefined  ],
        [2, 'TITL',  image ?  fileName +'_'+ id+'.jpg' : undefined  ],
        [2, '_TYPE', image ? 'PHOTO' : undefined ],
        [2, '_PRIM', image ? 'Y' : undefined ]
    ].map(
        function (args) {
            return line.apply(this, args);
        });
};

var gedcomFromModel = function(model,fileName){

    var individualsGedcoms =
        _.flatten(
            _.map(model, function(v, k){
               if(k==='brothers' || k==='dadsBrothers' || k==='momsBrothers') {
                   var fam = familyMap[k];
                   return _.map(v, function (brother, index) {
                       var data = {id: k + (index + 1), fam: fam, ind: brother};
                       return individualTpl(data.id , data.ind ,data.fam);
                   });

               }else if(k==='numBrothers' || k==='numDadsBrothers' || k==='numMomsBrothers'  || k==='image'){
                   return '';
               }else{
                   var data = {id: k, fam:familyMap[k], ind: v};
                   //console.log(data);
                   return individualTpl(data.id , data.ind ,data.fam,model.image[k],fileName);
               }
            })
        );

    var gedcom = familyTpl(model) + individualsGedcoms.join('\n') + '0 TRLR\n';

    return clearBlankLines(gedcom);
};

module.exports = gedcomFromModel;

