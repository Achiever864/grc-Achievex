import { useState, useEffect } from "react";

export const usePageLoader = (minDuration: number = 1000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  return { isLoading, setIsLoading };
};
