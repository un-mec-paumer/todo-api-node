const path = require("node:path");
const dotenv = require("dotenv");
const Sentry = require("@sentry/node");

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

Sentry.setupExpressErrorHandler(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => res.json({ message: "Welcome to the Enhanced Express Todo App!" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/todos", todoRouter);

module.exports = app;