[![FS Open Forest](https://img.shields.io/badge/-ePermit-006227.svg?colorA=FFC526&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAACFlBMVEUAAAD%2F%2FyXsvSW8qiXLsCXjuSXyvyX7wiX2wSXqvCXUsyXBrCXvviX%2F%2FyX8yCWUmyVliSV%2FkyV7kSWIlyV0jiWZnSX9yCXNsSXRsiXWtCVWgyVYhCXZtiX%2FyCV8kiV%2BkiX%2FyiX%2FzCWIliWElSX%2FzSX2wiVniSV3kCX2wiXUtCU5eCVujCXWtCW%2FqyXDrSWtpCWwpSWmoiWypiXeuCWJlyWPmSXiuiX%2F1CXsvSXFriW4qSWrpCWElCVdhiWSmiW3qCXCrSXQsiXyvyX%2F1CX%2F%2FyP%2F5yX%2F0iX%2FxCXrvCX%2FxiX%2F0iX%2F5yUcbCU6eCVAeiUfbiVEfCVEfCVZhCVEfCUzdSUtcyVAeyVNfyVZhCVGfSVEfCUqciUSaSUIZCUYayWPmSUUaiUCYiUVaiU1diVjiCUjcCVNfyVFfCXnuyU%2FeiUqciVliSVPgCWQmSUlcCVQgSV7kSX%2FxiWHliVPgCWPmSUtcyWLlyUibyVXgyWzpyX%2FxyXJryUXayVahCWIliWOmCU4eCV2jyXBrCXcuCXMsSVbhSUYaiV1jyU4eCVOgCVujCU6eCUudCWAkyUlcCVEfCVehiVYhCU%2FeiVvjSUSaSUAYiUAYiU1diWAlCUxdSUAYSUBYiUTaSVvjSVqiyVGfSUcbCUQaCUPaCUNZyULZiURaSUYayU6eCVehiVehiV1jyVmiSVOgCVRgSVSgSV2jyVxjSVvjSVMulUvAAAATHRSTlMAAGrao3NYUFdvndVtADfb%2Ffn2%2BP3cOMHAl%2F39lT7v7jsx6eozTPT2UoT%2B%2F4%2FGz%2FL46ut68%2FJ4B1Kau9Pu%2F%2BzQt5NMBgAKGUikQxYIJokgEwAAAFtJREFUCNdjZGBEBiwMvIy2jIcZGRkZrRiPMTIyiFsiJPcxMkgyOsJ4OxhZGFgYOeE6SeMyMuhGI0yew8LAxI3gMqFxGRmMGUthvBZGRgZzFEczMDC4QJlbGRgA3KAIv74V5FUAAAAASUVORK5CYII%3D)](README.md)

_Master_
[![CircleCI](https://circleci.com/gh/18F/fs-open-forest-platform/tree/master.svg?style=shield)](https://circleci.com/gh/18F/fs-open-forest-platform/tree/master)

Vulnerability Scans
Frontend: [![Known Vulnerabilities](https://snyk.io/test/github/18f/fs-open-forest-platform/badge.svg?targetFile=frontend%2Fpackage.json)](https://snyk.io/test/github/18f/fs-open-forest-platform?targetFile=frontend%2Fpackage.json)

Server: [![Known Vulnerabilities](https://snyk.io/test/github/18f/fs-open-forest-platform/badge.svg?targetFile=server%2Fpackage.json)](https://snyk.io/test/github/18f/fs-open-forest-platform?targetFile=server%2Fpackage.json)

_Staging:_
[![Staging CircleCI](https://circleci.com/gh/18F/fs-open-forest-platform/tree/dev.svg?style=svg)](https://circleci.com/gh/18F/fs-open-forest-platform/tree/dev)


# U.S. Forest Service Permit Platform


**Platform for sale of Christmas tree permits and intake of special use applications for the U.S. Forest Service**

## Welcome

The U.S. Forest Service is engaged in an ongoing effort to modernize and simplify its permitting processes. One facet of this effort is to make special use permits available to obtain online. The USForest Service and GSA's 18F acquisition built this open source platform for noncommercial group use, temporary outfitter and guide, and Christmas tree permits.

## Vision

As the first two-way interaction-focused Forest Service online application, Open Forest will strengthen the connection between the public and the National Forests. The application will broaden and increase the public’s responsible access to public lands through online availability; a predictable, responsive and friendly experience; and reduced administrative burden. These enhancements will drive increased customer satisfaction and quality of public engagement.

The Forest Service will use agile development methods and modular procurements to develop the application, ensuring an adaptive process that responds to emergent user needs and changing requirements.

## Table of contents

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Welcome](#welcome)
- [Opportunity Statement](#opportunity-statement)
- [Table of contents](#table-of-contents)
- [Development](#development)
	- [Overview](#overview)
	- [Requirements](#requirements)
	  - [Version Control](#version-control)
			- [Git](#git)
			- [Git Seekret](#git-seekret)
			- [Clone the Repository](#clone-the-repository)
		- [Local Environment](#local-environment)
			- [Node](#node)
			- [Package Manager](#package-manager)
			- [PostgreSQL](#postgresql)
		- [Docker Environment](#docker-environment)
	- [Server development](#server-development)
		- [Install dependencies](#install-dependencies)
		- [Database](#database)
		- [Environment Variables](#environment-variables)
		- [Available commands](#available-commands)
		- [Server API Documentation](#server-api-documentation)
		- [Authentication](#authentication)
		- [Forest start and end dates](#forest-start-and-end-dates)
		- [JWT Usage](#jwt-usage)
		- [Pay.Gov integration](#paygov-integration)
		- [SMTP relay configuration for sending emails](#smtp-relay-configuration-for-sending-emails)
		- [Logging](#logging)
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
		- [Basic Auth](#basic-auth)
- [Deployment](#deployment)
	- [Continuous Integration, Continuous Deployment](#continuous-integration-continuous-deployment)
	- [Cloud.gov](#cloudgov)
- [Docs](#docs)
- [Content administration](#content-administration)
	- [Christmas Trees Database and seeders](#christmas-trees-database-and-seeders)
	- [Markdown and Christmas trees forest content](#markdown-and-christmas-trees-forest-content)
	- [Christmas trees forest JSON content](#christmas-trees-forest-json-content)
	- [Enable html5 pushstate on cloud.gov](#enable-html5-pushstate-on-cloudgov)
		- [Logging SMTP errors](#logging-SMTP-errors)
- [Usability testing](#usability-testing)
- [Known technical debt](#known-technical-debt)
- [Known UX debt](#known-ux-debt)
- [Contributing](#contributing)
- [Public domain](#public-domain)

<!-- /TOC -->

## Overview
This repository comprises the application code for the platform. It includes a node.js server, and a Angular 2+ static frontend, currently deployed on [cloud.gov](https://cloud.gov/).

## Requirements

### Version Control

#### Git

Install [Git](https://git-scm.com/)

#### Git Seekret

All contributors should use git-seekret
(https://github.com/18f/laptop#git-seekret) to prevent accidental commits of sensitive data.

Project specific rules are defined on the [wiki](/docs/git-seekret.md).

#### Clone the repository

`git clone [repository url] fs-open-forest-platform`

Navigate to cloned repo

`cd fs-open-forest-platform`

### Local Environment

There are two options for development - Docker or installing the dependencies independently.

** The following instructions outline tools and procedures required for local development without docker **

#### Node

Install [Node ^8.15.1](https://nodejs.org/en/)

We recommend installing `node` such that it does not require the `sudo` command to run and different versions can be easily managed, for example, using [NVM](https://github.com/creationix/nvm#installation)

#### Package Manager

Make sure [NPM](https://www.npmjs.com/) is up to date `npm install -g npm`

#### PostgreSQL

Install [PostgreSQL](https://www.postgresql.org/)

### Docker Environment

As an alternative to installing all the development tools necessary to run the entire environment on your computer, Docker can be used instead. These instructions will detail how to use Docker to setup a full environment to run the application.

[View instructions to get up and running with Docker](/docs/development/docker-instructions.md)

[View instructions to administer the forest json](/docs/christmas-trees/content/forest-json-instructions.md)

### Server development

#### Install dependencies

Run `cd server` then run `npm install` to install dependencies.

#### Database

A running Postgresql database is required in order to run the server locally.
Please make sure you have installed [Postgresql](https://www.postgresql.org/).

Create a new database user with the password `fs_open_forest` and the CREATEDB
permission. You will be prompted for the password.

    $ createuser fs_open_forest --createdb -P

Then you can initialize your development database.

    $ npm run createdb
    $ npm run migrate
    $ npm run seed

##### Transactions

The database can support promisified transactions by leveraging the `server/dba/migrations/modules/transaction.js`

## Special use shared ID sequence

in order to have a shared ID across new permit types an `ALTER TABLE` query must be used. See migration `36` how to construct this.

#### Environment Variables

There are environment variables that are required to be set in order to run tests and to run the server in general. Please set up these environment variables either in your shell or on the command line. We use a cloud foundry (the underlying framework for cloud.gov) specific manager of environment variables.

[View list of required environment variables, installation instructions, and explanation of cloud.gov's VCAP-Services](/docs/development/environment-variables.md)

#### Available commands

To run any of the server commands, either the environment variables above must be available in your shell or on the command line, and you must be in the server directory.

| Function | Command | Additional information |
| ------------- |:-------------:| -------------:|
| Setup Database | `npm run migrate` | |
| Seed Database | `npm run seed` | Adds Christmas tree forest data |
| Start the server | `npm run dev` | Server is accessible at http://localhost:8080 |
| Revert the last database migration | `npm run undoLastMigrate` | |
| Revert all of the database migrations and start with a blank database | `npm run undoAllMigrate` | |
| Run eslint for linting | `npm run lint` | The linting results will be put into `server/lint-results.html`. |
| To run all of the tests locally | `npm run test` | Be sure your Postgresql server is running |
| To run code coverage locally | `npm run coverage` | Be sure your Postgresql server is running. The coverage results can be found in `server/coverage/index.html` |

Please see the [package.json](/server/package.json) for the complete list.

#### Server API Documentation

With your local Node server running, browse to http://localhost:8080/docs/api in order to view the interactive Swagger API documentation. This documentation will allow interactive access to the API endpoints.

#### Authentication

Public users must authenticate with login.gov, and Forest Service admins must authenticate with USDA eAuth. Both of these authentication techniques are handled by the Passport library for Node.js.

Login.gov uses the openid-client passport plugin for the OpenID Connect protocol, and USDA eAuth uses the passport-saml plugin for the SAML protocol.

Due to security restrictions testing can't be done locally, you must use a server on cloud.gov.

Note: we use `cookie-sessions` with keys bound to the environment to allow for running in a clustered environment.

#### Forest start and end dates

Forest tree cutting start and end dates are saved in the database as a UTC DateTime object. When updating the start and end dates for the forest in the database, you must consider daylight savings, the forest timezone and calculate the offset.

Forest dates on the frontend assume the forest's timezone and do NOT specify the timezone.

For local development, go to an [the changes season dates page to open a forest](http://localhost:4200/admin/christmas-trees/season-dates)

#### JWT Usage

VCAP service value for jwt token is used for appending a token to permit URL to view the purchased permit so that the users cannot easily guess the permit URL.

#### Pay.Gov integration

VCAP service values for Pay.Gov need to be updated for production deploy. `{token_url}` and `{client_url}` need to be supplied by Pay.Gov.
To mock Pay.Gov integration use the values in the VCAP example.

#### SMTP relay configuration for sending emails

The current configuration implements email via google smtp relay. Follow the documentation at https://support.google.com/a/answer/2956491?hl=en to set up your google SMTP relay.

Authentication is set up to support safelisted IP addresses that are allowed to send emails, so no SMTP authentication is required.

The `smtpserver` value in your VCAP_SERVICES should be `smtp-relay.gmail.com`

#### Logging
We use [winston](https://www.npmjs.com/package/winston) logging and [express-winston](https://www.npmjs.com/package/express-winston) to modify logs to be viewed within cloud.gov.

### Frontend Development

#### Navigate to frontend directory

`cd frontend`

#### Install dependencies

Run `npm install`

#### Development server

Run `npm start` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Build

Run `npm run dist-<env>` where `env` is one of `dev`, `trees` (staging), `prod` to build the static files for the single paged app. The build artifacts that can be deployed will be stored in the `dist/` directory.

#### Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Add `--code-coverage` flag to print out code coverage statistics.

#### Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

If you receive an error that Chromedriver requires a different version of Chrome than what is currently installed, most likely you have an older version of Chrome that is not compatible with the newest version of Chromedriver that will be installed by Protractor. You can:
##### Update your version of [Chrome](https://www.google.com/chrome/)
OR
##### Download a specific version of Chromedriver that is compatible with your version of Chrome
- Find the appropriate version of [Chromedriver](http://chromedriver.chromium.org/downloads)
- Navigate to `https://chromedriver.storage.googleapis.com/index.html?path=<version>/` where `<version>` is replaced by the Chromedriver version you want
- Click on the link for your operating system to download the `.zip` file
- Extract the executable and copy it somewhere that makes sense to you, (ex: `~/chromedriver/`)
- Ensure that the environment variable `OPEN_FOREST_CHROME_DRIVER` is set to the absolute path to the chromedriver executable above, either by exporting it in your profile or providing it when running the e2e tests. Ex. `OPEN_FOREST_CHROME_DRIVER="/Users/<username>/Downloads/chromedriver" npm run e2e`

**Note: The output still shows that it downloads the latest chromedriver, but it will actually USE the one specified.**

#### Testing WCAG2AA compliance with pa11y

To run pa11y-ci with the single page angular app with pushstate enabled, you need to first build the static application, and then run the app from a server that supports pushstate. We are using superstatic as our server.

Run pa11y-ci via docker: `cd docker; docker-compose up pa11y`

Run pa11y-ci without docker: `cd frontend; npm run build-test-pa11y`

#### Typedoc

#### Build typedoc

`cd frontend`

build typedoc `npm run docs`

typedoc are added to `frontend/src/assets/typedoc` and are accessible via url at `/assets/typedoc/index.html`

Navigate to `/assets/typedoc/index.html`

#### Available services

[View services that are available to leverage in components.](/docs/development/available-services.md)

#### Pay.gov error mocking in local environment

* To mock a pay.gov error when beginning the transaction, in the Christmas trees application form, set the first name to `unknown`.

* To mock a pay.gov error when completing the transaction, use credit card number `000000000000XXXX`.

#### Pay.gov in QA environment

* A valid credit card number in staging environment is `4111111111111111`.

* To mock a expired card pay.gov error when completing the transaction, use credit card number `4005550000000001`.

#### Christmas trees sidebar template

[View instructions to use the Christmas trees sidebar template.](/docs/development/christmas-trees-sidebar-template.md)

#### Basic Auth
The `staging-deploy` and the `prod-deploy` currently have a basic auth file generated from ENV vars in circle.
`BASIC_AUTH_USER` and `BASIC_AUTH_PASS` which is a hash of the password (generated by HTPassword) are copied into a frontend/src/Staticfile.auth which is used by the cloud.gov static buildpack.

This task should be removed prior to launch.

## Deployment

### Continuous Integration, Continuous Deployment

[Circleci 2.0](/docs/christmas-trees/process/Circleci-2-implementation.md) is used for continuous integration/deployment. The configuration file for circleci are found at [/.circleci/config.yml](/circleci/config.yml). An explaination of the checks performed by circleci are found at [/docs/christmas-trees/process/circle-checks.md](/docs/christmas-trees/process/circle-checks.md)

The circleci configuration separates the tests into different jobs that run simultaneously to decrease build time e2e, pa11y tests, and all other tests.

Deployment to a staging server is configured to run on the `dev` branch only.

#### Snyk

Check the .snyk file under frontend and server for packages ignored by [snyk](https://snyk.io/). This
file is managed by the `snyk wizard`. `snyk-protect` is run in the Procfile at server start-up.

### Cloud.gov

Deployment to cloud.gov is configured in the [.cg-deploy](/.cg-deploy) directory. The website's client (frontend) and server (backend) are deployed to separate servers. Each deployment environment (staging, production) require their own manifest files. The manifests are attached to the environment via the [deploy script](/.cg-deploy/deploy.sh), that authenticates with cloud.gov and pushes the files.

We have a development environment configured to support ad hoc testing that cannot be done locally, for example the EAuth integration. This environment is connected to the same services as the staging environment except for the middlelayer, which is the `dev` environment (which is connected to staging SUDS, etc). Pushing to this environment must be done manually by making sure you are logged into Cloud.gov and:

- `cd frontend`
- `npm run dist-dev`
- `cd ../server`
- `./copy-frontend-assets.sh`
- `cd ..`
- `cf t -o usda-forest-service -s platform-dev`
- `cf zero-downtime-push open-forest-platform-frontend-dev -f .cg-deploy/manifests/dev/manifest-frontend-dev.yml`
- `cf zero-downtime-push open-forest-platform-api-dev -f .cg-deploy/manifests/dev/manifest-api-dev.yml`


### Build versioning

The app/frontend/replace.build.js script is run from circle-ci via config.yml to update the version and date in the transpiled javascript
frontend code for each build.  This date and version will display in the application footer.

## Docs
* [Server jsDocs](https://fs-intake-api.app.cloud.gov/docs/code/)
* [Server api endpoints](https://fs-intake-api.app.cloud.gov/docs/api)
* [Frontend Typedocs for Production](https://openforest.fs.usda.gov/assets/typedoc/)
* [Frontend Typedocs for Staging](https://forest-service-trees-staging.app.cloud.gov/assets/typedoc/)

## Content administration

[Christmas trees README](/docs/christmas-trees/content/markdown-files.md)

### Christmas Trees Database and seeders

The database is used to store Christmas Trees permit applications for transaction purposes, and a minimal set of variables for each forest that are shared throughout the Christmas trees pages (e.g. on the permit svg and the guidelines.) The Christmas Trees Forests database contains the following fields:

[View ChristmasTreesForest database structure](/docs/christmas-trees/content/christmas-trees-forests-db-table.md)

### Markdown and Christmas trees forest content

To update a forest’s informational content, you’ll need to find and modify markdown files specific to the forest. The content is structured so that each national forest has its own directory, which can be found under `frontend/src/assets/content` and then adding the `forest_abbr` to the url. (For example, `frontend/src/assets/content/mthood`.) Each forest’s directory contains several markdown files and folders that comprise the bulk of the content for each forest. (For example, `/christmas-trees/forests/flathead`.)

In the markdown files, database variables are indicated by curly brackets, such as {{treeHeight}}.

[View a list of markdown files and their locations](/docs/christmas-trees/content/markdown-files.md)

### Christmas trees forest JSON content

JSON files for forest content are in `/assets/config`

Each forest has a JSON file that contains any data needed by the forest that does not come from the database or markdown, e.g., shared tree species information. The shared tree species are located in `frontend/src/assets/content/common/species`.

### Enable html5 pushstate on cloud.gov

In order to enable `pushstate` for single page apps on cloud.gov using the static build pack, you must add a file called `Staticfile` to the root directory with a single line `pushstate: enabled`

This allows you to use urls like `/some/path` instead of `/#/some/path`

[Reference](https://docs.cloudfoundry.org/buildpacks/staticfile/)

### Logs
This application uses Winston library to format logs as JSON to the [cloud.gov Kibana](https://logs.fr.cloud.gov/) instance. The centralized logger is within the `server/src/services/logger.es6` file. For route requests, the [expressWinston](https://www.npmjs.com/package/express-winston) library is used. For server controller actions the `server/src/services/util.es6:logControllerAction` should be used.

#### Logging SMTP errors

SMTP errors are logged in the console and prefixed with the string `NODE_MAILER_SMTP_ERROR`. A monitoring service, such as New Relic, can be configured to create alerts when an error with `NODE_MAILER_SMTP_ERROR` is logged.

## Usability testing

While developing we spent time usability testing features with the correct users and applied feedback into the website.

[The wiki](/wiki) includes usability testing summaries conducted by Flexion and NCI

## Known technical debt

The file `frontend/src/sass/_focus-fix.scss` implements a style fix in the upstream repository: https://github.com/18F/web-design-standards/pull/2112/files Eventually once these changes are released we can remove this file.

The server dependency is JSDOM is currently a fork to pass security vulnerability tests. This should be replaced with the original package once the security vulnerability is fixed.

## Known UX debt

#### Scaling to include more permit types: Architecture to support purchasing or applying for multiple products per transaction
The site’s architecture is not optimized to support users purchasing more than one product in a single transaction. It was built (1) with the understanding that tree cutter’s do not typically purchase permits for more than one forest and (2) for ease in modularly onboarding additional Forests, each with their own unique rules and guidelines, to sell Christmas tree permits. However, there is some evidence that users may want to purchase or apply for more than one of the permit types that the ePermits platform will eventually offer. Enabling users to purchase or apply for more than one permit type, including Christmas tree permits, online will require some rearchitecting.

#### Scaling to include more Forests: Form controls to help users choose from a greater number of options
The site was built to accommodate four pilot Forests. Scaling the application to include more Forests will require that a number of form controls be redesigned to support users in choosing their forest from greater than four options. Pages impacted:

- [Landing page](https://forest-service-trees-staging.app.cloud.gov/christmas-trees/forests)
- [Generate a report*](https://forest-service-trees-staging.app.cloud.gov/admin/christmas-trees/reports)
- [Change cutting area dates*](https://forest-service-trees-staging.app.cloud.gov/admin/christmas-trees/district-dates)
- [Change season dates*](https://forest-service-trees-staging.app.cloud.gov/admin/christmas-trees/season-dates)

**This page will need to support users’ selection from a greater number of options only if the FS Product Owner and leadership decide that Forest administrators should have access to other Forests in the application, in addition to their own.*

The details of how these pages and form controls should be designed in order to support users selecting from a large number of Forests will require additional user research.

## Alert Monitoring
This project uses New Relic Monitoring for performance and uptime alerts. The application name and license keys are provided as environment variables that are accessed through the VCAP constants. This application uses the `newrelic` npm module.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
