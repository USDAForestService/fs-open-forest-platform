npm run build
npm run serve-static-files & npm run pa11y
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
exit $pa11yreturncode

