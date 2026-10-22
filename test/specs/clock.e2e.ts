import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import ClockPage from '../pageobjects/clock.page.js';

describe('Android Clock Native App Tests', () => {

  it('TC-01: Should successfully switch to the Timer tab', async () => {
    allureReporter.addFeature('Clock Navigation');
    allureReporter.addStory('Switch Tabs');

    await ClockPage.openTimerTab();
    expect(await ClockPage.btnStartTimer.isDisplayed()).toBe(true);
  });

  it('TC-02: Should create a new alarm', async () => {
    allureReporter.addFeature('Alarm Management');
    allureReporter.addStory('Create Alarm');
    const alarmTime = { hours: 5, minutes: 15, period: 'AM' };

    await ClockPage.openAlarmTab();
    await ClockPage.createNewAlarm(alarmTime.hours, alarmTime.minutes, alarmTime.period);
    const alarmLabelElement = await ClockPage.findAlarmLabelByTime(alarmTime.hours, alarmTime.minutes, alarmTime.period);
    const rawText = await alarmLabelElement.getText();
    const withoutSpaces = rawText.replace(/\s+/g, '');

    expect(withoutSpaces).toContain(`${alarmTime.hours}:${alarmTime.minutes}${alarmTime.period}`);
  });

  // it('TC-03: Should successfully switch to the Stopwatch tab', async () => {
  //   allureReporter.addFeature('Stopwatch');
  //   allureReporter.addStory('Navigation');

  //   await ClockPage.openStopwatchTab();
  //   expect(await ClockPage.btnStartStopwatch.isDisplayed()).toBe(true);
  // });

  // it('TC-04: Should start and pause the Stopwatch', async () => {
  //   allureReporter.addFeature('Stopwatch');
  //   allureReporter.addStory('Start/Stop');

  //   await ClockPage.openStopwatchTab();
    
  //   // Запускаем секундомер
  //   await ClockPage.btnStartStopwatch.click();
  //   await browser.pause(2000); // ждем 2 секунды

  //   // Останавливаем секундомер
  //   await ClockPage.btnStartStopwatch.click();

  //   const timeText = await ClockPage.stopwatchTime.getText();
  //   expect(timeText).not.toBe('00:00');
  // });

  // it('TC-05: Should successfully switch to the Timer tab', async () => {
  //   allureReporter.addFeature('Timer');
  //   allureReporter.addStory('Navigation');

  //   await ClockPage.openTimerTab();
  //   expect(await ClockPage.btnStartTimer.isDisplayed()).toBe(true);
  // });

});