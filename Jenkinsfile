pipeline {
  agent any

  environment {
    IMAGE_NAME = 'shubh291998/voting-app'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/Shu29ch/voting-app.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${IMAGE_NAME}")
        }
      }
    }

    stage('Push Docker Image to Docker Hub') {
      steps {
        script {
          // Uses credentials stored in Jenkins with ID 'dockerhub-credentials'
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
            dockerImage.push('latest')
          }
        }
      }
    }
  }
}
