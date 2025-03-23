import { expect, type Locator, type Page } from '@playwright/test'

export class AuthPage {
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
  async logIn(email: string, password: string) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.loginButton.click()
    await expect(this.welcomeMessage).toBeVisible()
  }
}
