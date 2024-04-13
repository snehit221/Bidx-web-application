# Author: Shahroz Ahmad

# Building Stage
FROM gradle:7.5.0-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

# Execution Stage
FROM openjdk:17-slim
EXPOSE 8080
COPY ./src/main/resources/firebase-adminsdk.json /app/firebase-adminsdk.json
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]