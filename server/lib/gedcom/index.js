
var _ = require('lodash'),
    fs = require('fs'),
    individualTpl = _.template(fs.readFileSync( __dirname + '/individual.tpl')),
    familyTpl = _.template(fs.readFileSync(__dirname + '/family.tpl'));


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
    }
};


var clearBlankLines = function(str){
    return str && str.split('\n').filter(function(l){return Boolean(l);}).join('\n');
}


//see http://wiki-en.genealogy.net/GEDCOM-Tags
//see http://genealogy.about.com/od/family_tree_software/a/Genealogy-Gedcom.htm
//see http://www.phpgedview.net/ged551-5.pdf

var gedcomFromModel = function(model){

    console.log(model);

    var individualsGedcoms =
        _.flatten(
            _.map(model, function(v, k){
               if(k==='brothers') {
                   return _.map(v, function (brother, index) {
                       var data = {id: 'b' + (index + 1), fam: {famc: 'fam'}, ind: brother};
                       return individualTpl(data);
                   });
               }else if(k==='numBrothers'){
                   return '';
               }else{
                   var data = {id: k, fam:familyMap[k], ind: v};
                   //console.log(data);
                   return individualTpl(data);
               }
            })
        );

    console.log(individualsGedcoms);

    var gedcom = familyTpl(model) + individualsGedcoms.join('\n') + '0 TRLR\n';

    return clearBlankLines(gedcom);
};

module.exports = gedcomFromModel;

