"use strict";

const { OK } = require("../core/success.response");
const PointService = require("../services/point.service");

class PointController {
    /**
     * @param {Object} req
     * @param {Object} res
     */
    getPointsByTime = async (req, res) => {
        new OK({
            metadata: await PointService.getPointsByTime(req.query),
        }).send(res);
    };

    /**
     * @param {Object} req
     * @param {Object} res
     */
    getTotalPointPerUser = async (req, res) => {
        new OK({
            metadata: await PointService.getTotalPointPerUser(req.query),
        }).send(res);
    };
}

module.exports = new PointController();
