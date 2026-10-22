import { $ } from '@wdio/globals';

class ClockPage {
  // Нижняя навигация
  get tabAlarm() { return $('~Alarm'); }
  get tabClock() { return $('~Clock'); }
  get tabTimer() { return $('~Timer'); }
  get tabStopwatch() { return $('~Stopwatch'); }

  // Элементы вкладки «Будильник» (Alarm)
  get btnAddAlarm() { return $('~Add alarm'); }
  get alarmList() { return $('id=com.google.android.deskclock:id/alarm_recycler_view'); }
  get confirmNewAlarm() { return $('id=com.google.android.deskclock:id/material_timepicker_ok_button'); }
  get collapseAlarmView() { return $('~Collapse alarm'); }
  get btnAMtime() { return $('id=com.google.android.deskclock:id/material_clock_period_am_button'); }
  get btnPMtime() { return $('id=com.google.android.deskclock:id/material_clock_period_pm_button'); }

  // Элементы вкладки «Секундомер» (Stopwatch)
  get btnStartStopwatch() { return $('~Start'); }
  get stopwatchTime() { return $('id=com.google.android.deskclock:id/stopwatch_circle'); }
  get btnResetStopwatch() { return $('~Reset'); }

  // Элементы вкладки «Таймер» (Timer)
  get btnDigit5() { return $('id=com.google.android.deskclock:id/timer_setup_digit_5'); }
  get btnStartTimer() { return $('~Start'); }
  get timerText() { return $('id=com.google.android.deskclock:id/timer_label'); }

  async scrollToOption(optionText: string): Promise<void> {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${optionText}"))`;
    const element = $(selector);
    await element.waitForDisplayed();
    await element.click();
  }
  
  async openAlarmTab(): Promise<void> {
    await this.tabAlarm.click();
  }

  async createNewAlarm(hours: number, minutes: number, period: string): Promise<void> {
    await this.btnAddAlarm.click();

    const hours_btn = $('android=new UiSelector().text("' + hours + '")');
    const minutes_btn = $('android=new UiSelector().text("' + minutes + '")');
    await hours_btn.click();
    await minutes_btn.click();
    if (period === 'AM') {
      await this.btnAMtime.click();
    } else {
      await this.btnPMtime.click();
    }
    await this.confirmNewAlarm.click();
    if (await this.collapseAlarmView.isDisplayed()) {
      await this.collapseAlarmView.click();
    }
  }

  async findAlarmLabelByTime(hours: number, minutes: number, period: string): Promise<ChainablePromiseElement> {
    return $(`android=new UiSelector().resourceId("com.google.android.deskclock:id/digital_clock").textContains("${hours}:${minutes}")`);
  }

  async openClockTab(): Promise<void> {
    await this.tabClock.waitForDisplayed({ timeout: 10000 });
    await this.tabClock.click();
  }

  async openTimerTab(): Promise<void> {
    await this.tabTimer.waitForDisplayed({ timeout: 10000 });
    await this.tabTimer.click();
  }

  async openStopwatchTab(): Promise<void> {
    await this.tabStopwatch.waitForDisplayed({ timeout: 10000 });
    await this.tabStopwatch.click();
  }


}

export default new ClockPage();