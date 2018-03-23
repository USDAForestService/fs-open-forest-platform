docker-compose run fs-intake-frontend sudo yarn
docker-compose run fs-intake-server yarn &&
  docker-compose run fs-intake-server yarn global add mocha &&
  docker-compose run fs-intake-server yarn global add nyc
