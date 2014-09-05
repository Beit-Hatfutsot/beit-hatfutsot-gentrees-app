var router = new require('express').Router(),
    Q = require('q'),
    registration = require('./registration');

function apiAction(fn){

    return function(req, res){

        Q.when()
            .then(function(){
                console.log(req.body);
                return fn(req);
            })
            .then(function(data){
                res.json(data);

            }).catch(function(err){
                console.lgo(err);
                res.status(500).json(err);
            });
    }
}

router.post('/registration/mail', apiAction(function (req) {
    return registration.sendMail(req.body.deviceId, req.body.email);
}));

router.post('/registration/confirm', apiAction(function(req) {
    return registration.confirm(req.body.deviceId, req.body.code);
}));

router.post('/save', apiAction(function(req) {
    console.log(req.body);
    return 'saved';
}));


module.exports = router;