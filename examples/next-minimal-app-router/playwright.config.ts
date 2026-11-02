import { devices, PlaywrightTestConfig } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
console.log(`ℹ️ Using base URL "${baseUrl}"`);

const config: PlaywrightTestConfig = {
  testDir: './test',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: baseUrl,
    // launch headless on CI, in browser locally
    headless: !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS,
    channel: process.env.CI ? 'chrome' : undefined,
  },
  retries: process.env.CI ? 3 : 0,
};

export default config;
