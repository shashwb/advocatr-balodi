require("@testing-library/jest-dom");
require("whatwg-fetch");

// Mock next/font/google globally
jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "mocked-inter-font" }),
}));

// // Mock window.matchMedia
// Object.defineProperty(window, "matchMedia", {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// });
