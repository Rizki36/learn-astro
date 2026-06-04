---
slug: html-to-markdown-ai-chrome-extension
title: HTML to Markdown AI Chrome Extension
description: Converts HTML content to Markdown using AI and a Chrome extension.
startDate: 2026-04-01
endDate: 2026-04-01
publishDate: 2026-04-01
updatedDate: 2026-04-01
featured: false
technologies:
  - Chrome Extension
  - GitHub Models
  - JavaScript
github: https://github.com/Rizki36/html-to-markdown-ai-chrome-extension
order: 19
image: /media/581412529-59db9e28-af3c-4096-8eff-a845a5e0d96b.png
---

# HTML to Markdown AI Chrome Extension

**HTML to Markdown AI** is a Manifest V3 Chrome extension that lets you select any HTML elements on a live page and convert them into clean Markdown — powered by GitHub Models.

## ✨ How It Works

1. Open the extension popup.
2. Click **Start selection** to enter element-picker mode.
3. Click one or more HTML elements on the page to queue them.
4. Click **Generate Markdown** to submit the selection.
5. The background service worker bundles the HTML fragments and sends them to GitHub Models.
6. The model returns Markdown, with each converted fragment separated by a `---` divider.

## 🛠 Implementation Notes

- **Local token storage:** The GitHub Models API token is saved in `chrome.storage.local`, keeping it scoped to the current browser profile.
- **Safe by design:** The extension does not inject into Chrome internal pages (e.g., `chrome://`).
- **Structured output:** The AI is prompted to return Markdown only, using `---` to delimit each fragment.
- **Host permission:** `https://models.github.ai/*` is declared for GitHub Models inference requests.

## 📸 Screenshots

<table>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/59db9e28-af3c-4096-8eff-a845a5e0d96b" /></td>
      <td><img src="https://github.com/user-attachments/assets/52d18d2d-58ac-4f61-8dc2-79c0bb378ad0" /></td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/b013b645-2460-4804-bc76-dcb68fbe71cb" /></td>
      <td><img src="https://github.com/user-attachments/assets/477c7054-7e11-4f90-a52f-84d69ae73be9" /></td>
   </tr>
</table>
