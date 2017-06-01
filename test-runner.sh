cd frontend
yarn run lint
yarn run test:ci
yarn run e2e:ci
cd ../server
yarn run lint
yarn migrate
yarn seed
yarn test
yarn coverage
