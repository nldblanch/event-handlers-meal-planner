const express = require("express");
const cors = require("cors")

const apiRouter = require("./routers/api-router");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use((error, request, response, next) => {
    if (error.status && error.message) {
      response.status(error.status).send(error)
    }
  })
module.exports = app;
