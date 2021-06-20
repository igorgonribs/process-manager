FROM openjdk:8-jdk-alpine
ARG JAR_FILE=jarfile/*.jar
COPY ${JAR_FILE} process-manager-backend-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/process-manager-backend-0.0.1-SNAPSHOT.jar"]