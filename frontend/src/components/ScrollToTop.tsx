import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation(); // <-- tuple, not object

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // or "smooth"
    });
  }, [location]); // watch the path for changes

  return null;
}
