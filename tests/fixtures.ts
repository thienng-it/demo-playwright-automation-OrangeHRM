// tests/fixtures.ts
import {test as base} from '@playwright/test'
import {LoginPage} from '../page-objects/LoginPage'

type PageObjectFixtures = {
    loginPage: LoginPage
}

export const test = base.extend<PageObjectFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await use(loginPage)
    },
})

export {expect} from '@playwright/test'