#!/usr/bin/env bash
set -euo pipefail

echo "Waiting for system services to stabilize..."
sleep 10

adb shell input keyevent 82 || true

clock_apk="$(adb shell pm path com.google.android.deskclock | tr -d '\r')"
if [ -z "$clock_apk" ]; then
  echo "The emulator does not have com.google.android.deskclock installed."
  exit 1
fi

echo "Using preinstalled Clock: $clock_apk"
adb shell dumpsys package com.google.android.deskclock | grep -m 1 'versionName='

adb shell am force-stop com.google.android.deskclock
adb shell am start -W -n com.google.android.deskclock/com.android.deskclock.DeskClock

echo "Waiting for the Clock app navigation tabs..."
for attempt in $(seq 1 20); do
  adb shell uiautomator dump /sdcard/clock-window.xml > /dev/null 2>&1 || true
  if adb shell cat /sdcard/clock-window.xml | grep -q 'tab_menu_clock'; then
    break
  fi
  sleep 1
done

if ! adb shell cat /sdcard/clock-window.xml | grep -q 'tab_menu_clock'; then
  echo "Clock app did not show its navigation tabs."
  adb shell dumpsys activity activities | grep -E 'mResumedActivity|topResumedActivity' || true
  adb shell cat /sdcard/clock-window.xml || true
  exit 1
fi

set +e
npm run test:local
test_status=$?
set -e

if [ "$test_status" -ne 0 ]; then
  mkdir -p ci-diagnostics
  adb shell dumpsys window > ci-diagnostics/window.txt 2>&1 || true
  adb shell dumpsys activity activities > ci-diagnostics/activities.txt 2>&1 || true
  adb shell pm path com.google.android.deskclock > ci-diagnostics/installed-app.txt 2>&1 || true
  adb exec-out screencap -p > ci-diagnostics/screen.png || true
  adb shell uiautomator dump /sdcard/window.xml > /dev/null 2>&1 || true
  adb pull /sdcard/window.xml ci-diagnostics/window.xml > /dev/null 2>&1 || true
  adb logcat -d -t 3000 > ci-diagnostics/logcat.txt 2>&1 || true
  echo "Foreground activity:"
  adb shell dumpsys activity activities | grep -E 'mResumedActivity|topResumedActivity' || true
  echo "Current UI hierarchy:"
  cat ci-diagnostics/window.xml || true
fi

exit "$test_status"
