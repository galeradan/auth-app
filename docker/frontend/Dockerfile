FROM node:16-alpine3.14
RUN apk add --no-cache yarn
 
WORKDIR /app
 
COPY ./frontend/package*.json ./
 
RUN yarn install
 
COPY ./frontend .
 
CMD [ "yarn", "start" ]
