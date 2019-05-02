export NODE_ENV=test

cd server;
npm start &
serverid=$!
sleep 1
cd ../frontend;
sudo npm run e2e -- $1;

e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
kill -int $serverid
exit $e2ereturncode
