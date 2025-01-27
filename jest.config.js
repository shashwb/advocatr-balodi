module.exports = {
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "node",
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(css|less|scss|sass)$": "jest-transform-stub",
      },
      transformIgnorePatterns: ["<rootDir>/node_modules/"],
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Use a different setup file for Node environment
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    },
    {
      preset: "ts-jest",
      displayName: "dom",
      testMatch: ["<rootDir>/src/**/*.test.tsx"],
      testEnvironment: "jest-environment-jsdom",
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(css|less|scss|sass)$": "jest-transform-stub",
      },
      transformIgnorePatterns: ["<rootDir>/node_modules/"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    },
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = {
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "node",
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(css|less|scss|sass)$": "jest-transform-stub",
      },
      transformIgnorePatterns: ["<rootDir>/node_modules/"],
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Use a different setup file for Node environment
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    },
    {
      preset: "ts-jest",
      displayName: "dom",
      testMatch: ["<rootDir>/src/**/*.test.tsx"],
      testEnvironment: "jest-environment-jsdom",
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(css|less|scss|sass)$": "jest-transform-stub",
      },
      transformIgnorePatterns: ["<rootDir>/node_modules/"],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    },
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
