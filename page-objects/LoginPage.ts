import {Page, Locator, expect} from '@playwright/test'
import {URLs} from '../constants/urls'

export class LoginPage {
    private readonly page: Page

    // Login section
    private readonly loginUsernameInput: Locator
    private readonly loginPasswordInput: Locator
    private readonly loginButton: Locator
    private readonly loginErrorMessage: Locator
    private readonly loginErrorUsername: Locator
    private readonly loginErrorPassword: Locator

    // Reset password section
    private readonly resetPasswordLink: Locator
    private readonly resetPasswordHeader: Locator
    private readonly resetPasswordUsernameInput: Locator
    private readonly resetPasswordSubmitButton: Locator
    private readonly resetPasswordCancelButton: Locator
    private readonly resetPasswordSuccessMessage: Locator

    constructor(page: Page) {
        this.page = page

        // Login form
        this.loginUsernameInput = page.locator("input[name='username']")
        this.loginPasswordInput = page.locator("input[type='password']")
        this.loginButton = page.locator("button[type='submit']")
        this.loginErrorMessage = page.locator('div[role="alert"]')
        this.loginErrorUsername = page.locator('div.oxd-form-row:nth-child(2) > div:nth-child(1) > span:nth-child(3)')
        this.loginErrorPassword = page.locator('div.oxd-form-row:nth-child(3) > div:nth-child(1) > span:nth-child(3)')
        this.resetPasswordLink = page.locator('text=Forgot your password?')
        this.resetPasswordHeader = page.locator('h6:has-text("Reset Password")')
        this.resetPasswordSubmitButton = page.locator('button[type="submit"]')
        this.resetPasswordUsernameInput = page.locator("input[name='username']")
        this.resetPasswordCancelButton = page.locator('button[type="button"]:has-text("Cancel")')
        this.resetPasswordSuccessMessage = page.locator('h6:has-text("Reset Password link sent successfully")')
    }

    /** 
        Navigates to the login page URL. 
    **/
    async navigateToLoginPage(): Promise<void> {
        await this.page.goto(URLs.login)
    }

    /**
        Fills in the username and password fields and clicks login
    **/
    async login(username: string, password: string): Promise<void> {
        await this.loginUsernameInput.fill(username)
        await this.loginPasswordInput.fill(password)
        await this.loginButton.click()
    }

    /**
        Verifies that the user is redirected to the dashboard after login.
    **/
    async verifyLoginSuccess(): Promise<void> {
        // Assuming a successful login redirects to the dashboard
        await expect(this.page).toHaveURL(/.*dashboard/)
    }

    /**
        Verifies a general error alert message on login form.
    **/
    async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
        await this.verifyFieldError(this.loginErrorMessage, expectedMessage)
    }

    /**
        Verifies specific error message for empty username.
    **/
    async verifyEmptyUsernameError(expectedMessage: string): Promise<void> {
        await this.verifyFieldError(this.loginErrorUsername, expectedMessage)
    }

    /**
        Verifies specific error message for empty password.
    **/
    async verifyEmptyPasswordError(expectedMessage: string): Promise<void> {
        await this.verifyFieldError(this.loginErrorPassword, expectedMessage)
    }

    /**
        Verifies both username and password empty field errors.
    **/
    async verifyEmptyCredentialsErrors(usernameMsg: string, passwordMsg: string): Promise<void> {
        await this.verifyFieldError(this.loginErrorUsername, usernameMsg)
        await this.verifyFieldError(this.loginErrorPassword, passwordMsg)
    }


    /**
        Initiates the reset password flow and submits the form
    **/
    async submitResetPasswordForm(username: string): Promise<void> {
        await this.resetPasswordLink.click()
        await expect(this.resetPasswordHeader).toBeVisible()
        await this.resetPasswordUsernameInput.fill(username) // Fill with a valid username
        await this.resetPasswordSubmitButton.click()
    }


    /**
        Verifies that a success is shown fater password reset request.
    **/
    async verifyResetPasswordMessage(expectedMessage: string): Promise<void> {
        await this.verifyFieldError(this.resetPasswordSuccessMessage, expectedMessage)
    }


    /**
        Cancels the reset password process and returns to login
    **/
    async cancelResetPassword(): Promise<void> {
        await this.resetPasswordLink.click()
        await expect(this.resetPasswordHeader).toBeVisible()
        await this.resetPasswordCancelButton.click()
    }


    /**
        Verifies the user is returned to login after canceling reset password.
    **/
    async verifyResetPasswordCancel(): Promise<void> {
        await expect(this.page).toHaveURL(URLs.login)
    }


    /**
        Utility: Generic assertion for field error text visibility and content.
    **/
   private async verifyFieldError(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toBeVisible()
        await expect(locator).toHaveText(expectedText)
   }
}