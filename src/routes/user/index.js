"use strict";

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../../utils/index")
const userController = require("../../controllers/user.controller");

/**
 * @swagger
 * /v1/api/user/total-point:
 *  get:
 *     description: R3 - Input a username and returns the total points of that user
 *     responses:
 *      200:
 *        description: Successfully
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *           example: Tony
 */
router.get(
    "/user/total-point",
    asyncHandler(userController.getTotalPointByUsername)
);

module.exports = router