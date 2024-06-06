# Fullstack assessment - Number 8

## Description

This project is a fullstack assessment for `Number 8`. It is a simple application that allows users to create, list and delete employees, as well as editing a couple attributes.

It's divided into two parts: the `backend` API and the `frontend` application. You can see more details about each part here:

- [Backend API](backend/README.md)
- [Frontend Application](frontend/README.md)

## Requirements

- `Node.js 20.9.0` LTS. Might works on previous versions, but it's not guaranteed.
- `Docker`. I'm currently using `v4.30.0`, but I think it should work on previous versions as well.

### Dependencies

You'll have to install the js dependencies for **frontend** and **backend**. You can do that by running the following command:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

Then you can run the application like this:

`npm run dev`

And the tests like this:

`npm run test`

### Environment variables

Rename the `.env.example` file to `.env`.

### Database

Remember you need to have **Docker** installed on your machine. Then run this command **inside backend folder**:

`cd backend`

`docker-compose up --build`

That will create a database and then run the migrations, as well as running the backend server.

Backend API runs on port 3001.

You can run the tests like this:

`npm run test`

### Try it out

Head to `http://localhost:3000` to see the application running.
Head to `http://localhost:3001/api` to see the API running (handshake message).

## Database ER Diagram

![ER Diagram](ERDiagram.png)
