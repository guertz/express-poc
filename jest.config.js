module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    "reflect-metadata",
    "dotenv/config"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ]
};