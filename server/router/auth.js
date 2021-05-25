const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const handle = require("../controllers/handle.js");
//home page
router.get("/", handle.homeHandle);

//post route
router.post("/backend/payment", handle.paymentHandle);
//signup
router.post("/backend/signup", handle.signupHandle);

//login

router.post("/backend/login", handle.loginHandle);

module.exports = router;
