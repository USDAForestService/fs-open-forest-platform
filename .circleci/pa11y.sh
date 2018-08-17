cd server;
np, start &
serverid=$!
sleep 1
cd ../frontend;
npm run build

echo 'STARTING Pa11y TESTS'
superstatic dist/ -c superstatic.json --port 4200 --host 0.0.0.0

cd ../frontend
pa11y-ci
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
exit $pa11yreturncode
