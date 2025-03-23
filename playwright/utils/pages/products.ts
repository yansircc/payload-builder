import { expect, type Locator, type Page } from '@playwright/test'
import productsData from '../fixtures/productsData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class ProductPage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly productsbutton: Locator

  // Products Creation
  readonly createProductButton: Locator
  readonly productTitle: Locator
  readonly selectHeroImage: Locator
  readonly heroImage: Locator
  readonly productShortDescription: Locator
  readonly productimage: Locator
  readonly selectproductimage: Locator
  readonly seoButton: Locator
  readonly seoTitle: Locator
  readonly seoMetaImage: Locator
  readonly selectSeoMetaImage: Locator
  readonly seoDescription: Locator
  readonly publishButton: Locator
  readonly toastMessage: Locator

  // Duplicate Product
  readonly productCellTitle: Locator
  readonly productCellSlug: Locator
  readonly kebabButton: Locator
  readonly duplicateproductButton: Locator

  // Delete product
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
    this.productsbutton = this.page.locator('#nav-products')

    // Create Product
    this.createProductButton = this.page.getByRole('link', {
      name: 'Create new Product',
    })
    this.productTitle = this.page.locator('input[id="field-title"]')
    this.selectHeroImage = this.page
      .locator('.btn__label', { hasText: 'Choose from existing' })
      .nth(0)
    this.heroImage = this.page.locator('tr[class="row-1"]').locator('.file__filename')
    this.productShortDescription = this.page
      .locator('[class="LexicalEditorTheme__paragraph"]')
      .first()
    this.productimage = this.page
      .locator('#field-productImages')
      .getByRole('button', { name: 'Choose from existing' })

    this.selectproductimage = this.page.locator('[class="file__filename"]').nth(0)
    this.seoButton = this.page.getByRole('button', { name: 'SEO' })
    this.seoTitle = this.page.getByRole('textbox', { name: 'Title', exact: true })
    this.seoMetaImage = this.page.getByRole('button', { name: 'Choose from existing' })
    this.selectSeoMetaImage = this.page.locator('[class="file__filename"]').nth(1)
    this.seoDescription = this.page.getByRole('textbox', { name: 'Description' })
    this.publishButton = this.page.getByRole('button', { name: 'Publish changes' })
    this.toastMessage = this.page.locator('[class="toast-title"]')

    // // Duplicate Product
    this.productCellTitle = this.page.locator('[class="cell-title"]')
    this.productCellSlug = this.page.locator('[class="cell-slug"]')
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.duplicateproductButton = this.page.getByRole('button', { name: 'Duplicate' })

    // // Delete Product
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

  async goToProducts() {
    await this.selectATenant('Tenant 1')
    await this.productsbutton.click()
    await expect(this.page).toHaveURL(/.*products.*/)
  }

  async createProduct() {
    await this.createProductButton.click()
    await this.productTitle.fill(productsData.productTitle)
    await this.selectHeroImage.click()
    await this.heroImage.click()
    await this.productShortDescription.fill(productsData.productShortDescription)
    await this.productimage.click()
    await this.selectproductimage.click()
    await this.seoButton.click()
    await this.seoTitle.fill(productsData.seoTitle)
    await this.seoMetaImage.click()
    await this.selectSeoMetaImage.click()
    await this.seoDescription.fill(productsData.seoDescription)
    await this.publishButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.productCreationSuccess)
  }

  async duplicateProduct() {
    await this.searchFilter.fill(productsData.productTitle)
    await expect(this.pagination).toHaveText('1-1 of 1')
    await expect(this.productCellTitle).toHaveText(productsData.productTitle)
    await expect(this.productCellSlug).toHaveText(
      productsData.productTitle.toLowerCase().replace(/\s+/g, '-'),
    )
    await this.productCellTitle.click()
    await this.kebabButton.click()
    await this.duplicateproductButton.click()
    await this.page.waitForTimeout(2000)
  }

  async deleteProduct() {
    await this.searchFilter.fill(productsData.productTitle)
    await expect(this.pagination).toHaveText('1-2 of 2')
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.productDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(productsData.productTitle)
  }
}
