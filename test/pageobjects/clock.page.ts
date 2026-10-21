import { $ } from '@wdio/globals';

class ClockPage {
  // Нижняя навигация
  get tabAlarm() { return $('android=new UiSelector().text("Alarm")'); }
  get tabClock() { return $('android=new UiSelector().text("Clock")'); }
  get tabTimer() { return $('android=new UiSelector().text("Timer")'); }
  get tabStopwatch() { return $('android=new UiSelector().text("Stopwatch")'); }

  // Элементы вкладки «Будильник» (Alarm)
  get btnAddAlarm() { return $('id=com.google.android.deskclock:id/fab'); }
  get alarmList() { return $('id=com.google.android.deskclock:id/alarms_list'); }

  // Элементы вкладки «Секундомер» (Stopwatch)
  get btnStartStopwatch() { return $('id=com.google.android.deskclock:id/stopwatch_fab'); }
  get stopwatchTime() { return $('id=com.google.android.deskclock:id/stopwatch_time_view'); }
  get btnResetStopwatch() { return $('id=com.google.android.deskclock:id/stopwatch_reset'); }

  // Элементы вкладки «Таймер» (Timer)
  get btnStartTimer() { return $('id=com.google.android.deskclock:id/timer_fab'); }
  get timerText() { return $('id=com.google.android.deskclock:id/timer_time_text'); }

  async openAlarmTab(): Promise<void> {
    await this.tabAlarm.waitForDisplayed({ timeout: 10000 });
    await this.tabAlarm.click();
  }

  async openStopwatchTab(): Promise<void> {
    await this.tabStopwatch.waitForDisplayed({ timeout: 10000 });
    await this.tabStopwatch.click();
  }

  async openTimerTab(): Promise<void> {
    await this.tabTimer.waitForDisplayed({ timeout: 10000 });
    await this.tabTimer.click();
  }
}

export default new ClockPage();