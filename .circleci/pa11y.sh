docker-compose down
docker-compose build --build-arg PLATFORM="$PLATFORM" --build-arg VCAP_SERVICES="$VCAP_SERVICES" --build-arg VCAP_APPLICATION="$VCAP_APPLICATION"  --build-arg SNYK_TOKEN="$SNYK_TOKEN" fs-intake-pa11y
docker-compose build --build-arg PLATFORM="$PLATFORM" --build-arg VCAP_SERVICES="$VCAP_SERVICES" --build-arg VCAP_APPLICATION="$VCAP_APPLICATION"  --build-arg SNYK_TOKEN="$SNYK_TOKEN" fs-intake-server
sleep 60
cd ../frontend
pa11y-ci
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
cd ../docker
docker-compose down
exit $pa11yreturncode