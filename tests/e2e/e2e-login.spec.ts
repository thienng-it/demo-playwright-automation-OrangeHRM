import {expect, test} from '@playwright/test'
import {LoginPage} from '../../page-objects/LoginPage'

// Verify the user login with valid account
test.describe('Verify the user can login with valid account', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with a valid credentials successfully', async ({page}) => {
        await loginPage.login('Admin', 'admin123')
        await loginPage.verifyLoginSuccess()
    })
})

// Verify the user login with invalid account
test.describe('Verify the user login with invalid account', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with an invalid username', async ({page}) => {
        await loginPage.login('admin2', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with an invalid password', async ({page}) => {
        await loginPage.login('Admin', 'admin456')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user leave empty fields
test.describe('Verify the user leave empty fields', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with empty username', async ({page}) => {
        await loginPage.login('', 'admin123')
        await loginPage.verifyErrorMessageEmptyUsername('Required')
    })

    test('Login with empty password', async ({page}) => {
        await loginPage.login('Admin', '')
        await loginPage.verifyErrorMessageEmptyPassword('Required')
    })

    test('Login with both username and password fields empty', async ({page}) => {
        await loginPage.login('', '')
        await loginPage.verifyErrorMessageEmpty('Required', 'Required')
    })
})

// Verify the user login with special characters
test.describe('Verify the user login with special characters', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with valid username having special characters', async ({page}) => {
        await loginPage.login('Admin@', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with valid password having special characters', async ({page}) => {
        await loginPage.login('Tester', 'admin@123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with invalid username having special characters', async ({page}) => {
        await loginPage.login('admin!@#$%^&*()', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user login with white spaces
test.describe('Verify the user login with white spaces', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with username having white space(s) at the end', async ({page}) => {
        await loginPage.login('Admin ', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with username having white space(s) at the beginning', async ({page}) => {
        await loginPage.login(' Admin', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password having white space(s) at the end', async ({page}) => {
        await loginPage.login('Admin', 'admin123 ')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password having white space(s) at the beginning', async ({page}) => {
        await loginPage.login('Admin', ' admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user login with maximum or minimum length
test.describe('Verify the user login with maximum or minimum length', () => {
    let loginPage: LoginPage
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with username at maximum length', async ({page}) => {
        const maxLengthUsername = 'a'.repeat(255) // Assuming 255 is the max length
        await loginPage.login(maxLengthUsername, 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password at maximum length', async ({page}) => {
        const maxLengthPassword = 'a'.repeat(255) // Assuming 255 is the max length
        await loginPage.login('Admin', maxLengthPassword)
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with username at minimum length', async ({page}) => {
        const minLengthUsername = 'a' // Assuming 1 is the min length
        await loginPage.login(minLengthUsername, 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password at minimum length', async ({page}) => {
        const minLengthPassword = 'a' // Assuming 1 is the min length
        await loginPage.login('Admin', minLengthPassword)
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user login with case sensitivity
test.describe('Verify the user login with case sensitivity', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login the username having full uppercase', async ({page}) => {
        await loginPage.login('ADMIN', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login the username having uppercase in the first letter', async ({page}) => {
        await loginPage.login('Admin', 'admin123')
        await loginPage.verifyLoginSuccess()
    })

    test('Login the username having mixure uppercase letters', async ({page}) => {
        await loginPage.login('AdMiN', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login the username having full lowercase', async ({page}) => {
        await loginPage.login('admin', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login the password having full uppercase', async ({page}) => {
        await loginPage.login('Admin', 'ADMIN123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login the password having uppercase in the first letter', async ({page}) => {
        await loginPage.login('Admin', 'Admin123')
        await loginPage.verifyLoginSuccess()
    })

    test('Login the password having mixure uppercase letters', async ({page}) => {
        await loginPage.login('Admin', 'AdMiN123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login the password having full lowercase', async ({page}) => {
        await loginPage.login('Admin', 'admin123')
        await loginPage.verifyLoginSuccess()
    })
})

// Verify the user login with multiple languages
test.describe('Verify the user login with multi-languages', () => {
    let loginPage: LoginPage
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with username in Chinese', async ({page}) => {
        await loginPage.login('管理员', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password in Chinese', async ({page}) => {
        await loginPage.login('Admin', '管理员123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with username in Arabic', async ({page}) => {
        await loginPage.login('مدير', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password in Arabic', async ({page}) => {
        await loginPage.login('Admin', 'مدير123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user login with SQL injection
test.describe('Verify the user login with SQL injection', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with username having SQL injection', async ({page}) => {
        await loginPage.login("' OR '1'='1", 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password having SQL injection', async ({page}) => {
        await loginPage.login('Admin', "' OR '1'='1")
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user login with XSS attack
test.describe('Verify the user login with XSS attack', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with username having XSS attack', async ({page}) => {
        await loginPage.login('<script>alert("XSS")</script>', 'admin123')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })

    test('Login with password having XSS attack', async ({page}) => {
        await loginPage.login('Admin', '<script>alert("XSS")</script>')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the password reset functionality
test.describe('Verify the password reset functionality', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Reset password with valid username', async ({page}) => {
        await loginPage.resetPassword('Admin')
        await loginPage.verifyResetPasswordMessage('Reset Password link sent successfully')
    })

    test('Reset password with invalid username', async ({page}) => {
        await loginPage.resetPassword('Admin!@$')
        await loginPage.verifyResetPasswordMessage('Reset Password unsuccessfully')
    })

    test('Cancel reset password', async ({page}) => {
        await loginPage.cancelResetPassword()
        // Verify that the user is redirected back to the login page
        await loginPage.verifyResetPasswordCancel()
    })
})

// Verify the pasword that meets all criteria perfectly
test.describe('Verify the password that meets all criteria perfectly', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with a password that meets all criteria', async ({page}) => {
        await loginPage.login('Joseph', 'Admin@123#')
        await loginPage.verifyLoginSuccess()
    })
})

// Verify the user login with emojis
test.describe('Verify the user login with emojis', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Login with username having emojis', async ({page}) => {
        await loginPage.login('Admin😊', 'admin123')
        await loginPage.verifyErrorMessage('Unexpected error occurred')
    })

    test('Login with password having emojis', async ({page}) => {
        await loginPage.login('Admin', 'admin123😊')
        await loginPage.verifyErrorMessage('Invalid credentials')
    })
})

// Verify the user login with multiple attempts
test.describe('Verify the user login with multiple attempts', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.goToURL()
    })

    test('Multiple failed login attempts', async ({page}) => {
        for (let i = 0; i < 5; i++) {
            await loginPage.login('Admin', 'wrongpassword')
            await loginPage.verifyErrorMessage('Invalid credentials')
        }
        // After multiple attempts, the user should still be on the login page
        await expect(loginPage.page).toHaveURL(/.*auth\/login/)
    })
})