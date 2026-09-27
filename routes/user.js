const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// signpu page
router.get("/signup",userController.signupPage);

// logged in page
router.get("/login",userController.loginPage);

// logged out 
router.get("/logout",userController.logoutPage);

// signup post route
router.post("/signup",wrapAsync(userController.signupPostRoute));

// login post route
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureFlash: true}),userController.loginPostRoute);

module.exports = router;