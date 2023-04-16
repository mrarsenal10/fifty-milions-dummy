"use strict";

const PointRepo = require("../models/repo/point.repo");

class PointService {
    /**
     * Get all points by time
     * @param {int} timestamp
     * @return {object|null}
     */
    static getPointsByTime = ({ timestamp }) => PointRepo.findByTime(timestamp);

    /**
     * Get all points by time
     * @param {int} timestamp
     * @return {object|null}
     */
    static getTotalPointByUsername = ({ username }) => {
        if (!username) {
            return null;
        }

        return PointRepo.getTotalPointByUsername(username);
    };

    /**
     * Get total point of all users by specific date
     * @param {*} param0
     * @returns
     */
    static getTotalPointPerUser = ({ date }) =>
        PointRepo.getTotalPointPerUser(date);
}

module.exports = PointService;
