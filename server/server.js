var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    apiRouter = require('./lib/apiRouter');

var app = express();
app.use(morgan('dev')); //'combined'
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/api/v1', apiRouter);

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});


