const { DataTypes } = require("sequelize");
const sequelize = require("../dbs/mysql");
const User = require("./user.model");

const Point = sequelize.define(
    "Points",
    {
        ts: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        point: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

Point.belongsTo(User, {
    foreignID: "userId",
    targetKey: "id",
});

User.hasMany(Point, {
    foreignID: "id",
    targetKey: "userId",
});

module.exports = Point;
