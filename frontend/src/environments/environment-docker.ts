// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://fs-intake-server:8080/',
  buildDate: new Date(),
  version: 'DOCKER',
  forestOverrides: {
    '1': {
      startDate: '2018-11-01T12:00:00Z',
      endDate: '2019-01-06T12:00:00Z'
    },
    '3': {
      startDate: '2017-11-01T12:00:00Z',
      endDate: '2019-12-24T12:00:00Z'
    },
    '4': {
      startDate: '2017-11-21T12:00:00Z',
      endDate: '2017-12-24T12:00:00Z'
    }
  }
};
