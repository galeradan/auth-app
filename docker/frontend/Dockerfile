FROM node:16-alpine3.14
RUN apk add --no-cache yarn
 
WORKDIR /app
 
COPY ./src/frontend/package*.json ./
 
RUN yarn install
 
COPY ./src/frontend .
 
CMD [ "yarn", "start" ]
