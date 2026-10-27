import 'dotenv/config';
import path from 'node:path';

const appPath = process.env.APP_PATH ?? './apps/clock.apk';

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,
    logLevel: 'info',
    framework: 'mocha',
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    mochaOpts: {
        timeout: 600_000
    },
    services: [[
        'appium',
        {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723
            }
        }
    ]],
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'Android Emulator',
        'appium:platformVersion': '10.0',
        'appium:newCommandTimeout': 240,
        'appium:adbExecTimeout': 60000,

        'appium:uiautomator2ServerLaunchTimeout': 90000,
        'appium:uiautomator2ServerInstallTimeout': 90000,
        'appium:androidInstallTimeout': 90000,
        
        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': 'com.android.deskclock.DeskClock',
        'appium:autoGrantPermissions': true,
        'appium:noReset': true
    }]
};
