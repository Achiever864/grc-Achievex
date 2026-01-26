const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");
const {
  validateSubscriber,
  validateEmail,
} = require("../middleware/validation");

// Public routes
router.post("/subscribe", validateSubscriber, newsletterController.subscribe);
router.post("/unsubscribe", validateEmail, newsletterController.unsubscribe);

// Admin routes (add authentication middleware later)
router.get("/stats", newsletterController.getStats);

module.exports = router;
