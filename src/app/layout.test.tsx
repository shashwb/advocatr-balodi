import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";

describe("RootLayout Component", () => {
  test("renders header, main, and footer", () => {
    render(
      <RootLayout testMode={true}>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByText("Advocatr")).toBeInTheDocument();
    // regex for flexibility
    expect(screen.getByText(/Seth Balodi - Advocatr/)).toBeInTheDocument();
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  /** this will fail for now until implemented! */
  //   test("toggles dark mode on button click", () => {
  //     render(
  //       <RootLayout>
  //         <div>Test Content</div>
  //       </RootLayout>
  //     );

  //     const toggleButton = screen.getByText("Toggle Dark Mode");
  //     fireEvent.click(toggleButton);

  //     expect(document.documentElement.classList.contains("dark")).toBe(true);

  //     fireEvent.click(toggleButton);
  //     expect(document.documentElement.classList.contains("dark")).toBe(false);
  //   });
});
