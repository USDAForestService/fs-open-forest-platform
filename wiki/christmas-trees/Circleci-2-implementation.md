# Circleci 2
We decided to move on to Circleci 2 from Circleci 1 in hopes that circle 2 would be more stable running selenium for our end-to-end (e2e) tests. On Circle 1, our builds would fail at random during the e2e tests. Builds would need to be restarted several times before they would pass, which severely slowed down the development process.

After a successful implementation of Circle 2, the e2e tests seem to be more stable, and we have not yet encountered any random e2e test failures.

## Build time
In order to speed up build times, we have utilized workflows to run parallel tasks for the job which handles running the e2e tests. This has caused build times without depoly to drop to around 7 minutes.

For a build with a deploy, build times are around 16 minutes.

## Circle 2 configuration is found in .circleci/config.yml