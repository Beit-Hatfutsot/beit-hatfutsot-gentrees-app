import os
import sys
import time
import yaml
import logging
import smtplib
import calendar
from datetime import datetime
from argparse import ArgumentParser
from subprocess import call
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('-t', '--to')
    parser.add_argument('-s', '--since', default="0")
    parser.add_argument('-u', '--until', default=str(calendar.timegm(time.gmtime())))
    parser.add_argument('-d', '--dbname')
    parser.add_argument('-e', '--email')
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()
    if not args.dbname:
        logging.error( 'Missing  database name')
        sys.exit(1)

    out_basename = datetime.now().strftime("%Y%m%d%H%M")
    out_dir = '/tmp/{}'.format(out_basename)
    # get the email conf
    with open('/etc/bhs/config.yml') as f:
        conf = yaml.load(f)
    if not os.path.exists(out_dir):
        os.mkdir(out_dir)

    ret = call(['nodejs', 'export/export.js', '--db_name', args.dbname,
                '--output', out_dir,
                '--from_date', args.since, '--to_date', args.until])
    if False:
        print "export.js returned an error:"
        logging.error(ret)
        exit(-1)

    os.chdir('/tmp')
    if os.path.exists('idf-trees.zip'):
        os.remove('idf-trees.zip')
    call(['zip', '-r', 'idf-trees.zip', out_basename])
    msg = MIMEMultipart()
    msg['Subject'] = 'Weekly trees from the IDF app'
    msg['From'] = conf['email_from']
    msg['To'] = args.email
    # attach the file
    with open('idf-trees.zip', "rb") as fil:
        part = MIMEApplication(
            fil.read(),
            Name="idf-trees.zip"
        )
        part['Content-Disposition'] = 'attachment; filename="idf-trees.zip"'
        msg.attach(part)
    # Send the message via our own SMTP server.
    s = smtplib.SMTP(conf['mail_server'], conf['mail_port'])
    s.login(conf['mail_username'], conf['mail_password'])
    s.sendmail(conf['email_from'], args.email, msg.as_string())
    s.close()
