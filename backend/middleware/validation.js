const validator = require("validator");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email is required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address",
    });
  }

  // Normalize email
  req.body.email = validator.normalizeEmail(email);
  next();
};

const validateSubscriber = (req, res, next) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email is required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address",
    });
  }

  // Optional: Validate first name and last name if provided
  if (firstName && !validator.isLength(firstName, { min: 1, max: 100 })) {
    return res.status(400).json({
      success: false,
      error: "First name must be between 1 and 100 characters",
    });
  }

  if (lastName && !validator.isLength(lastName, { min: 1, max: 100 })) {
    return res.status(400).json({
      success: false,
      error: "Last name must be between 1 and 100 characters",
    });
  }

  // Normalize email
  req.body.email = validator.normalizeEmail(email);
  next();
};

module.exports = {
  validateEmail,
  validateSubscriber,
};
