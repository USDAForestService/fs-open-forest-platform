// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const isDocker = require('is-docker')();

const { SpecReporter } = require('jasmine-spec-reporter');

const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var screenshotReporter = new HtmlScreenshotReporter({
  dest: 'e2e-unauth-test-results',
  filename: 'index.html'
});

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['../e2e/unauthenticated/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: isDocker
      ? {
          args: ['--headless', 'no-sandbox', '--window-size=800x600']
        }
      : {}
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    return new Promise(function(resolve) {
      screenshotReporter.beforeLaunch(resolve);
    });
  },
  onPrepare() {
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
  }
};
