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
	CHECKOUT_STATUS = 'Success'
        InstallDependenciesStatus = "Success"
	RunLintStatus = "Success"
	RunUnitTestsStatus = "Success"
	Rune2eStatus = "Success"
	RunPa11yStatus = "Success"	    
	DeployStatus = "Success"	       
	NotificationStatus = "Success"
	RunSonarQubeStatus = "Success"	    
	
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
		  echo "${CHECKOUT_STATUS}"  		

                }      	     
	} 	
    }
	  

stage('Notification'){
    steps {
        emailext attachLog: true, attachmentsPattern: '', body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: Checkout-code ${CHECKOUT_STATUS} Check console output at $BUILD_URL to view the results.', replyTo: 'notifications@usda.gov', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'ikumarasamy@techtrend.us'
        }		
    }    	
	  
    
   }    
}
