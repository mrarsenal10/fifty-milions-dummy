require("dotenv").config();

const Sequelize = require("sequelize");
const {
    db: { host, port, username, password, name },
} = require("../configs/config.mysqldb");

class Database {
    static instance = null;

    constructor() {
        return this.connect();
    }

    connect() {
        const sequelize = new Sequelize(name, username, password, {
            host,
            port,
            dialect: "mysql",
            pool: {
                min: 0,
                max: 5,
                idle: 10000,
            },
            logging: false,
        });

        sequelize
            .authenticate()
            .then(() =>
                console.log("Connection has been established successfully")
            )
            .catch((error) => {
                console.log("Unable to connect to the database: ", error);
            });

        return sequelize;
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const dbinstance = Database.getInstance();

module.exports = dbinstance;
