import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTopLink = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    // Scroll to top when the component mounts
    scrollToTop();

    // If you also want to scroll to top when navigating to a new page
    const unlisten = navigate(() => {
      scrollToTop();
    });

    return () => {
      // Clean up the navigation listener when the component unmounts
      unlisten;
    };
  }, [navigate]);

  return null;
};

export default ScrollToTopLink;
