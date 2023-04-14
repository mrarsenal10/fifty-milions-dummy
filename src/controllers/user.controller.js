"use strict";

const { OK } = require("../core/success.response");
const PointService = require("../services/point.service");

class UserController {
    /**
     * @param {Object} req
     * @param {Object} res
     */
    getTotalPointByUsername = async (req, res) => {
        new OK({
            metadata: await PointService.getTotalPointByUsername(req.query),
        }).send(res);
    };
}

module.exports = new UserController();
