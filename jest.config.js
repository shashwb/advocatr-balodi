module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use Node.js environment for API tests
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"], // Match test files
};
