# Fullstack assessment - Backend

## Techonologies

- NestJS
- TypeORM
- PostgreSQL
- Docker
- Jest
- PgAdmin

## Requirements

Project was developed using node `20.9.0`, so it's recommended to use the same version. If you have `nvm` installed, you can run:

`nvm use`

And the install dependencies:

`npm install`

The server will run using docker. But you can also run the tests from outside docker:

`npm run test`

### Database

Project is dockerized, so you need to have Docker installed on your machine. Then run:

`docker-compose up --build`

That will create the database and run the migrations, as well as running the backend server.

Backend API runs on port `3001`.

`PgAdmin` runs on port `5050`, and the credentials are listed in docker-compose.yml file.

Access the panel here: <http://localhost:5050/>
