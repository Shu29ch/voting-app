pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    DOCKERHUB_REPO_BACKEND = 'yourdockerhubusername/voting-backend'
    DOCKERHUB_REPO_FRONTEND = 'yourdockerhubusername/voting-frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/yourusername/voting-app.git'
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        dir('backend') {
          script {
            docker.build("${DOCKERHUB_REPO_BACKEND}:latest")
          }
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        dir('frontend') {
          script {
            docker.build("${DOCKERHUB_REPO_FRONTEND}:latest")
          }
        }
      }
    }

    stage('Login to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            echo 'Logged in to Docker Hub'
          }
        }
      }
    }

    stage('Push Backend Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            docker.image("${DOCKERHUB_REPO_BACKEND}:latest").push()
          }
        }
      }
    }

    stage('Push Frontend Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
            docker.image("${DOCKERHUB_REPO_FRONTEND}:latest").push()
          }
        }
      }
    }
  }
}

