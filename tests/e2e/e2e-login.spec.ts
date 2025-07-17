import { test, expect } from '../fixtures'
import { validUsers, invalidUsers } from '../test-data/loginUsers'
import { en } from '../test-data/errorMessages'


test.describe('Verify the user can login with valid account', () => {
  test('Login with valid credentials successfully', async ({ loginPage }) => {
    const { username, password } = validUsers.admin
    await loginPage.login(username, password)
    await loginPage.verifyLoginSuccess()
  })
})

test.describe('Verify the user login with invalid account', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with an invalid username', async ({ loginPage }) => {
    const { username, password } = invalidUsers.wrongUsername
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with an invalid password', async ({ loginPage }) => {
    const { username, password } = invalidUsers.wrongPassword
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user leaves empty fields', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with empty username', async ({ loginPage }) => {
    const { username, password } = invalidUsers.emptyUsername
    await loginPage.login(username, password)
    await loginPage.verifyEmptyUsernameError(en.required)
  })

  test('Login with empty password', async ({ loginPage }) => {
    const { username, password } = invalidUsers.emptyPassword
    await loginPage.login(username, password)
    await loginPage.verifyEmptyPasswordError(en.required)
  })

  test('Login with both username and password fields empty', async ({ loginPage }) => {
    const { username, password } = invalidUsers.emptyBoth
    await loginPage.login(username, password)
    await loginPage.verifyEmptyCredentialsErrors(en.required, en.required)
  })
})

test.describe('Verify the user login with special characters', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with valid username having special characters', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameWithSpecialChars
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with valid password having special characters', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordWithSpecialChars
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with invalid username having special characters', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameInvalidSpecialChars
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user login with white spaces', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username having whitespace at the end', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameWithWhitespaceEnd
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with username having whitespace at the beginning', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameWithWhitespaceStart
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password having whitespace at the end', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordWithWhitespaceEnd
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password having whitespace at the beginning', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordWithWhitespaceStart
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user login with max/min length', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username at max length', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameMaxLength
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password at max length', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordMaxLength
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with username at min length', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameMinLength
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password at min length', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordMinLength
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user login with case sensitivity', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username in uppercase', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameUppercase
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with username with first letter uppercase', async ({ loginPage }) => {
    const { username, password } = validUsers.admin
    await loginPage.login(username, password)
    await loginPage.verifyLoginSuccess()
  })

  test('Login with mixed case username', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameMixedCase
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with username in lowercase', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameLowercase
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password in uppercase', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordUppercase
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password with first letter uppercase', async ({ loginPage }) => {
    const { username, password } = validUsers.joseph
    await loginPage.login(username, password)
    await loginPage.verifyLoginSuccess()
  })

  test('Login with mixed case password', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordMixedCase
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password in lowercase', async ({ loginPage }) => {
    const { username, password } = validUsers.admin
    await loginPage.login(username, password)
    await loginPage.verifyLoginSuccess()
  })
})

test.describe('Verify the user login with multi-languages', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username in Chinese', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameChinese
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password in Chinese', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordChinese
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with username in Arabic', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameArabic
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password in Arabic', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordArabic
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user login with SQL injection', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username having SQL injection', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameSQLInjection
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password having SQL injection', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordSQLInjection
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user login with XSS attack', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username having XSS attack', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameXSS
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })

  test('Login with password having XSS attack', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordXSS
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the password reset functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Reset password with valid username', async ({ loginPage }) => {
    const { username } = validUsers.admin
    await loginPage.submitResetPasswordForm(username)
    await loginPage.verifyResetPasswordMessage(en.resetSuccess)
  })

  test('Cancel reset password', async ({ loginPage }) => {
    await loginPage.cancelResetPassword()
    await loginPage.verifyResetPasswordCancel()
  })
})

test.describe('Verify the password that meets all criteria perfectly', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with strong valid password', async ({ loginPage }) => {
    const { username, password } = validUsers.joseph
    await loginPage.login(username, password)
    await loginPage.verifyLoginSuccess()
  })
})

test.describe('Verify the user login with emojis', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Login with username having emojis', async ({ loginPage }) => {
    const { username, password } = invalidUsers.usernameEmoji
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.unexpectedError)
  })

  test('Login with password having emojis', async ({ loginPage }) => {
    const { username, password } = invalidUsers.passwordEmoji
    await loginPage.login(username, password)
    await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
  })
})

test.describe('Verify the user login with multiple attempts', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLoginPage()
  })

  test('Multiple failed login attempts', async ({ loginPage }) => {
    const { username, password } = invalidUsers.multipleAttempts
    for (let i = 0; i < 5; i++) {
      await loginPage.login(username, password)
      await loginPage.verifyLoginErrorMessage(en.invalidCredentials)
    }
    await expect(loginPage['page']).toHaveURL(/.*auth\/login/)
  })
})