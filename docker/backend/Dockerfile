FROM golang:1.17.0-alpine3.14
WORKDIR /app/backend

COPY ./backend /app/backend

RUN go mod download
RUN apk add --no-cache bash

CMD ["app"]
