import { Page, Locator } from '@playwright/test';

export class SearchPage {
    readonly page: Page;

    // --- Global Search ---
    readonly globalSearchInput: Locator;

    // --- Navigation ---
    readonly pimMenu: Locator;

    // --- PIM Search Fields ---
    readonly employeeNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly employmentStatusDropdown: Locator;
    readonly includeDropdown: Locator;
    readonly supervisorNameInput: Locator;
    readonly jobTitleDropdown: Locator;
    readonly subUnitDropdown: Locator;
    readonly searchButton: Locator;
    readonly noRecordsFoundMessage: Locator;
    readonly searchResultsTable: Locator;

    constructor(page: Page) {
        this.page = page;
        // Global Search
        this.globalSearchInput = page.locator('//input[@placeholder="Search"]');

        // Navigation
        this.pimMenu = page.locator('//a[.//span[text()="PIM"]]');

        // PIM Search
        this.employeeNameInput = page.locator('(//label[text()="Employee Name"]/following::input)[1]');
        this.employeeIdInput = page.locator('(//label[text()="Employee Id"]/following::input)[1]');
        this.employmentStatusDropdown = page.locator('(//label[text()="Employment Status"]/following::div)[1]');
        this.includeDropdown = page.locator('(//label[text()="Include"]/following::div)[1]');
        this.supervisorNameInput = page.locator('(//label[text()="Supervisor Name"]/following::input)[1]');
        this.jobTitleDropdown = page.locator('(//label[text()="Job Title"]/following::div)[1]');
        this.subUnitDropdown = page.locator('(//label[text()="Sub Unit"]/following::div)[1]');
        this.searchButton = page.locator('//button[@type="submit"]');
        this.noRecordsFoundMessage = page.locator('//p[contains(text(), "No Records Found")]');
        this.searchResultsTable = page.locator('.oxd-table-card');
    }

    async navigateToPIM(): Promise<void> {
        await this.pimMenu.click();
    }

    async searchOnSideBar(query: string): Promise<void> {
        await this.globalSearchInput.fill(query);
    }
    
    private async selectDropdownOption(dropdown: Locator, option: string): Promise<void> {
        await dropdown.click();
        await this.page.locator(`//div[@role="listbox"]//span[text()="${option}"]`).click();
    }

    async searchPIM(criteria: { [key: string]: string }): Promise<void> {
        if (criteria.employeeName) await this.employeeNameInput.fill(criteria.employeeName);
        if (criteria.employeeId) await this.employeeIdInput.fill(criteria.employeeId);
        if (criteria.supervisorName) await this.supervisorNameInput.fill(criteria.supervisorName);
        if (criteria.employmentStatus) await this.selectDropdownOption(this.employmentStatusDropdown, criteria.employmentStatus);
        if (criteria.include) await this.selectDropdownOption(this.includeDropdown, criteria.include);
        if (criteria.jobTitle) await this.selectDropdownOption(this.jobTitleDropdown, criteria.jobTitle);
        if (criteria.subUnit) await this.selectDropdownOption(this.subUnitDropdown, criteria.subUnit);
        
        await this.searchButton.click();
    }
}