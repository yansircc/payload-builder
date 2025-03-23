import { expect, type Locator, type Page } from '@playwright/test'
import footersData from '../fixtures/footersData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class FootersPage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly footerButton: Locator

  // Footer Creation
  readonly selectLogoImage: Locator
  readonly heroImage: Locator
  readonly headerTitle: Locator
  readonly saveFooters: Locator
  readonly createNew: Locator
  readonly toastMessage: Locator

  // Create New Footer

  readonly kebabButton: Locator

  // Delete footer
  readonly deleteButton: Locator
  readonly confirmDeleteDialog: Locator
  readonly confirmDeleteButton: Locator

  constructor(page: Page) {
    this.page = page
    this.tenantSelector = this.page.locator('[class="tenant-selector"]')
    this.tenantContainer = this.page.locator('[class="value-container"]')
    this.selectTenant = (tenantName: string) => this.page.getByRole('option', { name: tenantName })
    this.footerButton = this.page.locator('#nav-footer')

    // Create Footer
    this.selectLogoImage = this.page.locator('.btn__label', { hasText: 'Choose from existing' })
    this.heroImage = this.page.locator('tr[class="row-1"]').locator('.file__filename')
    this.headerTitle = this.page.getByRole('textbox', { name: 'Title *' })
    this.saveFooters = this.page.locator('#action-save')
    this.toastMessage = this.page.locator('[class="toast-title"]')

    // Create NewFooter
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.createNew = this.page.locator('#action-create')

    // Delete Footer
    this.deleteButton = this.page.locator('#action-delete')
    this.confirmDeleteDialog = this.page.getByRole('heading', { name: 'Confirm deletion' })
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Confirm' })
  }

  async selectATenant(tenantName: string) {
    await this.tenantSelector.filter({ has: this.tenantContainer }).click()
    await this.selectTenant(tenantName).click()
  }

  async goToFooters() {
    await this.selectATenant('Tenant 1')
    await this.footerButton.click()
    await expect(this.page).toHaveURL(/.*footer.*/)
  }

  async createFooter() {
    await this.selectLogoImage.click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForTimeout(1000)
    await this.heroImage.click()
    await this.page.waitForLoadState('networkidle')
    await this.headerTitle.fill(footersData.footerTitle)
    await this.saveFooters.click()
    await expect(this.toastMessage).toHaveText(toastMessage.footerCreationSuccess)
  }

  async CreateNewFooter() {
    await this.kebabButton.click()
    await this.createNew.click()
    await this.headerTitle.fill(footersData.CreateNewTilte)
    await this.saveFooters.click()
    await expect(this.toastMessage).toHaveText(toastMessage.footerUpdationSuccess)
  }

  async deleteFooter() {
    await this.kebabButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.footerDeletionSuccess)
  }
}
