# Node.js CI/CD Demo API
A production-structured **Express.js REST API** demonstrating:
1. Modular architecture
2. Environment-based configuration
3. Automated testing with Jest + Supertest
4. CI pipeline using GitHub Actions
5. Clean separation of concerns
6.  Error handling and logging

This project is intentionally simple in business logic but engineered with professional backend standards.

# Tech Stack

* **Node.js 20**
* **Express.js**
* **Jest** (testing framework)
* **Supertest** (HTTP assertions)
* **GitHub Actions** (CI)

---

# 🏗 Architecture Overview

The application follows a **modular layered structure**:

```
.
├── server.js              # Application bootstrap
├── routes/
│   └── api.js             # Route definitions
├── test/
│   └── server.test.js     # Integration tests
└── .github/workflows/
    └── ci-cd.yml          # CI pipeline
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

---

# ⚙️ Server Bootstrapping

`server.js` initializes the Express application:

```js
const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

const PORT = process.env.PORT || 3000;
const GREETING = process.env.GREETING || "Hello World I'm Adrián Martín Malmierca";
```

### Key Design Decisions

### 1️⃣ Conditional Server Start

```js
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => logInfo(`Server running on port ${PORT}`));
}
```

This prevents port binding during automated tests — a common professional backend pattern.

### 2️⃣ Basic Logging Abstraction

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

---

# 🌐 API Endpoints

All routes are defined in `routes/api.js`.

---

## `GET /`

Returns a greeting message.

```json
{
  "message": "Hello World I'm Adrián Martín Malmierca!"
}
```

---

## `GET /status`

Health-check endpoint.

```json
{
  "status": "ok",
  "uptime": 123.456
}
```

**Purpose:**
Used for:

* Monitoring
* Container orchestration health checks
* Deployment validation

---

## `GET /random`

Returns a random integer between 0 and 99.

```json
{
  "value": 42
}
```

---

## `GET /echo?msg=value`

Echo endpoint demonstrating query parameter handling.

Example:

```
/echo?msg=hi
```

Response:

```json
{
  "msg": "hi"
}
```

---

## Simulated Data Layer

A simple in-memory dataset:

```js
const users = [
  { id: 1, name: "Adrián" },
  { id: 2, name: "Paco" }
];
```

This mimics a minimal data persistence layer.

---

## `GET /users`

Returns all users.

---

## `GET /users/:id`

Returns a single user by ID.

If user does not exist:

```json
{
  "error": "User not found"
}
```

Status: `404`

---

## `GET /error`

Test-only endpoint to simulate server failure.

Returns:

```json
{
  "error": "This is a test error"
}
```

Status: `500`

Purpose:

* Validate error handling
* Test CI reliability
* Demonstrate HTTP error codes

---

# 🧪 Testing Strategy

Testing is implemented using:

* **Jest**
* **Supertest**

Example test:

```js
const res = await request(app).get("/");
expect(res.statusCode).toBe(200);
expect(res.body.message).toBe("Hello World I'm Adrián Martín Malmierca!");
```

### What is being tested?

* HTTP status codes
* Response structure
* Response data
* Error handling
* Route correctness

### Why Integration Tests Instead of Unit Tests?

This project focuses on validating:

* Express routing
* Middleware chain
* Full request/response lifecycle

This provides stronger guarantees than isolated unit tests.

---

# 🔄 Continuous Integration

CI is implemented using **GitHub Actions**.

File: `.github/workflows/ci-cd.yml`

Pipeline triggers on:

* Push to `main`
* Pull requests to `main`

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

---

# ▶️ Running Locally

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

---

# 🧠 Design Decisions Explained

### 1️⃣ Modularity Over Monolith

Routes are separated into their own module instead of being defined in `server.js`.

This:

* Improves maintainability
* Scales better for larger APIs
* Keeps bootstrap logic clean

---

### 2️⃣ Environment Configuration

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

### 3️⃣ Exporting the Express App

```js
module.exports = app;
```

This allows:

* Direct injection into Supertest
* Testing without opening a network port
* Faster CI execution

---

### 4️⃣ Explicit HTTP Status Codes

Every endpoint clearly defines:

* 200 OK
* 404 Not Found
* 500 Internal Server Error

This demonstrates understanding of REST semantics.

---

# 📈 Future Improvements

To evolve this into a more production-ready backend:

* Add centralized error middleware
* Introduce a service layer
* Replace in-memory data with:

  * PostgreSQL
  * MongoDB
* Add request validation (Joi / Zod)
* Add logging library (Winston / Pino)
* Add Docker support
* Add API documentation (Swagger / OpenAPI)
* Add rate limiting
* Add authentication (JWT)

---

# 🎯 Project Purpose

This project demonstrates:

* Backend fundamentals
* Testing discipline
* CI/CD understanding
* Clean architectural thinking
* Production-aware design

It is intentionally simple in domain complexity but strong in engineering structure.

---

# 👨‍💻 Author

Adrián Martín Malmierca

---

If you’d like, I can now:

* Upgrade this README to “portfolio-level” (with badges, coverage, deployment section, diagrams)
* Refactor the API to a more enterprise-style layered architecture
* Convert it into TypeScript
* Add Docker + production logging

Tell me which direction you want to take.