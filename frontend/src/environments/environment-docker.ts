// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://fs-intake-server:8080/',
  buildDate: new Date(),
  version: 'DOCKER',
  envName: 'dev',
  changeRequestForm: 'https://docs.google.com/forms/d/e/1FAIpQLSca7taTXY7xUTDvcnyR7rf7jkfvinBPtGqbNWgLBd3Dy6kH4Q/viewform'
};
