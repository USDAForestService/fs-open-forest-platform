# Circleci 2
We decided to move on to Circleci 2 from Circleci 1 in hopes that circle 2 would be more stable running selenium for our end-to-end (e2e) tests. On Circle 1, our builds would fail at random during the e2e tests. Builds would need to be restarted several times before they would pass, which severely slowed down the development process.

After a successful implementation of Circle 2, the e2e tests seem to be more stable, and we have not yet encountered any random e2e test failures.

## Build time
For a build without deploy, build times are around 13 minutes.

For a build with a deploy, build times are around 21 minutes.

We think that we can decrease the build time significantly by utilizing workflows to run parallel tasks.

Currently, the build/deploy time in Circle 2 is very close to the Circle 1 build/deploy time.

## Circle 2 configuration is found in .circleci/config.yml