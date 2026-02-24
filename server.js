const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require("./routes/api.js");
app.use("/", apiRoutes);

// Solo iniciar servidor si no estamos en test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // exportar para tests