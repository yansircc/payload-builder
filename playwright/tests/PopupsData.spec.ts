import { test } from '@playwright/test'
import { PopupsPage } from '../utils/pages/Popups'

test.describe.configure({ mode: 'serial' })

test.describe('Popups Test Cases', () => {
  let Popups: PopupsPage

  test.beforeEach(async ({ page }) => {
    Popups = new PopupsPage(page)
    await page.goto('admin')
    await Popups.goToPopups()
  })

  test('Create a Popup', async () => {
    await Popups.createPopups()
  })

  test('Duplicate the Popup', async () => {
    await Popups.duplicatePopups()
  })

  test('Delete the Popup', async () => {
    await Popups.deletePopups()
  })
})
