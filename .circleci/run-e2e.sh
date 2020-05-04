export NODE_ENV=test

SUITE="xmas"

PARAMS=""
if [ -n "$SUITE" ]
then
  PARAMS="-- --suite=$SUITE"
fi

cd server;
npm start &
serverid=$!
sleep 1
cd ../frontend;
sudo npm run e2e $PARAMS;

e2ereturncode=$?

if [ $e2ereturncode = 0 ]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
kill -int $serverid
exit $e2ereturncode
