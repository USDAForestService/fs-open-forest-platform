
cd frontend
npm install -g yarn
npm install -g protractor
yarn 
yarn run lint
yarn run test
yarn run e2e
cd ../server
npm install
jasmine --config=jasmine.json
