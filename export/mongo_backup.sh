#!/usr/bin/env bash

dest_dir=`mktemp -d`
dump_prefix=${1:-idftrees}
destination=${2:-gs://bhs-bhp-backup/mongo/}
mongo_host=${3:-localhost}

cd $dest_dir
mongodump -h "${mongo_host}" 1>/dev/null # Suppress stdout for better cron compatibility

if [ $? -ne 0 ]
    then echo "Dump was not successfull"
    exit 1
fi

dumpname=$dump_prefix-`date +%Y-%b-%d`.tgz
tar -czf $dumpname dump
rm -rf dump

destination_type=$(echo $destination | cut -c1-3)

if [ "$destination_type" == "gs:" ]; then
    upload_command="gsutil -q cp $dumpname $destination"
elif [ "$destination_type" == "s3:" ]; then
    upload_command="s3cmd --config=/home/ftapp/.s3cfg --no-progress put $dumpname $destination"
else
    echo "Don't know how to upload to $destination"
    exit 1
fi

$upload_command
if [ $? -ne 0 ]
    then echo "Upload to $destination was not successfull"
    exit 1
fi

echo successfull backup to $destination
exit 0
