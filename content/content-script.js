// Not currently loaded. Insertion is implemented via chrome.scripting.executeScript's
// func/args form in services/promptInsertion.js, which avoids a message-passing
// race and doesn't require this file to be injected or declared in the manifest.
// Kept as a placeholder in case a persistent content script becomes necessary later
// (e.g. for site-specific insertion adapters).
