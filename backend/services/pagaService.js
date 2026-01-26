const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

class PagaService {
  constructor() {
    this.apiKey = process.env.PAGA_API_KEY;
    this.credential = process.env.PAGA_CREDENTIAL;
    this.hashKey = process.env.PAGA_HASH_KEY;
    this.publicId = process.env.PAGA_PUBLIC_ID;
    this.baseUrl =
      process.env.PAGA_BASE_URL || "https://beta.mypaga.com/paga-webservices";
  }

  // Generate hash for authentication
  generateHash(endpoint, requestData) {
    const message = endpoint + JSON.stringify(requestData) + this.hashKey;
    return crypto.createHash("sha512").update(message).digest("hex");
  }

  // Initialize payment (Money Transfer)
  async initializePayment({ amount, reference, email, name, phone }) {
    try {
      const endpoint = "/merchant-rest/secured/onlineMerchantPay";

      const requestData = {
        merchantAccount: this.publicId,
        merchantReferenceNumber: reference,
        amount: amount,
        currency: "NGN",
        merchantService: ["MERCHANT_DONATION"],
        customerEmail: email,
        customerPhoneNumber: phone || "",
        customerFirstName: name.split(" ")[0] || "",
        customerLastName: name.split(" ").slice(1).join(" ") || "",
      };

      const hash = this.generateHash(endpoint, requestData);

      const response = await axios.post(
        `${this.baseUrl}${endpoint}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            principal: this.apiKey,
            credentials: this.credential,
            hash: hash,
          },
        },
      );

      console.log("✅ Paga payment initialized:", response.data);
      return {
        success: true,
        data: response.data,
        paymentUrl: response.data.paymentUrl || null,
        transactionId: response.data.transactionId || null,
      };
    } catch (error) {
      console.error(
        "❌ Paga initialization error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  // Verify payment status
  async verifyPayment(reference) {
    try {
      const endpoint = "/merchant-rest/secured/getMerchantTransactionDetails";

      const requestData = {
        merchantReferenceNumber: reference,
      };

      const hash = this.generateHash(endpoint, requestData);

      const response = await axios.post(
        `${this.baseUrl}${endpoint}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            principal: this.apiKey,
            credentials: this.credential,
            hash: hash,
          },
        },
      );

      console.log("✅ Payment verification:", response.data);

      return {
        success: true,
        data: response.data,
        status: response.data.status,
        isPaid: response.data.status === "SUCCESS",
      };
    } catch (error) {
      console.error(
        "❌ Payment verification error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}

module.exports = new PagaService();
