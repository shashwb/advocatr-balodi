"use client";

import { useEffect, useState } from "react";

/** components */
import DarkModeToggle from "./DarkModeToggle";
/** css */
import "@/styles/navbar.css";

/**
 * A functional component that renders a simple Navbra element.
 *
 * @returns A JSX.Element representing the navbar element.
 */
const Navbar = (): JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDarkTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme);
  }, []);

  const toggleDarkTheme = (): void => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <header className="py-4 shadow bg-white">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <h1 className="logo text-4xl font-bold">Advocatr</h1>
        <DarkModeToggle handleToggle={toggleDarkTheme} />
      </div>
    </header>
  );
};

export default Navbar;
