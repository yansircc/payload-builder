import { expect, type Locator, type Page } from '@playwright/test'
import postData from '../fixtures/postData.json' assert { type: 'json' }
import toastMessage from '../fixtures/toastMessage.json' assert { type: 'json' }

export class PostPage {
  private page: Page
  readonly tenantSelector: Locator
  readonly tenantContainer: Locator
  readonly selectTenant: (tenantName: string) => Locator
  readonly postButton: Locator

  // Post Creation
  readonly createPostButton: Locator
  readonly postTitle: Locator
  readonly selectHeroImage: Locator
  readonly heroImage: Locator
  readonly postContent: Locator
  readonly publishButton: Locator

  // Duplicate Post
  readonly toastMessage: Locator
  readonly postCellTitle: Locator
  readonly postCellSlug: Locator
  readonly kebabButton: Locator
  readonly duplicatePostButton: Locator

  // Delete Post
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
    this.postButton = this.page.getByRole('link', { name: 'Posts', exact: true })

    // Create Post
    this.createPostButton = this.page.getByRole('link', { name: 'Create new Post' })
    this.postTitle = this.page.locator('input[id="field-title"]')
    this.selectHeroImage = this.page.locator('.btn__label', { hasText: 'Choose from existing' })
    this.heroImage = this.page.getByRole('button', { name: 'image-hero1.webp image-hero1.' })
    this.postContent = this.page.getByRole('textbox').nth(1)
    this.publishButton = this.page.getByRole('button', { name: 'Publish changes' })
    this.toastMessage = this.page.locator('[class="toast-title"]')

    // Duplicate Post
    this.postCellTitle = this.page.locator('[class="cell-title"]')
    this.postCellSlug = this.page.locator('[class="cell-slug"]')
    this.kebabButton = this.page.locator('[class="doc-controls__dots"]')
    this.duplicatePostButton = this.page.getByRole('button', { name: 'Duplicate' })

    // Delete Post
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

  async goToPosts() {
    await this.selectATenant('Tenant 1')
    await this.postButton.click()
    await expect(this.page).toHaveURL(/.*posts.*/)
  }

  async createPost() {
    await this.createPostButton.click()
    await this.postTitle.fill(postData.postTitle)
    await this.selectHeroImage.click()
    await this.heroImage.click()
    await this.postContent.fill(postData.postContent)
    await this.publishButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.postCreationSuccess)
  }

  async duplicatePost() {
    await this.searchFilter.fill(postData.postTitle)
    await expect(this.pagination).toHaveText('1-1 of 1')
    await expect(this.postCellTitle).toHaveText(postData.postTitle)
    await expect(this.postCellSlug).toHaveText(
      postData.postTitle.toLowerCase().replace(/\s+/g, '-'),
    )

    await this.postCellTitle.click()
    await expect(this.postContent).toHaveText(postData.postContent)
    await this.kebabButton.click()
    await this.duplicatePostButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.PostDuplicationSuccess)
    await this.page.waitForTimeout(2000)
  }

  async deletePost() {
    await this.searchFilter.fill(postData.postTitle)
    await expect(this.pagination).toHaveText('1-2 of 2')
    await this.allCheckboxButton.click()
    await this.deleteButton.click()
    await expect(this.confirmDeleteDialog).toBeVisible()
    await this.confirmDeleteButton.click()
    await expect(this.toastMessage).toHaveText(toastMessage.postDeletionSuccess)
    await expect(this.page.locator('body')).not.toHaveText(postData.postTitle)
  }
}
