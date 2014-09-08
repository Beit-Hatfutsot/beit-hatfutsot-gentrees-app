var gedcom = require('../'),
    model = require('./model1.json'),
    fs = require('fs');


var result = gedcom(model);



console.log(result);


fs.writeFileSync('./result.ged', result);

