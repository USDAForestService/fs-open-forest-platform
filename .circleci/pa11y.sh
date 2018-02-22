docker-compose down
docker-compose build --build-arg PLATFORM="$PLATFORM" --build-arg VCAP_SERVICES="$VCAP_SERVICES" --build-arg VCAP_APPLICATION="$VCAP_APPLICATION"  --build-arg SNYK_TOKEN="$SNYK_TOKEN" fs-intake-pa11y
docker-compose build --build-arg PLATFORM="$PLATFORM" --build-arg VCAP_SERVICES="$VCAP_SERVICES" --build-arg VCAP_APPLICATION="$VCAP_APPLICATION"  --build-arg SNYK_TOKEN="$SNYK_TOKEN" fs-intake-server

docker-compose run fs-intake-pa11y sudo yarn run pa11y
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
cd ../docker
exit $pa11yreturncode
