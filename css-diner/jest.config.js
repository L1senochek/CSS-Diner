module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  }
};
