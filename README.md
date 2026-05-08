# Fitness Challenge Tracker API

A Node.js, Express, and MongoDB backend for tracking fitness challenges with JWT authentication, CRUD operations, validation, and filtering.

## Features

- Register and login users
- JWT protected routes
- Create, read, update, and delete challenges
- Request validation and error handling
- MongoDB integration through Mongoose
- Search, filter, sort, and paginate challenge data

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example`.

3. Start MongoDB locally or use a hosted MongoDB URI.

4. Run the server:

```bash
npm run dev
```

## Environment Variables

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## API Flow

1. Register a user with `POST /api/auth/register`.
2. Login with `POST /api/auth/login` to receive a JWT.
3. Send the token in `Authorization: Bearer <token>`.
4. Use protected challenge routes under `/api/challenges`.

## Main Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Challenges

- `POST /api/challenges`
- `GET /api/challenges`
- `GET /api/challenges/:id`
- `PATCH /api/challenges/:id`
- `PUT /api/challenges/:id`
- `DELETE /api/challenges/:id`

## Query Options for Challenges

- `status=planned|active|completed`
- `search=push`
- `sortBy=createdAt|title|target`
- `order=asc|desc`
- `page=1`
- `limit=10`

## Postman

Import the collection from `postman/Fitness Challenge Tracker.postman_collection.json`.

## Deployment Notes

For Render or similar hosting:

- Set the same environment variables in the dashboard
- Use `npm start` as the start command
- Point `MONGODB_URI` to MongoDB Atlas or another hosted database
