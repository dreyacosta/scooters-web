#!/bin/sh

docker build --tag scooters-web:latest .
docker run --rm --tty --name scooters-web-test --env-file .env --env APP_ENV=test scooters-web:latest
