FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

RUN [ "npm", "run", "build:calculator-app" ]

ENTRYPOINT [ "npm", "run", "start:calculator-app" ]
