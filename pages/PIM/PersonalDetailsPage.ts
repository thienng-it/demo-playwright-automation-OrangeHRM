import { Page, Locator, expect } from '@playwright/test'

export class PersonalDetailsPage {
  private readonly page: Page
  private readonly header: Locator
  private readonly urlPattern = /viewPersonalDetails\/empNumber\/\d+/

  constructor(page: Page) {
    this.page = page
    this.header = page.locator('h6:has-text("Personal Details")')
  }

  /**
   * Verifies the URL and presence of the Personal Details header.
   */
  async verifyEmployeeCreated(): Promise<void> {
    await expect(this.page).toHaveURL(this.urlPattern)
    await expect(this.header).toBeVisible()
  }
}