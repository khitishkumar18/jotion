import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  // Initialize a state variable called 'scrolled' with a default value of false
  const [scrolled, setScrolled] = useState(false);
  // Use the useEffect hook to add a scroll event listener when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      // If the vertical scroll position is greater than the threshold, set 'scrolled' to true, otherwise set it to false
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Add the handleScroll function as a scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Remove the scroll event listener when the component is unmounted to prevent memory leaks
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]); // Re-run the effect only if the threshold value changes

  return scrolled;
};
