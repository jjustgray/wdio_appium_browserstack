import { expect } from '@wdio/globals';
import allureReporter from '@wdio/allure-reporter';
import ClockPage from '../pageobjects/clock.page.js';

describe('Android Clock Native App Tests', () => {
  it('TC-01: Should successfully switch to the Timer tab', async () => {
    allureReporter.addFeature('Clock Navigation');
    allureReporter.addStory('Timer Tab');

    await ClockPage.openTimerTab();
    await expect(ClockPage.btnDigit5).toBeDisplayed();
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

  it('TC-03: Should delete an existing alarm', async () => {
    allureReporter.addFeature('Alarm Management');
    allureReporter.addStory('Delete Alarm');

    const alarmTime = { hours: 9, minutes: 30, period: 'AM' };

    await ClockPage.openAlarmTab();
    await ClockPage.createNewAlarm(alarmTime.hours, alarmTime.minutes, alarmTime.period);
    
    const alarmCard = await ClockPage.findAlarmCardByTime(alarmTime.hours, alarmTime.minutes);
    const expandButton = await alarmCard.$('//*[@content-desc="Expand alarm"]');
    await expandButton.click();
    await ClockPage.scrollToOption('Delete');
    await ClockPage.deleteAlarmBtn.click();

    await browser.waitUntil(
      async () => !(await (await ClockPage.findAlarmLabelByTime(alarmTime.hours, alarmTime.minutes, alarmTime.period)).isExisting()),
      {
        timeout: 10000,
        interval: 250,
        timeoutMsg: `Alarm ${alarmTime.hours}:${alarmTime.minutes} was not deleted`
      }
    );
  });

  it('TC-04: Should run and pause the Stopwatch', async () => {
    allureReporter.addFeature('Stopwatch');
    allureReporter.addStory('Run Stopwatch');

    await ClockPage.openStopwatchTab();
    await ClockPage.btnStartStopwatch.click();
    await browser.pause(500);
    await ClockPage.btnPauseStopwatch.click();

    const timeText = await ClockPage.stopwatchTime.getText();
    expect(timeText).not.toBe('00 00');
  });

  it('TC-05: Should fix lap in Stopwatch', async () => {
    allureReporter.addFeature('Stopwatch');
    allureReporter.addStory('Fix Lap');

    await ClockPage.openStopwatchTab();
    await ClockPage.btnStartStopwatch.click();
    await browser.pause(500);
    await ClockPage.btnLapStopwatch.click();
    await ClockPage.btnPauseStopwatch.click();

    await expect(ClockPage.lapNumber).toBeDisplayed();
  });

});