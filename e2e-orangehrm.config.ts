import { defineConfig, PlaywrightTestConfig } from "playwright/test"
import {Status} from "allure-js-commons"
import * as os from "node:os"

const config: PlaywrightTestConfig = {
    fullyParallel: true, // run tests in parallel
    forbidOnly: !!process.env.CI, // fail if there are 'test.only'
    reporter: "allure-playwright",
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
        trace: 'on-first-retry'
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