docker-compose up fs-intake-frontend &
sleep 60
cd ../frontend
pa11y-ci
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
cd ../docker
docker-compose down
exit $pa11yreturncode
