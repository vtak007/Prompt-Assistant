import { initializeStorage } from '../services/storage.js';

// Must run synchronously at top level (not after an await) or Chrome
// silently ignores the "open on action click" behavior.
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    initializeStorage();
  }
});
