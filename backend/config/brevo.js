const brevo = require("@getbrevo/brevo");
require("dotenv").config();

// Initialize API clients
let apiInstance = new brevo.ContactsApi();
let transactionalEmailsApi = new brevo.TransactionalEmailsApi();

// Configure API key authentication
let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

let emailApiKey = transactionalEmailsApi.authentications["apiKey"];
emailApiKey.apiKey = process.env.BREVO_API_KEY;

module.exports = {
  contactsApi: apiInstance,
  emailsApi: transactionalEmailsApi,
  brevo: brevo, // Export the brevo module itself
  config: {
    listId: parseInt(process.env.NEWSLETTER_LIST_ID) || 1,
    senderEmail: process.env.BREVO_SENDER_EMAIL,
    senderName: process.env.BREVO_SENDER_NAME,
  },
};
