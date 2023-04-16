"use strict";

const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
    },
};

const test = {
    app: {
        port: process.env.TEST_APP_PORT,
    },
    db: {
        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT,
        name: process.env.TEST_DB_NAME,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
    },
};

const pro = {};

const config = { dev, pro, test };

const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
