docker-compose run fs-intake-frontend sudo npm
docker-compose run fs-intake-server npm &&
  docker-compose run fs-intake-server npm install global add mocha &&
  docker-compose run fs-intake-server npm install global add nyc
