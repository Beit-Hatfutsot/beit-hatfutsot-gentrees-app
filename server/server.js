var express = require('express'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    apiRouter = require('./lib/apiRouter');

var app = express();

app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

app.use(morgan('dev')); //'combined'

app.enable('etag');



app.use(express.static(__dirname + '/public', {
    //etag: true
}));



app.use(bodyParser.json());
app.use('/api/v1', apiRouter);

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});


