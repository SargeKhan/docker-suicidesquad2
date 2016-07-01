## docker-suicidesquad2
docker-suicidesquad1
This is a test project which uses docker to create multiple instances of a Nodejs web application. The requirement is that if one of docker container dies/stops then all the containers must also be stopped. This project uses two images; supervisor image, node image. Supervisor runs a socketio application which the node images communicate with. If a container with node image receives a SIGTERM signal, it tells the supervisor that I am about to be stopped. Supervisor then broadcasts all node containers to terminate themselves.
### Run
To run the cluster, cd into /node Folder and execute run_cluster.sh script, pass number of containers as a parameter.
````
cd ./node
./run_cluster.sh 5
````
To check if all the node images terminate, stop one of the node image container
````
sudo docker stop <container_id>
# to see if all the other node containers are alive or dead run the following command or look at the output of ./run_cluster
sudo docker ps
````
