docker-compose build fs-intake-frontend
docker-compose build --build-arg PLATFORM='local' --build-arg AWS_CONFIG="$AWS_CONFIG" fs-intake-server
