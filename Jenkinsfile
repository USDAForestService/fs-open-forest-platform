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
   	BASIC_AUTH_PASS="$apr1$x20Ygr5T$2rwtzcgkjv.UM8NojJymN."	
	BASIC_AUTH_USER="devuser"
	CF_USERNAME="fe2a169e-ff89-4b67-ad12-77879b593644"
        CF_PASSWORD="ZFZFkhgm+2FA/_/ahSCYGWo-cA--_e7i"
        
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
        
	 npm run test:ci
	
        cd ../server
	
	 npm run undoAllSeed	
	 npm run migrate	
	 npm run seed	
	 npm run coverage
	'''
        }
    }
			 
			 
		  stage('run-lint'){
		    steps {
			sh 'echo "run lint"'
			    sh '''
			    pwd
			    cd frontend
			    npm run lint 
			    cd ../server
			    npm run lint 
			    '''
			}
		    }


		  stage('run-sonarqube'){
		    steps {
			sh 'echo "run-sonarqube"'	    

    script {

        def scannerhome = tool 'SonarQubeScanner';

        withSonarQubeEnv('SonarQube') {      		
        sh label: '', script: '''/home/Jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQubeScanner/bin/sonar-scanner -Dsonar.login=686109daf6b0ac668b501a65556918f2803a3aa0 -Dsonar.projectKey=fs-openforest-platform -Dsonar.sources=.'''
      
          sh 'sleep 30'
      	  sh 'rm -rf sonarqubereports'
          sh 'mkdir sonarqubereports'
          sh 'java -jar /home/Jenkins/sonar-cnes-report-3.1.0.jar -t 686109daf6b0ac668b501a65556918f2803a3aa0 -s http://10.0.0.117:9090 -p fs-openforest-platform -o sonarqubereports'
          sh 'cp sonarqubereports/*analysis-report.docx sonarqubereports/sonarqubeanalysisreport.docx'
          sh 'cp sonarqubereports/*issues-report.xlsx sonarqubereports/sonarqubeissuesreport.xlsx' 	  
       }
      }    
	}
   }

  stage('run-e2e'){
    steps {
        sh 'echo "run e2e"'
	sh '''
	pwd
	cd server
	./copy-frontend-assets.sh
	cd ../frontend/node_modules/protractor
	sudo npm i webdriver-manager@latest
	cd ../..
	npm i typescript@3.1.6 --save-dev --save-exact
	
	'''
        }
    }


  stage('run pa11y'){
    steps {
        sh 'echo "run pa11y"'
	sh '''
	cd frontend
        npm run build-test-pa11y 
	'''
        }
    }

		 }
	  }

  stage('dev-deploy'){
    steps {
        sh 'echo "dev-deploy"'
	sh '''
	pwd
	printenv | sort
	cd frontend
	npm run update-version 
	mkdir -p ./src/assets/typedoc && sudo npm run docs 
	npm run dist-dev
	 
	cd ../server
	./copy-frontend-assets.sh
	npm run docs
	
	cd ..	
	pwd
	echo $CF_USERNAME
	echo $CF_PASSWORD
	./.cg-deploy/deploy.sh platform-dev

	'''
	    
        }
    }

    
    
    }
    
}
