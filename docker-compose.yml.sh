cat << EOS
version: "3"
services:
  app:
    build:
      context: .
      dockerfile: ./docker/backend/Dockerfile
    command: bash -c "sleep 10; go run main.go"
    container_name: backend-container
    volumes:
      - "./backend:/app/backend"
    env_file:
      - "./docker/.env"
    environment: 
      PUSHER_APP_ID:  "1256533"
      PUSHER_KEY:     "2f01d024dfdccd763f51"
      PUSHER_SECRET:  "5121444064adf71a1f36"
      PUSHER_CLUSTER: "ap1"
      SECRET: "secret"
      DB_USER: "user"
      DB_PASS: "user"
      DB_NAME: "auth_app_db"
      DB_PORT: "3306"
      DB_HOST: "db"
    ports:
      - "8000:8000"
    depends_on:
      - db
  db:
    platform: linux/x86_64
    image: "mysql:5.7"
    command: "mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci"
    container_name: db-container
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
