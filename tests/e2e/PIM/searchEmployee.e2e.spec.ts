import { test, expect } from '../../fixtures';
import { testData } from '../../test-data/searchEmployee';
import { SearchPage } from '../../../pages/SearchPage';

let searchPage: SearchPage;

test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
});

test.describe('Global Sidebar Search Functionality', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await page.goto('/');
        await loginPage.login(testData.username, testData.password);
    });

    test('TC_SEARCH_001: Verify search with exact tab name', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.exact);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper').first()).toHaveText(/Admin/);
    });

    test('TC_SEARCH_002: Verify search with partial tab name', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.partial);
        // Add specific assertions for partial results
    });

    test('TC_SEARCH_003: Verify search with a single letter', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.singleLetter);
        // Add specific assertions for single letter results
    });

    test('TC_SEARCH_004: Verify search with full lowercase', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.lowercase);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper').first()).toHaveText(/Admin/);
    });

    test('TC_SEARCH_005: Verify search with full uppercase', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.uppercase);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper').first()).toHaveText(/Admin/);
    });

    test('TC_SEARCH_006: Verify search with mixed case', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.mixedCase);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper').first()).toHaveText(/Admin/);
    });

    test('TC_SEARCH_007: Verify search with a name that does not exist', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.invalidName);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper')).toHaveCount(0);
    });

    test('TC_SEARCH_008: Verify search with special characters', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.specialChars);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper')).toHaveCount(0);
    });

    test('TC_SEARCH_009: Verify search with numbers', async () => {
        await searchPage.searchOnSideBar(testData.globalSearch.numbers);
        await expect(searchPage.page.locator('.oxd-main-menu-item-wrapper')).toHaveCount(0);
    });
});

test.describe('PIM Search Functionality', () => {
    test.beforeEach(async ({ pimPage }) => {
        // The pimPage fixture handles login and navigation
    });

    test('TC_SEARCH_010: Verify search with an existing employee name', async () => {
        await searchPage.searchPIM({ employeeName: testData.pimSearch.existingEmployeeName });
        await expect(searchPage.searchResultsTable.first()).toContainText(testData.pimSearch.existingEmployeeName);
    });

    test('TC_SEARCH_011: Verify search with a non-existing employee name', async () => {
        await searchPage.searchPIM({ employeeName: testData.pimSearch.nonExistingEmployeeName });
        await expect(searchPage.noRecordsFoundMessage).toBeVisible();
    });

    test('TC_SEARCH_012: Verify search with an existing employee ID', async () => {
        await searchPage.searchPIM({ employeeId: testData.pimSearch.existingEmployeeId });
        await expect(searchPage.searchResultsTable.first()).toContainText(testData.pimSearch.existingEmployeeId);
    });

    test('TC_SEARCH_013: Verify search with a non-existing employee ID', async () => {
        await searchPage.searchPIM({ employeeId: testData.pimSearch.nonExistingEmployeeId });
        await expect(searchPage.noRecordsFoundMessage).toBeVisible();
    });

    test('TC_SEARCH_014: Verify search with strings in the Employee ID field', async () => {
        await searchPage.searchPIM({ employeeId: testData.pimSearch.employeeIdWithString });
        // The system might show an error or no results. We expect no valid records.
        await expect(searchPage.noRecordsFoundMessage).toBeVisible();
    });
    
    test('TC_SEARCH_015: Verify search by Employment Status', async () => {
        await searchPage.searchPIM({ employmentStatus: testData.pimSearch.employmentStatus });
        // Add assertions to verify results match the status
    });

    test('TC_SEARCH_016: Verify search by Include', async () => {
        await searchPage.searchPIM({ include: testData.pimSearch.include });
        // Add assertions to verify results match the include criteria
    });

    test('TC_SEARCH_017: Verify search with an existing Supervisor name', async () => {
        await searchPage.searchPIM({ supervisorName: testData.pimSearch.existingSupervisorName });
        // Add assertions to verify results
    });

    test('TC_SEARCH_018: Verify search with a non-existing Supervisor name', async () => {
        await searchPage.searchPIM({ supervisorName: testData.pimSearch.nonExistingSupervisorName });
        await expect(searchPage.noRecordsFoundMessage).toBeVisible();
    });

    test('TC_SEARCH_019: Verify search with special characters in Supervisor name', async () => {
        await searchPage.searchPIM({ supervisorName: testData.pimSearch.supervisorWithSpecialChars });
        await expect(searchPage.noRecordsFoundMessage).toBeVisible();
    });

    test('TC_SEARCH_020: Verify search with numbers in Supervisor name', async () => {
        await searchPage.searchPIM({ supervisorName: testData.pimSearch.supervisorWithNumbers });
        await expect(searchPage.noRecordsFoundMessage).toBeVisible();
    });

    test('TC_SEARCH_021: Verify search by Job Title', async () => {
        await searchPage.searchPIM({ jobTitle: testData.pimSearch.jobTitle });
        // Add assertions to verify results
    });

    test('TC_SEARCH_022: Verify search by Sub Unit', async () => {
        await searchPage.searchPIM({ subUnit: testData.pimSearch.subUnit });
        // Add assertions to verify results
    });
});