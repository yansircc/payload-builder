import { multiTenantPage } from '../utils/pages/multiTenantPage'

describe('Payload Builder Test Suite', (): void => {
  beforeEach('Before every test run', (): void => {
    cy.visit('/admin')
    cy.validateUrl('admin')
    cy.validateApiEndpoint('admin')
    cy.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
  })

  it('Verifying Multi-Tenant Functionality', (): void => {
    multiTenantPage.goToTenants()
    multiTenantPage.createTenant()
    multiTenantPage.searchAndVerifyTenant()
    multiTenantPage.deleteTenant()
  })
})
