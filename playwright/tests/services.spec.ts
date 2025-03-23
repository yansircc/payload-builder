import { test } from '@playwright/test'
import { ServicePage } from '../utils/pages/services'

test.describe.configure({ mode: 'serial' })

test.describe('Services Test Cases', () => {
  let services: ServicePage

  test.beforeEach(async ({ page }) => {
    services = new ServicePage(page)
    await page.goto('/admin')
    await services.goToservices()
  })

  test('Create a service', async () => {
    await services.createservice()
  })

  test('Duplicate the service', async () => {
    await services.duplicateservice()
  })

  test('Delete the service', async () => {
    await services.deleteservice()
  })
})
