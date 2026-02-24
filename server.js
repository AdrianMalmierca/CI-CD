const express = require("express");
const app = express();
const apiRoutes = require("./routes/api");

const PORT = process.env.PORT || 3000;
const GREETING = process.env.GREETING || "Hello World I'm Adrián Martín Malmierca";

//logging
function logInfo(msg) { console.log(`[INFO ${new Date().toISOString()}] ${msg}`); }
function logError(msg) { console.error(`[ERROR ${new Date().toISOString()}] ${msg}`); }

app.use("/", apiRoutes);

//error endpoint for testing
app.get("/error", (req, res) => {
  try {
    throw new Error("This is a test error");
  } catch (err) {
    logError(err.message);
    res.status(500).json({ error: err.message });
  }
});

//only run server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => logInfo(`Server running on port ${PORT}`));
}

module.exports = app;