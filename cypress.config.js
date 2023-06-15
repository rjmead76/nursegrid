const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '6yrkqj',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    baseUrl: 'https://web-dev.nursegrid.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    video: false,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: {
      runMode: 1,
      openMode: 1,
    },
  },
  env: {
    email: 'nursegrid.automation@gmail.com',
    password:
      '3199599d6157d8abf5ad3ba59e2641f2a6a9573cced7333e79618e7e4c92981b',
    tokenRequestUrl: 'https://app-dev.nursegrid.com/auth/password',
  },
});
