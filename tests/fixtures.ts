// tests/fixtures.ts
import {test as base} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'
import { SystemUsersPage } from '../pages/Admin/SystemUsersPage'
import { AddEmployeePage } from '../pages/PIM/AddEmployee'
import { PersonalDetailsPage } from '../pages/PIM/PersonalDetailsPage'
import { ViewEmployeeListPage } from '../pages/PIM/ViewEmployeeListPage'

type PageObjectFixtures = {
    loginPage: LoginPage
    systemUserPage: SystemUsersPage,
    addEmployeePage: AddEmployeePage,
    personalDetailsPage: PersonalDetailsPage,
    viewEmployeeListPage: ViewEmployeeListPage
}

export const test = base.extend<PageObjectFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateToLoginPage()
        await use(loginPage)
    },
    systemUserPage: async ({ page }, use) => {
        const systemUserPage = new SystemUsersPage(page)
        await use(systemUserPage)
    },
    
    addEmployeePage: async ({ page }, use) => {
    const addEmployee = new AddEmployeePage(page)
    await addEmployee.navigateToAddEmployeePage()
    await use(addEmployee)
    },

    personalDetailsPage: async ({ page }, use) => {
    const personalDetailsPage = new PersonalDetailsPage(page)
    await use(personalDetailsPage)
    },

    viewEmployeeListPage: async ({ page }, use) => {
    const viewEmployeeListPage = new ViewEmployeeListPage(page)
    await use(viewEmployeeListPage)
    }
})

export {expect} from '@playwright/test'