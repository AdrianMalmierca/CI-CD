const express = require("express");
const router = express.Router();

// GET /
router.get("/", (req, res) => {
  res.json({ message: "Hello World from CI/CD demo!" });
});

// GET /status
router.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// GET /random
router.get("/random", (req, res) => {
  res.json({ value: Math.floor(Math.random() * 100) });
});

// GET /echo
router.get("/echo", (req, res) => {
  const msg = req.query.msg || "nothing";
  res.json({ msg });
});

// Simulated DB
const users = [
  { id: 1, name: "Adrián" },
  { id: 2, name: "Paco" }
];

// GET /users
router.get("/users", (req, res) => res.json(users));

// GET /users/:id
router.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

module.exports = router;