import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

let isInitialized = false;

export const initGA = () => {
  if (!isInitialized && MEASUREMENT_ID && typeof window !== "undefined") {
    ReactGA.initialize(MEASUREMENT_ID, {
      gaOptions: {
        anonymizeIp: true,
      },
    });
    isInitialized = true;
    console.log("✅ Google Analytics initialized");
  }
};

export const trackPageView = (path: string) => {
  if (isInitialized) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
) => {
  if (isInitialized) {
    ReactGA.event({ category, action, label, value });
  }
};

export const trackDonation = (amount: number, method: string) => {
  trackEvent("Donation", "Completed", method, amount);
};

export const trackButtonClick = (buttonName: string) => {
  trackEvent("User Interaction", "Button Click", buttonName);
};
