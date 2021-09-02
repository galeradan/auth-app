## About
- A simple chat app using Go and ReactJS(Typescript)

## How to run
- Clone repo either via go get or git clone
```bash
# Should add the folder to your src, if not do export GO111MODULE=off then repeat
$  go get github.com/galeradan/auth-app

# Make sure your directory is correct
$  cd src/github.com/galeradan/auth-app 
```
- Create the docker-compose.yml file
```bash
$ ./docker-compose.yml.sh > docker-compose.yml
```
- Build
```bash
$ docker-compose up --build
```

- Access app via `localhost:3000`

## TODO
- Keep React components small and specific

