import { test } from '@playwright/test'
import { HeaderPage } from 'playwright/utils/pages/headers'

test.describe.configure({ mode: 'serial' })

test.describe('Headers Test Cases', () => {
  let headers: HeaderPage

  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(45000)
    headers = new HeaderPage(page)
    await page.goto('/admin')
    await headers.goToHeaders()
  })

  test('Create a header', async () => {
    await headers.createHeader()
  })

  test('Create New header', async () => {
    await headers.CreateNewHeader()
  })

  test('Delete the header', async () => {
    await headers.deleteHeader()
  })
})
