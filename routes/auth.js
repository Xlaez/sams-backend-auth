const express = require("express");

const authController = require("../controller/auth/auth");

const router = express.Router();

router.post("/", authController.postSignup);
router.post("/sign-in", authController.postLogin);

module.exports = router;
