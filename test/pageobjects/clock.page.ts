import { $ } from '@wdio/globals';

class ClockPage {
  get tabAlarm() { return $('id=com.google.android.deskclock:id/tab_menu_alarm'); }
  get tabClock() { return $('id=com.google.android.deskclock:id/tab_menu_clock'); }
  get tabTimer() { return $('id=com.google.android.deskclock:id/tab_menu_timer'); }
  get tabStopwatch() { return $('id=com.google.android.deskclock:id/tab_menu_stopwatch'); }

  get btnAddAlarm() { return $('id=com.google.android.deskclock:id/fab'); }
  get alarmList() { return $('id=com.google.android.deskclock:id/alarm_recycler_view'); }
  get confirmNewAlarm() { return $('id=com.google.android.deskclock:id/material_timepicker_ok_button'); }
  get collapseAlarmView() { return $('~Collapse alarm'); }
  get expandAlarmView() { return $('~Expand alarm'); }
  get btnAMtime() { return $('id=com.google.android.deskclock:id/material_clock_period_am_button'); }
  get btnPMtime() { return $('id=com.google.android.deskclock:id/material_clock_period_pm_button'); }
  get deleteAlarmBtn() { return $('id=com.google.android.deskclock:id/delete'); }

  get btnStartStopwatch() { return $('~Start'); }
  get stopwatchTime() { return $('id=com.google.android.deskclock:id/stopwatch_circle'); }
  get btnResetStopwatch() { return $('id=com.google.android.deskclock:id/stopwatch_reset'); }
  get btnPauseStopwatch() { return $('~Pause'); }
  get btnLapStopwatch() { return $('~Lap'); }
  get stopwatchLapList() { return $('id=com.google.android.deskclock:id/laps_list'); }
  get lapNumber() { return $('android=new UiSelector().resourceId("com.google.android.deskclock:id/lap_number")'); }
  get lapTime() { return $('android=new UiSelector().resourceId("com.google.android.deskclock:id/lap_time")'); }
  get lapTotal() { return $('android=new UiSelector().resourceId("com.google.android.deskclock:id/lap_total")'); }

  get btnDigit5() { return $('id=com.google.android.deskclock:id/timer_setup_digit_5'); }
  get btnStartTimer() { return $('id=com.google.android.deskclock:id/fab'); }
  get timerText() { return $('id=com.google.android.deskclock:id/timer_label'); }

  async scrollToOption(optionText: string): Promise<void> {
    const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${optionText}"))`;
    const element = $(selector);
    await element.waitForDisplayed({ timeout: 10000 });
  }
  
  async openAlarmTab(): Promise<void> {
    await this.tabAlarm.waitForDisplayed({ timeout: 10000 });
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

  async findAlarmCardByTime(hours: number, minutes: number) {
      const timePattern = `${hours}:${minutes})`;

      const xpath = `
          //android.support.v7.widget.RecyclerView[@resource-id="com.google.android.deskclock:id/alarm_recycler_view"]
          /androidx.cardview.widget.CardView
          [./android.view.ViewGroup[@resource-id="com.google.android.deskclock:id/alarm_card_layout" 
          and .//android.widget.TextView[contains(@text, "${hours}:${minutes}")]]]
      `.trim();

      return $(xpath);
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
    await this.stopwatchTime.waitForDisplayed({ timeout: 10000 });
  }


}

export default new ClockPage();