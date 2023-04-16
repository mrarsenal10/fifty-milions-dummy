const { z } = require("zod");

const dateString = (schema) =>
    z.preprocess((data) => {
        if (typeof data === "string") {
            return new Date(data);
        } else {
            return undefined;
        }
    }, schema);

module.exports = { dateString };
