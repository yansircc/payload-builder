import './commands'
import 'cypress-plugin-xhr-toggle' // Importing the plugin to hide xhr requests in the cypress runner in UI mode
import 'cypress-mochawesome-reporter/register' // Importing the mochawesome reporter

Cypress.on('uncaught:exception', (_err, _runnable): false => {
  cy.log(String(_err))
  return false
})
