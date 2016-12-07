#!/bin/bash
sudo npm install && 
# TODO : check if the Chrome command exists
echo "Please open a browser and navigate to http://localhost:8989" && 
http-server -p 8989
