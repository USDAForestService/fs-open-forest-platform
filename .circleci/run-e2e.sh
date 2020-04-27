export NODE_ENV=test

sudo kill -9 $(sudo lsof -t -i:8080)
sudo kill -9 $(sudo lsof -t -i:4200)

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
    *)
      exit 0
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
npm run e2e $PARAMS;

e2ereturncode=$?

if [ $e2ereturncode = 0 ]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
kill -int $serverid
exit $e2ereturncode
