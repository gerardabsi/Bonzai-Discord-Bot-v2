#!/usr/bin/env bash

DOCKER_NAME=bonzai-bot

docker build -t ${DOCKER_NAME} .
docker run --name ${DOCKER_NAME} -p 2230:2230 -d ${DOCKER_NAME}
docker container ls -a