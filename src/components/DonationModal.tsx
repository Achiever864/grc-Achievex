// Create a new file: src/components/DonationModal.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  CreditCard,
  Building2,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    preselectedAmount || null,
  );
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "paypal" | "stripe"
  >("card");
  const [step, setStep] = useState<
    "amount" | "method" | "processing" | "success"
  >("amount");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [donationReference] = useState<string>(() =>
    Date.now().toString().slice(-6),
  );

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-NG").format(amount);

  const donationAmounts = [50000, 250000, 1000000, 10000000];

  const bankDetails = {
    accountName: "The Graduate Research Clinic",
    accountNumber: "2043971459",
    bankName: "Pagatech Limited (PAGA) ",
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || Number(customAmount) || 0;
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(field);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleProceedToPayment = () => {
    if (paymentMethod === "bank") {
      setStep("success");
    } else {
      setStep("processing");
      // Simulate payment processing
      setTimeout(() => {
        setStep("success");
      }, 2000);
    }
  };

  const handlePayPal = () => {
    // PayPal integration
    window.open(
      `https://www.paypal.com/donate?hosted_button_id=YOUR_PAYPAL_BUTTON_ID&amount=${getCurrentAmount()}`,
      "_blank",
    );
  };

  const handleStripe = () => {
    // Stripe Checkout integration
    // You'll need to set up Stripe on your backend
    console.log("Redirecting to Stripe Checkout...");
    // window.location.href = `/api/create-checkout-session?amount=${getCurrentAmount()}`;
  };

  const resetModal = () => {
    setStep("amount");
    setSelectedAmount(preselectedAmount || null);
    setCustomAmount("");
    setPaymentMethod("card");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-linear-to-r from-[#95111c] to-[#7a0e16] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Make a Donation
                    </h2>
                    <p className="text-white/80 text-sm">
                      Support African scholars
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Step 1: Select Amount */}
                {step === "amount" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Select Donation Amount
                    </h3>

                    {/* Preset Amounts */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
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
                          <div className="text-2xl font-bold">
                            #{formatAmount(amount)}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Or enter custom amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          value={customAmount}
                          onChange={(e) =>
                            handleCustomAmountChange(e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full pl-6 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#95111c] focus:outline-none text-lg"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={() => setStep("method")}
                      disabled={getCurrentAmount() === 0}
                      className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue - #{formatAmount(getCurrentAmount())}
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Select Payment Method */}
                {step === "method" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        Choose Payment Method
                      </h3>
                      <div className="text-2xl font-bold text-[#95111c]">
                        #{formatAmount(getCurrentAmount())}
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3 mb-6">
                      {/* Stripe */}
                      <button
                        onClick={() => setPaymentMethod("stripe")}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          paymentMethod === "stripe"
                            ? "border-[#95111c] bg-purple-50"
                            : "border-gray-200 hover:border-[#95111c]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-purple-600 rounded-lg">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">
                              Credit/Debit Card (Stripe)
                            </div>
                            <div className="text-sm text-gray-600">
                              Secure payment via Stripe
                            </div>
                          </div>
                          {paymentMethod === "stripe" && (
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
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-600 rounded-lg">
                            <svg
                              className="w-6 h-6 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                            </svg>
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
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-green-600 rounded-lg">
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
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gray-50 rounded-xl p-4 mb-6"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Bank Account Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(bankDetails).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                            >
                              <span className="text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">
                                  {value}
                                </span>
                                <button
                                  onClick={() =>
                                    handleCopyToClipboard(value, key)
                                  }
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                >
                                  {copiedAccount === key ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-gray-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-3">
                          Please use the reference: DONATION-
                          {donationReference}
                        </p>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setStep("amount")}
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 hover:bg-gray-50"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => {
                          if (paymentMethod === "paypal") {
                            handlePayPal();
                          } else if (paymentMethod === "stripe") {
                            handleStripe();
                          } else {
                            handleProceedToPayment();
                          }
                        }}
                        className="flex-1 bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold"
                      >
                        {paymentMethod === "bank"
                          ? "I've Made the Transfer"
                          : "Proceed to Payment"}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Processing */}
                {step === "processing" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-16 h-16 border-4 border-[#95111c] border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Processing Payment...
                    </h3>
                    <p className="text-gray-600">
                      Please wait while we process your donation
                    </p>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === "success" && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </motion.div>

                    <h3 className="text-3xl font-bold text-[#95111c] mb-4">
                      Thank You!
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                      Your generous donation of{" "}
                      <span className="font-bold text-[#95111c]">
                        ${getCurrentAmount()}
                      </span>{" "}
                      has been received.
                    </p>
                    <p className="text-gray-600 mb-8">
                      {paymentMethod === "bank"
                        ? "We'll confirm your bank transfer shortly and send you a receipt via email."
                        : "A confirmation email has been sent to your inbox."}
                    </p>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                      <p className="text-sm text-gray-700">
                        Your contribution helps empower African scholars and
                        advance research across the continent. Together, we're
                        building a brighter future!
                      </p>
                    </div>

                    <Button
                      onClick={handleClose}
                      className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-8"
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
