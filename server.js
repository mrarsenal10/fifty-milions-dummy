const app = require("./src/app");

const {
    app: { port },
} = require("./src/configs/config.mysqldb");

const PORT = port || 3000;

const server = app.listen(PORT, () => {
    console.log(`tnx start with ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("tnx closed");
    });
});
