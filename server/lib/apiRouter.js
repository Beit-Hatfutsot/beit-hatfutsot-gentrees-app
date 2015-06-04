var router = new require('express').Router(),
    Q = require('q'),
    registration = require('./registration');

function apiAction(fn){

    return function(req, res){

        Q.when()
            .then(function(){
                console.log('body', req.body);
                return fn(req);
            })
            .then(function(data){
                res.json(data);

            }).catch(function(err){
                console.log('err',err);
                res.status(500).json({ message:err.message,error:err})
            });
    }
}


var getBaseUrl = function(req){
    //hack - since production node may be behind load balancer. (balancer get https and passes the node http without x-forwared-proto)
    var protocol = 'https';
    if (req.get('host').indexOf('localhost:') >= 0) {
        protocol = 'http';
    }
    return protocol  + '://' + req.get('host');
};

router.post('/registration/mail', apiAction(function (req) {
    return registration.sendMail(req.body.deviceId, req.body.email, getBaseUrl(req));
}));

router.post('/registration/confirm', apiAction(function(req) {
    return registration.confirm(req.body.deviceId, req.body.code);
}));

router.post('/save', apiAction(function(req) {
    //console.log(req.body);
    return registration.save(req.body.deviceId, req.body.code, req.body.model);
}));

// For Testing
/*router.get('/trees', apiAction(function(req) {
     return registration.getTreesByDeviceId(req.query.deviceId);
}));*/
router.post('/saveTree', apiAction(function(req) {
    return registration.saveTree(req.body.deviceId, req.body.model);
}));


module.exports = router;