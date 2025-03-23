import { test } from '@playwright/test'
import { PopupPage } from '../utils/pages/popup'

test.describe.configure({ mode: 'serial' })

test.describe('Popups Test Cases', () => {
  let popup: PopupPage

  test.beforeEach(async ({ page }) => {
    popup = new PopupPage(page)
    await page.goto('admin')
    await popup.goTopopup()
  })

  test('Create a Popup', async () => {
    await popup.createpopup()
  })

  test('Duplicate the Popup', async () => {
    await popup.duplicatepopup()
  })

  test('Delete the Popup', async () => {
    await popup.deletepopup()
  })
})
