import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

export default function DonationCallback() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [donationDetails, setDonationDetails] = useState<{
    amount?: number;
    reference?: string;
  }>({});

  useEffect(() => {
    // Get reference from URL query params
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");

    // Verify payment
    const verifyPayment = async () => {
      if (!reference) {
        setStatus("failed");
        setMessage("Invalid payment reference");
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.DONATION_VERIFY(reference));
        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage("Thank you for your donation!");
          setDonationDetails({
            amount: data.data?.amount,
            reference: data.data?.reference || reference,
          });
        } else {
          setStatus("failed");
          setMessage(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error(error);
        setStatus("failed");
        setMessage("Failed to verify payment");
      }
    };

    verifyPayment();
  }, []); // Empty dependency array - runs once on mount

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleNavigateHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-purple-50 to-white p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-[#95111c] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment...
            </h2>
            <p className="text-gray-600">Please wait</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful! 🎉
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>

            {donationDetails.amount && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Donation Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-[#95111c]">
                      {formatAmount(donationDetails.amount)}
                    </span>
                  </div>
                  {donationDetails.reference && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-mono text-sm font-semibold">
                        {donationDetails.reference}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-[#95111c]/10 border-2 border-[#95111c]/20 rounded-xl p-6 mb-8">
              <p className="text-gray-700 text-sm">
                Your contribution helps empower African scholars and advance
                research across the continent. A confirmation email has been
                sent to your inbox.
              </p>
            </div>

            <button
              onClick={handleNavigateHome}
              className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Return Home
            </button>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Failed
            </h2>
            <p className="text-gray-600 mb-8">{message}</p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-700">
                If you believe this is an error or if you've been charged,
                please contact us at{" "}
                <a
                  href="mailto:support@graduateresearchclinic.org"
                  className="text-[#95111c] font-semibold hover:underline"
                >
                  support@graduateresearchclinic.org
                </a>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleNavigateHome}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-4 rounded-xl transition-all"
              >
                Return Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-6 py-4 rounded-xl transition-all"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
