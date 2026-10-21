import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import ClockPage from '../pageobjects/clock.page.js';

describe('Android Clock Native App Tests', () => {

  it('TC-01: Should successfully switch to the Alarm tab', async () => {
    allureReporter.addFeature('Clock Navigation');
    allureReporter.addStory('Switch Tabs');

    await ClockPage.openAlarmTab();
    expect(await ClockPage.btnAddAlarm.isDisplayed()).toBe(true);
  });

  it('TC-02: Should open the Add Alarm screen when clicking the floating action button', async () => {
    allureReporter.addFeature('Alarm Management');
    allureReporter.addStory('Create Alarm');

    await ClockPage.openAlarmTab();
    await ClockPage.btnAddAlarm.click();

    const timePickerHeader = await $('android=new UiSelector().textContains("AM")').isDisplayed() 
      || await $('id=com.google.android.deskclock:id/select_hours').isDisplayed();
    
    expect(timePickerHeader).toBeTruthy();
  });

  it('TC-03: Should successfully switch to the Stopwatch tab', async () => {
    allureReporter.addFeature('Stopwatch');
    allureReporter.addStory('Navigation');

    await ClockPage.openStopwatchTab();
    expect(await ClockPage.btnStartStopwatch.isDisplayed()).toBe(true);
  });

  it('TC-04: Should start and pause the Stopwatch', async () => {
    allureReporter.addFeature('Stopwatch');
    allureReporter.addStory('Start/Stop');

    await ClockPage.openStopwatchTab();
    
    // Запускаем секундомер
    await ClockPage.btnStartStopwatch.click();
    await browser.pause(2000); // ждем 2 секунды

    // Останавливаем секундомер
    await ClockPage.btnStartStopwatch.click();

    const timeText = await ClockPage.stopwatchTime.getText();
    expect(timeText).not.toBe('00:00');
  });

  it('TC-05: Should successfully switch to the Timer tab', async () => {
    allureReporter.addFeature('Timer');
    allureReporter.addStory('Navigation');

    await ClockPage.openTimerTab();
    expect(await ClockPage.btnStartTimer.isDisplayed()).toBe(true);
  });

});