"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable("Points", {
                ts: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                point: {
                    type: Sequelize.TINYINT,
                    allowNull: false,
                    validate: { len: [2] },
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            })
            .then(() => queryInterface.addIndex("Points", ["userId", "point"]))
            .then(() =>
                queryInterface.sequelize.query(
                    "ALTER TABLE Points AUTO_INCREMENT = 1546275600;" //2019-01-01T00:00:00
                )
            );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Points", {
            truncate: true,
            cascade: true,
        });
    },
};
