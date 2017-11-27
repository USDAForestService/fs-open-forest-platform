[![FS ePermit API](https://img.shields.io/badge/-ePermit-006227.svg?colorA=FFC526&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAACFlBMVEUAAAD%2F%2FyXsvSW8qiXLsCXjuSXyvyX7wiX2wSXqvCXUsyXBrCXvviX%2F%2FyX8yCWUmyVliSV%2FkyV7kSWIlyV0jiWZnSX9yCXNsSXRsiXWtCVWgyVYhCXZtiX%2FyCV8kiV%2BkiX%2FyiX%2FzCWIliWElSX%2FzSX2wiVniSV3kCX2wiXUtCU5eCVujCXWtCW%2FqyXDrSWtpCWwpSWmoiWypiXeuCWJlyWPmSXiuiX%2F1CXsvSXFriW4qSWrpCWElCVdhiWSmiW3qCXCrSXQsiXyvyX%2F1CX%2F%2FyP%2F5yX%2F0iX%2FxCXrvCX%2FxiX%2F0iX%2F5yUcbCU6eCVAeiUfbiVEfCVEfCVZhCVEfCUzdSUtcyVAeyVNfyVZhCVGfSVEfCUqciUSaSUIZCUYayWPmSUUaiUCYiUVaiU1diVjiCUjcCVNfyVFfCXnuyU%2FeiUqciVliSVPgCWQmSUlcCVQgSV7kSX%2FxiWHliVPgCWPmSUtcyWLlyUibyVXgyWzpyX%2FxyXJryUXayVahCWIliWOmCU4eCV2jyXBrCXcuCXMsSVbhSUYaiV1jyU4eCVOgCVujCU6eCUudCWAkyUlcCVEfCVehiVYhCU%2FeiVvjSUSaSUAYiUAYiU1diWAlCUxdSUAYSUBYiUTaSVvjSVqiyVGfSUcbCUQaCUPaCUNZyULZiURaSUYayU6eCVehiVehiV1jyVmiSVOgCVRgSVSgSV2jyVxjSVvjSVMulUvAAAATHRSTlMAAGrao3NYUFdvndVtADfb%2Ffn2%2BP3cOMHAl%2F39lT7v7jsx6eozTPT2UoT%2B%2F4%2FGz%2FL46ut68%2FJ4B1Kau9Pu%2F%2BzQt5NMBgAKGUikQxYIJokgEwAAAFtJREFUCNdjZGBEBiwMvIy2jIcZGRkZrRiPMTIyiFsiJPcxMkgyOsJ4OxhZGFgYOeE6SeMyMuhGI0yew8LAxI3gMqFxGRmMGUthvBZGRgZzFEczMDC4QJlbGRgA3KAIv74V5FUAAAAASUVORK5CYII%3D)](README.md)
[![CircleCI](https://circleci.com/gh/flexion/fs-intake-module.svg?style=shield)](https://circleci.com/gh/flexion/fs-intake-module)
[![GitHub Issues](https://img.shields.io/github/issues/flexion/fs-intake-module.svg)](https://github.com/flexion/fs-intake-module/issues)
[![Trees-CircleCI](https://circleci.com/gh/nciinc/fs-intake-module.svg?style=shield)](https://circleci.com/gh/nciinc/fs-intake-module)
[![Trees-GitHub Issues](https://img.shields.io/github/issues/nciinc/fs-intake-module.svg)](https://github.com/nciinc/fs-intake-module/issues)
[![Code Climate](https://codeclimate.com/github/nciinc/fs-intake-module/badges/gpa.svg)](https://codeclimate.com/github/nciinc/fs-intake-module)

# U.S. Forest Service Intake Module
### Module for intake of special use applications for Forest Service Application Permits.

## Welcome
The U.S. Forest Service is engaged in an ongoing effort to modernize and simplify their permitting processes. One facet of this effort is to make special use permits available to obtain online. Flexion worked with GSA's Technology Transformation Service's Office of Acquisitions and the Forest Service to build out this platform for noncommercial and temporary use permits.

## Opportunity Statement
The opportunity statement = the problem we are trying to solve with the ePermitting project

We had the opportunity to modernize the ability to apply for special use permits within a pilot forest (Mt. Baker-Snoqualime) of the Forest Service. Our belief is that this will simplify and speed up the ability to apply for and act on special use permits.

## Development
### Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

### Public domain
This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

### U.S. Forest Service intake module development

#### Requirements:

##### Package Manager

Install [yarn](https://yarnpkg.com/en/docs/install) package manager

##### Node

Install [Node ^6.10.3](https://nodejs.org/en/)

##### Git

Install [Git](https://git-scm.com/)

#### Clone the repository

`git clone [repository url] fs-intake-module`

Navigate to cloned repo

`cd fs-intake-module`

#### Server development

##### Database

A running Postgresql database is required in order to run the server locally.  Please make sure you have installed [Postgresql](https://www.postgresql.org/) locally and created a database for this project.

##### Environment Variables

There are environment variables that are required to be set in order to run tests
and to run the server in general.  Please set up these environment variables either in your shell or on the command line.

In general setting an environment variable in your shell is similar to:

`export ENV_VAR=something`

and on the command line as part of a command:

`ENV_VAR=something ANOTHER_ENV_VAR=somethingelse <rest of command>`

###### The following environment variables are required to run the application locally or with CircleCI:

In order to pass end to end tests locally or on CircleCI, you must include valid s3 credentials in the VCAP_SERVICES variable.

DATABASE_URL

    postgres://<user>:<pass>@localhost:<port>/<dbname>

    or for CircleCI

    postgres://ubuntu:@127.0.0.1:5432/circle_test

PLATFORM

    local

    or for CircleCI

    CI

SNYK_TOKEN

    (from https://snyk.io/account)

VCAP_APPLICATION

    {"uris":["http://localhost:8080"]}

VCAP_SERVICES

```javascript
{
  "user-provided": [
    {
      "credentials": {
        "middlelayer_base_url": "https://fs-middlelayer-api-staging.app.cloud.gov/",
        "middlelayer_password": "",
        "middlelayer_username": ""
      },
      "label": "user-provided",
      "name": "middlelayer-service",
      "syslog_drain_url": "",
      "tags": [],
      "volume_mounts": []
    },
    {
      "credentials": {
        "intake_client_base_url": "http://localhost:4200",
        "intake_password": "",
        "intake_username": "",
        "jwt_secret": "shhhhhhhh!"
      },
      "label": "user-provided",
      "name": "intake-client-service",
      "syslog_drain_url": "",
      "tags": [],
      "volume_mounts": []
    },
    {
      "credentials": {
        "entrypoint": "",
        "issuer": "",
        "private_key": "",
        "discovery_url": "https://secure.login.gov/.well-known/openid-configuration",
        "idp_username": "",
        "idp_password": "",
        "jwk": {
          "d": "1234",
          "dp": "1234",
          "dq": "1234",
          "e": "1234",
          "kty": "RSA",
          "kid": "1234",
          "n": "1234",
          "p": "1234",
          "q": "1234",
          "qi": "1234"
        }
      },
      "label": "user-provided",
      "name": "login-service-provider",
      "syslog_drain_url": "",
      "tags": [],
      "volume_mounts": []
    },
    {
      "credentials": { "whitelist": [], "issuer": "", "entrypoint": "", "cert": "", "private_key": "" },
      "label": "user-provided",
      "name": "eauth-service-provider",
      "syslog_drain_url": "",
      "tags": [],
      "volume_mounts": []
    },
    {
      "credentials": { "smtp_server": "", "username": "" },
      "label": "user-provided",
      "name": "smtp-service",
      "syslog_drain_url": "",
      "tags": [],
      "volume_mounts": []
    },
    {
      "name": "auth-service",
      "credentials": { "jwt_secret_key": "shhhhhhhh!" }
    }
  ],
  "s3": [
    {
      "name": "intake-s3",
      "credentials": { "bucket": "", "access_key_id": "", "region": "us-east-1", "secret_access_key": "" }
    }
  ]
}

```
##### Install dependencies

run `cd server` then run `yarn` to install dependencies.

##### Available commands

To run any of the server commands, either the environment variables above must be available in your shell or on the command line, and you must be in the server directory.

###### Setup database

To setup the database run `yarn migrate`

###### Start the server

Run `yarn dev` to start the server, and visit http://localhost:8080.

###### Other commands

To revert the last database migration run

`yarn undoLastMigrate`

To revert all of the database migrations and start with a blank database run

`yarn undoAllMigrate`

To run eslint for linting:

`yarn lint`

The linting results will be put into `server/lint-results.html`.

To run all of the tests locally, be sure your Postgresql server is running and then run: `yarn test`

To run code coverage locally, be sure your Postgresql server is running then run:

`yarn coverage`

The coverage results can be found in `server/coverage/index.html`


##### Server API Documentation

With your local Node server running, browse to http://localhost:8080/docs/api in order to view the interactive Swagger API documentation.  This documentation will allow interactive access to the API endpoints.

##### Authentication

Public users must authenticate with login.gov, and Forest Service admins must authenticate with USDA eAuth. Both of these authentication techniques are handled by the Passport library for Node.js.

Login.gov uses the openid-client passport plugin for the OpenID Connect protocol, and USDA eAuth uses the passport-saml plugin for the SAML protocol.

Due to security restrictions testing can't be done locally, you must use a server on cloud.gov. Setting the PLATFORM environment variable will bypass all authentication checks.


#### Frontend Development

##### Install angular cli

Run `yarn global add @angular/cli`

##### Navigate to frontend directory

`cd frontend`

##### Install dependencies

Run `yarn`

##### Development server

Run `ng serve` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##### Build

Run `ng build --prod --env=prod --aot=false` to build the static files for the single paged app. The build artifacts that can be deployed will be stored in the `dist/` directory.

##### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Add `--code-coverage` flag to print out code coverage statistics.

##### Running end-to-end tests

Run `yarn run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Typedoc

##### Build typedoc

Install typedoc globally: `yarn global add typedoc`

`cd frontend`

build typedoc `yarn run docs`

typedoc are added to `frontend/src/assets/typedoc` and are accessible via url at `/assets/typedoc/index.html`


Navigate to `/assets/typedoc/index.html`

#### Enable html5 pushstate on cloud.gov
In order to enable pushstate for single page apps on cloud.gov using the static build pack, you must add a file called `Staticfile` to the root directory with a single line `pushstate: enabled`

This allows you to use urls like `/some/path` instead of `/#/some/path`

[Reference](https://docs.cloudfoundry.org/buildpacks/staticfile/)


#### SMTP relay configuration for sending emails
The current configuration implements email via google smtp relay. Follow the documentation at https://support.google.com/a/answer/2956491?hl=en to set up your google SMTP relay.

Authentication is set up to support whitelisted IP addresses that are allowed to send emails, so no SMTP authentication is required.

The `smtpserver` value in your VCAP_SERVICES should be `smtp-relay.gmail.com`

#### Docker Environment

As an alternative to installing all the development tools necessary to run the entire environment on your computer, Docker can be used instead.  These instructions will detail how to use Docker to setup a full environment to run the application.

1. Install Docker for your platform at https://www.docker.com/.  Make sure that the Docker service is started.

1. Clone this repository.

1. In a console terminal navigate to the directory the repository was cloned to.  Now `cd` to the `docker` directory.

    ```
    $ cd fs-intake-module
    $ cd docker
    ```

4. Now use Docker Compose to build and start the containers.

    ```
    $ docker-compose up --build --force-recreate
    ```

5. The first time the containers are created it will take a few minutes. There will be a whole lot of output to the screen, but eventually the output will stop and something like the following should be displayed:

    ```
    fs-intake-frontend_1  | webpack: Compiled successfully.
    ```

6. The containers and servers are now running. There are four containers:

    - fs-intake-frontend - This container runs the Angular application.  It can be accessed in the browser at http://localhost:4200.

    - fs-intake-server - This container runs the server side Node application.  It can be accessed in the browser at http://localhost:8080.

    - fs-intake-postgres - This container runs the PostgreSQL database server.

    - adminer - This container runs a PHP based database administration application.  It can be accessed at http://localhost:8081.  The front page for Adminer is a database login page.  The values to use are:

        - System: PostgreSQL
        - Server: fs-intake-postgres:5432
        - Username: postgres
        - Password: postgres
        - Database: postgres

7. Changes made to any of the JavaScript code will be automatically picked up and the appropriate server will auto-reload so that your changes can be seen immediately.

8. If either of the `package.json` files are modified, at this time simply Ctrl+C in the terminal you ran `docker-compose` in to stop the running containers and then re-run the `docker-compose` command to rebuild the containers.

##### Docker Troubleshooting
- [No such file or directory for /var/lib/docker/overlay2 · Issue #1396 · docker/for-mac](https://github.com/docker/for-mac/issues/1396#issuecomment-313457823)

#### Known technical Debt
The file frontend/src/sass/_focus-fix.scss implements a style fix in the upstream repository: https://github.com/18F/web-design-standards/pull/2112/files Eventually once these changes are released we can remove this file.


#### Christmas trees sidebar template
A sidebar template for the tree guidelines page at `/frontend/src/app/trees/forests/tree-guidelines/sidebar-view.component.html`
The navigation on this page shows up on desktop width browsers and is hidden on mobile. The mobile menu was added to `/frontend/src/app/trees/forests/tree-guidelines/tree-guidelines.component.html`

The menus were duplicated because the desktop and mobile views require different classes and functionality particularly around the active state of the menu items on scroll events.

Refactoring to DRY up the menus could happen.

The mobile menu that was added to the tree guidelines page is not implemented on the application forms that use a sidebar navigation.


## Usability testing
While developing we spent time usability testing features with the correct users and applied majority feedback.

[This repository](https://github.com/flexion/fs-intake-module/tree/sprint-16-development/wiki) includes usability testing conducted by Flexion
* [Usability testing session 1 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-1-summary---May-12%2C-2017.md)
* [Usability testing session 2 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-2-summary-May-23%2C-2017.md)
* [Usability testing session 3 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-3-summary-(wizard-and-file-upload)--June-23%2C-2017.md)
* [Usability testing session 4 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-4-summary-July-19%2C-2017.md)
* [Usability testing session 5 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-5-summary-August-17%2C-2017.md)
* [Usability testing session 6 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-6-summary-August-24%2C-25-and-September-1%2C-2017.md)
* [Usability testing session 7 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-7-summary-September-12%2C-13%2C-%26-14%2C-2017.md)
* [Usability testing session 8 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-8-summary-October-10-%26-11%2C-2017.md)
* [Usability testing session 9 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usertesting.com-session-2-summary-October-27%2C-2017.md)
* [Usability testing session 10 summary](https://github.com/flexion/fs-intake-module/blob/sprint-16-development/wiki/Usability-testing-session-10-summary-November-06%2C-2017.md)
