require("@testing-library/jest-dom");
require("whatwg-fetch");

// Mock next/font/google globally
jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "mocked-inter-font" }),
}));
