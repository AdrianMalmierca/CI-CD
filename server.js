const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World from CI/CD demo!" });
});

// Ejecutar solo si no estamos en test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

afterAll(() => {
  server.close();
});

module.exports = app;
