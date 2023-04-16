const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toTS = (date) => {
    if (!date) return null;
    return Math.floor(new Date(date).getTime() / 1000)
}

module.exports = { asyncHandler, toTS };
