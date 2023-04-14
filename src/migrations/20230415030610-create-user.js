"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.SMALLINT,
            },
            username: {
                type: Sequelize.STRING(10),
                allowNull: false,
                validate: { len: [6, 10] },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users", {
            truncate: true,
            cascade: true,
        });
    },
};
