[![FS ePermit API](https://img.shields.io/badge/-ePermit-006227.svg?colorA=FFC526&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAACFlBMVEUAAAD%2F%2FyXsvSW8qiXLsCXjuSXyvyX7wiX2wSXqvCXUsyXBrCXvviX%2F%2FyX8yCWUmyVliSV%2FkyV7kSWIlyV0jiWZnSX9yCXNsSXRsiXWtCVWgyVYhCXZtiX%2FyCV8kiV%2BkiX%2FyiX%2FzCWIliWElSX%2FzSX2wiVniSV3kCX2wiXUtCU5eCVujCXWtCW%2FqyXDrSWtpCWwpSWmoiWypiXeuCWJlyWPmSXiuiX%2F1CXsvSXFriW4qSWrpCWElCVdhiWSmiW3qCXCrSXQsiXyvyX%2F1CX%2F%2FyP%2F5yX%2F0iX%2FxCXrvCX%2FxiX%2F0iX%2F5yUcbCU6eCVAeiUfbiVEfCVEfCVZhCVEfCUzdSUtcyVAeyVNfyVZhCVGfSVEfCUqciUSaSUIZCUYayWPmSUUaiUCYiUVaiU1diVjiCUjcCVNfyVFfCXnuyU%2FeiUqciVliSVPgCWQmSUlcCVQgSV7kSX%2FxiWHliVPgCWPmSUtcyWLlyUibyVXgyWzpyX%2FxyXJryUXayVahCWIliWOmCU4eCV2jyXBrCXcuCXMsSVbhSUYaiV1jyU4eCVOgCVujCU6eCUudCWAkyUlcCVEfCVehiVYhCU%2FeiVvjSUSaSUAYiUAYiU1diWAlCUxdSUAYSUBYiUTaSVvjSVqiyVGfSUcbCUQaCUPaCUNZyULZiURaSUYayU6eCVehiVehiV1jyVmiSVOgCVRgSVSgSV2jyVxjSVvjSVMulUvAAAATHRSTlMAAGrao3NYUFdvndVtADfb%2Ffn2%2BP3cOMHAl%2F39lT7v7jsx6eozTPT2UoT%2B%2F4%2FGz%2FL46ut68%2FJ4B1Kau9Pu%2F%2BzQt5NMBgAKGUikQxYIJokgEwAAAFtJREFUCNdjZGBEBiwMvIy2jIcZGRkZrRiPMTIyiFsiJPcxMkgyOsJ4OxhZGFgYOeE6SeMyMuhGI0yew8LAxI3gMqFxGRmMGUthvBZGRgZzFEczMDC4QJlbGRgA3KAIv74V5FUAAAAASUVORK5CYII%3D)](README.md)

_Master_
[![CircleCI](https://circleci.com/gh/18F/fs-permit-platform/tree/master.svg?style=shield)](https://circleci.com/gh/18F/fs-permit-platform/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/20d074f212f583579782/maintainability)](https://codeclimate.com/github/18F/fs-permit-platform/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/20d074f212f583579782/test_coverage)](https://codeclimate.com/github/18F/fs-permit-platform/test_coverage)

_Staging:_
[![Trees-CircleCI](https://circleci.com/gh/nciinc/fs-permit-platform.svg?style=shield)](https://circleci.com/gh/nciinc/fs-permit-platform)
[![Trees-GitHub Issues](https://img.shields.io/github/issues/nciinc/fs-permit-platform.svg)](https://github.com/nciinc/fs-permit-platform/issues)
[![Code Climate](https://codeclimate.com/github/nciinc/fs-permit-platform/badges/gpa.svg)](https://codeclimate.com/github/nciinc/fs-permit-platform)

# U.S. Forest Service Permit Platform


** Platform for sale of Christmas tree permits and intake of special use applications for the U.S. Forest Service **

## Welcome

The U.S. Forest Service is engaged in an ongoing effort to modernize and simplify its permitting processes. One facet of this effort is to make special use permits available to obtain online. Flexion worked with GSA's Technology Transformation Service's Office of Acquisitions and the Forest Service to build out this platform for noncommercial and temporary use permits.

## Opportunity Statement

The opportunity statement = the problem we are trying to solve with the ePermitting project.

We have the opportunity to modernize the public's ability to apply for special use permits and to purchase permits to harvest Christmas trees. For special use permits, Mt. Baker-Snoqualime is the pilot forest. For Christmas tree permits, Arapaho and Roosevelt, Flathead, Mt. Hood, and Shoshone are the pilot forests. Our belief is that these applications will simplify and speed up the ability to apply for and purchase permits.

## Table of contents

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Welcome](#welcome)
- [Opportunity Statement](#opportunity-statement)
- [Table of contents](#table-of-contents)
- [Development](#development)
	- [Requirements:](#requirements)
		- [Local development requirements](#local-development-requirements)
			- [Package Manager](#package-manager)
			- [Git](#git)
			- [Git Seekret](#git-seekret)
		- [Local development and deployment requirements](#local-development-and-deployment-requirements)
			- [Node](#node)
			- [PostgreSQL](#postgresql)
	- [Clone the repository](#clone-the-repository)
	- [Server development](#server-development)
		- [Database](#database)
		- [Environment Variables](#environment-variables)
		- [Install dependencies](#install-dependencies)
		- [Available commands](#available-commands)
		- [Server API Documentation](#server-api-documentation)
		- [Authentication](#authentication)
		- [Mock Data](#mock-data)
		- [Forest start and end dates](#forest-start-and-end-dates)
		- [JWT Usage](#jwt-usage)
		- [Pay.Gov integration](#paygov-integration)
		- [SMTP relay configuration for sending emails](#smtp-relay-configuration-for-sending-emails)
	- [Frontend Development](#frontend-development)
		- [Install angular cli](#install-angular-cli)
		- [Navigate to frontend directory](#navigate-to-frontend-directory)
		- [Install dependencies](#install-dependencies)
		- [Development server](#development-server)
		- [Build](#build)
		- [Running unit tests](#running-unit-tests)
		- [Running end-to-end tests](#running-end-to-end-tests)
		- [Testing WCAG2AA compliance with pa11y](#testing-wcag2aa-compliance-with-pa11y)
		- [Typedoc](#typedoc)
		- [Build typedoc](#build-typedoc)
		- [Available services](#available-services)
		- [Pay.gov error mocking in local environment](#paygov-error-mocking-in-local-environment)
		- [Pay.gov in QA environment](#paygov-in-qa-environment)
		- [Christmas trees sidebar template](#christmas-trees-sidebar-template)
	- [Docker Environment](#docker-environment)
- [Deployment](#deployment)
	- [Continuous Integration, Continuous Deployment](#continuous-integration-continuous-deployment)
	- [Cloud.gov](#cloudgov)
- [Docs](#docs)
- [Content administration](#content-administration)
	- [Christmas Trees Database and seeders](#christmas-trees-database-and-seeders)
	- [Markdown and Christmas trees forest content](#markdown-and-christmas-trees-forest-content)
	- [Christmas trees forest JSON content](#christmas-trees-forest-json-content)
	- [Enable html5 pushstate on cloud.gov](#enable-html5-pushstate-on-cloudgov)
		- [Logging STMP errors](#logging-stmp-errors)
- [Usability testing](#usability-testing)
- [Known technical Debt](#known-technical-debt)
- [Contributing](#contributing)
- [Public domain](#public-domain)

<!-- /TOC -->

## Local Development

There are two options for local development - Docker or installing the dependencies independently.

** The following instructions outline tools and procedures required for local development without docker **

### Requirements:

#### Local development requirements

##### Package Manager

Install [yarn](https://yarnpkg.com/en/docs/install) package manager

##### Git

Install [Git](https://git-scm.com/)

##### Git Seekret

All contributors should use git-seekret
(https://github.com/18f/laptop#git-seekret) to prevent accidental commits of sensitive data.

Project specific rules are defined on the [wiki](/wiki/git-seekret.md).

#### Local development and deployment requirements

##### Node

Install [Node ^8.9.4](https://nodejs.org/en/)

##### PostgreSQL

Install [PostgreSQL](https://www.postgresql.org/)

### Clone the repository

`git clone [repository url] fs-permit-platform`

Navigate to cloned repo

`cd fs-permit-platform`

### Server development

#### Database

A running Postgresql database is required in order to run the server locally. Please make sure you have installed [Postgresql](https://www.postgresql.org/) locally and created a database for this project.

#### Environment Variables

There are environment variables that are required to be set in order to run tests
and to run the server in general. Please set up these environment variables either in your shell or on the command line.

[View list of required environment variables, and installation instructions](/wiki/development/environment-variables.md)

#### Install dependencies

run `cd server` then run `yarn` to install dependencies.

#### Available commands

To run any of the server commands, either the environment variables above must be available in your shell or on the command line, and you must be in the server directory.

| Function | Command | Additional information |
| ------------- |:-------------:| -------------:|
| Setup Database | `yarn migrate` | |
| Start the server | `yarn dev` | Server is accessible at http://localhost:8080 |
| Revert the last database migration | `yarn undoLastMigrate` | |
| Revert all of the database migrations and start with a blank database | `yarn undoAllMigrate` | |
| Run eslint for linting | `yarn lint` | The linting results will be put into `server/lint-results.html`. |
| To run all of the tests locally | `yarn test` | Be sure your Postgresql server is running |
| To run code coverage locally | `yarn coverage` | Be sure your Postgresql server is running. The coverage results can be found in `server/coverage/index.html` |

#### Server API Documentation

With your local Node server running, browse to http://localhost:8080/docs/api in order to view the interactive Swagger API documentation. This documentation will allow interactive access to the API endpoints.

#### Authentication

Public users must authenticate with login.gov, and Forest Service admins must authenticate with USDA eAuth. Both of these authentication techniques are handled by the Passport library for Node.js.

Login.gov uses the openid-client passport plugin for the OpenID Connect protocol, and USDA eAuth uses the passport-saml plugin for the SAML protocol.

Due to security restrictions testing can't be done locally, you must use a server on cloud.gov. Setting the PLATFORM environment variable will bypass all authentication checks.

Note: if running in a clustered environment Session Affinity (sticky sessions) should be configured.

#### Mock Data

Some models (e.g. christmasTreesForests) use a sequelize hook to change the data as configured in the seed commands
at run-time for purposes of testing. An alert is also displayed in the frontend. Mock data application uses the `NODE_ENV` and environment values in the server and frontend code respectively.

#### Forest start and end dates

Forest tree cutting start and end dates are saved in the database as a UTC DateTime object. When updating the start and end dates for the forest in the database, you must consider daylight savings, the forest timezone and calculate the offset.

Forest dates on the frontend use the forest's timezone to calculate the correct date and time.

#### JWT Usage

VCAP service value for jwt token is used for appending a token to permit URL to view the purchased permit so that the users cannot easily guess the permit URL.

#### Pay.Gov integration

VCAP service values for Pay.Gov need to be updated for production deploy. `{token_url}` and `{client_url}` need to be supplied by Pay.Gov.
To mock Pay.Gov integration use the values in the VCAP example.

#### SMTP relay configuration for sending emails

The current configuration implements email via google smtp relay. Follow the documentation at https://support.google.com/a/answer/2956491?hl=en to set up your google SMTP relay.

Authentication is set up to support safelisted IP addresses that are allowed to send emails, so no SMTP authentication is required.

The `smtpserver` value in your VCAP_SERVICES should be `smtp-relay.gmail.com`

### Frontend Development

#### Install angular cli

Run `yarn global add @angular/cli`

#### Navigate to frontend directory

`cd frontend`

#### Install dependencies

Run `yarn`

#### Development server

Run `ng serve` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Build

Run `ng build --prod --env=prod --aot=false` to build the static files for the single paged app. The build artifacts that can be deployed will be stored in the `dist/` directory.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Add `--code-coverage` flag to print out code coverage statistics.

#### Running end-to-end tests

Run `yarn run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Testing WCAG2AA compliance with pa11y

To run pa11y-ci with the single page angular app with pushstate enabled, you need to first build the static application, and then run the app from a server that supports pushstate. We are using superstatic as our server.

Run pa11y-ci via docker: `cd docker; docker-compose up pa11y`

Run pa11y-ci without docker: `cd frontend; yarn run build-test-pa11y`

#### Typedoc

#### Build typedoc

Install typedoc globally: `yarn global add typedoc`

`cd frontend`

build typedoc `yarn run docs`

typedoc are added to `frontend/src/assets/typedoc` and are accessible via url at `/assets/typedoc/index.html`

Navigate to `/assets/typedoc/index.html`

#### Available services

[View services that are available to leverage in components.](/wiki/development/available-services.md)

#### Pay.gov error mocking in local environment

* To mock a pay.gov token error, in the Christmas trees application form, set the first name to 1 and last name to 1.

* To mock a pay.gov 500 error, in the Christmas trees application form, set the first name to 1 and last name to 2.

* To mock a pay.gov complete collection error, use credit card number `000000000000XXXX`. The last four XXXX represent the pay.gov error code.

#### Pay.gov in QA environment

* A valid credit card number in staging environment is `4111111111111111`.

#### Christmas trees sidebar template

[View instructions to use the Christmas trees sidebar template.](/wiki/development/christmas-trees-sidebar-template.md)

### Docker Environment

As an alternative to installing all the development tools necessary to run the entire environment on your computer, Docker can be used instead. These instructions will detail how to use Docker to setup a full environment to run the application.

[View instructions to get up and running with Docker](/wiki/development/docker-instructions.md)

[View instructions to administer the forest json](/wiki/christmas-trees/content/forest-json-instructions.md)

## Deployment

### Continuous Integration, Continuous Deployment

[Circleci 2.0](/wiki/christmas-trees/process/Circleci-2-implementation.md) is used for continuous integration/deployment. The configuration file for circleci are found at [/.circleci/config.yml](/circleci/config.yml). An explaination of the checks performed by circleci are found at [/wiki/christmas-trees/process/circle-checks.md](/wiki/christmas-trees/process/circle-checks.md)

The circleci configuration separates the tests into three different jobs that run simultaneously to decrease build time e2e, pa11y tests, and all other tests.

Deployment to a staging server is configured to run on the sprint branch only.

#### Snyk

Check the .snyk file under frontend and server for packages ignored by [snyk](https://snyk.io/). This
file is managed by the `snyk wizard`. `snyk-protect` is run in the Procfile at server start-up.

### Cloud.gov

Deployment to cloud.gov is configured in the [.cg-deploy](/.cg-deploy) directory. The website's client (frontend) and server (backend) are deployed to separate servers. Each deployment environment (staging, production) require their own manifest files. The manifests are attached to the environment via the [deploy script](/.cg-deploy/deploy.sh), that authenticates with cloud.gov and pushes the files.

### Build versioning

The app/frontend/replace.build.js script is run from circle-ci via config.yml to update the version and date in the transpiled javascript
frontend code for each build.  This date and version will display in the application footer.

## Docs
* [Server jsDocs](https://fs-intake-api.app.cloud.gov/docs/code/)
* [Server api endpoints](https://fs-intake-api.app.cloud.gov/docs/api)
* [Frontend Typedocs](https://forest-service-epermit.app.cloud.gov/assets/typedoc/)

## Content administration

[Christmas trees README](/wiki/christmas-trees/README.md)

### Christmas Trees Database and seeders

The database is used to store Christmas Trees permit applications for transaction purposes, and a minimal set of variables for each forest that are shared throughout the Christmas trees pages (e.g. on the permit svg and the guidelines.) The Christmas Trees Forests database contains the following fields:

[View ChristmasTreesForest database structure](/wiki/christmas-trees/content/christmas-trees-forests-db-table.md)

### Markdown and Christmas trees forest content

To update a forest’s informational content, you’ll need to find and modify markdown files specific to the forest. The content is structured so that each national forest has its own directory, which can be found under `frontend/src/assets/content` and then adding the `forest_abbr` to the url. (For example, `frontend/src/assets/content/mthood`.) Each forest’s directory contains several markdown files and folders that comprise the bulk of the content for each forest. (For example, `/christmas-trees/forests/flathead`.)

In the markdown files, database variables are indicated by curly brackets, such as {{treeHeight}}.

[View a list of markdown files and their locations](/wiki/christmas-trees/content/markdown-files.md)

### Christmas trees forest JSON content

JSON files for forest content are in `/assets/config`

Each forest has a JSON file that contains any data needed by the forest that does not come from the database or markdown, e.g., shared tree species information. The shared tree species are located in `frontend/src/assets/content/common/species`.

### Enable html5 pushstate on cloud.gov

In order to enable `pushstate` for single page apps on cloud.gov using the static build pack, you must add a file called `Staticfile` to the root directory with a single line `pushstate: enabled`

This allows you to use urls like `/some/path` instead of `/#/some/path`

[Reference](https://docs.cloudfoundry.org/buildpacks/staticfile/)

#### Logging STMP errors

SMTP errors are logged in the console and prefixed with the string `NODE_MAILER_SMTP_ERROR`. A monitoring service, such as New Relic, can be configured to create alerts when an error with `NODE_MAILER_SMTP_ERROR` is logged.

## Usability testing

While developing we spent time usability testing features with the correct users and applied feedback into the website.

[The wiki](/wiki) includes usability testing summaries conducted by Flexion and NCI

## Known technical Debt

The file `frontend/src/sass/_focus-fix.scss` implements a style fix in the upstream repository: https://github.com/18F/web-design-standards/pull/2112/files Eventually once these changes are released we can remove this file.

The server dependency is JSDOM is currently a fork to pass security vulnerability tests. This should be replaced with the original package once the security vulnerability is fixed.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
