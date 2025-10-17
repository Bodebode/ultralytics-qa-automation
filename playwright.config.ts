import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  // Scans here for *.spec.ts
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',  // Basic for now
  use: {
    baseURL: 'https://hub.ultralytics.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});