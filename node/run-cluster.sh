#!/bin/bash

NOOFNODES=$1
`sudo docker-compose scale node=${NOOFNODES}`
OUTPUT=`sudo docker-compose up `
echo $OUTPUT

