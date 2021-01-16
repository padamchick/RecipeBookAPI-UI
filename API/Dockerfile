# Build Stage
FROM maven:3.6-openjdk-11-slim AS build
COPY pom.xml /app/
COPY src /app/src
RUN mvn -DskipTests -f /app/pom.xml clean package

# Run Stage
FROM openjdk:11
COPY --from=build /app/target/recipe-book*.jar /app/app.jar
ENTRYPOINT ["java", "-jar","/app/app.jar"]