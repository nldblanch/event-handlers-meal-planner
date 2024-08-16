const express = require("express");

const apiRouter = require("./routers/api-router");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use((error, request, response, next) => {
    if (error.status && error.message) {
      response.status(error.status).send(error)
    }
  })
module.exports = app;
