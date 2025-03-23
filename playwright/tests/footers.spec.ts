import { test } from '@playwright/test'
import { FootersPage } from '../utils/pages/footers'

test.describe.configure({ mode: 'serial' })

test.describe('Footeras Test Cases', () => {
  let footers: FootersPage

  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(45000)
    footers = new FootersPage(page)
    await page.goto('/admin')
    await footers.goToFooters()
  })

  test('Create a Footer', async () => {
    await footers.createFooter()
  })

  test('Create New Footer', async () => {
    await footers.CreateNewFooter()
  })

  test('Delete the Footer', async () => {
    await footers.deleteFooter()
  })
})
