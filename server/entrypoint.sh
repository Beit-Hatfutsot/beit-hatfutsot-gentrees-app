#!/usr/bin/env bash

if [ "${1}" == "" ]; then
    trap "exit 1" INT
    while ! node server.js; do echo waiting for mongo; sleep 5; done
else
    $@
fi
