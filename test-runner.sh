cd frontend
yarn run lint
yarn run test:ci
yarn run e2e:ci
cd ../server
yarn migrate
yarn seed
yarn test
