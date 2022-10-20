#!/bin/bash

docker stop drink-water-server
docker build -t sutd-devtools/drink-water-server .
docker run -it -dp 8080:80 --rm --name drink-water-server sutd-devtools/drink-water-server
