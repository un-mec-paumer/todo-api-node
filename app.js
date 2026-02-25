const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const express = require("express");
const todoRouter = require("./routes/todo");

const SECRET_KEY = process.env.SECRET_KEY || "dev_secret";
const API_KEY = process.env.API_KEY || "dev_api_key";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  console.log("someone hit the root endpoint")
  res.json({ message: "Welcome to the Enhanced Express Todo App!" });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/todos", todoRouter);

module.exports = app;
