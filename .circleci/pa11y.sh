cd frontend;
ng serve &
serverid=$!
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
exit $pa11yreturncode
