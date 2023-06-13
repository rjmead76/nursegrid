const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    // excludeSpecPattern: 'cypress/e2e/other/*.js',
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
      runMode: 0,
      openMode: 1,
    },
  },
});
