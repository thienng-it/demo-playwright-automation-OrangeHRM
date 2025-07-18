import { Page, Locator, expect } from '@playwright/test'
import { URLs } from '../../constants/urls'

export class ViewEmployeeListPage {
  private readonly page: Page

  private readonly employeeNameInput: Locator
  private readonly employeeIdInput: Locator
  private readonly nameOption: (name: string) => Locator
  private readonly searchButton: Locator
  private readonly recordFoundLabel: Locator
  private readonly noRecordsLabel: Locator

  constructor(page: Page) {
    this.page = page

    this.employeeNameInput = page.getByRole('textbox').nth(1)
    this.employeeIdInput = page.getByRole('textbox').nth(2)
    this.nameOption = (name: string) => page.getByRole('option', { name }).first()
    this.searchButton = page.getByRole('button', { name: 'Search' })
    this.recordFoundLabel = page.getByText('(1) Record Found')
    this.noRecordsLabel = page.getByText('No Records Found')
  }

  /**
   * Navigates to the view employee list page URL.
   */
  async navigateToViewEmployeeListPage(): Promise<void> {
    await this.page.goto(URLs.pim.viewEmployeeList)
  }

  /**
   * Performs a search for an employee by name.
   */
  async searchByEmployeeName(name: string): Promise<void> {
    await this.employeeNameInput.fill(name)

    // Wait for autocomplete options to render
    await this.page.waitForTimeout(3000)
    // If autocomplete option appears, click it
    const option = this.nameOption(name)
    if (await option.isVisible()) {
      await option.click()
    }

    await this.searchButton.click()
  }

  /**
   * Validates that one record was found.
   */
  async expectOneRecordFound(): Promise<void> {
    await expect(this.recordFoundLabel).toBeVisible({ timeout: 5000 })
  }

  /**
   * Validates that no records were found.
   */
  async expectNoRecordsFound(): Promise<void> {
    await expect(this.noRecordsLabel.first()).toBeVisible()
  }
}