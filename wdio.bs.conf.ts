import * as dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const config: WebdriverIO.Config = {
  runner: 'local',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['./test/specs/**/*.ts'],
  maxInstances: 1,

  capabilities: [{
    platformName: 'android',
    'appium:deviceName': 'Google Pixel 7 Pro',
    'appium:platformVersion': '13.0',
    'appium:automationName': 'UiAutomator2',
    // Ссылка bs://... после загрузки APK в BrowserStack или предустановленный пакунок
    'appium:app': process.env.BROWSERSTACK_APP_URL || 'bs://<hashed_app_id>',
    'bstack:options': {
      projectName: 'Android Native Clock Tests',
      buildName: `Build-${process.env.BUILD_NUMBER || 'Local'}`,
      sessionName: 'Clock Automation Test',
      debug: true,
      networkLogs: true
    }
  }],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['browserstack'],

  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
    }]
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  }
};