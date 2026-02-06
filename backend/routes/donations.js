// backend/routes/donation.js

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Sanitize input to prevent XSS
const sanitizeInput = (value) => {
  if (typeof value !== "string") return value;

  return value
    .trim()
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Validation rules
const validateDonation = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => {
      const amount = parseFloat(value);
      if (amount < 100) {
        throw new Error("Amount must be at least ₦100");
      }
      if (amount > 100000000) {
        throw new Error("Amount cannot exceed ₦100,000,000");
      }
      if (amount <= 0) {
        throw new Error("Amount must be positive");
      }
      return true;
    })
    .toFloat(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .customSanitizer(sanitizeInput),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage(
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .customSanitizer(sanitizeInput),
];

// Check validation results middleware
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("❌ Validation failed:", errors.array());
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

// In-memory storage (use database in production)
const donations = new Map();

// Generate unique reference
const generateReference = () => {
  return `DON-${Date.now().toString().slice(-8)}`;
};

// Create Paga payment
router.post(
  "/create-paga-payment",
  validateDonation,
  checkValidation,
  async (req, res) => {
    try {
      const { amount, email, name } = req.body;
      const reference = generateReference();

      // Store donation details temporarily
      donations.set(reference, {
        amount,
        email,
        name,
        status: "pending",
        createdAt: new Date(),
        expectedAmount: amount,
      });

      console.log("✅ Payment created:", { reference, amount, email, name });

      // Simulated Paga response
      res.json({
        success: true,
        data: {
          authorization_url: `https://www.mypaga.com/merchant-payment?reference=${reference}`,
          reference: reference,
          access_code: `ACCESS_${reference}`,
        },
      });
    } catch (error) {
      console.error("❌ Payment creation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create payment. Please try again.",
      });
    }
  },
);

// Verify payment (callback from Paga)
router.post("/verify-payment/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    const donation = donations.get(reference);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // In production, verify with Paga API
    const { amount: paidAmount } = req.body;

    if (paidAmount && paidAmount !== donation.expectedAmount) {
      console.error("⚠️  Amount mismatch:", {
        expected: donation.expectedAmount,
        received: paidAmount,
      });

      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }

    // Update donation status
    donation.status = "completed";
    donation.verifiedAt = new Date();
    donations.set(reference, donation);

    console.log("✅ Payment verified:", reference);

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: {
        reference,
        amount: donation.amount,
        status: donation.status,
      },
    });
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
});

// Get donation by reference
router.get("/donation/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    const donation = donations.get(reference);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Don't expose sensitive data
    res.json({
      success: true,
      data: {
        reference,
        amount: donation.amount,
        status: donation.status,
        createdAt: donation.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Fetch donation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donation",
    });
  }
});

// Get all donations (for admin/testing)
router.get("/donations-list", async (req, res) => {
  try {
    const allDonations = Array.from(donations.entries()).map(([ref, data]) => ({
      reference: ref,
      amount: data.amount,
      status: data.status,
      createdAt: data.createdAt,
    }));

    res.json({
      success: true,
      count: allDonations.length,
      data: allDonations,
    });
  } catch (error) {
    console.error("❌ Fetch donations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
});

module.exports = router;
