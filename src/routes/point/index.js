"use strict";

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../../utils/index")
const PointController = require("../../controllers/point.controller");
const validate = require("../../middleware/validate.middleware");
const { filterQuery } = require("../../validation/match.scheme");

/**
 * @swagger
 * /v1/api/point:
 *  get:
 *     description: R2 - Input a timestamp, and return the TNX, return null if it’s not existed
 *     responses:
 *      200:
 *        description: Successfully
 *     parameters:
 *       - in: query
 *         name: timestamp
 *         schema:
 *           type: integer
 *           example: 1546281858
 */
router.get(
    "/point",
    asyncHandler(PointController.getPointsByTime)
);

/**
 * @swagger
 * /v1/api/point/total:
 *  get:
 *     description: |
 *       R4 - Calculate total points, group by username
 *       R5 - Input a date (YYYY/MM/DD), calculate total points, and group by username (similar to R4) but for the input day only
 *     responses:
 *      200:
 *        description: Successfully
 *      400:
 *        description: Response invalid parameters
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: date
 *           example: 2019/01/01
 */
router.get(
    "/point/total",
    validate(filterQuery),
    asyncHandler(PointController.getTotalPointPerUser)
);

module.exports = router