pipeline {
    agent {
    node {
    label 'linuxworker1'
        }
    }  
    
    environment {        

        CURRENTBUILD_DISPLAYNAME = "fs-open-forest-platform Build #$BUILD_NUMBER"
        CURRENT_BUILDDESCRIPTION = "fs-open-forest-platform Build #$BUILD_NUMBER"
        GITHUB_URL = "https://github.com/USDAForestService/fs-open-forest-platform.git"
	GITHUB_API_URL="https://api.github.com"
        GITHUB_CREDENTIAL = "1cec576b-8a73-433c-bba3-c7b245faf4a9"
        BRANCH_NAME = "blueOcean_build2"
        SONAR_LOGIN = "686109daf6b0ac668b501a65556918f2803a3aa0"
        SONAR_HOST = "http://10.0.0.117:9090"
        // SONAR_SCANNER_PATH = 
        SONAR_PROJECT_NAME = "fs-openforest-platform"
        MAILING_LIST = "ikumarasamy@techtrend.us, mahfuzur.rahman@usda.gov"
	
	REPO_NAME="fs-open-forest-platform"
	REPO_OWNER_NAME="USDAForestService"
        JOB_NAME="fs-open-forest-platform-dev"
        JENKINS_URL="https://jenkins.fedgovcloud.us"
	JENKINS_URL1="Test"
        CHROME_BIN="/usr/bin/chromium-browser"
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

	     

                }      	     
	} 
	 post {
                failure {
                    echo 'FAILED (in stage checkout code)'
                }
            }	
    }
    
  stage('install-dependencies'){
    steps {
        sh 'echo "Install dependencies"'
	    	sh '''
	pwd
	cd frontend
	pwd
	rm package-lock.json && rm -rf node_modules && rm -rf ~/.node-gyp
	npm install	
	cd ../server
	pwd
	rm package-lock.json && rm -rf node_modules && rm -rf ~/.node-gyp
	npm install		
	'''	
        }
    }

 stage('run tests')
	  {
		 parallel{
stage('run-unit-tests'){
    steps {
        sh 'echo "run-unit-tests"'
	sh '''
	pwd
	cd server
	./copy-frontend-assets.sh
        pwd 
	cd ../frontend		
	pwd
	
	printenv | sort
        
	sudo npm run test:ci
	
        cd ../server
	
	sudo npm run undoAllSeed	
	sudo npm run migrate	
	sudo npm run seed	
	sudo npm run coverage
	'''
        }
    }
			 
			 
		  stage('run-lint'){
		    steps {
			sh 'echo "run lint"'
			}
		    }


		  stage('run-sonarqube'){
		    steps {
			sh 'echo "run-sonarqube"'
			}
		    }
		

 


  stage('run-e2e'){
    steps {
        sh 'echo "run e2e"'
        }
    }


  stage('run pa11y'){
    steps {
        sh 'echo "run pa11y"'
        }
    }

		 }
	  }

  stage('dev-deploy'){
    steps {
        sh 'echo "dev-deploy"'
        }
    }

    
    
    }
    
}
