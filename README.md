# Finance Dashboard Backend

A simple Express and MongoDB API for a finance dashboard. It supports authentication, role-based access, financial record management, and dashboard summary calculations.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Features

- User registration and login
- Role-based access for `Viewer`, `Analyst`, and `Admin`
- Financial record create, read, update, and delete
- Filtering by `type`, `category`, `startDate`, and `endDate`
- Dashboard summary for income, expense, balance, and category totals

## Project Structure

```text
finance-dashboard-backend/
|-- postman/
|   |-- finance-dashboard-backend.postman_collection.json
|-- src/
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- app.js
|   |-- server.js
|-- .env.example
|-- .gitignore
|-- package.json
|-- render.yaml
|-- README.md
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
copy .env.example .env
```

3. Update `.env` with your MongoDB connection and JWT secret.

4. Start the server:

```bash
npm start
```

For development with file watching:

```bash
npm run dev
```

## Environment Variables

Use these variables in `.env` locally and in your deployment platform:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finance_dev
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

## Base URLs

- Local: `http://localhost:5000`
- Health check: `GET /`
- Live deployment: add your Render URL here after deployment

## API Endpoints

### Health

- `GET /` - Basic API health response

### Auth

- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Log in and receive a JWT token

### Dashboard

- `GET /api/dashboard/summary` - Get dashboard summary data

### Records

- `GET /api/records` - Get all records
- `POST /api/records` - Create a record
- `GET /api/records/:id` - Get one record
- `PUT /api/records/:id` - Update a record
- `DELETE /api/records/:id` - Delete a record

## Authorization Rules

- `Viewer`: can access dashboard summary
- `Analyst`: can access dashboard summary and create or read records
- `Admin`: full access to all routes

Protected routes require:

```text
Authorization: Bearer <token>
```

## Example Requests

Register:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "123456",
  "role": "Admin"
}
```

Create record:

```json
{
  "amount": 5000,
  "type": "income",
  "category": "Salary",
  "date": "2026-04-04",
  "notes": "April salary"
}
```

## Postman Collection

The importable collection is included here:

- [postman/finance-dashboard-backend.postman_collection.json](./postman/finance-dashboard-backend.postman_collection.json)

How to use it:

1. Import the collection into Postman.
2. Keep `baseUrl` as `http://localhost:5000` for local testing.
3. Run `Register Admin`, then `Login`.
4. The collection automatically stores `token`.
5. Run `Create Record` and the collection stores `recordId`.
6. After deployment, update `baseUrl` to your live Render URL and re-test.

## Render Deployment

This repo includes a `render.yaml` file to make deployment easier.

Render settings:

- Build command: `npm install`
- Start command: `npm start`

Set these environment variables in Render:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `NODE_ENV=production`

Recommended database:

- MongoDB Atlas

After deployment, your public API URL will look like:

```text
https://your-service-name.onrender.com
```

## Submission Checklist

- Public GitHub repository created
- `.env` not committed
- Render deployment working
- Postman collection imports successfully
- Auth and dashboard endpoints tested on the live URL
