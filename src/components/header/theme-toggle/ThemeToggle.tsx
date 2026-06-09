"use client";
import React, { useEffect, useState } from "react";
import { GrSun } from "react-icons/gr";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";

const ThemeToggle = () => {
  const [darkmode, setDarkmode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkmode");

    if (savedMode !== null) {
      setDarkmode(JSON.parse(savedMode));
    } else {
      setDarkmode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (darkmode === null) return;
    const html = document.documentElement;

    localStorage.setItem("darkmode", JSON.stringify(darkmode));
    if (darkmode) {
      html.classList.add("dark"); // برای Tailwind
      html.setAttribute("data-theme", "dark"); // برای DaisyUI
      html.style.colorScheme = "dark"; // برای مرورگر
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
      html.style.colorScheme = "light";
    }
  }, [darkmode]);

  if (darkmode === null) {
    return (
      <button
        className="p-2 rounded-full opacity-0 pointer-events-none"
      >
        <GrSun size="30px" />
      </button>
    );
  }
  
  return (
    <>
      <button
        className="p-1.5 rounded-lg hover:shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] dark:hover:bg-gray-800 transition-all ease-in-out duration-200"
        onClick={() => setDarkmode((prev) => !prev)}
      >
        {darkmode ? (
          <GrSun size="30px" className="dark:text-gray-300" />
        ) : (
          <WiMoonAltWaningCrescent3 size="28px" className="text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
