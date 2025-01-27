import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "./layout";

jest.mock("@/components/Navbar", () => () => <div>Mock Navbar</div>);
jest.mock("@/components/Footer", () => () => <div>Mock Footer</div>);

describe("RootLayout Component", () => {
  test("renders header, main, and footer", () => {
    render(
      <RootLayout testMode={true}>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
