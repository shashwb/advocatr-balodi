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
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    },
    {
      preset: "ts-jest",
      displayName: "dom",
      testMatch: ["<rootDir>/src/**/*.test.tsx"],
      testEnvironment: "jest-environment-jsdom", // Use jsdom for React DOM support
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    },
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
