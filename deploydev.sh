echo "Workspace url echo $1"
cd "$1"
pwd
        sudo chown -R Jenkins:Jenkins frontend
        sudo chown -R Jenkins:Jenkins server
        chmod -R 777 frontend
        chmod -R 777 server
        cd frontend
        npm run update-version
        mkdir -p ./src/assets/typedoc && sudo npm run docs
        sudo chown -R Jenkins:Jenkins ../frontend
        npm run dist-dev

        cd ../server
        ./copy-frontend-assets.sh
        npm run docs
        sudo chown -R Jenkins:Jenkins ../server
        cd ..
        pwd
        ./.cg-deploy/deploy.sh platform-dev
