import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/components/Navbar";

describe("Navbar Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  test("renders app title and buttons", () => {
    render(<Navbar />);
    expect(screen.getByText("Advocatr")).toBeInTheDocument();
    expect(screen.getByText("Toggle Dark Mode")).toBeInTheDocument();
  });

  test("toggles dark mode on button click", () => {
    render(<Navbar />);
    const toggleButton = screen.getByText("Toggle Dark Mode");

    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
