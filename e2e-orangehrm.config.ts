import { PlaywrightTestConfig } from "playwright/test"
import * as dotenv from 'dotenv' 

// Load the environment variables from .env file depending on NODE_ENV
dotenv.config({ path: ".env.${process.env.NODE_ENV || 'production'}" })

const config: PlaywrightTestConfig = {
    fullyParallel: true, // run tests in parallel
    forbidOnly: !!process.env.CI, // fail if there are 'test.only'
    reporter: [
        ["allure-playwright", { outputFolder: 'my-allure-results'}]
    ],
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    testDir: 'tests/e2e',
    use: {
        headless: true, // run tests in headless mode
        viewport: { width: 1280, height: 720 }, // set the viewport size
        ignoreHTTPSErrors: true, // ignore HTTPS errors
        video: 'off',
        screenshot: 'off',
        trace: 'on-first-retry',
        baseURL: process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com",
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' }
        },
    ],
}

export default config