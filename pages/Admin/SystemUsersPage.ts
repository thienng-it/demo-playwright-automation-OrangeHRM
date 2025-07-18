import { Page, Locator } from '@playwright/test'
import { URLs } from '../../constants/urls'

export class SystemUsersPage {
  private readonly page: Page
  private readonly addUserButton: Locator

  constructor(page: Page) {
    this.page = page
    this.addUserButton = page.getByRole('button', { name: 'Add' })
  }

  async navigateToSystemUsersPage(): Promise<void> {
    await this.page.goto(URLs.admin.systemUsers)
  }

  async clickAddUser(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(URLs.admin.systemUsers),
      this.addUserButton.click(),
    ])
  }
}