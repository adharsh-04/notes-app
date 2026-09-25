pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub')   // configure in Jenkins
        DOCKER_IMAGE_BACKEND   = "your-dockerhub-username/notes-backend"
        DOCKER_IMAGE_FRONTEND  = "your-dockerhub-username/notes-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/adharsh-04/notes-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.image('maven:3.9.6-eclipse-temurin-17').inside {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE_BACKEND:latest -f backend/Dockerfile ."
                    sh "docker build -t $DOCKER_IMAGE_FRONTEND:latest -f frontend/Dockerfile ."
                    sh "echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push $DOCKER_IMAGE_BACKEND:latest"
                    sh "docker push $DOCKER_IMAGE_FRONTEND:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
            }
        }
    }
}
