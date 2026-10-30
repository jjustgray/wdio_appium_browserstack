# WDIO Appium BrowserStack Android Testing

This repository contains automated end-to-end tests for Android mobile applications using **WebdriverIO**, **Appium**, and **TypeScript**. 
The results of tests are been gathering and showing with Allure.

## Project Overview & Features

* **Local Execution:** Tests run successfully locally on an Android emulator via Android Studio.
* **CI/CD Integration:** Tests are fully integrated and pass successfully on GitHub Actions.
* **Target Application:** For native mobile testing, the built-in **Android Clock app (version 7.4)** on **Android 13** is used.
* **BrowserStack Limitations Note:** Running these tests on the cloud-based **BrowserStack** service is currently **not possible** due to platform restrictions regarding applications installed directly onto cloud-hosted devices within this configuration.

---

## Available Scripts (`package.json`)

| Command | Description |
| :--- | :--- |
| `npm run test:local` | Runs the WebdriverIO tests locally against a running Android emulator |
| `npm run report:generate` | Generates the Allure test execution report |
| `npm run report:open` | Opens the generated Allure report locally |

---

## Prerequisites

* **Node.js** (v20+ recommended)
* **Android Studio** with SDK and an Android 13 (API level 33) Emulator configured.
* **Appium** installed globally or locally as a dependency.

---

## Setup & Running Locally

1. **Clone the repository:**
 ```bash
 git clone [https://github.com/jjustgray/wdio_appium_browserstack.git](https://github.com/jjustgray/wdio_appium_browserstack.git)
 cd wdio_appium_browserstack
```
2. **Install dependencies:**
```bash
npm ci
```
3. **Start an Android Emulator via Android Studio Device Manager (ensure an Android 13 / API 33 image is running).**
4. **Run the local tests:**
```bash
npm run test:local
```
5. **Open and research Allure report:**
```bash
npm run report:generate
```
