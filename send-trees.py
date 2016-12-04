import os
import sys
import time
import yaml
import logging
import smtplib
import calendar
from datetime import datetime
from argparse import ArgumentParser
import subprocess
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

    out_dir = '/home/ftapp/trees'
    # get the email conf
    with open('/etc/bhs/app_server.yaml') as f:
        conf = yaml.load(f)
    if not os.path.exists(out_dir):
        os.mkdir(out_dir)

    ret = subprocess.call(['node', 'export/export.js', '--db_name', args.dbname,
                '--output', out_dir,
                '--from_date', args.since, '--to_date', args.until])
    if False:
        print "export.js returned an error:"
        logging.error(ret)
        exit(-1)

    os.chdir(out_dir)
    if os.path.exists('/tmp/idf-trees.zip'):
        os.remove('/tmp/idf-trees.zip')
    find = subprocess.Popen(['find', ".", '-name', 'summary_report.csv'],
                            stdout = subprocess.PIPE)
    zip = subprocess.Popen(['zip', '-r', '/tmp/idf-trees.zip', '-@'],
                            stdin = find.stdout)
    zip.communicate()
    msg = MIMEMultipart()
    msg['Subject'] = 'Summary from the IDF app'
    msg['From'] = conf['email_from']
    msg['To'] = args.email
    # attach the file
    with open('/tmp/idf-trees.zip', "rb") as fil:
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
