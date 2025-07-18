import { Page, Locator } from '@playwright/test'
import { URLs } from '../../constants/urls'
import { EmployeeInfo } from '../../utils/generateEmployee'

export class AddEmployeePage {
  private readonly page: Page

  private readonly firstNameInput: Locator
  private readonly middleNameInput: Locator
  private readonly lastNameInput: Locator
  private readonly employeeIdInput: Locator
  private readonly saveButton: Locator

  constructor(page: Page) {
    this.page = page

    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
    this.employeeIdInput = page.getByRole('textbox').nth(4)
    this.saveButton = page.getByRole('button', { name: 'Save' })
  }

  /**
   * Navigates to the add employee page URL.
   */
  async navigateToAddEmployeePage(): Promise<void> {
    await this.page.goto(URLs.pim.addEmployee)
  }

  /**
   * Fills out the add employee form and saves.
   */
  async fillEmployeeForm({firstName, middleName, lastName, employeeId}: {firstName: string, middleName: string, lastName: string, employeeId?: string}): Promise<void> {
      await this.firstNameInput.fill(firstName)
      await this.middleNameInput.fill(middleName)
      await this.lastNameInput.fill(lastName)
      await this.employeeIdInput.fill(employeeId)
      await this.saveButton.click()
  }
}
