#!/bin/bash
set -e

#set node_modules
echo "Build Dependencies.."
cd backend
npm install

#create volume
docker volume create --name=covid19-db

#run docker
docker-compose up -d