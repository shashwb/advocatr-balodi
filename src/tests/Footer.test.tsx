import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/components/Footer";

describe("Footer Component", () => {
  test("renders footer content", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Seth Balodi - Advocatr`)
    ).toBeInTheDocument();
  });
});
