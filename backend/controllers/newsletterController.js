const Subscriber = require("../models/Subscriber");
const emailService = require("../services/emailService");

class NewsletterController {
  // Subscribe to newsletter
  async subscribe(req, res) {
    try {
      const { email, firstName, lastName, interests } = req.body;

      // Check if subscriber already exists
      const existingSubscriber = await Subscriber.findByEmail(email);

      if (existingSubscriber) {
        if (existingSubscriber.status === "active") {
          return res.status(400).json({
            success: false,
            message: "This email is already subscribed to our newsletter",
          });
        } else {
          // Resubscribe
          await Subscriber.updateStatus(email, "active");
          await emailService.addContactToBrevo(email, firstName, lastName);
          await emailService.sendWelcomeEmail(email, firstName);

          // 🆕 Send admin notification for resubscriptions too
          await emailService.sendAdminNotification({
            subscriberEmail: email,
            subscriberName: `${firstName} ${lastName}`,
            interests: interests || [],
          });

          return res.status(200).json({
            success: true,
            message: "Welcome back! You've been resubscribed to our newsletter",
          });
        }
      }

      // Create new subscriber in database
      const subscriber = await Subscriber.create(email, firstName, lastName);

      // Add to Brevo
      const brevoResult = await emailService.addContactToBrevo(
        email,
        firstName,
        lastName,
      );

      // Update subscriber with Brevo contact ID if available
      if (brevoResult.data && brevoResult.data.id) {
        await Subscriber.updateBrevoContactId(
          email,
          brevoResult.data.id.toString(),
        );
      }

      // Send welcome email
      await emailService.sendWelcomeEmail(email, firstName);

      // 🆕 Send admin notification
      await emailService.sendAdminNotification({
        subscriberEmail: email,
        subscriberName: `${firstName} ${lastName}`,
        interests: interests || [],
      });

      // Log activity
      await Subscriber.logActivity(subscriber.id, null, "sent", {
        source: "website",
        ip: req.ip,
      });

      res.status(201).json({
        success: true,
        message:
          "Successfully subscribed! Check your email for a welcome message.",
        data: {
          email: subscriber.email,
          subscribedAt: subscriber.subscribed_at,
        },
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      // Handle duplicate email error
      if (error.code === "23505") {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to subscribe. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Unsubscribe from newsletter
  async unsubscribe(req, res) {
    try {
      const { email } = req.body;

      const subscriber = await Subscriber.findByEmail(email);

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: "Email not found in our subscription list",
        });
      }

      if (subscriber.status === "unsubscribed") {
        return res.status(400).json({
          success: false,
          message: "This email is already unsubscribed",
        });
      }

      // Update status in database
      await Subscriber.updateStatus(email, "unsubscribed");

      // Remove from Brevo list
      await emailService.removeContactFromBrevo(email);

      // Send confirmation email
      await emailService.sendUnsubscribeEmail(email, subscriber.first_name);

      // Log activity
      await Subscriber.logActivity(subscriber.id, null, "unsubscribed", {
        ip: req.ip,
      });

      res.status(200).json({
        success: true,
        message: "Successfully unsubscribed from our newsletter",
      });
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to unsubscribe. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Get subscriber stats (admin only)
  async getStats(req, res) {
    try {
      const stats = await Subscriber.getCountByStatus();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch statistics",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

// ✅ FIXED: Export instance (works with your routes)
module.exports = new NewsletterController();
