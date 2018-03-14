set -e

export PATH=$HOME:$PATH
curl -L -o $HOME/cf.tgz "https://cli.run.pivotal.io/stable?release=linux64-binary&version=6.26.0"
tar xzvf $HOME/cf.tgz -C $HOME

cf install-plugin autopilot -f -r CF-Community

API="https://api.fr.cloud.gov"
ORG="usda-forest-service"
SPACE=$1


if [ $# -ne 1 ]; then
echo "Usage: deploy <space>"
exit
fi


if [ $SPACE = 'public-production' ]; then
  FRONTEND_NAME="forest-service-epermit"
  FRONTEND_MANIFEST="./.cg-deploy/manifests/production/manifest-frontend.yml"
  API_NAME="fs-intake-api"
  API_MANIFEST="./.cg-deploy/manifests/production/manifest-api.yml"
  CF_USERNAME=$CF_USERNAME_PROD
  CF_PASSWORD=$CF_PASSWORD_PROD
elif [ $SPACE = 'public-staging' ]; then
  FRONTEND_NAME="fs-intake-staging"
  FRONTEND_MANIFEST="./.cg-deploy/manifests/staging/manifest-frontend-staging.yml"
  API_NAME="fs-intake-api-staging"
  API_MANIFEST="./.cg-deploy/manifests/staging/manifest-api-staging.yml"
  CF_USERNAME=$CF_USERNAME
  CF_PASSWORD=$CF_PASSWORD
  sed -i -e 's/npm run start/NODE_ENV=staging npm run start/' ./server/Procfile
elif [ $SPACE = 'public-trees-staging' ]; then
  FRONTEND_NAME="forest-service-trees-staging"
  FRONTEND_MANIFEST="./.cg-deploy/manifests/trees-staging/manifest-frontend-trees-staging.yml"
  API_NAME="fs-intake-api-trees-staging"
  API_MANIFEST="./.cg-deploy/manifests/trees-staging/manifest-api-trees-staging.yml"
  CF_USERNAME=$CF_USERNAME
  CF_PASSWORD=$CF_PASSWORD
  sed -i -e 's/npm run start/NODE_ENV=staging npm run start/' ./server/Procfile
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
