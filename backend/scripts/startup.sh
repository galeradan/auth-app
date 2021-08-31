#! /bin/sh

# Wait for DB services
if [ -n "${DOCKER_ENV}" ]
then
    sh ./scripts/wait-for-services.sh
fi

## Start application
go run main.go
