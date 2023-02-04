#!/usr/bin/env bash

DOCKER_NAME=bonzai-bot
docker container rm -f $(docker container ls -a -q -f name=${DOCKER_NAME}) || true