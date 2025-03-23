import { expect, type Locator, type Page } from '@playwright/test'
import headerData from '../fixtures/headersData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class HeaderPage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly headerButton: Locator

  // Products Creation
  readonly selectHeroImage: Locator
  readonly heroImage: Locator
  readonly uploadImageField: Locator
  readonly headerTitle: Locator
  readonly saveHeader: Locator
  readonly createNew: Locator
  readonly toastMessage: Locator

  // Duplicate Product

  readonly kebabButton: Locator

  // Delete product
  readonly deleteButton: Locator
  readonly confirmDeleteDialog: Locator
  readonly confirmDeleteButton: Locator

  constructor(page: Page) {
    this.page = page
    this.tenantSelector = this.page.locator('[class="tenant-selector"]')
    this.tenantContainer = this.page.locator('[class="value-container"]')
    this.selectTenant = (tenantName: string) => this.page.getByRole('option', { name: tenantName })
    this.headerButton = this.page.locator('#nav-header')

    // Create header
    this.selectHeroImage = this.page.locator('.btn__label', { hasText: 'Choose from existing' })
    this.heroImage = this.page.locator('tr[class="row-1"]').locator('.file__filename')
    this.uploadImageField = this.page.locator('[class="upload__dropzoneAndUpload"]')
    this.headerTitle = this.page.getByRole('textbox', { name: 'Title *' })
    this.saveHeader = this.page.locator('#action-save')
    this.toastMessage = this.page.locator('[class="toast-title"]')

    // Create NewHeader
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.createNew = this.page.locator('#action-create')

    // Delete Header
    this.deleteButton = this.page.locator('#action-delete')
    this.confirmDeleteDialog = this.page.getByRole('heading', { name: 'Confirm deletion' })
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Confirm' })
  }

  async selectATenant(tenantName: string) {
    await this.tenantSelector.filter({ has: this.tenantContainer }).click()
    await this.selectTenant(tenantName).click()
  }

  async goToHeaders() {
    await this.selectATenant('Tenant 1')
    await this.headerButton.click()
    await expect(this.page).toHaveURL(/.*header.*/)
  }

  async createHeader() {
    await this.selectHeroImage.click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForTimeout(1000)
    await this.heroImage.isVisible()
    const imageName = await this.heroImage.textContent()
    await this.heroImage.click()

    await this.page.waitForLoadState('domcontentloaded')
    if (imageName) {
      await expect(this.uploadImageField).toContainText(imageName)
    }
    await this.page.waitForLoadState()
    await this.headerTitle.fill(headerData.headerTitle)
    await this.saveHeader.click()
    await expect(this.toastMessage).toHaveText(toastMessage.headerCreationSuccess)
  }

  async CreateNewHeader() {
    await this.kebabButton.click()
    await this.createNew.click()
    await this.headerTitle.fill(headerData.CreateNewTilte)
    await this.saveHeader.click()
    await expect(this.toastMessage).toHaveText(toastMessage.headerUpdationSuccess)
  }

  async deleteHeader() {
    await this.kebabButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.headerDeletionSuccess)
  }
}
