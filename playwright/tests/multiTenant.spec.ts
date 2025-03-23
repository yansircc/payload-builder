import { test } from '@playwright/test'
import { TenantPage } from '../utils/pages/multiTenant'

test.describe.configure({ mode: 'serial' })

test.describe('Multi-Tenant Test Cases', () => {
  let tenant: TenantPage

  test.beforeEach(async ({ page }) => {
    tenant = new TenantPage(page)

    await page.goto('admin')
    await tenant.goToTenants()
  })

  test('Create a Tenant', async () => {
    await tenant.createTenant()
  })

  test('Duplicate the Tenant', async () => {
    await tenant.duplicateTenant()
  })

  test('Delete the Tenant', async () => {
    await tenant.deleteTenant()
  })
})
