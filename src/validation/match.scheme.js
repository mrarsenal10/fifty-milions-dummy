const { z } = require("zod");
const { dateString } = require("./utils");

const filterQuery = z.object({
    query: z.object({
        date: dateString(z.date().optional()),
    }),
});

module.exports = {
    filterQuery,
};
