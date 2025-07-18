import {faker} from '@faker-js/faker'

export type EmployeeInfo = {
    firstName: string
    middleName: string
    lastName: string
    employeeId?: string
}

export function generateEmployeeInfo(): EmployeeInfo {
    return {
        firstName: faker.person.firstName() + Date.now().toString(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        employeeId: faker.string.alphanumeric(6).toUpperCase(),
    }
}