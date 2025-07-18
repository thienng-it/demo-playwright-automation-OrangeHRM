export const testData = {
    // --- Login Credentials ---
    username: 'Admin',
    password: 'admin123',

    // --- Global Search Test Data (TC_SEARCH_001 to 009) ---
    globalSearch: {
        exact: 'Admin',
        partial: 'Ma',
        singleLetter: 'a',
        lowercase: 'admin',
        uppercase: 'ADMIN',
        mixedCase: 'AdMiN',
        invalidName: 'Payment',
        specialChars: '!@#$%%^&*()',
        numbers: '0123456789',
    },

    // --- PIM Search Test Data (TC_SEARCH_010 to 022) ---
    pimSearch: {
        existingEmployeeName: 'Joseph Employee', // Note: This employee must exist in your test environment
        nonExistingEmployeeName: 'kkkkkkkkk',
        existingEmployeeId: '3956', // Note: This ID must exist
        nonExistingEmployeeId: '98766543809273',
        employeeIdWithString: 'employee id',
        employmentStatus: 'Full-Time Contract',
        include: 'Past Employees Only',
        existingSupervisorName: 'Joseph Supervisor', // Note: This supervisor must exist
        nonExistingSupervisorName: 'superwtlwkngowkngeoiweng',
        supervisorWithSpecialChars: 'joseph@@##!!',
        supervisorWithNumbers: 'joseph2000',
        jobTitle: 'Automation Tester',
        subUnit: 'Engineering',
    },
};