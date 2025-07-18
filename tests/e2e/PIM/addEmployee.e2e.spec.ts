import { test } from '../../fixtures';
import { expect } from '@playwright/test';
import { generateEmployeeInfo } from '../../../utils/generateEmployee';
import { AddEmployeePage } from '../../../pages/PIM/AddEmployee';
import { ViewEmployeeListPage } from '../../../pages/PIM/ViewEmployeeListPage';
import { PersonalDetailsPage } from '../../../pages/PIM/PersonalDetailsPage';

test.describe('PIM - Add Employee', () => {
    test('should allow adding a new employee and then successfully searching for them', async ({ pimPage }) => {
        const addEmployeePage = new AddEmployeePage(pimPage);
        const viewEmployeeListPage = new ViewEmployeeListPage(pimPage);
        const personalDetailsPage = new PersonalDetailsPage(pimPage);

        // 1. Navigate to the "Add Employee" page
        await addEmployeePage.navigateToAddEmployeePage();

        // 2. Generate unique data for the new employee
        const newEmployee = generateEmployeeInfo();

        // 3. Add the new employee using the data
        await addEmployeePage.fillEmployeeForm(newEmployee);
        
        // 4. Verify that the app confirms the save
        await personalDetailsPage.verifyEmployeeCreated();

        // 5. Navigate to the employee list to search for the new employee
        await viewEmployeeListPage.navigateToViewEmployeeListPage();

        // 6. Search for the employee we just created
        await viewEmployeeListPage.searchByEmployeeName(newEmployee.firstName);

        // 7. Assert that the search result contains the new employee's data
        await viewEmployeeListPage.expectOneRecordFound();
    });
});