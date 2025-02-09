import tenant from '../../fixtures/tenant.json'
import { multiTenantLocator } from '../locators/payloadLocator'

export class multiTenantPage {
  static goToTenants(): void {
    cy.get(multiTenantLocator.tenantButton).should('be.visible').click()
    cy.validateUrl('/tenants')
  }
  static createTenant(): void {
    cy.get(multiTenantLocator.createTenantBtn).should('be.visible').click()
    cy.get(multiTenantLocator.tenantName).type(tenant.name)
    cy.get(multiTenantLocator.tenantDomain).type(tenant.domain)
    cy.get(multiTenantLocator.tenantSlug).type(tenant.slug)
    cy.get(multiTenantLocator.tenantSaveBtn).should('be.visible').click()
    cy.toastMsg('Tenant successfully created.')
  }
  static searchAndVerifyTenant(): void {
    cy.get(multiTenantLocator.tenantButton).should('be.visible').click()
    cy.url().should('not.contain', '/create')
    cy.get(multiTenantLocator.searchFilter).type('John')
    cy.get(multiTenantLocator.searchedData)
      .should('be.visible')
      .then(($el): void => {
        cy.wrap($el).find(multiTenantLocator.searchedName).should('contain', tenant.name)
        cy.wrap($el).find(multiTenantLocator.searchedDomain).should('contain', tenant.domain)
        cy.wrap($el).find(multiTenantLocator.searchedSlug).should('contain', tenant.slug)
      })
  }
  static deleteTenant(): void {
    cy.get(multiTenantLocator.searchedData)
      .should('be.visible')
      .then(($el): void => {
        cy.wrap($el).find(multiTenantLocator.selectCheckBox).click()
      })
    cy.contains('button', 'Delete').should('be.visible').click()
    cy.get(multiTenantLocator.confirmDeleteBtn).should('be.visible').click()
    cy.toastMsg('Deleted 1 Tenant successfully.')
  }
}
