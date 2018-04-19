#!/usr/bin/env bash

if [ "${1}" == "copy" ] && [ "${2}" != "" ]; then
    mkdir -p "${2}"
    cp -r server/public "${2}"
else
    $@
fi
