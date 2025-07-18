import {test} from '../../fixtures'
import {validUsers} from '../../test-data/loginUsers'
import {generateEmployeeInfo} from '../../../utils/generateEmployee'

test.describe('Verify adding new employee', () => {

    test.beforeEach(async ({loginPage, addEmployeePage}) => {
     
        await loginPage.navigateToLoginPage()
        const {username, password} = validUsers.admin
        await loginPage.login(username, password)
        await loginPage.verifyLoginSuccess()
        await addEmployeePage.navigateToAddEmployeePage()
    })

    test('Add new employee in OrangeHRM', async ({ addEmployeePage, personalDetailsPage}) => {
        const employee = generateEmployeeInfo()
        await addEmployeePage.fillEmployeeForm(employee)
        await personalDetailsPage.verifyEmployeeCreated()
    })
})