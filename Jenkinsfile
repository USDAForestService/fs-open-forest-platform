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
        SONAR_HOST = credentials('SONAR_HOST')
	SONAR_TOKEN = credentials('SONAR_TOKEN_FSOPENFOREST')    
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
	  
  stage('run-sonarqube'){
		    steps {
			sh 'echo "run-sonarqube"'	    

    script {

        def scannerhome = tool 'SonarQubeScanner';

        withSonarQubeEnv('SonarQube') {      		
        sh label: '', script: '''/home/Jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQubeScanner/bin/sonar-scanner -Dsonar.login=$SONAR_TOKEN -Dsonar.projectKey=$SONAR_PROJECT_NAME -Dsonar.sources=. -Dsonar.exclusions=frontend/node_modules/**,frontend/dist/**,frontend/e2e/**,,server/node_modules/**,server/docs/**,server/frontend-assets/**,server/dba/**,server/test/**,docs/**'''
      

      	  sh 'rm -rf sonarqubereports'
          sh 'mkdir sonarqubereports'
          sh 'java -jar /home/Jenkins/sonar-cnes-report-3.1.0.jar -t $SONAR_TOKEN -s $SONAR_HOST -p $SONAR_PROJECT_NAME -o sonarqubereports'
          sh 'cp sonarqubereports/*analysis-report.docx sonarqubereports/sonarqubeanalysisreport.docx'
          sh 'cp sonarqubereports/*issues-report.xlsx sonarqubereports/sonarqubeissuesreport.xlsx' 	  
       }
      }    
	}
   }	  
	  
	  
    
    }
    
}