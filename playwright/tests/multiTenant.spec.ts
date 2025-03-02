import { test } from '@playwright/test'
import { TenantPage } from 'playwright/utils/pages/multiTenant'
import userData from '../utils/fixtures/userData.json' assert { type: 'json' }
import { LoginPage } from '../utils/pages/login'

test.describe.configure({ mode: 'serial' })

test.describe('Multi-Tenant Test Cases', () => {
  let tenant: TenantPage

  test.beforeEach(async ({ page }) => {
    const logIn = new LoginPage(page)
    tenant = new TenantPage(page)

    await page.goto('admin')
    await logIn.logIn(userData.email, userData.password)
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
