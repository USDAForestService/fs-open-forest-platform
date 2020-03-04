#!/bin/bash
pwd
/home/Jenkins/.gvm/pkgsets/go1.11/global/bin/hub release create -a sonarqubereports/sonarqubeissuesreport.xlsx -a sonarqubereports/sonarqubeanalysisreport.docx -m Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER
curl https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$GIT_COMMIT?access_token=3f6a8612ec13f05499872376722e01d911daf7a2 -H "Content-Type: application/json" -X POST -d '{"state": "success","context":"ci/jenkins: run sonarqube","description":"Your tests passed on Jenkins!","target_url":"https://jenkins.fedgovcloud.us/"}'

pwd
