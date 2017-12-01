cd server;
yarn start &
serverid=$!
sleep 1
cd ../frontend;
yarn run e2e:ci;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

kill -int $serverid
exit $e2ereturncode
