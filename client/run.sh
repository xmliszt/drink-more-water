#!/bin/bash

docker stop drink-water-client
docker build -t sutd-devtools/drink-water-client .
docker run -it -dp 8080:8080 --rm --name drink-water-client sutd-devtools/drink-water-client
# docker image prune
