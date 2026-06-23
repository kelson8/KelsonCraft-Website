#!/bin/bash

# This just reloads Nginx in the Docker container.
# Useful for when I just change Nginx config files, instead of rebuilding the entire site.
# https://stackoverflow.com/questions/69284509/how-to-restart-nginx-service-in-docker-nginx-image-service-nginx-restart-wit

CONTAINER_NAME=kelsoncraft-website

docker exec -it "$CONTAINER_NAME" nginx -s reload
echo "Nginx website container reloaded."
