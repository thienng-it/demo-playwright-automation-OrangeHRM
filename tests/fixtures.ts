import { test as base, Page } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { SearchPage } from '../pages/SearchPage'
import { testData } from '../tests/test-data/searchEmployee'

// Define the shape of your fixtures
type MyFixtures = {
    loginPage: LoginPage;
    searchPage: SearchPage;
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

    // Fixture that logs in and navigates to the PIM page
    pimPage: async ({ page, loginPage, searchPage }, use) => {
        await page.goto('/');
        await loginPage.login(testData.username, testData.password);
        await searchPage.navigateToPIM();
        await use(page);
    },
});

export { expect } from '@playwright/test';