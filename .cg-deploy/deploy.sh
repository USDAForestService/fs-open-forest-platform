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
  FRONTEND_NAME="open-forest-platform-frontend"
  FRONTEND_MANIFEST="./.cg-deploy/manifests/production/manifest-frontend.yml"
  API_NAME="open-forest-platform-api"
  API_MANIFEST="./.cg-deploy/manifests/production/manifest-api.yml"
  CF_USERNAME=$CF_USERNAME_PROD
  CF_PASSWORD=$CF_PASSWORD_PROD
elif [ $SPACE = 'platform-staging' ]; then
  FRONTEND_NAME="open-forest-platform-frontend-staging"
  FRONTEND_MANIFEST="./.cg-deploy/manifests/staging/manifest-frontend-staging.yml"
  API_NAME="open-forest-platform-api-staging"
  API_MANIFEST="./.cg-deploy/manifests/staging/manifest-api-staging.yml"
  CF_USERNAME=$CF_USERNAME
  CF_PASSWORD=$CF_PASSWORD
elif [ $SPACE = 'platform-dev' ]; then
  FRONTEND_NAME="open-forest-platform-frontend-dev"
  FRONTEND_MANIFEST="./.cg-deploy/manifests/dev/manifest-frontend-dev.yml"
  API_NAME="open-forest-platform-api-dev"
  API_MANIFEST="./.cg-deploy/manifests/dev/manifest-api-dev.yml"
  CF_USERNAME=$CF_USERNAME
  CF_PASSWORD=$CF_PASSWORD
else
echo "Unknown space: $SPACE"
exit
fi

cf login -a $API -u $CF_USERNAME -p $CF_PASSWORD -o $ORG -s $SPACE

# Remove venerable applications
cf apps |
while IFS= read -r LINE
  do
    PATTERN='(\w*-)+venerable'
    suffix='-venerable'
    if [[ "$LINE" =~ $PATTERN ]]; then
      b=${LINE%$suffix*}
      app=${b%$suffix*}
       cf delete -f $app$suffix
    fi
  done

cf zero-downtime-push $FRONTEND_NAME -f $FRONTEND_MANIFEST
cf zero-downtime-push $API_NAME -f $API_MANIFEST
