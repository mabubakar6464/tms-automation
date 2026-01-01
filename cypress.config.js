require('dotenv').config();
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://tms-dev.spotter.ai/',
    watchForFileChanges: false,
    // video: true
  },
  env: {
    validUsername: process.env.USERNAME_DEV,
    validPassword: process.env.PASSWORD_DEV,
  }
};
