#!/usr/bin/env bash

if [ "${1}" == "script" ]; then
    docker pull "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest"
    docker build --cache-from "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" \
                 -t "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" \
                 $DOCKER_BUILD_ARGS
    [ "$?" != "0" ] && echo failed script && exit 1

elif [ "${1}" == "deploy" ]; then
    tag="${TRAVIS_COMMIT}"
    [ "${tag}" == "" ] && echo empty tag && exit 1
    docker login -u "$DOCKER_USER" -p "$DOCKER_PASS" &&\
    docker push "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" &&\
    docker tag "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" "${IMAGE_PREFIX}${IMAGE_SUFFIX}:${tag}" &&\
    docker push "${IMAGE_PREFIX}${IMAGE_SUFFIX}:${tag}"
    [ "$?" != "0" ] && echo failed deploy && exit 1

fi

echo Great Success
exit 0
