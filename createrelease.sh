#!/bin/bash
pwd
/home/Jenkins/.gvm/pkgsets/go1.11/global/bin/hub release create -a sonarqubereports/sonarqubeissuesreport.xlsx -a sonarqubereports/sonarqubeanalysisreport.docx -m Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER
curl https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$GIT_COMMIT?access_token=09dc91f38777e0a15087412413a9bff289e7d9f1 -H "Content-Type: application/json" -X POST -d '{"state": "success","context":"ci/jenkins: run sonarqube","description":"Your tests passed on Jenkins!","target_url":"https://jenkins.fedgovcloud.us/"}'

pwd
