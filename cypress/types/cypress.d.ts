declare namespace Cypress {
  interface Chainable {
    validateUrl(endPoint: string): Chainable<void>
    validateApiEndpoint(endPoint: string): Chainable<void>
    login(email: string, password: string): Chainable<void>
    toastMsg(message: string): Chainable<void>
  }
}
