import path from 'path'
import { fileURLToPath } from 'url'
import { test as setup } from '@playwright/test'
import { AuthPage } from '../utils/pages/auth'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const authFile = path.join(__dirname, '../.auth/user.json')

setup('authenticate', async ({ page }) => {
  const auth = new AuthPage(page)
  await page.goto('admin')
  await auth.logIn()
  await page.context().storageState({ path: authFile })
})
