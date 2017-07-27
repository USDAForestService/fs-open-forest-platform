[![FS ePermit API](https://img.shields.io/badge/-ePermit-006227.svg?colorA=FFC526&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAACFlBMVEUAAAD%2F%2FyXsvSW8qiXLsCXjuSXyvyX7wiX2wSXqvCXUsyXBrCXvviX%2F%2FyX8yCWUmyVliSV%2FkyV7kSWIlyV0jiWZnSX9yCXNsSXRsiXWtCVWgyVYhCXZtiX%2FyCV8kiV%2BkiX%2FyiX%2FzCWIliWElSX%2FzSX2wiVniSV3kCX2wiXUtCU5eCVujCXWtCW%2FqyXDrSWtpCWwpSWmoiWypiXeuCWJlyWPmSXiuiX%2F1CXsvSXFriW4qSWrpCWElCVdhiWSmiW3qCXCrSXQsiXyvyX%2F1CX%2F%2FyP%2F5yX%2F0iX%2FxCXrvCX%2FxiX%2F0iX%2F5yUcbCU6eCVAeiUfbiVEfCVEfCVZhCVEfCUzdSUtcyVAeyVNfyVZhCVGfSVEfCUqciUSaSUIZCUYayWPmSUUaiUCYiUVaiU1diVjiCUjcCVNfyVFfCXnuyU%2FeiUqciVliSVPgCWQmSUlcCVQgSV7kSX%2FxiWHliVPgCWPmSUtcyWLlyUibyVXgyWzpyX%2FxyXJryUXayVahCWIliWOmCU4eCV2jyXBrCXcuCXMsSVbhSUYaiV1jyU4eCVOgCVujCU6eCUudCWAkyUlcCVEfCVehiVYhCU%2FeiVvjSUSaSUAYiUAYiU1diWAlCUxdSUAYSUBYiUTaSVvjSVqiyVGfSUcbCUQaCUPaCUNZyULZiURaSUYayU6eCVehiVehiV1jyVmiSVOgCVRgSVSgSV2jyVxjSVvjSVMulUvAAAATHRSTlMAAGrao3NYUFdvndVtADfb%2Ffn2%2BP3cOMHAl%2F39lT7v7jsx6eozTPT2UoT%2B%2F4%2FGz%2FL46ut68%2FJ4B1Kau9Pu%2F%2BzQt5NMBgAKGUikQxYIJokgEwAAAFtJREFUCNdjZGBEBiwMvIy2jIcZGRkZrRiPMTIyiFsiJPcxMkgyOsJ4OxhZGFgYOeE6SeMyMuhGI0yew8LAxI3gMqFxGRmMGUthvBZGRgZzFEczMDC4QJlbGRgA3KAIv74V5FUAAAAASUVORK5CYII%3D)](README.md)
[![CircleCI](https://circleci.com/gh/flexion/fs-intake-module.svg?style=shield)](https://circleci.com/gh/flexion/fs-intake-module)
[![Dependency Status](https://www.versioneye.com/user/projects/59721f9e368b08004cede291/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59721f9e368b08004cede291)
[![Code Climate](https://codeclimate.com/github/flexion/fs-intake-module/badges/gpa.svg)](https://codeclimate.com/github/flexion/fs-intake-module)
[![codecov](https://codecov.io/gh/flexion/fs-intake-module/branch/sprint-8-development/graph/badge.svg)](https://codecov.io/gh/flexion/fs-intake-module)
[![GitHub Issues](https://img.shields.io/github/issues/flexion/fs-intake-module.svg)](https://github.com/flexion/fs-intake-module/issues)

# U.S. Forest Service Intake Module
Module for intake of special use applications for Forest Service Application Permits.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain
This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

## U.S. Forest Service Intake Module Templates

### For development:

Install [yarn](https://yarnpkg.com/en/docs/install) package manager

#### Install angular cli
Run `yarn install -g @angular/cli`

#### Navigate to frontend directory

`cd frontend`

#### Install dependencies
Run `yarn`

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.


### typedoc

#### Build typedoc

Install typedoc globally: `yarn global add typedoc`

`cd frontend`

build typedoc `yarn run docs`

typedoc are added to `frontend/src/assets/typedoc` and are accessible via url at `/assets/typedoc/index.html`


Navigate to `/assets/typedoc/index.html`

### Enable html5 pushstate on cloud.gov
In order to enable pushstate for single page apps on cloud.gov using the static build pack, you must add a file called `Staticfile` to the root directory with a single line `pushstate: enabled`

This allows you to use urls like `/some/path` instead of `/#/some/path`

[Reference](https://docs.cloudfoundry.org/buildpacks/staticfile/)

### Docker Environment

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
