# Docker development instructions

1. Install Docker for your platform at https://www.docker.com/. Make sure that the Docker service is started.

1. Clone this repository.

1. In a console terminal navigate to the directory the repository was cloned to. Now `cd` to the `docker` directory.

   ```
   $ cd fs-permit-platform
   $ cd docker
   ```

1. Now use Docker Compose to build and start the containers.

   ```
   $ docker-compose up --force-recreate fs-intake-frontend
   ```

1. The first time the containers are created it will take a few minutes. There will be a whole lot of output to the screen, but eventually the output will stop and something like the following should be displayed:

   ```
   fs-intake-frontend_1  | webpack: Compiled successfully.
   ```

1. The containers and servers are now running. There are four containers:

   * fs-intake-frontend - This container runs the Angular application. It can be accessed in the browser at http://localhost:4200.

   * fs-intake-server - This container runs the server side Node application. It can be accessed in the browser at http://localhost:8080.

   * fs-intake-postgres - This container runs the PostgreSQL database server.

   * adminer - This container runs a PHP based database administration application. It can be accessed at http://localhost:8081. The front page for Adminer is a database login page. The values to use are:

     * System: PostgreSQL
     * Server: fs-intake-postgres:5432
     * Username: postgres
     * Password: postgres
     * Database: postgres

1. Changes made to any of the JavaScript code will be automatically picked up and the appropriate server will auto-reload so that your changes can be seen immediately.

1. If either of the `package.json` files are modified, at this time simply Ctrl+C in the terminal you ran `docker-compose` in to stop the running containers and then re-run the `docker-compose` command to rebuild the containers.

#### Pa11y in Docker

In addition to running the whole application locally, pa11y tests can also be run in Docker by following these steps:

1. Install Docker for your platform at https://www.docker.com/. Make sure that the Docker service is started.

1. Clone this repository.

1. In a console terminal navigate to the directory the repository was cloned to. Now `cd` to the `docker` directory.

   ```
   $ cd fs-permit-platform
   $ cd docker
   ```

1. Now use Docker Compose to build and start the containers.

   ```
   $ docker-compose up --force-recreate fs-intake-pa11y
   ```

1. The first time the containers are created it will take a few minutes. There will be a whole lot of output to the screen, but eventually the output will stop and something like the following should be displayed:

   ```
   fs-intake-pa11y_1     | Visit http://0.0.0.0:4200 to view your app.
   ```

1. The containers and servers are now running. There are four containers:

   * fs-intake-pa11y - This container runs the Angular application. It can be accessed in the browser at http://localhost:4200.

   * fs-intake-server - This container runs the server side Node application. It can be accessed in the browser at http://localhost:8080.

   * fs-intake-postgres - This container runs the PostgreSQL database server.

1. In a console terminal run `pa11y-ci` and the tests will run, displaying any pa11y errors found.

#### Docker Troubleshooting

* [No such file or directory for /var/lib/docker/overlay2 · Issue #1396 · docker/for-mac](https://github.com/docker/for-mac/issues/1396#issuecomment-313457823)
