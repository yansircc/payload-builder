import { expect, type Locator, type Page } from '@playwright/test'
import tenantData from '../fixtures/tenantData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class TenantPage {
  private page: Page
  readonly clearTenant: Locator
  readonly tenantButton: Locator

  // Create Tenant
  readonly createTenantButton: Locator
  readonly tenantName: Locator
  readonly tenantDomain: Locator
  readonly tenantSlug: Locator
  readonly saveButton: Locator
  readonly toastMessage: Locator

  // Duplicate Tenant
  readonly searchFilter: Locator
  readonly tenantCellName: Locator
  readonly tenantCellDomain: Locator
  readonly tenantCellSlug: Locator
  readonly pagination: Locator
  readonly kebabButton: Locator
  readonly duplicateTenantButton: Locator

  // Delete Tenant
  readonly searchResult: Locator
  readonly checkbox: Locator
  readonly deleteButton: Locator
  readonly confirmDeleteDialog: Locator
  readonly confirmDeleteButton: Locator

  readonly allCheckboxButton: Locator

  constructor(page: Page) {
    this.page = page
    this.clearTenant = this.page.locator('.tenant-selector .clear-indicator')
    this.tenantButton = this.page.getByRole('link', { name: 'Tenants', exact: true })

    // Create Tenant
    this.createTenantButton = this.page.getByRole('link', { name: 'Create new Tenant' })
    this.tenantName = this.page.locator('input[id="field-name"]')
    this.tenantDomain = this.page.locator('input[id="field-domain"]')
    this.tenantSlug = this.page.locator('input[id="field-slug"]')
    this.saveButton = this.page.getByRole('button', { name: 'Save' })
    this.toastMessage = this.page.locator('[class="toast-title"]')

    // Duplicate Tenant
    this.searchFilter = this.page.locator('input[id="search-filter-input"]')
    this.pagination = this.page.locator('[class="collection-list__page-info"]')
    this.tenantCellName = this.page.locator('[class="cell-name"]')
    this.tenantCellDomain = this.page.locator('[class="cell-domain"]')
    this.tenantCellSlug = this.page.locator('[class="cell-slug"]')
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.duplicateTenantButton = this.page.getByRole('button', { name: 'Duplicate' })

    // Delete Tenant
    this.searchResult = this.page.locator('tbody > tr[class="row-1"]')
    this.checkbox = this.searchResult.locator('input[type="checkbox"]')
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' })
    this.confirmDeleteDialog = this.page.getByRole('heading', { name: 'Confirm deletion' })
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Confirm' })
    this.allCheckboxButton = this.page.locator('#select-all')
  }

  async goToTenants() {
    await this.tenantButton.click()
    await expect(this.page).toHaveURL(/.*tenants.*/)
    if (await this.clearTenant.elementHandle()) {
      await this.clearTenant.click()
      await this.page.waitForLoadState('networkidle')
    }
    await expect(this.clearTenant).not.toBeVisible()
  }

  async createTenant() {
    await this.createTenantButton.click()
    await this.tenantName.fill(tenantData.name)
    await this.tenantDomain.fill(tenantData.domain)
    await this.tenantSlug.fill(tenantData.slug)
    await this.saveButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.tenantCreationSuccess)
  }

  async duplicateTenant() {
    await this.searchFilter.fill(tenantData.name)
    await this.page.waitForLoadState('networkidle')
    await this.page.waitForLoadState('load')
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.pagination).toHaveText('1-1 of 1')
    await expect(this.tenantCellName).toHaveText(tenantData.name)
    await expect(this.tenantCellDomain).toHaveText(tenantData.domain)
    await expect(this.tenantCellSlug).toHaveText(tenantData.slug)
    await this.tenantCellName.click()
    await this.kebabButton.click()
    await this.duplicateTenantButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.tenantDuplicationSuccess)
  }

  async deleteTenant() {
    await expect(this.page).toHaveURL(/.*tenants.*/)
    await this.searchFilter.fill(tenantData.name)
    await expect(this.pagination).toHaveText('1-2 of 2')
    //await this.checkbox.click()
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.tenantDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(tenantData.name)
  }
}
