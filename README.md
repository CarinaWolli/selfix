# Selfix application

## Project backgrounds
This project is a university project that was created by a team of 4 students. 

## Prerequisites

- install nodejs from the [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)
- install docker from the [official website](https://docs.docker.com/get-docker/)
  - in case you are using Linux, the docker-compose binary is not shipped with docker
  - install it as described [here](https://docs.docker.com/compose/install/)

## Getting Started

- clone the [selfix](https://gitlab.lrz.de/seba-master-2021/team-44/selfix) repository

### Start docker container 

Run following command in the root folder where the docker-compose.yaml file is located: 
```bash
# Run docker containers in background
docker-compose up -d

# Later to stop the containers when you are finished
docker-compose down
```

This will start the FileUpload server, the MongoDB database and a MongoExpress server, which allows to view the content of the database at http://localhost:8111.

### Install Dependencies

Run following command in frontend and backend folder: 
```bash
# Navigate to frontend folder
cd frontend
# Install dependencies in frontend
npm install
# Navigate to backend folder
cd ..
cd backend
# Install dependencies in backend
npm install
```

### Run frontend and backend

Run following command in frontend and backend folder:
```bash
# Open new shell in root folder
cd frontend
npm start

# Open second shell in root folder
cd backend
npm start
```

Now browse to the app at `http://localhost:3000`.

### Log in as a user/admin
- normal user: register new user 
- admin user: 
  - username: admin 
  - password: admin

### Interesting content for testing

- Choose the first Gravel -> Rose bike in either category or text search (Rose BACKROAD GRX RX400)
  - "Replace bicycle seat" or "Replace  bar tape" or "Remove and install a bicycle tire and tube"
- Choose the first Mountain -> Canyon bike in category search (Canyon Spectral 29 CF 7)
  - "Replace bicycle seat" or "Replace flat handle bar bicycle grips" or "Remove and install a bicycle tire and tube"


- Only the admin can view the Content Management System
- It can be reached by clicking on the user icon in the header and selecting "Admin View" (or http://localhost:3000/admin)
- Admin view contains a lot of bikes without components mapped to them
- Affiliate products are largely unfitting (real data from awin.com from the DECATHLON Shop)
