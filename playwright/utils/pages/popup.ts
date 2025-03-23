import { expect, type Locator, type Page } from '@playwright/test'
import popupData from '../fixtures/popupsData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class PopupPage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly popupButton: Locator

  // popup Creation
  readonly createpopupButton: Locator
  readonly PopupName: Locator
  readonly popupTitle: Locator
  readonly popupContent: Locator
  readonly publishButton: Locator

  // Duplicate popup
  readonly toastMessage: Locator
  readonly kebabButton: Locator
  readonly duplicatepopupButton: Locator

  // Delete popup
  readonly deleteButton: Locator
  readonly confirmDeleteDialog: Locator
  readonly confirmDeleteButton: Locator
  readonly searchFilter: Locator
  readonly pagination: Locator
  readonly allCheckboxButton: Locator

  constructor(page: Page) {
    this.page = page
    this.tenantSelector = this.page.locator('[class="tenant-selector"]')
    this.tenantContainer = this.page.locator('[class="value-container"]')
    this.selectTenant = (tenantName: string) => this.page.getByRole('option', { name: tenantName })
    this.popupButton = this.page.locator('#nav-popups')

    // Create popup
    this.createpopupButton = this.page.getByRole('link', { name: 'Create new Popup' })
    this.PopupName = this.page.getByRole('textbox', { name: 'Name of popup *' })
    this.popupContent = this.page.getByRole('textbox', { name: 'Content *' })
    this.publishButton = this.page.getByRole('button', { name: 'Publish changes' })

    this.popupTitle = this.page.getByRole('textbox', { name: 'Title *' })

    this.toastMessage = this.page.locator('[class="toast-title"]')

    // Duplicate popup
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.duplicatepopupButton = this.page.getByRole('button', { name: 'Duplicate' })

    // Delete popup
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' })
    this.confirmDeleteDialog = this.page.getByRole('heading', { name: 'Confirm deletion' })
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Confirm' })
    this.searchFilter = this.page.locator('input[id="search-filter-input"]')
    this.pagination = this.page.locator('[class="collection-list__page-info"]')
    this.allCheckboxButton = this.page.locator('#select-all')
  }

  async selectATenant(tenantName: string) {
    await this.tenantSelector.filter({ has: this.tenantContainer }).click()
    await this.selectTenant(tenantName).click()
  }

  async goTopopup() {
    await this.selectATenant('Tenant 1')
    await this.popupButton.click()
    await expect(this.page).toHaveURL(/.*popup.*/)
  }

  async createpopup() {
    await this.createpopupButton.click()
    await this.PopupName.fill(popupData.popupName)
    await this.popupTitle.fill(popupData.popupTitle)
    await this.popupContent.fill(popupData.popupContent)
    await this.publishButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.popupCreationSuccess)
  }

  async duplicatepopup() {
    await this.page.getByRole('link', { name: 'Payload Popup' }).click()
    await this.kebabButton.click()
    await this.duplicatepopupButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.popupDuplicationSuccess)
    await this.page.waitForTimeout(2000)
  }

  async deletepopup() {
    await this.searchFilter.fill(popupData.popupName)
    await expect(this.pagination).toHaveText('1-2 of 2')
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.popupDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(popupData.popupName)
  }
}
