"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../../dbs/mysql");

const { InternalServerError } = require("../../core/error.response");
const Point = require("../point.model");
const User = require("../user.model");
const { toTS } = require("../../utils");

class PointRepo {
    /**
     * Get all matches using pagination
     * @param {int} timestamp
     * @return {object|null}
     */
    static findByTime = async (timestamp) => {
        try {
            return await Point.findOne({
                attributes: [
                    "ts",
                    "point",
                    [Sequelize.col("User.username"), "username"],
                ],
                include: {
                    model: User,
                    require: true,
                    attributes: [],
                },
                where: {
                    ...(timestamp && {
                        ts: {
                            [Sequelize.Op.eq]: timestamp,
                        },
                    }),
                },
            });
        } catch (_) {
            throw new InternalServerError();
        }
    };

    /**
     * Get total point by username
     * @param {string} username
     * @return {object|null}
     */
    static getTotalPointByUsername = async (username) => {
        try {
            return await Point.findOne({
                attributes: [
                    [
                        Sequelize.fn("SUM", Sequelize.col("point")),
                        "total_point",
                    ],
                ],
                where: {
                    userId: {
                        [Sequelize.Op.in]: sequelize.literal(
                            "(SELECT id FROM Users WHERE username = $1)"
                        ),
                    },
                },
                bind: [username],
            });
        } catch (_) {
            throw new InternalServerError();
        }
    };

    /**
     * Generating query that get total point
     * @param {string} date
     * @returns {string}
     */
    static generateTotalPointQuery = (date) => {
        return sequelize.dialect.queryGenerator
            .selectQuery("Points", {
                attributes: [
                    "userId",
                    [
                        sequelize.fn("SUM", sequelize.col("Points.point")),
                        "total_point",
                    ],
                ],
                where: {
                    ...(date && {
                        ts: {
                            [Sequelize.Op.gte]: toTS(`${date} 00:00:01`),
                            [Sequelize.Op.lte]: toTS(`${date} 23:59:59`),
                        },
                    }),
                },
                group: ["userId"],
            })
            .slice(0, -1);
    };

    /**
     * Get the total point of each user
     */
    static getTotalPointPerUser = async (date) => {
        try {
            const subQuery = this.generateTotalPointQuery(date);

            const [results] = await sequelize.query(
                `SELECT
                    Points.total_point,
                    u.username
                FROM (${subQuery}) AS Points
                LEFT JOIN Users u ON u.id = Points.userId`
            )

            return results;
        } catch (_) {
            throw new InternalServerError();
        }
    };
}

module.exports = PointRepo;
