const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const GREETING = process.env.GREETING || "Hello World I'm Adrián Martín Malmierca";

function logInfo(msg) {
  console.log(`[INFO ${new Date().toISOString()}] ${msg}`);
}

function logError(msg) {
  console.error(`[ERROR ${new Date().toISOString()}] ${msg}`);
}

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => logInfo(`Server running on port ${PORT}`));
}

//Endpoints
app.get("/", (req, res) => {
  const env = process.env.NODE_ENV || "development";
  res.json({ message: GREETING, environment: env });
});

app.get("/error", (req, res) => {
  try {
    throw new Error("This is a test error");
  } catch (err) {
    logError(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`));

module.exports = app;