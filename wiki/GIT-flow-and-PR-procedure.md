# GIT flow and PR procedure 

## Start of Sprint
Create a new branch named, "sprint-x-development" from the flexion/fs-permit-platform master branch. (replace x with the sprint number e.g. sprint-1-development)

Change circle.yml config so that dev deployment to the cloud.gov staging site is initiated on the new sprint development branch.

### Sprint branching
During the sprint, branches should be created from the "sprint-x-development" branch. Branches should be prefixed by the issue number, e.g. 23_issue_name

### PRs during the sprint
For the duration of the sprint, pull requests should be made to the "sprint-x-development" branch. PRs should be connected to the issue that the PR completes

### PR approval and merging
PRs need to be reviewed and approved by at least one other developer. After approved, reviewer can merge PR into sprint-x-development branch.

Issue completed by PR can be moved into 'done' column on Zen Hub board.

## End of Sprint
### Create release branch
At the end of the sprint, merge sprint-x-development branch into the flexion/fs-permit-platform master branch.

### Release PR to 18F/fs-permit-platform
Create a PR to 18F/fs-permit-platform dev branch from flexion/fs-permit-platform master branch and name it sprint-x-release

Be sure to include stories that were the focus, stories that were completed, and stories that were worked on but not completed.

