docker-compose build fs-intake-frontend
docker-compose build --build-arg SNYK_TOKEN="$SNYK_TOKEN" --build-arg AWS_CONFIG="$AWS_CONFIG" fs-intake-server
