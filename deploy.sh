#!/bin/bash
echo "Workspace url $1"
echo "platform: $2"

cd "$1"
pwd
        source /home/Jenkins/openforest.sh
        sudo chown -R Jenkins:Jenkins frontend
        sudo chown -R Jenkins:Jenkins server
        chmod -R 777 frontend
        chmod -R 777 server
        cd frontend
        npm run update-version
        mkdir -p ./src/assets/typedoc && sudo npm run docs
        sudo chown -R Jenkins:Jenkins ../frontend
        npm run dist-trees

        cd ../server
        ./copy-frontend-assets.sh
        npm run docs
        sudo chown -R Jenkins:Jenkins ../server
        cd ..
        pwd
        ./.cg-deploy/deploy.sh $2
