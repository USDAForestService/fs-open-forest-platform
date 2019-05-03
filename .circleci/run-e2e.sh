export NODE_ENV=test

SUITE=""
if [ $CIRCLE_NODE_TOTAL -ge 3 ]
then
  case $CIRCLE_NODE_INDEX in
    0)
      SUITE="xmas"
      ;;
    1)
      SUITE="su"
      ;;
    2)
      SUITE="unauthenticated"
      ;;
  esac
fi

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

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
kill -int $serverid
exit $e2ereturncode
