import { test as base, Page } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SearchPage } from '../pages/SearchPage'
import { testData } from '../tests/test-data/searchEmployee'
import { AddEmployeePage } from '../pages/PIM/AddEmployee'
import { PersonalDetailsPage } from '../pages/PIM/PersonalDetailsPage'
import { ViewEmployeeListPage } from '../pages/PIM/ViewEmployeeListPage'

// Define the shape of your fixtures
type MyFixtures = {
    loginPage: LoginPage;
    searchPage: SearchPage;
    addEmployeePage: AddEmployeePage;
    personalDetailsPage: PersonalDetailsPage;
    viewEmployeeListPage: ViewEmployeeListPage;
    pimPage: Page; // A fixture that navigates to the PIM page
};

// Extend the base test to include your custom fixtures
export const test = base.extend<MyFixtures>({
    // Fixture for LoginPage
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    // Fixture for SearchPage
    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
    
    addEmployeePage: async ({ page }, use) => {
        await use(new AddEmployeePage(page));
    },

    personalDetailsPage: async ({ page }, use) => {
        await use(new PersonalDetailsPage(page));
    },

    viewEmployeeListPage: async ({ page }, use) => {
        await use(new ViewEmployeeListPage(page));
    },

    // Fixture that logs in and navigates to the PIM page
    pimPage: async ({ page, loginPage, searchPage }, use) => {
        await page.goto('/');
        await loginPage.login(testData.username, testData.password);
        await searchPage.navigateToPIM();
        await use(page);
    },
});

export { expect } from '@playwright/test';