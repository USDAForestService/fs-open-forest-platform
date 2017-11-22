cd server;
yarn start &
serverid=$!
sleep 1
cd ../frontend;
ng serve &
clientserverid=$!
sleep 30
yarn run pa11y
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

kill -int $serverid
kill -int $clientserverid
exit $pa11yreturncode
