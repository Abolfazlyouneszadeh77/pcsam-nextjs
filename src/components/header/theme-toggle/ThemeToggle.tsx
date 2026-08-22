"use client";
import React, { useEffect, useState } from "react";
import { GrSun } from "react-icons/gr";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkmode(isDark);
    setMounted(true);
  }, []);

  const toggleTheme = ()=>{
    const nextDarkmode = !darkmode;
    setDarkmode(nextDarkmode);

    const html = document.documentElement;
    if(nextDarkmode){
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      html.style.colorScheme= 'dark';
      document.cookie = "theme=dark; path=/; max-age=31536000; samesite=lax";
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
      html.style.colorScheme = "light";
      document.cookie = "theme=light; path=/; max-age=31536000; samesite=lax";
    }
  }

  if (!mounted) {
    return <div className="p-1.5 w-10 h-10" />;
  }
  
  return (
    <>
      <button
        className="p-1.5 rounded-lg hover:shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] dark:hover:bg-gray-800 transition-all ease-in-out duration-200"
        onClick={toggleTheme}
        aria-label="تغییر تم"
      >
        {darkmode ? (
          <GrSun size="30px" className="dark:text-gray-300 " />
        ) : (
          <WiMoonAltWaningCrescent3 size="28px" className="text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </>
  );
};

export default ThemeToggle;
