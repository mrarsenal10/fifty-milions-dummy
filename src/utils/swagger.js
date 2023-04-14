const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const definition = {
    info: {
        title: "TNX", // Title (required)
        version: "1.0.0", // Version (required)
    },
};

const options = {
    definition,
    apis: ["./src/routes/point/*.js", "./src/routes/user/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
