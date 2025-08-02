pipeline {
  agent any

  environment {
    FRONTEND_IMAGE = 'shubh291998/voting-app-frontend'
    BACKEND_IMAGE  = 'shubh291998/voting-app-backend'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/Shu29ch/voting-app.git'
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        script {
          frontendImage = docker.build("${FRONTEND_IMAGE}", "./frontend")
        }
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        script {
          backendImage = docker.build("${BACKEND_IMAGE}", "./backend")
        }
      }
    }

    stage('Push Frontend Image to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
            frontendImage.push('latest')
          }
        }
      }
    }

    stage('Push Backend Image to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
            backendImage.push('latest')
          }
        }
      }
    }
  }
}
