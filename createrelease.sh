#!/bin/bash
pwd
hub release create -a sonarqubereports/sonarqubeissuesreport.xlsx -a sonarqubereports/sonarqubeanalysisreport.docx -m Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER Jenkins-${GIT_BRANCH}-Build-$BUILD_NUMBER
pwd
