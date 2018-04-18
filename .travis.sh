#!/usr/bin/env bash

if [ "${1}" == "script" ] && [ "${IMAGE_SUFFIX}" != "" ]; then
    docker pull "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest"
    docker build --cache-from "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" \
                 -t "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" \
                 $DOCKER_BUILD_ARGS
    [ "$?" != "0" ] && echo failed script && exit 1

elif [ "${1}" == "deploy" ]; then
    tag="${TRAVIS_COMMIT}"
    [ "${tag}" == "" ] && echo empty tag && exit 1
    if [ "${IMAGE_SUFFIX}" != "" ]; then
        docker login -u "$DOCKER_USER" -p "$DOCKER_PASS" &&\
        docker push "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" &&\
        docker tag "${IMAGE_PREFIX}${IMAGE_SUFFIX}:latest" "${IMAGE_PREFIX}${IMAGE_SUFFIX}:${tag}" &&\
        docker push "${IMAGE_PREFIX}${IMAGE_SUFFIX}:${tag}"
        [ "$?" != "0" ] && echo failed docker push && exit 1
    else
        docker run -e CLONE_PARAMS="--branch ${K8S_REPO_BRANCH} https://github.com/${K8S_REPO_SLUG}.git" \
                   -e YAML_UPDATE_TYPE="docker-image-suffixes" \
                   -e DOCKER_IMAGE_SUFFIXES="${IMAGE_SUFFIXES}" \
                   -e DOCKER_IMAGE_PREFIX="${IMAGE_PREFIX}" \
                   -e DOCKER_IMAGE_UPDATE_MAP_JSON="${UPDATE_MAP_JSON}" \
                   -e DOCKER_IMAGE_TAG="${tag}" \
                   -e YAML_UPDATE_FILE="${YAML_UPDATE_FILE}" \
                   -e GIT_USER_EMAIL="${GIT_USER_EMAIL}" \
                   -e GIT_USER_NAME="${GIT_USER_NAME}" \
                   -e GIT_COMMIT_MESSAGE="${GIT_COMMIT_MESSAGE}" \
                   -e PUSH_PARAMS="https://${GITHUB_TOKEN}@${K8S_REPO_SLUG} ${K8S_REPO_BRANCH}" \
                   orihoch/github_yaml_updater
        [ "$?" != "0" ] && echo failed github yaml update && exit 1
   fi

fi

echo Great Success
exit 0
