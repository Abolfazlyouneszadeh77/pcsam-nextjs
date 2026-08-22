"use client";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi2";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-15 right-10 z-50 h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 hover:scale-110"
    >
      <HiArrowUp size={24} className="mx-auto" />
    </button>
  );
};

export default ScrollToTop;