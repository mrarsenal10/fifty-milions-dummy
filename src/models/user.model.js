const sequelize = require("../dbs/mysql");
const { Sequelize } = sequelize;

const User = sequelize.define(
    "Users",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER,
        },
        username: {
            type: Sequelize.DataTypes.STRING(10),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = User;
