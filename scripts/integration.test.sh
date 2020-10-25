#!/bin/bash

set -eu

echo "👷‍♀️ Build dockers"
docker-compose build

echo "Up web"
docker-compose up -d backend db

echo "👷‍♀️ Running tests"
npm test

echo "🛀 Cleanup"
docker-compose down
for i in $(docker ps -a | grep backend | awk '{print $1}'); do docker rm -f "$(docker stop "$i")" || true; done
for i in $(docker ps -a | grep db | awk '{print $1}'); do docker rm -f "$(docker stop "$i")" || true; done
for i in $(docker images | grep backend | awk '{print $3}'); do docker rmi -f "$i" || true; done
