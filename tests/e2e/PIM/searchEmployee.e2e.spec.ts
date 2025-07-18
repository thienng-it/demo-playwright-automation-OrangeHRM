import { test } from '../../fixtures'
import { validUsers } from '../../test-data/loginUsers'
import { generateEmployeeInfo } from '../../../utils/generateEmployee'
const employee = generateEmployeeInfo()

test.describe('Verify search employee', () => {
    test.beforeEach(async ({ loginPage, addEmployeePage, viewEmployeeListPage, personalDetailsPage }) => {
        await loginPage.navigateToLoginPage()
        const { username, password } = validUsers.admin
        await loginPage.login(username, password)
        await loginPage.verifyLoginSuccess()
        await addEmployeePage.navigateToAddEmployeePage()

        await addEmployeePage.fillEmployeeForm(employee)
        await personalDetailsPage.verifyEmployeeCreated()

        await viewEmployeeListPage.navigateToViewEmployeeListPage()
    })

    test('Employee exists', async ({ viewEmployeeListPage }) => {
        await viewEmployeeListPage.searchByEmployeeName(employee.firstName)
        await viewEmployeeListPage.expectOneRecordFound()
    })

    test('Employee does not exist', async ({ viewEmployeeListPage }) => {
        await viewEmployeeListPage.searchByEmployeeName('doesnotexist123')
        await viewEmployeeListPage.expectNoRecordsFound()
    })
})