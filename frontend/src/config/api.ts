const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  NEWSLETTER_SUBSCRIBE: `${API_BASE_URL}/api/newsletter/subscribe`,
  NEWSLETTER_UNSUBSCRIBE: `${API_BASE_URL}/api/newsletter/unsubscribe`,
  HEALTH: `${API_BASE_URL}/api/health`,

  // Donations
  DONATION_INITIALIZE_PAGA: `${API_BASE_URL}/api/donations/initialize-paga`,
  DONATION_VERIFY: (reference: string) =>
    `${API_BASE_URL}/api/donations/verify/${reference}`,
  DONATION_BANK_TRANSFER: `${API_BASE_URL}/api/donations/bank-transfer`,
  DONATION_GET: (reference: string) =>
    `${API_BASE_URL}/api/donations/${reference}`,
};

export default API_BASE_URL;
