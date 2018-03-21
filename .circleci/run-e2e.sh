if [ $# -lt 1 ]
then
    echo 'Error: No arguments provided.'
    echo "options:"
    echo "-a  Run authenticated e2e tests. With no other arguments all specs will run. Can also provide space seperated list of specs to run, e.g. e2e/authenticated/christmas-trees/xmas-tree-dates.e2e-spec.ts"
    echo "-u  Run unauthenticated e2e tests. No additional arguments accepted"
else
  FLAG='-a'
  FLAG="$1"
  shift

  ARGUMENTS=''
  case $FLAG in
    -a)
      if [ $# -lt 1 ]
      then
         echo 'No specs provided. Running all specs. To limit the specs to be run, include a space seperated list of specs to run.'
      else
        for i in "$@"
        do
          ARGUMENTS=$ARGUMENTS"--specs=../${i} "
        done
      fi
      ARGUMENTS=$ARGUMENTS"--config ./development-configurations/protractor.conf.js"
      ;;
    -u)
      if [ $# -ge 1 ]
      then
        echo 'No spec arguments accepted with -u flag. Ignoring all other arguments provided.'
      fi
      #Remove running server image so one with an updated platform env var can be created
      docker-compose down

      #Rebuild server with PLATFORM set to something other than local to enable test to pass
      docker-compose build --build-arg PLATFORM='ci-unauthenticated' --build-arg AWS_CONFIG="$AWS_CONFIG" fs-intake-server

      ARGUMENTS=$ARGUMENTS"--config ./development-configurations/unauth-protractor.conf.js"
      ;;
    *)
      echo 'Valid flag indicating which mode to run this script in must be provided as the first argument.'
      echo '-a runs script with test user authenticated'
      echo '-u runs script with test user not authenticated'
      exit 1
      ;;
  esac
  docker-compose run fs-intake-frontend sudo yarn e2e:ci --environment docker $ARGUMENTS;

  e2ereturncode=$?

  if [[ $e2ereturncode = 0 ]]
  then
    echo 'SUCCESS'
  else
    echo 'FAIL'
  fi
  exit $e2ereturncode
fi


