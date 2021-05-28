const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const handle = require("../controllers/handle.js");
const authenticate = require("../middleware/authenticate");
const User = require("../model/userSchema");
//home page
router.get("/", handle.homeHandle);

//post route
router.post("/backend/payment", handle.paymentHandle);
//signup
router.post("/backend/signup", handle.signupHandle);

//login

router.post("/backend/login", handle.loginHandle);

router.get("http://localhost:3000/pricing", authenticate, (req, res) => {
	// console.log(req.cookies.jwtoken);
	console.log("This is about");
	res.send(req.rootUser);
});

module.exports = router;
