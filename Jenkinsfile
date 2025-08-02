pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'shubh291998/voting-app'
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
          dockerImage = docker.build("${DOCKER_IMAGE}")
        }
      }
    }

    stage('Push Docker Image to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
            dockerImage.push('latest')
          }
        }
      }
    }
  }
}
