var _ = require('lodash'),
    nodemailer = require('nodemailer'),
    Q = require('q');

var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: "vzaidman@hotmail.com",
        pass: "qaqa123$"
    }
}),
    sendMail = Q.nbind(transporter.sendMail, transporter);

var disabled = false;

exports = module.exports = {
    disable: function(){
        disabled = true;
    },
    send: function(mailOptions){
        mailOptions = _.defaults(mailOptions, {
            from: 'dani@test.com',
            subject: 'Confirm'
        });

        if(disabled){
            console.log('Email Service is disabled. would of send: ' + JSON.stringify(mailOptions));
            return Q.when();
        }

        return sendMail(mailOptions);
    }
};
