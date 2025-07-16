import {Page, Locator, expect} from '@playwright/test'


export class LoginPage {
    private readonly page: Page
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    private readonly errorMessage: Locator
    private readonly errorMessageEmptyUsername: Locator
    private readonly errorMessageEmptyPassword: Locator
    private readonly resetPasswordLink: Locator
    private readonly resetPasswordHeader: Locator
    private readonly resetPasswordButton: Locator
    private readonly resetPasswordUsernameInput: Locator
    private readonly resetPasswordCancelButton: Locator
    private readonly resetPasswordMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator("input[name='username']")
        this.passwordInput = page.locator("input[type='password']")
        this.loginButton = page.locator("button[type='submit']")
        this.errorMessage = page.locator('div[role="alert"]')
        this.errorMessageEmptyUsername = page.locator('div.oxd-form-row:nth-child(2) > div:nth-child(1) > span:nth-child(3)')
        this.errorMessageEmptyPassword = page.locator('div.oxd-form-row:nth-child(3) > div:nth-child(1) > span:nth-child(3)')
        this.resetPasswordLink = page.locator('text=Forgot your password?')
        this.resetPasswordHeader = page.locator('h6:has-text("Reset Password")')
        this.resetPasswordButton = page.locator('button[type="submit"]')
        this.resetPasswordUsernameInput = page.locator("input[name='username']")
        this.resetPasswordCancelButton = page.locator('button[type="button"]:has-text("Cancel")')
        this.resetPasswordMessage = page.locator('h6:has-text("Reset Password link sent successfully")')
    }

    // methods
    async goToURL() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async verifyLoginSuccess() {
        // Assuming a successful login redirects to the dashboard
        await expect(this.page).toHaveURL(/.*dashboard/)
    }

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText(expectedMessage)
    }

    async verifyErrorMessageEmptyUsername(expectedMessageEmptyUsername: string) {
        await expect(this.errorMessageEmptyUsername).toBeVisible()
        await expect(this.errorMessageEmptyUsername).toHaveText(expectedMessageEmptyUsername)
    }

    async verifyErrorMessageEmptyPassword(expectedMessageEmptyPassword: string) {
        await expect(this.errorMessageEmptyPassword).toBeVisible()
        await expect(this.errorMessageEmptyPassword).toHaveText(expectedMessageEmptyPassword)
    }

    async verifyErrorMessageEmpty(expectedMessageEmptyUsername: string, expectedMessageEmptyPassword: string) {
        // Check for both empty username error messages
        await expect(this.errorMessageEmptyUsername).toBeVisible()
        await expect(this.errorMessageEmptyUsername).toHaveText(expectedMessageEmptyUsername)
        // Check for empty password error message
        await expect(this.errorMessageEmptyPassword).toBeVisible()
        await expect(this.errorMessageEmptyPassword).toHaveText(expectedMessageEmptyPassword)
    }

    // reset password method
    async resetPassword(usernameInput: string) {
        await this.resetPasswordLink.click()
        await expect(this.resetPasswordHeader).toBeVisible()
        await this.resetPasswordUsernameInput.fill(usernameInput) // Fill with a valid username
        await this.resetPasswordButton.click()
    }

    // reset password assertion
    async verifyResetPasswordMessage(resetPasswordMessage: string) {
        await expect(this.resetPasswordMessage).toBeVisible()
        await expect(this.resetPasswordMessage).toHaveText(resetPasswordMessage)
    }

    // Cancel reset password
    async cancelResetPassword() {
        await this.resetPasswordLink.click()
        await expect(this.resetPasswordHeader).toBeVisible()
        await this.resetPasswordCancelButton.click()
    }

    // Verify reset password cancel assertion
    async verifyResetPasswordCancel() {
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
}