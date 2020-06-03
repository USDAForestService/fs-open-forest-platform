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
npm run e2e $PARAMS;
