const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); // multer by default store our files on cloudinary storage.


router.route("/")
// Index route - List all listings
.get(wrapAsync(listingController.index))

// Create a new listing
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)
);

// New listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
// Show individual listing
.get(wrapAsync(listingController.showListing)) 
// Update a listing
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)
)
// Delete a listing
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)
);

// Edit listing form
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;