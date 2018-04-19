import os
import sys
import time
import yaml
import logging
import smtplib
import calendar
from argparse import ArgumentParser
import subprocess
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart


class SendTreesCommand(object):

    def _parse_args(self):
        parser = ArgumentParser()
        parser.add_argument('-t', '--to')
        parser.add_argument('-s', '--since', default="0")
        parser.add_argument('-u', '--until', default=str(calendar.timegm(time.gmtime()) * 1000))
        parser.add_argument('-d', '--dbname')
        parser.add_argument('-e', '--email')
        return parser.parse_args()

    def _send_msg(self, args, conf, msg):
        # Send the message via our own SMTP server.
        s = smtplib.SMTP(conf['mail_server'], conf['mail_port'])
        s.login(conf['mail_username'], conf['mail_password'])
        s.sendmail(conf['email_from'], args.email, msg.as_string())
        s.close()

    def _get_msg(self, args, conf):
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
        return msg

    def _create_zip(self, out_dir):
        os.chdir(out_dir)
        if os.path.exists('/tmp/idf-trees.zip'):
            os.remove('/tmp/idf-trees.zip')
        find = subprocess.Popen(['find', ".", '-name', 'summary_report.csv'],
                                stdout=subprocess.PIPE)
        zip = subprocess.Popen(['zip', '-r', '/tmp/idf-trees.zip', '-@'],
                               stdin=find.stdout)
        zip.communicate()

    def _subprocess_call(self, args):
        return subprocess.call(args)

    def _run_export(self, args, out_dir):
        export_args = ['node', 'export/export.js', '--db_name', args.dbname, '--output', out_dir]
        if args.since and args.since != "0":
            export_args += ["--from_date", args.since]
        if args.until and args.until != "0":
            export_args += ["--to_date", args.until]
        ret = self._subprocess_call(export_args)
        if ret != 0:
            print "export.js returned an error:"
            logging.error(ret)
            exit(-1)

    def _get_out_dir(self):
        out_dir = '/home/ftapp/trees'
        if not os.path.exists(out_dir):
            os.mkdir(out_dir)
        return out_dir

    def _get_args(self):
        args = self._parse_args()
        self._validate_args(args)
        return args

    def _get_conf(self):
        # get the email conf
        with open('/etc/bhs/app_server.yaml') as f:
            conf = yaml.load(f)
        return conf

    def _validate_args(self, args):
        if not args.dbname:
            logging.error('Missing  database name')
            sys.exit(1)

    def main(self):
        args, conf, out_dir = self._get_args(), self._get_conf(), self._get_out_dir()
        self._run_export(args, out_dir)
        self._create_zip(out_dir)
        msg = self._get_msg(args, conf)
        self._send_msg(args, conf, msg)


if __name__ == '__main__':
    SendTreesCommand().main()
