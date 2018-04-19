High Level Overview
===================

A web-app that allows to generate a simple family tree.

The data is stored in MondoDB and GEDCOM files are generated and saved in a directory on the server.

Pre-requisites
==============
+ [Docker](https://docs.docker.com/install/)
+ [Docker Compose](https://docs.docker.com/compose/install/)


Development
===========

```
cd beit-hatfutsot-gentrees-app
docker-compose up -d --build
```

client is available at http://localhost:8080/index.html


Deployment
==========

Travis builds and pushes docker image to Docker Hub.

Deployment is managed in [mojp-k8s](https://github.com/beit-hatfutsot/mojp-k8s) under `gentrees` chart.


Weekly Emails
-------------

There is a python that sends a summary zip wihich include the gedcom of all the
added trees and a summary report.  To use the tool you need to install python
enviornment and hav a `/etc/bhs/config.yml` file with the following fields: 
`mail_server`, `mail_port`, `mail_username`, `mail_password`


    $ virtualenv env
    $ . env/bin/activate
    $ pip install -r requirments.txt
    $ python send-trees.py -h

    usage: send-trees.py [-h] [-t TO] [-s SINCE] [-u UNTIL] [-d DBNAME] [-e EMAIL]

    optional arguments:
      -h, --help            show this help message and exit
      -t TO, --to TO
      -s SINCE, --since SINCE
      -u UNTIL, --until UNTIL
      -d DBNAME, --dbname DBNAME
      -e EMAIL, --email EMAIL
