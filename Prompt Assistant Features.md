# Prompt Assistant — Chrome Extension

**Revision:** Rev 1

Prompt Assistant is a Chrome extension for creating, organizing, optimizing, searching, importing, exporting, and reusing AI prompts from a persistent sidebar interface.

The extension should use a polished dark-mode UI with purple accent styling, rounded panels, compact controls, and a layout inspired by the supplied UI mockup.

---

## 1. Product Goal

Prompt Assistant should let a user maintain a personal prompt library directly inside Chrome.

The user should be able to:

- Save prompts with a title, category, tags, prompt content, and optional notes.
- Browse saved prompts by category.
- Browse and filter prompts by tag.
- Mark prompts as favorites.
- Search prompts by keyword, category, or tag.
- Create new categories.
- Edit existing prompts.
- Delete prompts.
- Duplicate prompts.
- Copy a prompt to the clipboard.
- Insert a prompt into a compatible text field on the active browser tab.
- Optimize an existing or newly written prompt.
- Import prompt libraries.
- Export prompt libraries.
- Configure extension behavior from a Settings screen.
- Type a (/) in the search field and instantly pull up all of your saved prompts, continue typing to filger for a specific prompt

---

# 2. Chrome Extension Presentation

## Sidebar Popup

The extension must open as a **Chrome sidebar / side panel**, not as a small traditional toolbar popup.

Use the Chrome Side Panel API where supported.

Suggested manifest permission:

```json
"permissions": [
  "storage",
  "activeTab",
  "scripting",
  "sidePanel"
]
```

Suggested manifest configuration:

```json
"side_panel": {
  "default_path": "sidepanel.html"
}
```

The sidebar should:

- Remain available while browsing.
- Use the full available side-panel height.
- Be vertically scrollable when necessary.
- Adapt cleanly when the sidebar width changes.
- Avoid requiring a fixed desktop-sized layout.
- Collapse multi-column UI concepts into sidebar-friendly views.

The mockup shows several panels at once for design reference, but the production sidebar should display **one primary workspace at a time** using the navigation banner.

---

# 3. Main Header

At the top of the sidebar display:

- Application icon.
- Extension name: **Prompt Assistant**.
- Settings gear icon aligned to the upper-right.

Example:

```text
[Icon] Prompt Assistant                         [Settings]
```

Clicking the Settings icon opens the Settings view.

---

# 4. Main Navigation Banner

Directly below the header, display the main navigation controls.

Required navigation items:

1. **Library**
2. **Create**
3. **Optimize Prompt**
4. **Import / Export**
5. **Search**

Because the extension is a sidebar, the navigation may be implemented as:

- horizontally scrollable tabs,
- compact icon-and-label buttons,
- a responsive two-row tab layout,
- or another sidebar-friendly arrangement.

The selected section should have a purple highlighted state.

Suggested icons:

| Section | Suggested Icon |
|---|---|
| Library | Book |
| Create | Pencil |
| Optimize Prompt | Magic wand / sparkles |
| Import / Export | Up/down arrows |
| Search | Magnifying glass |

---

# 5. Library View

The **Library** is the primary home screen.

It displays saved prompts organized by category.

## Categories

Include:

- **All Prompts**
- User-created categories

Example categories shown in the design:

- Business
- Coding
- Writing
- Marketing
- Productivity
- Education
- Personal

Each category should display the number of prompts assigned to it.

Example:

```text
All Prompts       42
Business           8
Coding            10
Writing            7
Marketing          6
Productivity       5
Education          4
Personal           2
```

Clicking a category filters the Library to that category.

---

## Add Category

Place a `+` control beside the Categories heading.

Clicking it allows the user to create a new category.

Category requirements:

- Category name must not be blank.
- Prevent accidental duplicate category names.
- Categories should be editable.
- Categories should be deletable.
- Deleting a category must not silently delete prompts.
- If a category containing prompts is deleted, allow prompts to be reassigned or moved to an uncategorized state.

---

# 6. Tags

The Library should include a Tags section.

Example tags from the design:

- seo
- email
- debug
- python
- content
- analysis
- brainstorm
- automation

Each tag should display the number of prompts using that tag.

Example:

```text
# seo            6
# email          5
# debug          4
# python         4
```

Selecting a tag filters the prompt list.

Tags should be generated from the tags assigned to saved prompts.

---

# 7. Favorites

Include a **Favorites** Library filter.

Each prompt can be favorited or unfavorited using a star icon.

The Favorites view displays only prompts where:

```json
"isFavorite": true
```

The Favorites item may also display the number of favorite prompts.

---

# 8. Prompt List

When a category, tag, Favorites, or All Prompts is selected, display matching prompts as compact cards or rows.

Each prompt item should show:

- Title
- Category
- Tags
- Favorite/star state
- Optional prompt-type/icon indicator

Example:

```text
Python Debugging Helper
Coding
debug, python
☆
```

Recommended prompt actions:

- Open / View
- Edit
- Duplicate
- Copy
- Insert into active page
- Favorite / Unfavorite
- Delete

Actions may appear:

- directly on the prompt card,
- in a context menu,
- or in an action toolbar after opening the prompt.

---

# 9. Create Prompt View

The **Create** screen allows a user to create and save a prompt.

Required fields:

## Title

Required.

Placeholder:

```text
Enter a title for your prompt...
```

---

## Category

Required.

Use a dropdown populated with existing categories.

Placeholder:

```text
Select a category...
```

Also include:

```text
+ New Category
```

This should allow a category to be created without leaving the Create view.

---

## Tags

Allow one or more tags.

Placeholder:

```text
Add tags (press Enter)...
```

Expected behavior:

- User types a tag.
- Pressing Enter creates the tag.
- Duplicate tags are ignored.
- Tags can be removed individually.
- Tags should be normalized consistently.

---

## Prompt Content

Required.

Use a large multiline editor.

Placeholder:

```text
Write or paste your prompt here...
```

The editor should support comfortable editing of long prompts.

Optional formatting toolbar controls may include:

- Bold
- Italic
- Code
- Bulleted list
- Numbered list
- Link
- Undo
- Redo

Plain-text storage is acceptable for the initial version unless rich-text support is intentionally implemented.

---

## Notes

Optional multiline field.

Placeholder:

```text
Add any additional notes...
```

Notes are metadata for the user's reference and should not automatically be inserted into a destination text field with the prompt unless the user explicitly chooses to include them.

---

## Create View Actions

Required buttons:

- **Cancel**
- **Save Prompt**

Save Prompt must validate required fields.

---

# 10. Prompt Data Model

A suggested prompt object:

```json
{
  "id": "uuid",
  "title": "Python Debugging Helper",
  "categoryId": "coding",
  "categoryName": "Coding",
  "tags": [
    "debug",
    "python"
  ],
  "content": "Prompt text goes here...",
  "notes": "Optional notes...",
  "isFavorite": false,
  "createdAt": "2026-08-18T12:00:00Z",
  "updatedAt": "2026-08-18T12:00:00Z",
  "version": 1
}
```

Suggested category object:

```json
{
  "id": "coding",
  "name": "Coding",
  "createdAt": "2026-08-18T12:00:00Z"
}
```

---

# 11. Edit Prompt

Opening an existing prompt should allow the user to edit:

- Title
- Category
- Tags
- Prompt Content
- Notes
- Favorite state

Saving an edited prompt should update:

```text
updatedAt
```

The original creation date should remain unchanged.

---

# 12. Optimize Prompt

The **Optimize Prompt** section helps improve a user's prompt.

This section should accept:

- A newly entered prompt.
- A prompt selected from the Library.

Suggested layout:

```text
Original Prompt
[large text area]

Optimization Goal
[dropdown]

Additional Instructions
[text area]

[Optimize Prompt]
```

Suggested optimization goals:

- General Improvement
- Clarity
- More Detailed
- More Concise
- Better Reasoning
- Coding
- Research
- Writing
- Brainstorming
- Data Analysis
- Image Generation
- Custom

The optimization system should attempt to improve:

- clarity,
- specificity,
- structure,
- context,
- constraints,
- desired output format,
- role definition,
- success criteria,
- ambiguity reduction.

---

# 13. Optimization Result

After optimization, display:

## Original Prompt

Read-only or collapsible.

## Optimized Prompt

Editable text area.

## Actions

Include:

- Copy
- Replace Original
- Save as New Prompt
- Save Changes
- Re-optimize
- Return to Library

When saving an optimized prompt as a new prompt, preserve or allow editing of:

- Title
- Category
- Tags
- Notes

Do not overwrite the original prompt without explicit user action.

---

# 14. AI Provider Architecture

Prompt optimization should be implemented so that the AI provider can be changed later.

Use an abstraction such as:

```javascript
optimizePrompt({
  prompt,
  goal,
  instructions,
  provider,
  model
})
```

Do not tightly couple the rest of the extension to one AI service.

Potential future providers may include:

- OpenAI
- Anthropic
- Google
- Local model endpoint
- Other OpenAI-compatible APIs

API credentials must not be hardcoded into source code.

---

# 15. Import / Export

The **Import / Export** section manages backups and library transfers.

## Export

Allow the user to export:

- Entire prompt library
- Selected category
- Selected prompts
- Favorites only

Primary export format:

```text
JSON
```

Optional additional export format:

```text
Markdown
```

Suggested export file:

```text
prompt-assistant-backup-YYYY-MM-DD.json
```

---

## Export Structure

Example:

```json
{
  "schemaVersion": 1,
  "exportedAt": "2026-08-18T12:00:00Z",
  "application": "Prompt Assistant",
  "categories": [],
  "prompts": []
}
```

---

## Import

Allow users to select an exported JSON file.

Before completing import:

1. Validate the file.
2. Validate schema version.
3. Display import summary.
4. Detect duplicates.
5. Ask how duplicates should be handled.

Suggested duplicate options:

- Skip
- Replace
- Keep Both

Never overwrite the current library silently.

---

## Import Preview

Display:

```text
Prompts found: 42
Categories found: 7
Duplicates found: 3
New prompts: 39
```

Then provide:

- Cancel
- Import

---

# 16. Search View

The **Search** screen must allow prompt searches by:

- Keyword
- Category
- Tag

Search options should resemble the UI design.

---

## Keyword Search

Search relevant text fields such as:

- title,
- prompt content,
- notes,
- tags.

Keyword searches should be case-insensitive.

---

## Category Search

Allow users to select:

```text
All Categories
```

or a specific category.

---

## Tag Search

Allow users to select:

```text
All Tags
```

or a specific tag.

---

## Combined Filtering

The search system should support combined criteria.

Example:

```text
Keyword: debugging
Category: Coding
Tag: python
```

Only matching prompts should be displayed.

---

# 17. Search Results

Display a result count:

```text
RESULTS (12)
```

Each result card should show:

- prompt title,
- category,
- tags,
- favorite icon.

Example result cards from the UI:

- Python Debugging Helper
- SEO Blog Post Outline
- Cold Email Template
- Code Refactoring Assistant
- Study Plan Generator

Include:

```text
View all results →
```

when results are truncated.

---

# 18. Prompt Usage

The footer in the UI communicates an important feature:

> Click on any prompt to copy it or insert it into the active tab.

The extension should support both actions.

## Copy Prompt

Copies the prompt content to the system clipboard.

Provide brief visual confirmation:

```text
Prompt copied
```

---

## Insert Prompt Into Active Tab

The extension should attempt to insert prompt text into the currently focused editable element of the active browser tab.

Supported targets may include:

- `<textarea>`
- text `<input>`
- `contenteditable` elements

Potential AI websites include:

- ChatGPT
- Claude
- Gemini
- Perplexity
- other websites with editable prompt fields

Do not automatically submit the prompt.

The extension should only insert text.

---

# 19. Insertion Safety

Insertion behavior should:

- require an explicit user action,
- never automatically press Enter,
- never automatically submit forms,
- never erase existing text without confirmation,
- gracefully report when no compatible text field is available.

Suggested message:

```text
No editable text field was detected on the active page.
```

---

# 20. Settings

Clicking the gear icon opens Settings.

Recommended settings:

## Appearance

- Dark
- Light
- System

Dark mode should match the supplied UI mockup.

---

## Default Startup View

Options:

- Library
- Create
- Optimize Prompt
- Search

---

## Prompt Click Behavior

Options:

- Open prompt
- Copy prompt
- Insert into active tab
- Ask each time

---

## Import / Export Preferences

Possible options:

- Include notes
- Include favorites
- Pretty-print JSON

---

## Optimization Settings

Potential settings:

- AI provider
- Model
- API endpoint
- API key
- Default optimization goal
- Temperature or creativity control if supported

Secrets should be stored appropriately and never written to console logs.

---

# 21. Footer

Include a compact footer similar to the design.

Example:

```text
💡 Tip: Click on any prompt to copy it or insert it into the active tab.

v1.0.0     ?
```

Footer components:

- Usage tip
- Extension version
- Help icon

The Help icon may open:

- short usage instructions,
- keyboard shortcuts,
- documentation,
- About information.

---

# 22. Storage

Use Chrome extension storage.

Recommended:

```javascript
chrome.storage.local
```

Store at minimum:

- prompts,
- categories,
- settings,
- schema version.

Example root structure:

```json
{
  "schemaVersion": 1,
  "categories": [],
  "prompts": [],
  "settings": {}
}
```

Use migrations when the storage schema changes in future versions.

---

# 23. Suggested Project Structure

```text
prompt-assistant/
│
├── manifest.json
├── sidepanel.html
├── sidepanel.js
├── sidepanel.css
│
├── background/
│   └── service-worker.js
│
├── components/
│   ├── Header.js
│   ├── Navigation.js
│   ├── PromptCard.js
│   ├── TagChip.js
│   └── Modal.js
│
├── views/
│   ├── LibraryView.js
│   ├── CreateView.js
│   ├── EditView.js
│   ├── OptimizeView.js
│   ├── ImportExportView.js
│   ├── SearchView.js
│   └── SettingsView.js
│
├── services/
│   ├── storage.js
│   ├── search.js
│   ├── importExport.js
│   ├── promptInsertion.js
│   └── optimizer.js
│
├── utils/
│   ├── validation.js
│   ├── ids.js
│   └── dates.js
│
├── assets/
│   └── icons/
│
└── README.md
```

A framework such as React, Vue, Svelte, or plain JavaScript may be used. Prefer a simple architecture that is easy to maintain and does not add unnecessary dependencies.

---

# 24. UI Design Requirements

The supplied mockup should be treated as the visual reference.

Primary visual characteristics:

- Dark navy/charcoal background
- Purple accent color
- Thin gray borders
- Rounded containers
- Rounded buttons
- White primary text
- Muted gray secondary text
- Purple section headings
- Clear selected-state highlighting
- Compact iconography
- Minimal visual clutter

Suggested design tokens:

```css
:root {
  --bg-primary: #09111b;
  --bg-secondary: #0e1722;
  --bg-tertiary: #151f2b;

  --border: #34404d;

  --text-primary: #f5f7fa;
  --text-secondary: #a8b0bd;

  --accent: #7c3aed;
  --accent-light: #a855f7;

  --danger: #ef4444;
  --success: #22c55e;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}
```

These are starting points rather than strict color requirements.

---

# 25. Responsive Sidebar Behavior

Because the final UI is a sidebar rather than the wide mockup:

## Recommended behavior

### Library selected

Display:

1. Categories
2. Tags
3. Favorites
4. Matching prompt list

### Create selected

Display only the Create Prompt form.

### Optimize Prompt selected

Display only optimization controls and results.

### Import / Export selected

Display only import/export tools.

### Search selected

Display search filters followed by results.

### Settings selected

Display only settings.

Do not attempt to preserve the three-column mockup inside a narrow sidebar.

---

# 26. Accessibility

The extension should support:

- keyboard navigation,
- visible focus indicators,
- accessible labels,
- appropriate ARIA attributes,
- readable contrast,
- tooltip or accessible text for icon-only buttons.

All interactive elements must be reachable by keyboard.

---

# 27. Keyboard Shortcuts

Potential application shortcuts:

| Shortcut | Action |
|---|---|
| Ctrl/Cmd + N | New prompt |
| Ctrl/Cmd + F | Search prompts |
| Ctrl/Cmd + S | Save current prompt |
| Esc | Cancel / close modal |

Avoid intercepting shortcuts when the user is actively editing a field unless appropriate.

Chrome-level shortcuts may optionally be configured through the Commands API.

---

# 28. Error Handling

Display user-friendly errors for situations such as:

- Prompt could not be saved.
- Storage is unavailable.
- Import file is invalid.
- Unsupported import version.
- AI optimization failed.
- API key is missing.
- No editable field found.
- Active tab cannot be accessed.

Avoid exposing raw stack traces to end users.

---

# 29. Confirmation Dialogs

Require confirmation before destructive operations such as:

- deleting a prompt,
- deleting a category,
- replacing prompts during import,
- clearing the entire library.

Example:

```text
Delete "Python Debugging Helper"?

This action cannot be undone.

[Cancel] [Delete]
```

---

# 30. Empty States

Provide clear empty-state messaging.

Examples:

## Empty Library

```text
No prompts saved yet.

Create your first prompt to begin building your library.

[Create Prompt]
```

## Empty Search

```text
No prompts match your search.
```

## Empty Favorites

```text
You haven't favorited any prompts yet.
```

---

# 31. Initial Sample Data

During development, sample prompts may be used to demonstrate the interface.

Examples:

```text
Python Debugging Helper
Category: Coding
Tags: debug, python
```

```text
SEO Blog Post Outline
Category: Marketing
Tags: seo, content
```

```text
Cold Email Template
Category: Marketing
Tags: email
```

```text
Code Refactoring Assistant
Category: Coding
Tags: python, refactor
```

```text
Study Plan Generator
Category: Education
Tags: study, plan
```

Sample data should be removable or disabled for production builds.

---

# 32. Minimum Viable Product

The first functional release should include:

- Chrome sidebar interface.
- Library view.
- Categories.
- Tags.
- Favorites.
- Create prompt.
- Edit prompt.
- Delete prompt.
- Copy prompt.
- Search by keyword.
- Search by category.
- Search by tag.
- Import JSON.
- Export JSON.
- Settings view.
- Persistent Chrome local storage.
- Insert prompt into active tab.

The Optimize Prompt feature may be included in the first release if an AI provider is configured; otherwise the UI and provider abstraction should still be implemented so optimization can be added without redesigning the extension.

---

# 33. Future Enhancements

Potential future additions:

- Prompt version history.
- Drag-and-drop category organization.
- Nested categories.
- Prompt variables.
- Prompt templates.
- Variable placeholders such as:

```text
{{topic}}
{{audience}}
{{tone}}
```

- Prompt usage history.
- Recently used prompts.
- Most-used prompts.
- Prompt ratings.
- Multiple prompt libraries.
- Cloud synchronization.
- Chrome sync storage.
- AI-generated titles.
- AI-generated tags.
- AI-generated categories.
- Bulk editing.
- Bulk tagging.
- Duplicate detection.
- Markdown preview.
- Prompt sharing.
- Keyboard-only command palette.
- Context menu integration.
- Website-specific prompt insertion adapters.
- Prompt chaining.
- Export to Markdown.
- Import from Markdown or CSV.

---

# 34. Core Acceptance Criteria

The extension is considered functionally complete when a user can:

1. Open Prompt Assistant as a Chrome sidebar.
2. Browse prompts from the Library.
3. Create categories.
4. Create prompts with title, category, tags, content, and notes.
5. Edit saved prompts.
6. Favorite prompts.
7. Browse by category.
8. Browse by tag.
9. Search by keyword, category, and tag.
10. Copy a prompt.
11. Insert a prompt into an editable field on the active browser tab.
12. Open the Optimize Prompt workspace.
13. Optimize a prompt when an AI provider is configured.
14. Import a valid prompt-library backup.
15. Export the current prompt library.
16. Configure extension behavior through Settings.
17. Close and reopen Chrome without losing saved prompt data.

---

# 35. Development Priorities

When generating the extension, prioritize in this order:

1. Reliable data storage.
2. Clean sidebar navigation.
3. Prompt CRUD operations.
4. Categories and tags.
5. Search and filtering.
6. Copy and active-tab insertion.
7. Import/export.
8. Settings.
9. Prompt optimization architecture.
10. UI polish.

Avoid unnecessary complexity until the primary workflow is stable.

---

# 36. Expected User Workflow

A typical workflow should be:

```text
Open Chrome sidebar
        ↓
Prompt Assistant
        ↓
Library
        ↓
Select category or tag
        ↓
Select prompt
        ↓
Copy / Insert / Edit / Optimize
```

Creating a prompt:

```text
Create
  ↓
Enter Title
  ↓
Choose Category
  ↓
Add Tags
  ↓
Write Prompt
  ↓
Add Optional Notes
  ↓
Save Prompt
```

Optimizing a prompt:

```text
Library or Optimize Prompt
        ↓
Choose / Enter Prompt
        ↓
Choose Optimization Goal
        ↓
Optimize
        ↓
Review Optimized Prompt
        ↓
Copy / Replace / Save as New
```

---

# 37. Important Implementation Constraint

The visual mockup is a design reference, not a requirement to display every panel simultaneously.

The finished Chrome extension must prioritize **sidebar usability**.

The main banner navigation should switch between dedicated views:

```text
Library | Create | Optimize Prompt | Import / Export | Search
```

with Settings accessible from the gear icon in the header.

This navigation model is the central structure of the extension.
