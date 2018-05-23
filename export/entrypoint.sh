#!/usr/bin/env bash

mkdir -p /home/ftapp/trees/beitHatfutsot

if [ "${1}" == "bash" ]; then
    $@
elif [ "${1}" == "backup-sync" ]; then
    trap "exit 1" INT
    echo starting backup-sync loop
    while /export/entrypoint.sh ${@:2} && /export/entrypoint.sh backup; do
        echo sleeping "${FREQUENCY_SECONDS:-86400}" seconds
        sleep "${FREQUENCY_SECONDS:-86400}"
    done
elif [ "${1}" == "sync" ]; then
    trap "exit 1" INT
    echo starting sync loop
    while /export/entrypoint.sh ${@:2}; do
        echo sleeping "${FREQUENCY_SECONDS:-86400}" seconds
        sleep "${FREQUENCY_SECONDS:-86400}"
    done
elif [ "${1}" == "backup" ]; then
    /export/mongo_backup.sh "${BACKUP_PREFIX}" "${BACKUP_DESTINATION}" "${BACKUP_MONGO_HOST}"
elif [ "${1}" == "send-trees" ]; then
    python2 send-trees.py --dburl "${MONGO_URL}" ${@:2}
else
    node export.js --db_url "${MONGO_URL}" $@
fi
