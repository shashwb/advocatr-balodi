"use client";

import { useEffect, useState } from "react";

/** components */
import DarkModeToggle from "./DarkModeToggle";
/** css */
import "@/styles/navbar.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  //   initialize dark mode based on user's preferences or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // which browsers would this work on?
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialMode = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDarkMode(initialMode);
    // we make a direct DOM manipulation...is there another way?
    document.documentElement.classList.toggle("dark", initialMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <>
      <header className="p-4 shadow bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* The app title on the left */}
          <h1 className="logo text-2xl font-bold">Advocatr</h1>
          {/* The toggle dark mode button on the right */}
          <DarkModeToggle handleToggle={toggleDarkMode} />
        </div>
      </header>
    </>
  );
};

export default Navbar;
