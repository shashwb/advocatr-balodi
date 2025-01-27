module.exports = {
  projects: [
    {
      // endpoint tests
      preset: "ts-jest",
      testEnvironment: "node", // Use Node.js environment for API tests
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
      },
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      // testMatch: ["**/?(*.)+(test).[jt]s?(x)"], // Match test files
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    },
    {
      preset: "ts-jest",
      // page tests
      displayName: "dom",
      testMatch: ["<rootDir>/src/**/*.test.tsx"],
      // testEnvironment: "jsdom",
      testEnvironment: "jest-environment-jsdom", // Use jsdom for React DOM support
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    },
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // preset: "ts-jest",
  // testEnvironment: "node", // Use Node.js environment for API tests
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
  // },
  // moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // testMatch: ["**/?(*.)+(test).[jt]s?(x)"], // Match test files
  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/src/$1",
  // },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
