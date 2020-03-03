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
   	BASIC_AUTH_PASS='$apr1$x20Ygr5T$2rwtzcgkjv.UM8NojJymN.'	
	BASIC_AUTH_USER="devuser"
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
			echo "$CF_USERNAME"
			echo "$CF_PASSWORD"

                }      	     
	} 
	 post {
                failure {
                    echo 'FAILED (in stage checkout code)'
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
	mkdir -p ./src/assets/typedoc && npm run docs 
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
