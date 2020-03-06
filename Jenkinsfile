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
        SONAR_PROJECT_NAME = "fs-openforest-platform"
        MAILING_LIST = 'ikumarasamy@techtrend.us,matthew.reiss@usda.gov,Abdul.Qureshi@usda.gov'
	CHECKOUT_STATUS = 'Pending'
        INSTALL_DEPENDENCIES_STATUS= 'Pending'
	RUN_LINT_STATUS = 'Pending'
	RUN_UNIT_TESTS_STATUS = 'Pending'
	RUN_E2E_STATUS = 'Pending'
	RUN_PA11Y_STATUS = 'Pending'	    
	DEPLOY_STATUS = 'Pending'	       	
	RUN_SONARQUBE_STATUS = 'Pending'	
	AUTHOR = 'kilara77'
	
	REPO_NAME="fs-open-forest-platform"
	REPO_OWNER_NAME="USDAForestService"
        JOB_NAME="fs-open-forest-platform-dev"
        JENKINS_URL="https://jenkins.fedgovcloud.us"
   	BASIC_AUTH_PASS=credentials('BASIC_AUTH_PASS')
	BASIC_AUTH_USER=credentials('BASIC_AUTH_USER')
	CF_USERNAME = credentials('CF_USERNAME')
        CF_PASSWORD = credentials('CF_PASSWORD')  
	
        
    }
    
    options {
        timestamps()
        disableConcurrentBuilds()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }  

 stages { 
	  
    stage('Checkout Code'){
       steps {              
                script {			
                  currentBuild.displayName = "${env.CURRENTBUILD_DISPLAYNAME}"
                  currentBuild.description = "${env.CURRENT_BUILDDESCRIPTION}"	     
     sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: checkout-code", "target_url": "https://jenkins.fedgovcloud.us/","description": "Your tests passed on Jenkins!"}'
      '''			
  		  CHECKOUT_STATUS= 'Success'
                }      	     
	} 
	 post {
                failure {
			script {
        		CHECKOUT_STATUS= 'Failed'
 sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failed","context":"ci/jenkins: checkout-code", "target_url": "https://jenkins.fedgovcloud.us/","description": "Your tests failed on Jenkins!"}'
      '''				
        	   	sh 'echo "FAILED in stage checkout code"'
                }
            }	
    }
    }

    stage('install-dependencies'){
    steps {
	    script {
        		
        		sh 'echo "Install dependencies"'
      sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "pending","context":"ci/jenkins: install-dependencies", "target_url": "https://jenkins.fedgovcloud.us/","description": "Your tests are queued behind your running tasks!"}'
      '''					    
		    sh '''
	pwd
	cd frontend
	pwd
	rm package-lock.json && rm -rf node_modules && rm -rf ~/.node-gyp
	npm install	
	npm i typescript@3.1.6 --save-dev --save-exact
	cd ../server
	pwd
	rm package-lock.json && rm -rf node_modules && rm -rf ~/.node-gyp
	npm install		
	'''	
sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "success","context":"ci/jenkins: install-dependencies", "target_url": "https://jenkins.fedgovcloud.us/","description": "Your tests passed on Jenkins!"}'
      '''					    		    
		    
		    INSTALL_DEPENDENCIES_STATUS= 'Success'
    		}
        }
		post {
                failure {
			script {
        		INSTALL_DEPENDENCIES_STATUS= 'Failed'

sh '''
      curl -XPOST -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$(git rev-parse HEAD) -d '{"state": "failed","context":"ci/jenkins: install-dependencies", "target_url": "https://jenkins.fedgovcloud.us/","description": "Your tests failed on Jenkins!"}'
      '''					
        	   	sh 'echo "FAILED in stage install dependencies"'
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
        sh 'echo "run-unit-tests"'
			sh '''
	pwd
	cd server
	./copy-frontend-assets.sh
        pwd 
	cd ../frontend		
	pwd        
	npm run test:ci	
        cd ../server	
	 npm run undoAllSeed	
	 npm run migrate	
	 npm run seed	
	'''
        RUN_UNIT_TESTS_STATUS= 'Success'
    }

        }
		post {
                failure {
                    script {
        		RUN_UNIT_TESTS_STATUS= 'Failed'
			      	sh 'echo "FAILED in stage unit tests"'
    		}
                }
            }	
    }
     

     stage('run-lint'){
    steps {	    
        script
        {
	        sh 'echo "run lint"'
		   sh '''
	    pwd
	    cd frontend
	    npm run lint 
	    cd ../server
	    npm run lint 
	    '''
	        RUN_LINT_STATUS= 'Success'
        }
	}
	post {
                failure {
                     script {
        		RUN_LINT_STATUS= 'Failed'
         	   	sh 'echo "FAILED in stage lint"'
    		}
                }
            }	
    }	


stage('run-sonarqube'){
        steps {
            script{
	            sh 'echo "run-sonarqube"'
		     def scannerhome = tool 'SonarQubeScanner';
        withSonarQubeEnv('SonarQube') {      		
          sh label: '', script: '''/home/Jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQubeScanner/bin/sonar-scanner -Dsonar.login=$SONAR_TOKEN -Dsonar.projectKey=$SONAR_PROJECT_NAME -Dsonar.sources=. -Dsonar.exclusions=frontend/node_modules/**,frontend/dist/**,frontend/e2e/**,,server/node_modules/**,server/docs/**,server/frontend-assets/**,server/dba/**,server/test/**,docs/**'''
      	  sh 'rm -rf sonarqubereports'
          sh 'mkdir sonarqubereports'
  	  sh 'sleep 30'
          sh 'java -jar /home/Jenkins/sonar-cnes-report-3.1.0.jar -t $SONAR_TOKEN -s $SONAR_HOST -p $SONAR_PROJECT_NAME -o sonarqubereports'
          sh 'cp sonarqubereports/*analysis-report.docx sonarqubereports/sonarqubeanalysisreport.docx'
          sh 'cp sonarqubereports/*issues-report.xlsx sonarqubereports/sonarqubeissuesreport.xlsx' 	  	
  	
	  sh '''
	pwd
	chmod 765 createrelease.sh
	./createrelease.sh
	''' 
		    
		        RUN_SONARQUBE_STATUS= 'Success'
            }
            }
    }
	post {
                failure {
                       script {
        		RUN_SONARQUBE_STATUS= 'Failed'
        	   	sh 'echo "FAILED in stage SonarQube"'
    		}
                }
            }	
   }  


stage('run-e2e'){
        steps {
            script {
	            sh 'echo "run-e2e"'
		        RUN_E2E_STATUS= 'Success'
            }
    }
	post {
                failure {
                       script {
        		RUN_E2E_STATUS= 'Failed'
        	   	sh 'echo "FAILED in stage e2e"'
    		}
                }
            }	
   }  

stage('run pa11y'){
    steps {
        script {
            sh 'echo "run pa11y"'
		sh '''
	cd frontend
        npm run build-test-pa11y 
	'''
	        RUN_PA11Y_STATUS= 'Success'
        }
        } 
	post {
                failure {
			 script {
        		RUN_PA11Y_STATUS= 'Failed'
        	      sh 'echo "FAILED in stage pa11y"'
    		}                 
                }
            }	

	  }	      

     
      }
      }


 stage('dev-deploy'){
    steps {
        script {
            sh 'echo "dev-deploy"'	   
		sh '''
	pwd
	chmod 765 deploydev.sh
	./deploydev.sh
	'''
	        DEPLOY_STATUS= 'Success'
        }
        }
		post {
                failure {
                     script {
        		DEPLOY_STATUS= 'Failed'
        	      sh 'echo "FAILED in stage deploy"'
    		}          
                }
            }	
    }



 } 

 
post{
    success {
	    echo "Checkout Status ${CHECKOUT_STATUS}"  
	    echo "INSTALL_DEPENDENCIES_STATUS  ${INSTALL_DEPENDENCIES_STATUS}"  
	    echo "RUN_LINT_STATUS  ${RUN_LINT_STATUS}"  
	    echo "RUN_UNIT_TESTS_STATUS  ${RUN_UNIT_TESTS_STATUS}"  
	    echo "RUN_E2E_STATUS  ${RUN_E2E_STATUS}"  
	    echo "RUN_PA11Y_STATUS  ${RUN_PA11Y_STATUS}"  
	    echo "DEPLOY_STATUS  ${DEPLOY_STATUS}"  
	    echo "RUN_SONARQUBE_STATUS  ${RUN_SONARQUBE_STATUS}"  
	    echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL} on ${env.BUILD_URL}"
	    
	    echo "JENKINS HOME ${env.JENKINS_HOME}"
	    echo "Job Success"
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
		    env.BLUE_OCEAN_URL="${env.JENKINS_URL}/blue/organizations/jenkins/${env.JOB_NAME}/detail/${env.JOB_NAME}/${BUILD_NUMBER}/pipeline"	    
		    echo "${env.BLUE_OCEAN_URL}"    
		    echo "${GIT_BRANCH}"		
      	emailext attachLog: false, attachmentsPattern: '', body: '''${SCRIPT, template="openforest.template"}''', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: "${MAILING_LIST}"
	    }
        }	
   	
    failure {
	    echo "Checkout Status ${CHECKOUT_STATUS}"  
	    echo "INSTALL_DEPENDENCIES_STATUS  ${INSTALL_DEPENDENCIES_STATUS}"  
	    echo "RUN_LINT_STATUS  ${RUN_LINT_STATUS}"  
	    echo "RUN_UNIT_TESTS_STATUS  ${RUN_UNIT_TESTS_STATUS}"  
	    echo "RUN_E2E_STATUS  ${RUN_E2E_STATUS}"  
	    echo "RUN_PA11Y_STATUS  ${RUN_PA11Y_STATUS}"  
	    echo "DEPLOY_STATUS  ${DEPLOY_STATUS}"  
	    echo "RUN_SONARQUBE_STATUS  ${RUN_SONARQUBE_STATUS}"  
	    echo "Job Failed"  	    
	    
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
		    env.BLUE_OCEAN_URL="${env.JENKINS_URL}/blue/organizations/jenkins/${env.JOB_NAME}/detail/${env.JOB_NAME}/${BUILD_NUMBER}/pipeline"	    		    
	    emailext attachLog: true, attachmentsPattern: '', body: '''${SCRIPT, template="openforest.template"}''', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: "${MAILING_LIST}"
	    }
        }	
    } 
 }
