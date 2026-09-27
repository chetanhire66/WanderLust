const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validatelisting} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// index route
router.get("/",wrapAsync(listingController.index));

// new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// edit route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.editListing));

// show route
router.get("/:id",wrapAsync(listingController.showListing));

// create route
router.post("/",isLoggedIn,validatelisting,upload.single("listing[image]"),wrapAsync(listingController.createNewListing));

// update route
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.updateListing));

// delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

module.exports = router;
