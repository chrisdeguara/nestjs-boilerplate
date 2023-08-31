FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

RUN [ "npm", "run", "build:user-management" ]

ENTRYPOINT [ "npm", "run", "start:user-management" ]
