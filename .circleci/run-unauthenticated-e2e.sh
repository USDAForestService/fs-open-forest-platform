#Remove running server image so one with an updated platform env var can be created
docker-compose down

#Rebuild server with PLATFORM set to something other than local to enable test to pass
docker-compose build --build-arg PLATFORM='ci-unauthenticated' --build-arg VCAP_SERVICES="$VCAP_SERVICES" --build-arg VCAP_APPLICATION="$VCAP_APPLICATION" --build-arg AWS_CONFIG="$AWS_CONFIG" fs-intake-server

docker-compose run -e PLATFORM='ci-unauthenticated' fs-intake-frontend sudo yarn run e2e:ci --environment docker --config unauth-protractor.conf.js;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

exit $e2ereturncode
