set -e

cf install-plugin autopilot -f -r CF-Community

API="https://api.fr.cloud.gov"
ORG="usda-forest-service"
SPACE=$1


if [ $# -ne 1 ]; then
echo "Usage: deploy <space>"
exit
fi


if [ $SPACE = 'platform-production' ]; then
  CF_USERNAME=$CF_USERNAME_PROD
  CF_PASSWORD=$CF_PASSWORD_PROD
elif [ $SPACE = 'platform-staging' ]; then
  CF_USERNAME=$CF_USERNAME
  CF_PASSWORD=$CF_PASSWORD
elif [ $SPACE = 'platform-dev' ]; then
  CF_USERNAME=$CF_USERNAME
  CF_PASSWORD=$CF_PASSWORD
else
echo "Unknown space: $SPACE"
exit
fi

cf login -a $API -u $CF_USERNAME -p $CF_PASSWORD -o $ORG -s $SPACE

cf recycle open-forest-platform-frontend
cf recycle open-forest-platform-api
