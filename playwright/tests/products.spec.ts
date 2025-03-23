import { test } from '@playwright/test'
import { ProductPage } from '../utils/pages/products'

test.describe.configure({ mode: 'serial' })

test.describe('Products Test Cases', () => {
  let products: ProductPage

  test.beforeEach(async ({ page }) => {
    products = new ProductPage(page)
    await page.goto('/admin')
    await products.goToProducts()
  })

  test('Create a Product', async () => {
    await products.createProduct()
  })

  test('Duplicate the Product', async () => {
    await products.duplicateProduct()
  })

  test('Delete the Product', async () => {
    await products.deleteProduct()
  })
})
