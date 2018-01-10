ARGUMENTS=''
for i in "$@"
do
  ARGUMENTS=$ARGUMENTS"--specs=${i} "
done

docker-compose run fs-intake-frontend yarn e2e:ci --environment docker $ARGUMENTS;
e2ereturncode=$?

if [[ $e2ereturncode = 0 ]]
then
  echo 'SUCCESS'
else
  echo 'FAIL'
fi

exit $e2ereturncode
