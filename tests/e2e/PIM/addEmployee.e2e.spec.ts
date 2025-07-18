import { test } from '../../fixtures';
import { expect } from '@playwright/test';
import { generateNewEmployee } from '../../../utils/generateEmployee';

test.describe('PIM - Add Employee', () => {
    // The 'loggedInPage' fixture automatically handles login before this test runs.
    // The 'addEmployeePage' and 'viewEmployeeListPage' fixtures provide the necessary page objects.
    test('should allow adding a new employee and then successfully searching for them', async ({ loggedInPage, addEmployeePage, viewEmployeeListPage }) => {
        
        // 1. Navigate to the "Add Employee" page
        // The page object's navigate method handles the clicks to get here.
        await addEmployeePage.navigate();

        // 2. Generate unique data for the new employee
        // This utility function makes sure we don't have conflicts with existing data.
        const newEmployee = generateNewEmployee();

        // 3. Add the new employee using the data
        // The page object's addEmployee method fills the form and saves.
        await addEmployeePage.addEmployee(
            newEmployee.firstName,
            newEmployee.lastName,
            newEmployee.employeeId
        );

        // 4. Verify that the app confirms the save
        // We expect to see the new employee's name in the header of their profile page.
        await expect(loggedInPage.locator(`//h6[normalize-space()='${newEmployee.firstName} ${newEmployee.lastName}']`)).toBeVisible({ timeout: 10000 });

        // 5. Navigate to the employee list to search for the new employee
        await viewEmployeeListPage.navigate();

        // 6. Search for the employee we just created
        await viewEmployeeListPage.searchByEmployeeName(newEmployee.firstName);

        // 7. Assert that the search result contains the new employee's data
        // This confirms the end-to-end flow was successful.
        const searchResult = await viewEmployeeListPage.getSearchResultText();
        expect(searchResult).toContain(newEmployee.employeeId);
        expect(searchResult).toContain(newEmployee.firstName);
        expect(searchResult).toContain(newEmployee.lastName);
    });
});