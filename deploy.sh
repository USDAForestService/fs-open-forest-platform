#!/bin/bash

cd "$1"
        sudo chown -R Jenkins:Jenkins frontend
        sudo chown -R Jenkins:Jenkins server
        chmod -R 777 frontend
        chmod -R 777 server
        cd frontend
        npm run update-version
        mkdir -p ./src/assets/typedoc && sudo npm run docs
        sudo chown -R Jenkins:Jenkins ../frontend
        npm run $3

        cd ../server
        ./copy-frontend-assets.sh
        npm run docs
        sudo chown -R Jenkins:Jenkins ../server
        cd ..
        pwd
        ./.cg-deploy/deploy.sh $2
