cd server;
yarn start &
serverid=$!
sleep 1
cd ../frontend;

ARGUMENTS=''
for i in "$@"
do
  ARGUMENTS=$ARGUMENTS"--specs=${i} "
done

yarn run e2e:ci $ARGUMENTS;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

kill -int $serverid
exit $e2ereturncode
