import { useState, useEffect, startTransition } from "react";
import {
  sanitizeInput,
  sanitizeName,
  isValidEmail,
  isValidAmount,
} from "@/utils/sanitize";
import {
  X,
  Heart,
  CreditCard,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Wallet,
} from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

const TbCurrencyNaira = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M7 15h2v2H7zm0-4h2v2H7zm0-4h2v2H7zm10 8h-2v-2h2zm0-4h-2v-2h2zm0-4h-2V7h2zM5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
  </svg>
);

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAmount?: number | null;
}

export const DonationModal = ({
  isOpen,
  onClose,
  preselectedAmount,
}: DonationModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "paga" | "bank" | "paypal" | null
  >(null);
  const [step, setStep] = useState<
    "amount" | "method" | "processing" | "success"
  >("amount");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [donationReference] = useState(
    () => `DON-${Date.now().toString().slice(-8)}`,
  );
  const [donorEmail, setDonorEmail] = useState("");
  const [donorName, setDonorName] = useState("");

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-NG").format(amount);

  const donationAmounts = [50000, 250000, 1000000, 10000000];

  const bankDetails = {
    accountName: "The Graduate Research Clinic",
    accountNumber: "2043971459",
    bankName: "Pagatech Limited (PAGA)",
  };

  // Reset and sync with preselected amount
  useEffect(() => {
    if (isOpen) {
      if (preselectedAmount) {
        startTransition(() => {
          setSelectedAmount(preselectedAmount);
          setCustomAmount("");
          setStep("method"); // Skip directly to payment method
          setPaymentMethod(null);
        });
      } else {
        startTransition(() => {
          setStep("amount"); // Start from amount selection
          setPaymentMethod(null);
        });
      }
    }
  }, [isOpen, preselectedAmount]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow digits
    const numValue = value.replace(/[^\d]/g, "");
    const amount = Number(numValue);

    // Validate amount range
    if (amount > 100000000) {
      alert("Amount cannot exceed ₦100,000,000");
      return;
    }

    setCustomAmount(numValue);
    setSelectedAmount(null);
  };

  const handleEmailChange = (value: string) => {
    const sanitized = sanitizeInput(value);
    setDonorEmail(sanitized);
  };

  const handleNameChange = (value: string) => {
    const sanitized = sanitizeName(value);
    setDonorName(sanitized);
  };

  // Update validation before payment
  const validateBeforePayment = () => {
    if (!donorName || donorName.length < 2) {
      alert("Please enter a valid name");
      return false;
    }

    if (!isValidEmail(donorEmail)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!isValidAmount(getCurrentAmount())) {
      alert("Please enter a valid donation amount");
      return false;
    }

    return true;
  };

  const getCurrentAmount = () => {
    return selectedAmount || Number(customAmount) || 0;
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(field);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handlePagaPayment = async () => {
    if (!validateBeforePayment()) return;

    const amount = getCurrentAmount();

    if (!donorEmail || !donorName) {
      alert("Please provide your name and email");
      return;
    }

    setStep("processing");

    try {
      // PAGA PAYMENT INTEGRATION
      // Step 1: Call your backend to initialize the payment
      const response = await fetch(API_ENDPOINTS.DONATION_INITIALIZE_PAGA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          email: donorEmail,
          name: donorName,
          reference: donationReference,
          currency: "NGN",
          callback_url: window.location.origin + "/donation-callback",
        }),
      });

      const data = await response.json();

      if (data.success && data.authorization_url) {
        // Redirect to Paga payment page
        window.location.assign(data.authorization_url);
      } else {
        console.error("Payment initialization failed");
        setStep("method");
        alert(
          data.message || "Unable to initialize payment. Please try again.",
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStep("method");
      alert("Network error. Please try again.");
    }
  };

  const handlePayPalPayment = () => {
    const amount = getCurrentAmount();
    setStep("processing");

    // PayPal integration
    setTimeout(() => {
      window.open(
        `https://www.paypal.com/donate?hosted_button_id=YOUR_PAYPAL_BUTTON_ID&amount=${amount}&currency_code=NGN`,
        "_blank",
      );
      setStep("success");
    }, 1000);
  };

  const handleBankTransferConfirm = async () => {
    if (!donorEmail || !donorName) {
      alert("Please provide your name and email for confirmation");
      return;
    }

    setStep("processing");

    try {
      const response = await fetch(API_ENDPOINTS.DONATION_BANK_TRANSFER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: getCurrentAmount(),
          email: donorEmail,
          name: donorName,
          reference: donationReference,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStep("success");
      } else {
        setStep("method");
        alert(data.message || "Failed to record transfer");
      }
    } catch (error) {
      console.error("Bank transfer error:", error);
      setStep("method");
      alert("Network error. Please try again.");
    }
  };

  const resetModal = () => {
    setStep("amount");
    setSelectedAmount(null);
    setCustomAmount("");
    setPaymentMethod(null);
    setDonorEmail("");
    setDonorName("");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleBackButton = () => {
    if (step === "method" && !preselectedAmount) {
      setStep("amount");
      setPaymentMethod(null);
    } else if (step === "method" && preselectedAmount) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-slideUp">
          {/* Header */}
          <div className="bg-linear-to-r from-[#95111c] to-[#7a0e16] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8" fill="currentColor" />
                <div>
                  <h2 className="text-2xl font-bold">Make a Donation</h2>
                  <p className="text-white/90 text-sm">
                    Support African scholars
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Step 1: Select Amount */}
            {step === "amount" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Select Donation Amount
                  </h3>
                  <p className="text-gray-600">
                    Choose an amount or enter a custom value
                  </p>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-2 gap-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAmount === amount
                          ? "border-[#95111c] bg-[#95111c] text-white shadow-lg scale-105"
                          : "border-gray-200 hover:border-[#95111c] hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                        <TbCurrencyNaira />
                        {formatAmount(amount)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <TbCurrencyNaira />
                    </div>
                    <input
                      type="text"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#95111c] focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("method")}
                  disabled={getCurrentAmount() === 0}
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue - ₦{formatAmount(getCurrentAmount())}
                </button>
              </div>
            )}

            {/* Step 2: Select Payment Method */}
            {step === "method" && (
              <div className="space-y-6">
                <div>
                  <button
                    onClick={handleBackButton}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Choose Payment Method
                  </h3>
                  <div className="flex items-center gap-2 text-[#95111c] font-semibold">
                    <TbCurrencyNaira />
                    <span className="text-2xl">
                      {formatAmount(getCurrentAmount())}
                    </span>
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900">
                    Your Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#95111c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#95111c] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  {/* Paga */}
                  <button
                    onClick={() => setPaymentMethod("paga")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "paga"
                        ? "border-[#95111c] bg-red-50"
                        : "border-gray-200 hover:border-[#95111c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#95111c] rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Paga Payment
                        </div>
                        <div className="text-sm text-gray-600">
                          Secure payment via Paga Nigeria
                        </div>
                      </div>
                      {paymentMethod === "paga" && (
                        <CheckCircle2 className="w-6 h-6 text-[#95111c]" />
                      )}
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "paypal"
                        ? "border-[#95111c] bg-blue-50"
                        : "border-gray-200 hover:border-[#95111c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          PayPal
                        </div>
                        <div className="text-sm text-gray-600">
                          Pay with your PayPal account
                        </div>
                      </div>
                      {paymentMethod === "paypal" && (
                        <CheckCircle2 className="w-6 h-6 text-[#95111c]" />
                      )}
                    </div>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === "bank"
                        ? "border-[#95111c] bg-green-50"
                        : "border-gray-200 hover:border-[#95111c]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Bank Transfer
                        </div>
                        <div className="text-sm text-gray-600">
                          Direct bank transfer
                        </div>
                      </div>
                      {paymentMethod === "bank" && (
                        <CheckCircle2 className="w-6 h-6 text-[#95111c]" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Bank Details (if bank transfer selected) */}
                {paymentMethod === "bank" && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-800 font-semibold">
                      <Building2 className="w-5 h-5" />
                      <span>Bank Account Details</span>
                    </div>
                    {Object.entries(bankDetails).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between bg-white p-3 rounded-lg"
                      >
                        <div>
                          <div className="text-xs text-gray-600 uppercase">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="font-semibold text-gray-900">
                            {value}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyToClipboard(value, key)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {copiedAccount === key ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-gray-600 uppercase mb-1">
                        Reference
                      </div>
                      <div className="font-mono font-semibold text-[#95111c]">
                        {donationReference}
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Please use this reference for your transfer
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => {
                    if (paymentMethod === "paga") {
                      handlePagaPayment();
                    } else if (paymentMethod === "paypal") {
                      handlePayPalPayment();
                    } else if (paymentMethod === "bank") {
                      handleBankTransferConfirm();
                    }
                  }}
                  disabled={!paymentMethod || !donorEmail || !donorName}
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {paymentMethod === "bank"
                    ? "I've Made the Transfer"
                    : "Proceed to Payment"}
                </button>
              </div>
            )}

            {/* Step 3: Processing */}
            {step === "processing" && (
              <div className="py-12 text-center">
                <div className="w-20 h-20 border-4 border-[#95111c] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Processing Payment...
                </h3>
                <p className="text-gray-600">
                  Please wait while we process your donation
                </p>
              </div>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <div className="py-8 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Your generous donation of{" "}
                    <span className="font-bold text-[#95111c]">
                      ₦{formatAmount(getCurrentAmount())}
                    </span>{" "}
                    has been received.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono font-semibold">
                      {donationReference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">
                      ₦{formatAmount(getCurrentAmount())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{donorEmail}</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  {paymentMethod === "bank"
                    ? "We'll confirm your bank transfer shortly and send you a receipt via email."
                    : "A confirmation email has been sent to your inbox."}
                </p>
                <div className="bg-[#95111c]/10 border-2 border-[#95111c]/20 rounded-xl p-6">
                  <p className="text-gray-700">
                    Your contribution helps empower African scholars and advance
                    research across the continent. Together, we're building a
                    brighter future!
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
