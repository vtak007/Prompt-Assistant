# Prompt Assistant

A Chrome extension for creating, organizing, searching, importing/exporting, and reusing AI prompts from a persistent side panel.

## Features

- **Library** — browse prompts by category, tag, or favorites.
- **Create / Edit** — save prompts with a title, category, tags, content, and optional notes.
- **Search** — combined keyword + category + tag filtering, with a `/` quick-search shortcut.
- **Optimize Prompt** — rewrite a prompt against a chosen goal (Clarity, Coding, Research, etc.) using a built-in mock optimizer. The `optimizePrompt()` abstraction in `services/optimizer.js` is designed so a real AI provider (OpenAI, Anthropic, Google, a local endpoint) can be plugged in later without touching the UI.
- **Import / Export** — back up or transfer your library as JSON, with duplicate detection (Skip / Replace / Keep Both) on import.
- **Insert into active tab** — insert a prompt's text into the focused text field on whatever page you're on (ChatGPT, Claude, Gemini, or any `<textarea>`/`<input>`/`contenteditable`), without auto-submitting.
- **Settings** — appearance, default startup view, prompt click behavior, import/export preferences, and a "Reset to sample data" action.

## Installing (unpacked)

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this folder.
4. Click the toolbar icon to open the side panel.

## Tech

Plain HTML/CSS/JS (ES modules), no build step, no framework. Manifest V3 with the Chrome Side Panel API. Data is stored in `chrome.storage.local`. See `CLAUDE.md` for the file map.

## Known limitations (by design, for this release)

- The Optimize Prompt feature uses a deterministic **mock** provider, not a live AI call — the Settings screen's provider/API key fields are present but disabled ("coming soon").
- Insertion cannot reach cross-origin iframe composers or closed shadow-DOM editors, and never works on internal `chrome://` pages (Chrome blocks script injection there for all extensions).
- No "undockable" floating window (like Bitwarden's pop-out) yet — deferred as a future enhancement.
