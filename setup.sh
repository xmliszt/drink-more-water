#!/bin/bash

# git clone project over
git clone https://github.com/xmliszt/sutdacademy-drink-water.git

# set up client
cd sutdacademy-drink-water
npm install
cd ..

# set up server
cd sutdacademy-drink-water
npm install
cd ..

# running containers
cd sutdacademy-drink-water/client
sudo ./run.sh
cd ../server
sudo ./run.sh
sudo docker image prune
