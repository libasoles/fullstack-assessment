# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . . 

RUN apk update && apk add bash
RUN chmod +x ./scripts/wait-for-it.sh
RUN chmod +x ./scripts/startup.sh

RUN npm run build

CMD [ "./startup.sh" ]