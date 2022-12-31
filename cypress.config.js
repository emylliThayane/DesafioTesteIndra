const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ot8g5x',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "cypress-mochawesome-reporter",
    "chromeWebSecurity":false,
    baseUrl:'https://opensource-demo.orangehrmlive.com/',
    defaultCommandTimeout: 100000
  },
});
