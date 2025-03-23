import { expect, type Locator, type Page } from '@playwright/test'
import PopupsData from '../fixtures/PopupsData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class PopupsPage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly PopupsButton: Locator

  // popups Creation
  readonly createPopupsButton: Locator
  readonly PopupName: Locator
  readonly popupTitle: Locator
  readonly popupContent: Locator
  readonly popupsContent: Locator
  readonly publishButton: Locator

  // Duplicate popups
  readonly toastMessage: Locator
  readonly kebabButton: Locator
  readonly duplicatepopupsButton: Locator

  // Delete popups
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
    this.PopupsButton = this.page.locator('#nav-popups')

    // Create popups
    this.createPopupsButton = this.page.getByRole('link', { name: 'Create new Popup' })
    this.PopupName = this.page.getByRole('textbox', { name: 'Name of popup *' })
    this.popupContent = this.page.getByRole('textbox', { name: 'Content *' })
    this.publishButton = this.page.getByRole('button', { name: 'Publish changes' })

    this.popupTitle = this.page.getByRole('textbox', { name: 'Title *' })
    this.popupsContent = this.page.getByRole('textbox').nth(1)

    this.toastMessage = this.page.locator('[class="toast-title"]')

    // Duplicate popups
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.duplicatepopupsButton = this.page.getByRole('button', { name: 'Duplicate' })

    // Delete popups
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

  async goToPopups() {
    await this.selectATenant('Tenant 1')
    await this.PopupsButton.click()
    await expect(this.page).toHaveURL(/.*popups.*/)
  }

  async createPopups() {
    await this.createPopupsButton.click()
    await this.PopupName.fill(PopupsData.popupName)
    await this.popupTitle.fill(PopupsData.popupTitle)
    await this.popupContent.fill(PopupsData.popupContent)
    await this.publishButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.PopupCreationSuccess)
  }

  async duplicatePopups() {
    await this.page.getByRole('link', { name: 'Payload Popup' }).click()
    await this.kebabButton.click()
    await this.duplicatepopupsButton.click()
    // await expect(this.toastMessage).toHaveText(toastMessage.popupsDuplicationSuccess)
    await this.page.waitForTimeout(2000)
  }

  async deletePopups() {
    await this.searchFilter.fill(PopupsData.popupName)
    await expect(this.pagination).toHaveText('1-2 of 2')
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    // await expect(this.toastMessage).toHaveText(toastMessage.PopupDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(PopupsData.popupName)
  }
}
