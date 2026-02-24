const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World from CI/CD demo!" });
});

app.get("/status", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/random", (req, res) => {
  res.json({ value: Math.floor(Math.random() * 100) });
});

app.get("/echo", (req, res) => {
  const msg = req.query.msg || "nothing";
  res.json({ msg });
});

//db simulated
const users = [
  { id: 1, name: "Adrián" },
  { id: 2, name: "Paco" }
];

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

//run server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; //export app for testing