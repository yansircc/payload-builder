import { loginLocator } from 'cypress/utils/locators/payloadLocator'

Cypress.Commands.add('validateUrl', (endPoint: string): void => {
  cy.url().should('contain', endPoint)
})

Cypress.Commands.add('validateApiEndpoint', (endPoint: string): void => {
  cy.request(`/${endPoint}`).its('status').should('eq', 200)
})

Cypress.Commands.add('login', (email, password): void => {
  cy.get(loginLocator.email).type(email)
  cy.get(loginLocator.password).type(password)
  cy.get(loginLocator.loginButton).should('have.text', 'Login').click()
})

Cypress.Commands.add('toastMsg', (message: string): void => {
  cy.get('[class="toast-title"]').should('contain', message)
})
