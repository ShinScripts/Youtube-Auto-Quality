# Youtube Auto Quality 

[![Available in the Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-YouTube_Auto_Quality-blue.svg)](https://chromewebstore.google.com/detail/youtube-auto-quality/locbjhkijodkloilppmbckcdbhcffifb)

**Youtube Auto Quality** is a lightweight, open-source chrome extension that gives you back control over your viewing experience. It automatically forces YouTube videos to your preferred resolution the moment they load, bypassing YouTube's default "Auto" setting which often favors lower resolutions.

## Features
* **Auto-Force resolution:** Set it once (1080p, 4K, etc.) and forget it. The extension handles the rest.
* **SPA seamlessness:** Built to handle YouTube’s Single Page Application (SPA) architecture. Detects new video loads without needing a page refresh.
* **Privacy by design:** No tracking, no data collection, and no external server calls. All settings stay on your device.

## Installation

### Chrome web store

The easiest way to install is via the official store:

**[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/youtube-auto-quality/locbjhkijodkloilppmbckcdbhcffifb)**

### Manual installation

1. **Download/Clone** this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the folder containing the extension files.
6. Open YouTube and enjoy!

## Privacy Policy
We do not collect any personal data. Your resolution preference is stored locally using `chrome.storage.sync`. You can view the full [Privacy Policy](privacypolicy.md) here.

## License
This project is licensed under the MIT License.
