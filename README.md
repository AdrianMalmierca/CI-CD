# Node.js CI/testinf Demo API
A production-structured **Express.js REST API** demonstrating:
1. Modular architecture
2. Environment-based configuration
3. Automated testing with Jest + Supertest
4. CI pipeline using GitHub Actions
5. Clean separation of concerns
6.  Error handling and logging

This project is intentionally simple in business logic but engineered with professional backend standards.

Is located in [**Railway**]("https://ci-testing-production.up.railway.app/")

## Tech Stack
* **Node.js 20**
* **Express.js**
* **Jest** (testing framework)
* **Supertest** (HTTP assertions)
* **GitHub Actions** (CI)

## Architecture Overview
The application follows a **modular layered structure**:
```
.
├── server.js              #Application bootstrap
├── routes/
│   └── api.js             #Route definitions
├── test/
│   └── server.test.js     #Integration tests
└── .github/workflows/
    └── ci.yml          #CI pipeline
```

### Architectural Principles Applied
* **Separation of Concerns**
  * `server.js` handles app initialization
  * `routes/api.js` handles route definitions
  * Tests are isolated in `/test`

* **Environment-based behavior**
  * `NODE_ENV=test` prevents the server from listening during tests
  * Greeting message configurable via `process.env`

* **Exported app instance**
  * Enables clean integration testing without starting a live server

## Server Bootstrapping
`server.js` initializes the Express application:
```js
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

const PORT = process.env.PORT || 3000;
const GREETING = process.env.GREETING || "Hello World I'm Adrián Martín Malmierca";
```

### Key Design Decisions

#### 1. Conditional Server Start
```js
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => logInfo(`Server running on port ${PORT}`));
}
```

This prevents port binding during automated tests — a common professional backend pattern.

### 2. Basic Logging Abstraction
```js
function logInfo(msg) { 
  console.log(`[INFO ${new Date().toISOString()}] ${msg}`); 
}

function logError(msg) { 
  console.error(`[ERROR ${new Date().toISOString()}] ${msg}`); 
}
```

Although simple, this abstracts logging logic and prepares the project for future integration with:
* Winston
* Pino
* Datadog
* Cloud logging providers

## API Endpoints
All routes are defined in `routes/api.js`.

| Method | Endpoint          | Description                               | Response Example                                                 | Status Codes | Notes                                                                       |
| ------ | ----------------- | ----------------------------------------- | ---------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------- |
| GET    | `/`               | Returns a greeting message                | `{ "message": "Hello World I'm Adrián Martín Malmierca!" }`      | 200          | Configurable via environment variable                                       |
| GET    | `/status`         | Health-check endpoint                     | `{ "status": "ok", "uptime": 123.456 }`                          | 200          | Used for monitoring, orchestration health checks, and deployment validation |
| GET    | `/random`         | Returns a random integer between 0 and 99 | `{ "value": 42 }`                                                | 200          | Demonstrates dynamic response generation                                    |
| GET    | `/echo?msg=value` | Echoes a query parameter                  | `{ "msg": "hi" }`                                                | 200          | Example: `/echo?msg=hi`                                                     |
| GET    | `/users`          | Returns all users                         | `[ { "id": 1, "name": "Adrián" }, { "id": 2, "name": "Paco" } ]` | 200          | Uses in-memory dataset                                                      |
| GET    | `/users/:id`      | Returns a single user by ID               | `{ "id": 1, "name": "Adrián" }`                                  | 200, 404     | Returns `{ "error": "User not found" }` if ID does not exist                |
| GET    | `/error`          | Simulates a server error (testing only)   | `{ "error": "This is a test error" }`                            | 500          | Used to validate error handling and CI reliability                          |

## Testing Strategy
Testing is implemented using:
- **Jest**
- **Supertest**

Example test:
```js
const res = await request(app).get("/");
expect(res.statusCode).toBe(200);
expect(res.body.message).toBe("Hello World I'm Adrián Martín Malmierca!");
```

### What is being tested?
1. HTTP status codes
2. Response structure
3. Response data
4. Error handling
5. Route correctness

### Why Integration Tests Instead of Unit Tests?
This project focuses on validating:
- Express routing
- Middleware chain
- Full request/response lifecycle

This provides stronger guarantees than isolated unit tests.

## Continuous Integration
CI is implemented using **GitHub Actions**.
File: `.github/workflows/ci.yml`
Pipeline triggers on:
- Push to `main`
- Pull requests to `main`

### CI Steps
1. Checkout repository
2. Setup Node.js 20
3. Install dependencies
4. Run tests with `NODE_ENV=test`

```yaml
- name: Run tests
  env:
    NODE_ENV: test
  run: npm test
```

### Why set `NODE_ENV=test`?
Prevents the server from binding to a port and ensures a clean test environment.

## Running Locally

### Install dependencies
```bash
npm install
```

### Run server
```bash
npm start
```

### Run tests
```bash
npm test
```

## Design Decisions Explained

### 1. Modularity Over Monolith
Routes are separated into their own module instead of being defined in `server.js`. This:
- Improves maintainability
- Scales better for larger APIs
- Keeps bootstrap logic clean

### 2. Environment Configuration

```js
process.env.PORT
process.env.NODE_ENV
process.env.GREETING
```

Using environment variables:

* Improves deployment flexibility
* Makes the app container-ready
* Aligns with 12-factor app principles

---

### 3. Exporting the Express App
```js
module.exports = app;
```

This allows:
- Direct injection into Supertest
- Testing without opening a network port
- Faster CI execution

### 4. Explicit HTTP Status Codes
Every endpoint clearly defines:
- 200 OK
- 404 Not Found
- 500 Internal Server Error

This demonstrates understanding of REST semantics.

# Future Improvements
To evolve this into a more production-ready backend:
1. Add centralized error middleware
2. Introduce a service layer
3. Replace in-memory data with:
  - PostgreSQL
  - MongoDB
4. Add request validation (Joi / Zod)
5. Add logging library (Winston / Pino)
6. Add Docker support
7. Add API documentation (Swagger / OpenAPI)
8. Add rate limiting
9. Add authentication (JWT)

# Project Purpose
This project demonstrates:
1. Backend fundamentals
2. Testing discipline
3. CI/testing understanding
4. Clean architectural thinking
5. Production-aware design

It is intentionally simple in domain complexity but strong in engineering structure.

# Author
Adrián Martín Malmierca

Computer Engineer & Mobile Applications Master's Student