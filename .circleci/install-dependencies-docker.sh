docker-compose run fs-intake-frontend sudo npm install
docker-compose run fs-intake-server npm install &&
  docker-compose run fs-intake-server npm install -g mocha &&
  docker-compose run fs-intake-server npm install -g nyc
