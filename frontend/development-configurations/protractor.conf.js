// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const isDocker = require('is-docker')();

const { SpecReporter } = require('jasmine-spec-reporter');

const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var screenshotReporter = new HtmlScreenshotReporter({
  dest: 'e2e-test-results',
  filename: 'index.html'
});

let chromeOptions = {};
if (isDocker) {
  chromeOptions = { args: ['--headless', 'no-sandbox', '--window-size=800x600'] };
} else if (process.env['HEADLESS'] === 'true') {
  chromeOptions = { args: ['--headless', '--window-size=800x600'] };
}

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['../e2e/**/*spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      })
    );
    jasmine.getEnv().addReporter(screenshotReporter);
  },
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve) {
      screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  suites: {
    'docker-smoke-test': '../e2e/authenticated/special-uses/noncommercial-learn-more.e2e-spec.ts',
    'app-temp': '../e2e/authenticated/special-uses/application-temp-outfitters.e2e-spec.ts',
    'app-xmas': '../e2e/authenticated/christmas-trees/xmas-tree-application.e2e-spec.ts',
    'unauthenticated': ['../e2e/unauthenticated/**/*.e2e-spec.ts']
  },
  chromeDriver: !isDocker && process.env['OPEN_FOREST_CHROME_DRIVER'],
};
