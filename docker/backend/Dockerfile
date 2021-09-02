FROM golang:1.17.0-alpine3.14
RUN apk add --no-cache bash

WORKDIR /app/backend

COPY ./src/backend ./

RUN go mod download

ENTRYPOINT ["sh", "./scripts/startup.sh"]

