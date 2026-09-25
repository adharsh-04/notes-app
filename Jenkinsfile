pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub'
        BACKEND_IMAGE = 'adharsh04/notes-backend'
        FRONTEND_IMAGE = 'adharsh04/notes-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/adharsh-04/notes-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'mvn -f backend/notes-app/pom.xml clean package -DskipTests'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh "docker build -t $BACKEND_IMAGE:latest backend/notes-app"
                    sh "docker build -t $FRONTEND_IMAGE:latest frontend"
                    sh "docker push $BACKEND_IMAGE:latest"
                    sh "docker push $FRONTEND_IMAGE:latest"
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
