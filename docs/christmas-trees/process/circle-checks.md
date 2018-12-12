## Snyk
Synk is run to ensure that vulnerabilities in dependencies are patched or, if they are unable to be patched, brought to the development team's attention by failing the circle build so they’ll know. Snyk is run on both frontend and server dependencies in the `run-all-other-tests` circle job, outside of a docker image.
## Pa11y
Pa11y is run to ensure that the application is 508 compliant. This test is run in the `run-pa11y` job, utilizing the `pa11y-ci` npm module. The application is started inside docker containers and then the pa11y module tests the list of known URLs from outside of docker.
## Coverage
The Coverage report is run on both frontend and server code and gives details on statements, functions, branches, and lines of code covered. If the coverage based on lines of code drops below 90% for either frontend or server code, the circle build will fail.
## E2e
E2e tests are run against the frontend application, inside of a docker container. The tests consist of those for authenticated users and unauthenticated users, these tests run in the same job, but under different steps. If any e2e test fails in either step, the circle build will fail.
## Frontend/server unit
Unit tests are run for both frontend and server code. They are run within the docker containers. Any test failures will prevent the circle build from completing.
## Doc build
As a part of the build process, typedocs and jsdocs are created and stored on the staging server.