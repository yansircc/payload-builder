import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    async setupNodeEvents(on, config) {
      // require('cypress-mochawesome-reporter/plugin')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    env: {
      EMAIL: 'qa.pb@yopmail.com',
      PASSWORD: '123',
      hideXhr: true,
    },
  },
})
