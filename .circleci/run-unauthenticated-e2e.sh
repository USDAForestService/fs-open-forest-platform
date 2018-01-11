#Remove running server image so one with an updated platform env var can be created
docker-compose down

#Rebuild server with PLATFORM set to something other than local to enable test to pass
docker-compose build --build-arg PLATFORM=NOTCI --build-arg VCAP_SERVICES=$VCAP_SERVICES --build-arg VCAP_APPLICATION=$VCAP_APPLICATION fs-intake-server

docker-compose run -e PLATFORM='not ci' fs-intake-frontend yarn run e2e:ci --environment docker --specs=e2e/unauthenticated/check-authentication.e2e-spec.ts;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

exit $e2ereturncode
