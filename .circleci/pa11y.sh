cd frontend
pwd
npm run build-test-pa11y;
pa11yreturncode=$?
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

exit $pa11yreturncode
