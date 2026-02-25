const path = require("path");
const dotenv = require("dotenv");

// Charger le fichier .env correspondant à NODE_ENV
const envFile = path.resolve(__dirname, `.env.${process.env.NODE_ENV || "development"}`);
dotenv.config({ path: envFile });

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const todoRouter = require("./routes/todo");

const SECRET_KEY = process.env.SECRET_KEY || "dev_secret";
const API_KEY = process.env.API_KEY || "dev_api_key";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => res.json({ message: "Welcome to the Enhanced Express Todo App!" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/todos", todoRouter);

module.exports = app;