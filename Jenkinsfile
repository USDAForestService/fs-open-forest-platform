pipeline {
    agent {
    node {
    label 'linuxworker1'
        }
    }  
    
    environment {        

        CURRENTBUILD_DISPLAYNAME = "fs-open-forest-platform Build #$BUILD_NUMBER"
        CURRENT_BUILDDESCRIPTION = "fs-open-forest-platform Build #$BUILD_NUMBER"
  //      GITHUB_URL = credentials('GITHUB_URL')
	//GITHUB_API_URL=credentials('GITHUB_API_URL')
        //GITHUB_CREDENTIAL = credentials('GITHUB_CREDENTIAL')
        BRANCH_NAME = "blueOcean_build2"
        //SONAR_LOGIN = credentials('SONAR_LOGIN')
        //SONAR_HOST = credentials('SONAR_HOST')
        // SONAR_SCANNER_PATH = 
        SONAR_PROJECT_NAME = "fs-openforest-platform"
        MAILING_LIST = "ikumarasamy@techtrend.us, mahfuzur.rahman@usda.gov"
	
	REPO_NAME="fs-open-forest-platform"
	REPO_OWNER_NAME="USDAForestService"
        JOB_NAME="fs-open-forest-platform-dev"
        JENKINS_URL="https://jenkins.fedgovcloud.us"
	JENKINS_URL1="Test"
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

	  stage('dev-deploy'){
    steps {
        sh 'echo "dev-deploy"'
	sh '''
	pwd
	printenv | sort
	cd frontend
	npm i typescript@3.1.6 --save-dev --save-exact
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
