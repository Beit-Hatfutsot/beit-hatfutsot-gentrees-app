Pre-requisites
==============
+ mongodb server

+ node and npm
 
+ gulp and bower install globally

Server env variables
====================

+ `PORT`
Default `3000`.

+ `SAVED_FILES_DIR`
Default `'../../'`.

+ `MONGO_URL`
Default `'mongodb://localhost:27017/gentreeDb'`.

+ `EMAIL_SETTINGS_JSON_PATH`
Default `server/lib/email/emailSenderSettings.json'`.
Example for the file contents can be found in the default path. 
For transport and settings options see http://www.nodemailer.com/ and the config for smtp transport and well-known services.

+ `EMAIL_BODY_TPL_PATH`
Default `server/lib/email/emailTpl.html'`
Example for the file contents can be found in the default path.
Two variables are available for embedding `${code}` and `${baseUrl}`


Deployment and build
====================

Deploy the code using git clone/pull/fetch and then install client and server dependencies

```
git clone https://danikenan.unfuddle.com/git/danikenan_beithatfutsot code 
cd code
npm install
bower install
```

To start local server for dev purposes, run `gulp` and open your browser at `http://localhost:3000`.

To compile and deploy client code into server public dir run run `gulp rebuild-client`.

The server main file is `server.js`.

