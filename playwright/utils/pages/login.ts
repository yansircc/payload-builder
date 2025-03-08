import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
  private page: Page
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly loginButton: Locator
  readonly welcomeMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = this.page.locator('input[id="field-email"]')
    this.passwordField = this.page.locator('input[id="field-password"]')
    this.loginButton = this.page.locator('button[type="submit"]')
    this.welcomeMessage = this.page.getByRole('heading', { name: 'Welcome to your dashboard!' })
  }
  async logIn() {
    await this.emailField.fill(process.env.EMAIL as string)
    await this.passwordField.fill(process.env.PASSWORD as string)
    await this.loginButton.click()
    await expect(this.welcomeMessage).toBeVisible()
  }
}
