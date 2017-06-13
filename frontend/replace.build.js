var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version;
var newDate = new Date();
const versionOptions = {
    files: 'src/environments/environment.prod.ts',
    from: /version: '(.*)'/g,
    to: "version: '"+ buildVersion + "'",
    allowEmptyPaths: false,
};

const dateOptions = {
    files: 'src/environments/environment.prod.ts',
    from: /buildDate: '(.*)'/g,
    to: "buildDate: '"+ newDate + "'",
    allowEmptyPaths: false,
};

try {
    let changedVersion = replace.sync(versionOptions);
    let changedDate = replace.sync(dateOptions);
    if (changedVersion == 0) {
        throw "Please make sure that file '" + versionOptions.files + "' has \"version: ''\"";
    }
    if (changedDate == 0) {
        throw "Please make sure that file '" + dateOptions.files + "' has \"buildDate: ''\"";
    }
    console.log('Build version set: ' + buildVersion);
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}
