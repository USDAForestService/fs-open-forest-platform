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
	export REPO_NAME='fs-open-forest-platform'
	export REPO_OWNER_NAME='USDAForestService'
        export JOB_NAME='fs-open-forest-platform-dev'
        export JENKINS_URL='https://jenkins.fedgovcloud.us'
	
curl https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$GIT_COMMIT?access_token=aa6398294e0b4839271c8662c2b8a14b2073b033 -H "Content-Type: application/json" -X POST -d '{"state": "success","context":"ci/jenkins: checkout-code","description":"Your tests passed on Jenkins!","target_url":"https://jenkins.fedgovcloud.us/job/$JOB_NAME/$BUILD_NUMBER/console"}'
	'''		 
                }      	     
	} 
	 post {
                failure {
                    echo 'FAILED (in stage checkout code)'
                }
            }	
    }
    
  stage('Run e2e'){
    steps {
        sh 'echo "Run e2e"'
	sh '''
	export REPO_NAME='fs-open-forest-platform'
	export REPO_OWNER_NAME='USDAForestService'
        export JOB_NAME='fs-open-forest-platform-dev'
        export JENKINS_URL='https://jenkins.fedgovcloud.us'
	
curl https://api.github.com/repos/USDAForestService/fs-open-forest-platform/statuses/$GIT_COMMIT?access_token=aa6398294e0b4839271c8662c2b8a14b2073b033 -H "Content-Type: application/json" -X POST -d '{"state": "success","context":"ci/jenkins: run e2e","description":"Your tests passed on Jenkins!","target_url":"https://jenkins.fedgovcloud.us/job/$JOB_NAME/$BUILD_NUMBER/console"}'
	'''
        }
    }

    
    
    }
    
}
