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
  //      BRANCH_NAME = $GIT_BRANCH
        //SONAR_LOGIN = credentials('SONAR_LOGIN')
        SONAR_HOST = credentials('SONAR_HOST')
	SONAR_TOKEN = credentials('SONAR_TOKEN_FSOPENFOREST')    
        // SONAR_SCANNER_PATH = 
        SONAR_PROJECT_NAME = "fs-openforest-platform"
        MAILING_LIST = "ikumarasamy@techtrend.us, mahfuzur.rahman@usda.gov"
	
	REPO_NAME="fs-open-forest-platform"
	REPO_OWNER_NAME="USDAForestService"
        JOB_NAME="fs-open-forest-platform-dev"
        JENKINS_URL="https://jenkins.fedgovcloud.us"
   	BASIC_AUTH_PASS=credentials('BASIC_AUTH_PASS')
	BASIC_AUTH_USER=credentials('BASIC_AUTH_USER')
	CF_USERNAME = credentials('CF_USERNAME')
        CF_PASSWORD = credentials('CF_PASSWORD')  
	
	CheckoutStatus = "Success"
        InstallDependenciesStatus = "Success"
	RunLintStatus = "Success"
	RunUnitTestsStatus = "Success"
	Rune2eStatus = "Success"
	RunPa11yStatus = "Success"	    
	DeployStatus = "Success"	       
	NotificationStatus = "Success"
	RunSonarQubeStatus = "Success"	    
	
        
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
			script {
                    echo 'FAILED (in stage checkout code)'
			}
                }
            }	
    }
	  
stage('install-dependencies'){
    steps {
        sh 'echo "Install dependencies"'	
        }
		post {
                failure {
                    echo 'FAILED (in stage install dependencies)'
                }
            }	
    }	  
	 
 stage('run tests')
	  {
      parallel{	  
	      
stage('run-unit-tests'){
    steps {
        sh 'echo "run-unit-tests"'
        }
		post {
                failure {
                    echo 'FAILED (in stage run-unit tests)'
                }
            }	
    }
			 
			 
  stage('run-lint'){
    steps {
	sh 'echo "run lint"'
	}
	post {
                failure {
                    echo 'FAILED (in stage lint)'
                }
            }	
    }	      
	      
  stage('run-sonarqube'){
        steps {
	sh 'echo "run-sonarqube"'	    
    }
	post {
                failure {
                    echo 'FAILED (in stage sonarqube)'
                }
            }	
   }  
	 
stage('run pa11y'){
    steps {
        sh 'echo "run pa11y"'
        }
    }
	post {
                failure {
                    echo 'FAILED (in stage pa11y)'
                }
            }	

		 }
	  }	      
	  
 stage('dev-deploy'){
    steps {
        sh 'echo "dev-deploy"'	    
        }
		post {
                failure {
                    echo 'FAILED (in stage dev-deploy)'
                }
            }	
    }
	
stage('Notification'){
    steps {
        emailext attachLog: true, attachmentsPattern: '', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Checkout-code ${env.CheckoutStatus} Check console output at $BUILD_URL to view the results.', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'ikumarasamy@techtrend.us'
        }
		post {
                failure {
                    echo 'FAILED (in stage email notification)'
                }
            }	
    }    	
	  
    
   }    
}
