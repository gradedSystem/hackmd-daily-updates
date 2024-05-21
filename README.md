# HACKMD Daily Standup Updater

Daily Standup Updater is a Chrome extension that helps you easily submit your daily standup updates to HackMD. This extension allows you to fill in your daily progress, plans, and learnings, and automatically updates a specified HackMD note with this information.

## Features

- **Simple Form**: Provides a user-friendly form to input your daily standup details.
- **Automated Updates**: Automatically updates a HackMD note with your daily standup information.
- **Secure Storage**: Stores your HackMD API token and note ID securely using Chrome's local storage.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/hackmd-daily-update.git
2. **Load the Extension in Chrome**
  - Open Chrome and navigate to chrome://extensions/.
  - Enable "Developer mode" by clicking the toggle switch in the top right corner.
  - Click the "Load unpacked" button and select the directory where you cloned the repository.
![img](https://github.com/gradedSystem/hackmd-daily-updates/assets/55581804/b3247a0a-7593-4dd8-87f3-3af9f9caa864)

## Usage
1. **Set Up API Token and Note ID** 
  - Obtain your HackMD API key from the HackMD website. Log in to your HackMD account, navigate to your profile or settings, and generate an API key.
  - Find your note ID in the URL of your HackMD note. For example, if your note URL is https://hackmd.io/123456789qwerty, the note ID is 123456789qwerty.
  - The extension will store these values securely in Chrome's local storage.
![img](https://github.com/gradedSystem/hackmd-daily-updates/assets/55581804/a88e28d9-30ba-46b2-bba6-b46d5e4c04eb) ![img](https://github.com/gradedSystem/hackmd-daily-updates/assets/55581804/8c04c996-f46f-458c-9863-56a11059a421)


2. **Submit Daily Standup Updates**
  - Click on the extension icon to open the popup form.
  - Fill in the required fields: date, percentage completed, score, what you worked on, what didn't work, learnings, big plans, and small plans.
  - Click the "Submit" button to update your HackMD note with the entered information.
![img](https://github.com/gradedSystem/hackmd-daily-updates/assets/55581804/92e1b84a-ae00-4424-a54b-f691f43d8a35)
