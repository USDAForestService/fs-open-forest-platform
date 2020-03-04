#!/bin/bash
pwd
/home/Jenkins/.gvm/pkgsets/go1.11/global/bin/hub release create -a sonarqubereports/sonarqubeissuesreport.xlsx -a sonarqubereports/sonarqubeanalysisreport.docx -m Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER
curl https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$GIT_COMMIT?access_token=6fafb4dca1e800a5d67efe74a1b268647f6bcf4b -H "Content-Type: application/json" -X POST -d '{"state": "success","context":"ci/jenkins: run e2e","description":"Your tests passed on Jenkins!","target_url":"https://jenkins.fedgovcloud.us"}'

pwd
