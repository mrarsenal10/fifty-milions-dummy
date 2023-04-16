"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const usernames = {};

        await queryInterface.bulkInsert(
            "Users",
            [...Array(200)].map(() => {
                let username = faker.name.firstName();

                while (
                    username.length > 10 ||
                    username.length < 6 ||
                    usernames[username]
                ) {
                    usernames[username] = username;
                    username = faker.name.firstName();
                }

                return { username };
            }),
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
        });
    },
};
