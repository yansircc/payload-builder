import { expect, type Locator, type Page } from '@playwright/test'
import servicesData from '../fixtures/servicesData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class ServicePage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly servicesbutton: Locator

  // services Creation
  readonly createserviceButton: Locator
  readonly serviceTitle: Locator
  readonly selectHeroImage: Locator
  readonly heroImage: Locator
  readonly serviceShortDescription: Locator
  readonly serviceimage: Locator
  readonly selectserviceimage: Locator
  readonly seoButton: Locator
  readonly seoTitle: Locator
  readonly seoMetaImage: Locator
  readonly selectSeoMetaImage: Locator
  readonly seoDescription: Locator
  readonly publishButton: Locator
  readonly toastMessage: Locator

  // Duplicate service
  readonly serviceCellTitle: Locator
  readonly serviceCellSlug: Locator
  readonly kebabButton: Locator
  readonly duplicateserviceButton: Locator

  // Delete service
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
    this.servicesbutton = this.page.locator('#nav-services')

    // Create service
    this.createserviceButton = this.page.getByRole('link', {
      name: 'Create new service',
    })
    this.serviceTitle = this.page.locator('input[id="field-title"]')
    this.selectHeroImage = this.page
      .locator('.btn__label', { hasText: 'Choose from existing' })
      .nth(0)
    this.heroImage = this.page.locator('tr[class="row-1"]').locator('.file__filename')
    this.serviceShortDescription = this.page
      .locator('[class="LexicalEditorTheme__paragraph"]')
      .first()
    this.serviceimage = this.page
      .locator('#field-serviceImages')
      .getByRole('button', { name: 'Choose from existing' })

    this.selectserviceimage = this.page.locator('[class="file__filename"]').nth(0)
    this.seoButton = this.page.getByRole('button', { name: 'SEO' })
    this.seoTitle = this.page.getByRole('textbox', { name: 'Title', exact: true })
    this.seoMetaImage = this.page.getByRole('button', { name: 'Choose from existing' })
    this.selectSeoMetaImage = this.page.locator('[class="file__filename"]').nth(1)
    this.seoDescription = this.page.getByRole('textbox', { name: 'Description' })
    this.publishButton = this.page.getByRole('button', { name: 'Publish changes' })
    this.toastMessage = this.page.locator('[class="toast-title"]')

    // // Duplicate service
    this.serviceCellTitle = this.page.locator('[class="cell-title"]')
    this.serviceCellSlug = this.page.locator('[class="cell-slug"]')
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.duplicateserviceButton = this.page.getByRole('button', { name: 'Duplicate' })

    // // Delete service
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

  async goToservices() {
    await this.selectATenant('Tenant 1')
    await this.servicesbutton.click()
    await expect(this.page).toHaveURL(/.*services.*/)
  }

  async createservice() {
    await this.createserviceButton.click()
    await this.serviceTitle.fill(servicesData.serviceTitle)
    await this.selectHeroImage.click()
    await this.heroImage.click()
    await this.serviceShortDescription.fill(servicesData.serviceShortDescription)
    await this.serviceimage.click()
    await this.selectserviceimage.click()
    await this.seoButton.click()
    await this.seoTitle.fill(servicesData.seoTitle)
    await this.seoMetaImage.click()
    await this.selectSeoMetaImage.click()
    await this.seoDescription.fill(servicesData.seoDescription)
    await this.publishButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.serviceCreationSuccess)
  }

  async duplicateservice() {
    await this.searchFilter.fill(servicesData.serviceTitle)
    await expect(this.pagination).toHaveText('1-1 of 1')
    await expect(this.serviceCellTitle).toHaveText(servicesData.serviceTitle)
    await expect(this.serviceCellSlug).toHaveText(
      servicesData.serviceTitle.toLowerCase().replace(/\s+/g, '-'),
    )
    await this.serviceCellTitle.click()
    await this.kebabButton.click()
    await this.duplicateserviceButton.click()
    await this.page.waitForTimeout(2000)
  }

  async deleteservice() {
    await this.searchFilter.fill(servicesData.serviceTitle)
    await expect(this.pagination).toHaveText('1-2 of 2')
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.serviceDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(servicesData.serviceTitle)
  }
}
