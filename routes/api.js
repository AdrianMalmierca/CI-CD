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

// JSON “base de datos” simulada
const users = [
  { id: 1, name: "Adrián" },
  { id: 2, name: "Alice" }
];
app.get("/users", (req, res) => res.json(users));

// Solo iniciar servidor si no estamos en test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // exportar para tests