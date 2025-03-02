import { expect, type Locator, type Page } from '@playwright/test'
import tenant from '../fixtures/tenant.json' assert { type: 'json' }
import toastMsg from '../fixtures/toastMessage.json' assert { type: 'json' }

export class TenantPage {
  readonly page: Page
  readonly tenantButton: Locator
  readonly createTenantButton: Locator
  readonly tenantName: Locator
  readonly tenantDomain: Locator
  readonly tenantSlug: Locator
  readonly saveButton: Locator
  readonly toastMessage: Locator
  readonly searchFilter: Locator
  readonly searchResult: Locator
  readonly checkbox: Locator
  readonly tenantCellName: Locator
  readonly tenantCellDomain: Locator
  readonly tenantCellSlug: Locator
  readonly pagination: Locator
  readonly deleteButton: Locator
  readonly confirmDeleteDialog: Locator
  readonly confirmDeleteButton: Locator
  readonly kebabButton: Locator
  readonly duplicateTenantButton: Locator
  readonly allCheckboxButton: Locator

  constructor(page: Page) {
    this.page = page
    this.tenantButton = page.getByRole('link', { name: 'Tenants', exact: true })
    this.createTenantButton = page.getByRole('link', { name: 'Create new Tenant' })
    this.tenantName = page.locator('input[id="field-name"]')
    this.tenantDomain = page.locator('input[id="field-domain"]')
    this.tenantSlug = page.locator('input[id="field-slug"]')
    this.saveButton = page.getByRole('button', { name: 'Save' })
    this.toastMessage = page.locator('[class="toast-title"]')
    this.searchFilter = page.locator('input[id="search-filter-input"]')
    this.searchResult = page.locator('tbody > tr[class="row-1"]')
    this.checkbox = this.searchResult.locator('input[type="checkbox"]')
    this.tenantCellName = page.locator('[class="cell-name"]')
    this.tenantCellDomain = page.locator('[class="cell-domain"]')
    this.tenantCellSlug = page.locator('[class="cell-slug"]')
    this.pagination = page.locator('[class="collection-list__page-info"]')
    this.deleteButton = page.getByRole('button', { name: 'Delete' })
    this.confirmDeleteDialog = page.getByRole('heading', { name: 'Confirm deletion' })
    this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm' })
    this.kebabButton = page.locator('[class="doc-controls__dots"]')
    this.duplicateTenantButton = page.getByRole('button', { name: 'Duplicate' })
    this.allCheckboxButton = page.locator('#select-all')
  }

  async goToTenants() {
    await this.tenantButton.click()
  }
  async createTenant() {
    await this.goToTenants()
    await expect(this.page).toHaveURL(/.*tenants.*/)
    await this.createTenantButton.click()
    await this.tenantName.fill(tenant.name)
    await this.tenantDomain.fill(tenant.domain)
    await this.tenantSlug.fill(tenant.slug)
    await this.saveButton.click()
    await expect(this.toastMessage).toHaveText(toastMsg.tenantCreationSuccess)
  }

  async duplicateTenant() {
    await this.goToTenants()
    await expect(this.page).toHaveURL(/.*tenants.*/)
    await this.searchFilter.fill(tenant.name)
    await expect(this.pagination).toHaveText('1-1 of 1')
    await expect(this.tenantCellName).toHaveText(tenant.name)
    await expect(this.tenantCellDomain).toHaveText(tenant.domain)
    await expect(this.tenantCellSlug).toHaveText(tenant.slug)
    await this.tenantCellName.click()
    await this.kebabButton.click()
    await this.duplicateTenantButton.click()
    await expect(this.toastMessage).toHaveText(toastMsg.tenantDuplicationSuccess)
  }

  async deleteTenant() {
    await this.goToTenants()
    await expect(this.page).toHaveURL(/.*tenants.*/)
    await this.searchFilter.fill(tenant.name)
    await expect(this.pagination).toHaveText('1-2 of 2')
    //await this.checkbox.click()
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMsg.tenantDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(tenant.name)
  }
}
