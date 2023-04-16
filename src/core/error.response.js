"use strict";

const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const statusMessage = {
    FORBIDDEN: "Forbidden",
    CONFLICT: "Conflict error",
    BAD_REQUEST: "Bad request",
    NOT_FOUND: "Not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
};

class ErrorResponse extends Error {
    constructor({ message, code, errors }) {
        super(message);
        this.message = message;
        this.status = code;
        this.errors = errors;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.CONFLICT,
        code = statusCode.CONFLICT,
    }) {
        super({ message, code });
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.FORBIDDEN,
        code = statusCode.FORBIDDEN,
    }) {
        super({ message, code });
    }
}

class BadRequestError extends ErrorResponse {
    constructor({
        message = statusMessage.BAD_REQUEST,
        code = statusCode.BAD_REQUEST,
        errors = null,
    }) {
        super({ message, code, errors });
    }
}

class NotFoundError extends ErrorResponse {
    constructor({
        message = statusMessage.NOT_FOUND,
        code = statusCode.NOT_FOUND,
    }) {
        super({ message, code });
    }
}

class InternalServerError extends ErrorResponse {
    constructor({
        message = statusMessage.INTERNAL_SERVER_ERROR,
        code = statusCode.INTERNAL_SERVER_ERROR,
    }) {
        super({ code, message });
    }
}

module.exports = {
    ConflictRequestError,
    ForbiddenRequestError,
    BadRequestError,
    ErrorResponse,
    NotFoundError,
    InternalServerError,
};
