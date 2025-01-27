// module.exports = {
//   projects: [
//     {
//       // endpoint tests
//       preset: "ts-jest",
//       testEnvironment: "node", // Use Node.js environment for API tests
//       transform: {
//         "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
//       },
//       moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//       testMatch: ["<rootDir>/src/**/*.test.ts"],
//       moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//       },
//       setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//       testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//     },
//     {
//       preset: "ts-jest",
//       displayName: "dom",
//       testMatch: ["<rootDir>/src/**/*.test.tsx"],
//       testEnvironment: "jest-environment-jsdom", // Use jsdom for React DOM support
//       moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//         "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
//       },
//       setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//       testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//     },
//   ],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
// };

// module.exports = {
//   projects: [
//     {
//       preset: "ts-jest",
//       testEnvironment: "node",
//       transform: {
//         "^.+\\.(ts|tsx)$": "ts-jest",
//       },
//       moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//       testMatch: ["<rootDir>/src/**/*.test.ts"],
//       moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//       },
//       setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//       testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//     },
//     {
//       preset: "ts-jest",
//       displayName: "dom",
//       testMatch: ["<rootDir>/src/**/*.test.tsx"],
//       testEnvironment: "jest-environment-jsdom",
//       moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//         "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//       },
//       setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//       testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//     },
//   ],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
// };

// module.exports = {
//   projects: [
//     {
//       preset: "ts-jest",
//       testEnvironment: "node",
//       transform: {
//         "^.+\\.(ts|tsx)$": "ts-jest",
//         "^.+\\.(css|less|scss|sass)$": "jest-transform-stub", // Add this line
//       },
//       transformIgnorePatterns: ["<rootDir>/node_modules/"], // Ensure this line is present
//       moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//       testMatch: ["<rootDir>/src/**/*.test.ts"],
//       moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//       },
//       setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//       testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//     },
//     {
//       preset: "ts-jest",
//       displayName: "dom",
//       testMatch: ["<rootDir>/src/**/*.test.tsx"],
//       testEnvironment: "jest-environment-jsdom",
//       transform: {
//         "^.+\\.(ts|tsx)$": "ts-jest",
//         "^.+\\.(css|less|scss|sass)$": "jest-transform-stub", // Add this line
//       },
//       transformIgnorePatterns: ["<rootDir>/node_modules/"], // Ensure this line is present
//       moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//         "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//       },
//       setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//       testPathIgnorePatterns: ["/node_modules/", "/.next/"],
//     },
//   ],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
// };

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
