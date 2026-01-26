const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

// Public routes
router.post("/initialize-paga", donationController.initializePagaPayment);
router.get("/verify/:reference", donationController.verifyPagaPayment);
router.post("/bank-transfer", donationController.recordBankTransfer);
router.get("/:reference", donationController.getDonation);

// Admin routes (add authentication later)
router.get("/admin/stats", donationController.getStats);

module.exports = router;
