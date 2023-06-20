# Saferide-Auth-Service

# Table of Contents
1. [Cloud Architecture](#CloudArchitecture)
2. [Project Description](#ProjectDescription)
3. [Prerequisites](#Prerequisites)
4. [Installation](#Installation)
5. [Configuration](#Configuration)
6. [Usage](#Usage)
7. [Database Schema](#Database)
8. [API Documentation](#APIDocumentation)

## Cloud Architecture <a name="CloudArchitecture"></a>
This application is running on an EC2 instance and managed by Docker Compose. The application consists of three services:

* PostgreSQL: The database service running the PostgreSQL image.
* API: The main application service defined in the Dockerfile specified by the build context.
* pgAdmin: The pgAdmin service for managing the PostgreSQL database.

                          +-----------------+
                          |    EC2 Instance |
                          |                 |
                          +-----------------+
                                   |
                                   | Runs Docker Compose
                                   |
                                   v
                      +---------------------+
                      |   PostgreSQL DB     |
                      |    (postgres)       |
                      +---------------------+
                                   |
                                   | Exposes port 5432
                                   |
                                   v
                      +---------------------+
                      |      API Service    |
                      |                     |
                      +---------------------+
                                   |
                                   | Exposes port ${PORT}
                                   |
                                   v
                      +---------------------+
                      |    pgAdmin Service  |
                      |  (dpage/pgadmin4:6) |
                      +---------------------+
                                   |
                                   | Exposes port 5050
                                   |
                                   v
                      +---------------------+
                      |     Docker Volumes  |
                      |        (data)       |
                      +---------------------+

## Project Description <a name="ProjectDescription"></a>

The SafeRide Auth Service is built using Node.js and TypeScript. It utilizes the Express framework for handling HTTP requests and implements JSON Web Tokens (JWT) for user authentication. The service interacts with a PostgreSQL database for storing user information.

The main functionalities of the SafeRide Auth Service include:

- User registration: Users can create new accounts by providing their email and password.

- User login: Users can log in to their accounts using their registered email and password.

- Authentication: The service provides authentication endpoints to verify the validity of JWTs and authenticate users.

## Prerequisites <a name="Prerequisites"></a>

Before running the SafeRide Auth Service, ensure that you have the following prerequisites installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL database
- Docker
- Docker-compose

## Installation <a name="Installation"></a>

To install and set up the SafeRide Auth Service, follow these steps:

1. Clone the repository:

```
git clone https://github.com/mohamedr20/saferide-auth-service.git
```

2.Navigate to the project directory:

```
cd saferide-auth-service
```

3.Install the dependencies:

```
npm install
```

## Configuration <a name="Configuration"></a>

1.Create a .env file in the project's root directory.

2.Provide the following environment variables in the .env file:

```
PORT=<server_port>
DB_HOST=<database_host>
DB_PORT=<database_port>
DB_NAME=<database_name>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
JWT_SECRET=<jwt_secret_key>
```

Replace port, database_host, database_port, database_name, database_user, and database_password with your values.

Set jwt_secret_key to a secure secret key for JWT signing.

## Usage <a name="Usage"></a>

To run the SafeRide Auth Service, use the following command to build the docker containers for the first time:

```
docker-compose build
```

After we have built the docker containers we can then run to get the containers up and running:

```
docker-compose up -d
```

You should now have the postgres, node and pg-admin servers all running together!

- The node server is available at localhost:YOUR_SERVER_PORT
- The local pgadmin server is available at localhost:5050 and is accessed with the credentials found in the docker-compose.yml file.

## Database Schema

User Table
| Key | Value|
| ----------- | ----------- |
| id | primary key |
| email | varchar |
| password | varchar | (stored as a password hash)
| username | varchar |
| phone | varchar |
| last_name | varchar |
| first_name | varchar |

## API Documentation

The API documentation for the SafeRide Auth Service can be found at **localhost:YOUR_SERVER_PORT/api/docs**.
When visitng the API inside the EC2 instance, the url will be **ec2-52-91-210-105.compute-1.amazonaws.com:3000/api/docs**

It provides details about:

- Available endpoints
- Request/response formats
- Authentication requirements.
