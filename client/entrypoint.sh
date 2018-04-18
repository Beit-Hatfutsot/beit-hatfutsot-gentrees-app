#!/usr/bin/env bash

if [ "${1}" == "copy" ] && [ "${2}" != "" ]; then
    cp -r server/public "${2}"
else
    $@
fi
