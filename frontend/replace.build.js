/** build script for applying angular-cli build version and date environment settings to the transpiled js */

var replace = require('replace-in-file');
var package = require('./package.json');
var buildVersion = package.version;
var newDate = new Date();

const versionOptions = {
  files: 'src/environments/environment.trees.ts',
  from: /version: '(.*)'/g,
  to: `version: '${buildVersion}'`,
  allowEmptyPaths: false
};

const dateOptions = {
  files: 'src/environments/environment.trees.ts',
  from: /buildDate: '(.*)'/g,
  to: `buildDate: '${newDate}'`,
  allowEmptyPaths: false
};

const prodVersionOptions = {
  files: 'src/environments/environment.prod.ts',
  from: /version: '(.*)'/g,
  to: `version: '${buildVersion}'`,
  allowEmptyPaths: false
};

const prodDateOptions = {
  files: 'src/environments/environment.prod.ts',
  from: /buildDate: '(.*)'/g,
  to: `buildDate: '${newDate}'`,
  allowEmptyPaths: false
};

try {
  let changedVersion = replace.sync(versionOptions);
  let changedDate = replace.sync(dateOptions);

  let prodChangedVersion = replace.sync(prodVersionOptions);
  let prodChangedDate = replace.sync(prodDateOptions);

  if (changedVersion == 0 || prodChangedVersion == 0) {
    throw `Please make sure that file ${versionOptions.files} version.`;
  }
  if (changedDate == 0 || prodChangedDate == 0) {
    throw `Please make sure that file ${dateOptions.files} has buildDate.`;
  }
  console.log(`Build version set: ${buildVersion}`);
} catch (error) {
  console.error(`Error occurred: ${error}`);
  throw error;
}
