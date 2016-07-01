#!/bin/bash

no_of_nodes=$1
re_check_no="^[0-9]+$";
if ! [[ $no_of_nodes =~ $re_check_no ]] ; then
    echo "error: Must pass number of docker instances to launch as the first argument" >&2; exit 1
fi
sudo docker-compose scale node=${no_of_nodes}
sudo docker-compose up


