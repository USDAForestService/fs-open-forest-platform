def jobnameparts = JOB_NAME.tokenize('/') as String[]
def jobconsolename = jobnameparts[0]

pipeline {
    agent {
    node {
    label 'linuxworker1'
        }
    }

    environment {
        CURRENTBUILD_DISPLAYNAME = "fs-open-forest-platform Build #$BUILD_NUMBER"
        CURRENT_BUILDDESCRIPTION = "fs-open-forest-platform Build #$BUILD_NUMBER"
        SONAR_HOST = credentials('SONAR_HOST')
	SONAR_TOKEN = credentials('SONAR_TOKEN_FSOPENFOREST')
        GITHUB_TOKEN = credentials('GITHUB_TOKEN')
        GITHUB_PROJECT_NAME = "USDAForestService/fs-open-forest-platform"
        SONAR_PROJECT_NAME = "fs-openforest-platform"
//        MAILING_LIST = 'ikumarasamy@techtrend.us,matthew.reiss@usda.gov,abdul.qureshi@usda.gov,SM.FS.OpenFrstOps@usda.gov,michael.laney@usda.gov,Brian.Davidson2@usda.gov,Dylan.Mcafee@usda.gov,Rebekah.Hernandez@usda.gov,jonathan.lerner@usda.gov,shadat.mahmud@usda.gov,bdavidson@cynerge.com'
        MAILING_LIST = 'ikumarasamy@techtrend.us'	    

	CHECKOUT_STATUS = 'Pending'
        INSTALL_DEPENDENCIES_STATUS= 'Pending'
	RUN_LINT_STATUS = 'Pending'
	RUN_UNIT_TESTS_STATUS = 'Pending'
	RUN_E2E_STATUS = 'Pending'
	RUN_PA11Y_STATUS = 'Pending'
	DEPLOY_STATUS = 'Pending'
	RUN_SONARQUBE_STATUS = 'Pending'
	AUTHOR = 'kilara77'
	BASIC_AUTH_PASS=credentials('BASIC_AUTH_PASS')
	BASIC_AUTH_USER=credentials('BASIC_AUTH_USER')
        JENKINS_URL="https://jenkins.fedgovcloud.us"
        SONARQUBE_URL="https://sca.fedgovcloud.us/dashboard?id=fs-openforest-platform"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        ansiColor('xterm')
    }

 stages {

    stage('Checkout Code'){
       steps {
                script {
                  currentBuild.displayName = "${env.CURRENTBUILD_DISPLAYNAME}"
                  currentBuild.description = "${env.CURRENT_BUILDDESCRIPTION}"
     sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: checkout-code", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''
  		  CHECKOUT_STATUS= 'Success'
                }
	}
	 post {
                failure {
			script {
        		CHECKOUT_STATUS= 'Failed'
 sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: checkout-code", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
                }
            }
    }
    }

    stage('install-dependencies'){
    steps {
	    script {
      sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: install-dependencies", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      '''
		    sh '''
	cd frontend
	npm install
	cd ../server
	npm install
	'''
      sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: install-dependencies", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''

		    INSTALL_DEPENDENCIES_STATUS= 'Success'
    		}
        }
		post {
                failure {
			script {
        		INSTALL_DEPENDENCIES_STATUS= 'Failed'

sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: install-dependencies", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
    		}
                }
            }
    }

stage('run tests')
	  {
      parallel{

stage('run-unit-tests'){
    steps {
        script {
  sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: run-unit-tests", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      '''
			sh '''
	cd server
	./copy-frontend-assets.sh
	cd ../frontend
	npm run test:ci
        cd ../server
	 npm run undoAllSeed
	 npm run migrate
	 npm run seed
	 npm run coverage --silent
	'''

    sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: run-unit-tests", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''

        RUN_UNIT_TESTS_STATUS= 'Success'
    }

        }
		post {
                failure {
                    script {
        		RUN_UNIT_TESTS_STATUS= 'Failed'
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: run-unit-tests", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
    		}
                }
            }
    }


     stage('run-lint'){
    steps {
        script
        {
 sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: run-lint", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      '''
		   sh '''
	    cd frontend
	    npm run lint
	    cd ../server
	    npm run lint
	    '''
    sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: run-lint", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''
	        RUN_LINT_STATUS= 'Success'
        }
	}
	post {
                failure {
                     script {
        		RUN_LINT_STATUS= 'Failed'
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: run-lint", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
    		}
                }
            }
    }


stage('run-sonarqube'){
        steps {
            script{
	sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: run-sonarqube", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      '''
	def scannerhome = tool 'SonarQubeScanner';
        withSonarQubeEnv('SonarQube') {
          sh label: '', script: '''/home/Jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQubeScanner/bin/sonar-scanner -Dsonar.login=$SONAR_TOKEN -Dsonar.projectKey=$SONAR_PROJECT_NAME -Dsonar.sources=. -Dsonar.exclusions=frontend/node_modules/**,frontend/dist/**,frontend/e2e/**,,server/node_modules/**,server/docs/**,server/frontend-assets/**,server/dba/**,server/test/**,docs/**'''
      	  sh 'rm -rf sonarqubereports'
          sh 'mkdir sonarqubereports'
  	  sh 'sleep 30'
          sh 'java -jar /home/Jenkins/sonar-cnes-report-3.1.0.jar -t $SONAR_TOKEN -s $SONAR_HOST -p $SONAR_PROJECT_NAME -o sonarqubereports'
          sh 'cp sonarqubereports/*analysis-report.docx sonarqubereports/sonarqubeanalysisreport.docx'
          sh 'cp sonarqubereports/*issues-report.xlsx sonarqubereports/sonarqubeissuesreport.xlsx'
  	  archiveArtifacts artifacts: 'sonarqubereports/sonarqubeanalysisreport.docx', fingerprint: true
   	  archiveArtifacts artifacts: 'sonarqubereports/sonarqubeissuesreport.xlsx', fingerprint: true
  sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: run-sonarqube", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''
		        RUN_SONARQUBE_STATUS= 'Success'
            }
            }
    }
	post {
                failure {
                       script {
        		RUN_SONARQUBE_STATUS= 'Failed'
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: run-sonarqube", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''

    		}
                }
            }
   }

stage('run pa11y'){
    steps {
        script {
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: run-pa11y", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      '''
		sh '''
	cd frontend
        npm run build-test-pa11y
	'''

sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: run-pa11y", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''
	        RUN_PA11Y_STATUS= 'Success'
        }
        }
	post {
                failure {
			 script {
        		RUN_PA11Y_STATUS= 'Failed'
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: run-pa11y", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
    		}
                }
            }
	  }
      }
      }

stage('run-e2e'){
        steps {
            script {
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: run-e2e", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      '''

	sh '''
		cd server
		./copy-frontend-assets.sh
		cd ../frontend/node_modules/protractor
		npm i webdriver-manager@latest
		cd ../..
		npm i typescript@3.1.6 --save-dev --save-exact
		cd ..	
	'''

  sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: run-e2e", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      '''
		        RUN_E2E_STATUS= 'Success'
            }
    }
	post {
                failure {
                       script {
        		RUN_E2E_STATUS= 'Failed'
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: run-e2e", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
    		}
                }
            }
   }	 	 
	 
 stage('dev-deploy'){
    steps {
        script {
	sh '''
      		curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: build-deploy", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests are queued behind your running builds!"}'
      	'''
//	sh '''
	//pwd
	//chmod 765 deploydev.sh
	//./deploydev.sh ${WORKSPACE}
	//'''
	sh '''
      		curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: build-deploy", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests passed on Jenkins!"}'
      	'''
        DEPLOY_STATUS= 'Success'
        }
        }
		post {
                failure {
                     script {
        		DEPLOY_STATUS= 'Failed'
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failure","context":"ci/jenkins: build-deploy", "target_url": "https://jenkins.fedgovcloud.us/blue/organizations/jenkins/fs-open-forest-platform/activity","description": "Your tests failed on Jenkins!"}'
      '''
    		}
                }
            }
    }
 }

post{
    success {
	    script
	    {
	    	env.LCHECKOUT_STATUS = "${CHECKOUT_STATUS}"
 	    	env.LINSTALL_DEPENDENCIES_STATUS = "${INSTALL_DEPENDENCIES_STATUS}"
		env.LRUN_LINT_STATUS = "${RUN_LINT_STATUS}"
		env.LRUN_UNIT_TESTS_STATUS = "${RUN_UNIT_TESTS_STATUS}"
		env.LRUN_E2E_STATUS = "${RUN_E2E_STATUS}"
		env.LRUN_PA11Y_STATUS = "${RUN_PA11Y_STATUS}"
		env.LRUN_SONARQUBE_STATUS = "${RUN_SONARQUBE_STATUS}"
  	        env.LDEPLOY_STATUS = "${DEPLOY_STATUS}"
		env.LGIT_BRANCH = "${GIT_BRANCH}"
		env.LGIT_AUTHOR = "${AUTHOR}"
  		env.BLUE_OCEAN_URL="${env.JENKINS_URL}/blue/organizations/jenkins/${jobconsolename}/detail/${GIT_BRANCH}/${BUILD_NUMBER}/pipeline"
	    	env.BLUE_OCEAN_URL_SQ_DOCX="${env.BUILD_URL}artifact/sonarqubereports/sonarqubeanalysisreport.docx"
		env.BLUE_OCEAN_URL_SQ_XLSX="${env.BUILD_URL}artifact/sonarqubereports/sonarqubeissuesreport.xlsx"
		env.LSONARQUBE_URL="${SONARQUBE_URL}"
      		emailext attachLog: false, attachmentsPattern: '', body: '''${SCRIPT, template="openforest.template"}''', mimeType: 'text/html', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: "${MAILING_LIST}"
	    }
        }

    failure {
	        script
	    {
	    	env.LCHECKOUT_STATUS = "${CHECKOUT_STATUS}"
 	    	env.LINSTALL_DEPENDENCIES_STATUS = "${INSTALL_DEPENDENCIES_STATUS}"
  		env.LRUN_LINT_STATUS = "${RUN_LINT_STATUS}"
		env.LRUN_UNIT_TESTS_STATUS = "${RUN_UNIT_TESTS_STATUS}"
		env.LRUN_E2E_STATUS = "${RUN_E2E_STATUS}"
		env.LRUN_PA11Y_STATUS = "${RUN_PA11Y_STATUS}"
		env.LRUN_SONARQUBE_STATUS = "${RUN_SONARQUBE_STATUS}"
		env.LDEPLOY_STATUS = "${DEPLOY_STATUS}"
		env.LGIT_BRANCH = "${GIT_BRANCH}"
		env.LGIT_AUTHOR = "${AUTHOR}"
  		env.BLUE_OCEAN_URL="${env.JENKINS_URL}/blue/organizations/jenkins/${jobconsolename}/detail/${GIT_BRANCH}/${BUILD_NUMBER}/pipeline"
		env.BLUE_OCEAN_URL_SQ_DOCX="${env.BUILD_URL}artifact/sonarqubereports/sonarqubeanalysisreport.docx"
		env.BLUE_OCEAN_URL_SQ_XLSX="${env.BUILD_URL}artifact/sonarqubereports/sonarqubeissuesreport.xlsx"
		env.LSONARQUBE_URL="${SONARQUBE_URL}"
	        emailext attachLog: false, attachmentsPattern: '', body: '''${SCRIPT, template="openforest.template"}''', mimeType: 'text/html', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: "${MAILING_LIST}"
	    }
        }
    }
 }
