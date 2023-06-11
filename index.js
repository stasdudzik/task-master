require("module-alias/register");
const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const routes = require("@routes");

dotenv.config();

try {
  const app = express();
  app.use(helmet());

  app.use(express.json());

  app.use("/", routes.task);
  app.use("/", routes.auth);

  app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error." });
  });
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
