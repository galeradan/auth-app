cat << EOS
version: "3"
services:
  backend:
    build:
      context: .
      dockerfile: ./docker/backend/Dockerfile
    container_name: auth-backend-container
    volumes:
      - "./src/backend:/app/backend"
    env_file:
      - "./docker/.env"
    environment: 
      DOCKER_ENV: "1"
      PUSHER_APP_ID:  "1256533"
      PUSHER_KEY:     "2f01d024dfdccd763f51"
      PUSHER_SECRET:  "5121444064adf71a1f36"
      PUSHER_CLUSTER: "ap1"
      SECRET: "secret"
    ports:
      - "8000:8000"
    depends_on:
      - DB_HOST

  frontend:
    container_name: auth-frontend-container
    build:
      context: .
      dockerfile: ./docker/frontend/Dockerfile
    volumes:
      - './src/frontend:/app'
      - '/app/node_modules'
    ports:
      - 3000:3000
    stdin_open: true
    environment: 
      REACT_APP_PUSHER_KEY:     "2f01d024dfdccd763f51"
      REACT_APP_PUSHER_CLUSTER: "ap1"
      REACT_APP_API_URI: "http://localhost:8000/api"
    command: yarn start

  db:
    platform: linux/x86_64
    image: "mysql:5.7"
    command: "mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci"
    container_name: auth-db-container
    volumes:
      - "db-data:/var/lib/mysql"
    env_file:
      - "./docker/.env"
    environment:
      MYSQL_DATABASE: "auth_app_db"
      MYSQL_USER: "user"
      MYSQL_PASSWORD: "user"
    expose:
      - "3306"
    ports:
      - "3306:3306"

volumes:
  db-data:
EOS
