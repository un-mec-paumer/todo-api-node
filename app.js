const path = require("node:path");
const dotenv = require("dotenv");
const Sentry = require("@sentry/node");
const logger = require('./logger');
const gb = require('./growthbook');

// Initialiser Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,

});

// Charger le fichier .env correspondant à NODE_ENV
const envFile = path.resolve(__dirname, `.env.${process.env.NODE_ENV || "development"}`);
dotenv.config({ path: envFile });

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const todoRouter = require("./routes/todo");

const app = express();
app.use(express.json());

logger.info('Application démarrée');

Sentry.setupExpressErrorHandler(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => res.json({ message: "Welcome to the Enhanced Express Todo App!" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.get("/feature-flag", (req, res) => {
  if (req.gb.isOn("test-flag")) {
    res.send("Feature is enabled!");
  }
  else {
    res.send("Feature is disabled");
  }
});

app.use("/todos", todoRouter);
app.use((err, req, res, next) => {
  logger.error(err.message);
  Sentry.captureException(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;