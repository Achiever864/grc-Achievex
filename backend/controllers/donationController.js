const Donation = require("../models/Donation");
const pagaService = require("../services/pagaService");
const emailService = require("../services/emailService");

class DonationController {
  // Initialize Paga payment
  async initializePagaPayment(req, res) {
    try {
      const { amount, email, name, reference, phone } = req.body;

      // Validate input
      if (!amount || !email || !name || !reference) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: amount, email, name, reference",
        });
      }

      // Create donation record
      const donation = await Donation.create({
        reference,
        donorName: name,
        donorEmail: email,
        amount,
        paymentMethod: "paga",
        metadata: { phone },
      });

      // Initialize Paga payment
      const pagaResponse = await pagaService.initializePayment({
        amount,
        reference,
        email,
        name,
        phone,
      });

      if (pagaResponse.success && pagaResponse.paymentUrl) {
        res.status(200).json({
          success: true,
          message: "Payment initialized successfully",
          authorization_url: pagaResponse.paymentUrl,
          reference: reference,
          transactionId: pagaResponse.transactionId,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to initialize payment",
          error: pagaResponse.data,
        });
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to initialize payment",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Verify Paga payment
  async verifyPagaPayment(req, res) {
    try {
      const { reference } = req.params;

      // Find donation
      const donation = await Donation.findByReference(reference);

      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found",
        });
      }

      // Verify payment with Paga
      const verificationResponse = await pagaService.verifyPayment(reference);

      if (verificationResponse.isPaid) {
        // Update donation status
        await Donation.updateStatus(reference, "success", {
          pagaReference: verificationResponse.data.referenceNumber,
          transactionId: verificationResponse.data.transactionId,
          verifiedAt: new Date().toISOString(),
        });

        // Send thank you email
        await emailService.sendDonationReceipt(
          donation.donor_email,
          donation.donor_name,
          donation.amount,
          reference,
        );

        res.status(200).json({
          success: true,
          message: "Payment verified successfully",
          data: {
            reference,
            amount: donation.amount,
            status: "success",
          },
        });
      } else {
        await Donation.updateStatus(reference, "failed", {
          reason: verificationResponse.data.message || "Payment not completed",
        });

        res.status(400).json({
          success: false,
          message: "Payment not completed",
          status: verificationResponse.status,
        });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to verify payment",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Record bank transfer
  async recordBankTransfer(req, res) {
    try {
      const { amount, email, name, reference } = req.body;

      const donation = await Donation.create({
        reference,
        donorName: name,
        donorEmail: email,
        amount,
        paymentMethod: "bank_transfer",
        metadata: { requiresVerification: true },
      });

      // Send confirmation email
      await emailService.sendBankTransferConfirmation(
        email,
        name,
        amount,
        reference,
      );

      res.status(201).json({
        success: true,
        message: "Bank transfer recorded. We will verify and confirm shortly.",
        data: {
          reference,
          amount: donation.amount,
        },
      });
    } catch (error) {
      console.error("Bank transfer error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to record bank transfer",
      });
    }
  }

  // Get donation statistics (admin)
  async getStats(req, res) {
    try {
      const stats = await Donation.getStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch statistics",
      });
    }
  }

  // Get donation by reference
  async getDonation(req, res) {
    try {
      const { reference } = req.params;
      const donation = await Donation.findByReference(reference);

      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found",
        });
      }

      res.status(200).json({
        success: true,
        data: donation,
      });
    } catch (error) {
      console.error("Get donation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch donation",
      });
    }
  }
}

module.exports = new DonationController();
