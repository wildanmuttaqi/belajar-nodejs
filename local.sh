#!/bin/bash
set -e

#create volume
docker volume create --name=covid19-db

#run docker
echo 'Build Docker...'
docker-compose up
