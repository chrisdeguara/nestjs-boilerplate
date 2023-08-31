FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

RUN [ "npm", "run", "build:microservice-example" ]

ENTRYPOINT [ "npm", "run", "start:microservice-example" ]
