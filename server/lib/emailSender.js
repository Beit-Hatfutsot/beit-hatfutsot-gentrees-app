var _ = require('lodash'),
    nodemailer = require('nodemailer'),
    Q = require('q'),
    settings = require(process.env.EMAIL_SETTINGS_JSON_PATH || __dirname + '/email/emailSenderSettings.json');

var transporter = settings && settings.transport && nodemailer.createTransport(settings.transport),
    sendMail = transporter && Q.nbind(transporter.sendMail, transporter);


exports = module.exports = {

    send: function (mailOptions) {
        mailOptions = _.defaults(mailOptions, settings.mailOptions);

        if (!transporter) {
            console.log('Email Service is disabled. Would have sent: ' + JSON.stringify(mailOptions));
            return Q.when();
        }

        console.log(mailOptions);

        return sendMail(mailOptions);
    }
};
