# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . . 

RUN npm run build 

CMD [ "npm", "run", "start" ]