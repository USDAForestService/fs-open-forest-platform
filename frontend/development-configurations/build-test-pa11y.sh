yarn run build
yarn run serve-static-files & yarn run pa11y
if [[ $pa11yreturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi
exit $pa11yreturncode

