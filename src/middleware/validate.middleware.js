const { ZodError } = require("zod");
const { BadRequestError } = require("../core/error.response");

const validate = (schema) => (req, res, next) => {
    try {
        const { params, query, body } = req;

        schema.parse({
            params,
            body,
            query,
        });

        next();
    } catch (e) {
        if (e instanceof ZodError) {
            throw new BadRequestError({ errors: e.errors });
        }

        next(error);
    }
};

module.exports = validate;
