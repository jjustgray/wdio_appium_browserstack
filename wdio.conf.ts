import 'dotenv/config';
import path from 'node:path';

const appPath = process.env.APP_PATH;

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,
    logLevel: 'info',
    framework: 'mocha',
    connectionRetryTimeout: 300000, 
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
        ...(process.env.ANDROID_PLATFORM_VERSION
            ? { 'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION }
            : {}),
        ...(appPath ? { 'appium:app': path.resolve(appPath) } : {}),
        'appium:newCommandTimeout': 240,
        'appium:adbExecTimeout': 60000,

        'appium:uiautomator2ServerLaunchTimeout': 90000,
        'appium:uiautomator2ServerInstallTimeout': 90000,
        'appium:androidInstallTimeout': 90000,

        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': 'com.android.deskclock.DeskClock',
        'appium:appWaitActivity': '*',
        'appium:appWaitDuration': 30000,
        'appium:forceAppLaunch': true,
        'appium:autoGrantPermissions': true,
        'appium:noReset': false
    }]
};
