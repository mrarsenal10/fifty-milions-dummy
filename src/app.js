"use strict";
require("dotenv").config();

const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(process.env.NODE_ENV === "dev" ? morgan("dev") : morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

require("../src/dbs/mysql")

const swaggerDocs = require("../src/utils/swagger");

swaggerDocs(app, process.env.DEV_APP_PORT || 3000);

app.use("", require("./routes"));

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.code = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const code = error.code || 500;
    const errors = error.errors || [];

    return res.status(code).send({
        code,
        status: "error",
        message: error.message,
        ...(errors.length > 0 && { errors }),
    });
});

module.exports = app;
