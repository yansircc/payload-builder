import { defineConfig } from 'cypress'
import { email } from 'node_modules/payload/dist/fields/validations'

export default defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    env: {
      EMAIL: 'qa.pb@yopmail.com',
      PASSWORD: '123',
      hideXhr: true,
    },
  },
})
