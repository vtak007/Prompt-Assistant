# CLAUDE.md

Guidance for working in the Prompt Assistant Chrome extension repo. See the user's global `~/.claude/CLAUDE.md` for cross-project conventions (branching, doc-update gating, `.ini` handling, etc.) — not duplicated here.

## Key Files

| File | Description |
|---|---|
| `manifest.json` | MV3 manifest: permissions, side panel config, background service worker registration. |
| `background/service-worker.js` | Sets side-panel-on-icon-click behavior; seeds storage on first install. |
| `sidepanel.html` / `sidepanel.css` / `sidepanel.js` | The side panel shell, design tokens/theme, and the app's entry point (render loop + all event delegation). |
| `store/store.js` | In-memory state container (`getState`/`setState`/`setStateSilent`/`subscribe`). |
| `store/actions.js` | All state mutations + persistence calls live here; views never touch storage directly. |
| `router/router.js` | Hash-based view router (`#/library`, `#/create`, `#/edit/:id`, etc.). |
| `services/storage.js` | `chrome.storage.local` wrapper; owns the `{schemaVersion, categories, prompts, settings}` root shape and the migration stub. |
| `services/promptInsertion.js` | Injects `insertTextIntoActiveElement` into the active tab via `chrome.scripting.executeScript` to insert prompt text into a focused field. |
| `services/optimizer.js` | `optimizePrompt()` provider abstraction; backed by a deterministic mock provider (default) and a live `anthropicProvider` that calls `/v1/messages` directly from the browser. |
| `services/importExport.js` | JSON export builder + import validation/preview/duplicate-detection. |
| `services/search.js` | Combined keyword/category/tag prompt filtering. |
| `services/clipboard.js` | Copy-to-clipboard with a `document.execCommand` fallback. |
| `views/*.js` | One render function per screen (Library, Create, Edit, Optimize, Import/Export, Search, Settings). Pure functions of state → HTML string. |
| `components/*.js` | Shared render fragments (Header, Navigation, PromptCard, TagChip, Modal, Toast, Footer). |
| `data/seed-data.js` | The 5 sample prompts + starter categories used on first install. |
| `utils/*.js` | `ids.js` (uuid/slug), `dates.js`, `validation.js`, `dom.js` (escaping, delegation, debounce). |

## Architecture notes

- **No framework, no build step.** Every view/component is a plain function returning an HTML string; `sidepanel.js` re-renders the active view's container on every store change via `innerHTML`.
- **Uncontrolled text fields.** Title/Content/Notes/Optimize textareas are *not* synced to the store on every keystroke (that would blow away cursor position on re-render). They're read from the DOM at the moment of an action (tag add/remove, submit, run-optimize). Only the Search keyword field re-renders live (debounced), using a focus-preservation helper in `sidepanel.js` (`renderPreservingFocus`) to keep the caret in place.
- **`setStateSilent` vs `setState`**: `setState` triggers a full re-render of the view region; `setStateSilent` updates state without notifying subscribers — used for cheap per-keystroke flags like `formDirty`.
- **Insertion permission model**: the manifest declares `host_permissions` for `http://*/*` and `https://*/*` (not just `activeTab`) because clicking a button *inside* the side panel does not count as one of the gesture types that grants `activeTab`'s temporary host access (only toolbar-icon clicks, keyboard commands, and context-menu items do). `chrome://` pages remain unreachable by design — Chrome blocks script injection there for every extension. The same `host_permissions` also cover the Anthropic API fetch, so no separate manifest change was needed to add the live optimizer.
- **Live optimizer provider**: `services/optimizer.js`'s `anthropicProvider` calls `https://api.anthropic.com/v1/messages` directly from the side panel with the `anthropic-dangerous-direct-browser-access: true` header — this is Anthropic's documented, supported mechanism for browser-origin calls, not a workaround. The user's API key is read from `state.settings.optimization.apiKey` (stored in `chrome.storage.local`, plain text) and threaded through `optimizePrompt()`; it is never logged. Anthropic's dedicated `/v1/experimental/improve_prompt` "Prompt Improver" endpoint was considered and rejected — it's an experimental Workbench-only tool being retired August 17, 2026, so the live provider instead sends a custom rewrite instruction to the standard, stable Messages API.
- **Model list**: `services/optimizer.js`'s `fetchAnthropicModels(apiKey)` calls `GET /v1/models` and caches the result in `state.settings.optimization.{availableModels, modelsFetchedAt}` via the "⟳" button in `views/SettingsView.js` (`refresh-models` action in `sidepanel.js`). The Model field is a plain text `<input>` with a `<datalist>` populated from that cache — a real dropdown UX while still allowing any manually-typed model ID, and gracefully degrading to a blank list before the user has ever fetched (no API key required to type a model manually, only to fetch the live list).
- **Autofill gotcha**: a plain text field placed directly before a `type="password"` field gets pattern-matched by Chrome as a username/password login form and autofilled accordingly (this bit the Model field in Settings, next to the API Key field). Give such fields explicit `autocomplete="off"` (plain fields) / `autocomplete="new-password"` (secret fields) to opt out.

## Deferred / future work

Additional AI providers (OpenAI/Google/local endpoint) beyond the now-live Anthropic one, cloud sync, prompt variables/templates, version/usage history, multiple libraries, bulk edit, Markdown/CSV import, command palette, site-specific insertion adapters, and an undockable/floating panel window (like Bitwarden's pop-out) are all intentionally out of scope for this release — see `Prompt Assistant Features.md` §33 and the approved plans for details.
