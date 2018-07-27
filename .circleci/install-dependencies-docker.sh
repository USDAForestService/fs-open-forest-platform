docker-compose run fs-intake-frontend sudo npm
docker-compose run fs-intake-server npm &&
  docker-compose run fs-intake-server npm install -g mocha &&
  docker-compose run fs-intake-server npm install -g nyc
