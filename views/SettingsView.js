export function renderSettingsView(state) {
  const s = state.settings;
  return `
    <h2 class="section-heading">Appearance</h2>
    <div class="field">
      <select data-field="setting-appearance">
        <option value="dark" ${s.appearance === 'dark' ? 'selected' : ''}>Dark</option>
        <option value="light" ${s.appearance === 'light' ? 'selected' : ''}>Light</option>
        <option value="system" ${s.appearance === 'system' ? 'selected' : ''}>System</option>
      </select>
    </div>

    <h2 class="section-heading">Default Startup View</h2>
    <div class="field">
      <select data-field="setting-startup-view">
        <option value="library" ${s.defaultStartupView === 'library' ? 'selected' : ''}>Library</option>
        <option value="create" ${s.defaultStartupView === 'create' ? 'selected' : ''}>Create</option>
        <option value="optimize" ${s.defaultStartupView === 'optimize' ? 'selected' : ''}>Optimize Prompt</option>
        <option value="search" ${s.defaultStartupView === 'search' ? 'selected' : ''}>Search</option>
      </select>
    </div>

    <h2 class="section-heading">Prompt Click Behavior</h2>
    <div class="field">
      <select data-field="setting-click-behavior">
        <option value="open" ${s.promptClickBehavior === 'open' ? 'selected' : ''}>Open prompt</option>
        <option value="copy" ${s.promptClickBehavior === 'copy' ? 'selected' : ''}>Copy prompt</option>
        <option value="insert" ${s.promptClickBehavior === 'insert' ? 'selected' : ''}>Insert into active tab</option>
        <option value="ask" ${s.promptClickBehavior === 'ask' ? 'selected' : ''}>Ask each time</option>
      </select>
    </div>

    <h2 class="section-heading">Import / Export Preferences</h2>
    <div class="field">
      <label><input type="checkbox" data-field="setting-include-notes" ${s.importExport.includeNotes ? 'checked' : ''} /> Include notes</label>
      <label><input type="checkbox" data-field="setting-include-favorites" ${s.importExport.includeFavorites ? 'checked' : ''} /> Include favorites</label>
      <label><input type="checkbox" data-field="setting-pretty-print" ${s.importExport.prettyPrintJson ? 'checked' : ''} /> Pretty-print JSON</label>
    </div>

    <h2 class="section-heading">Optimization Settings</h2>
    <div class="field">
      <label for="setting-provider">AI Provider</label>
      <select id="setting-provider" disabled>
        <option>Mock (built-in preview)</option>
      </select>
      <div class="hint">Live AI providers are coming soon — this release uses a built-in mock optimizer.</div>
    </div>
    <div class="field">
      <label for="setting-api-key">API Key</label>
      <input type="text" id="setting-api-key" disabled placeholder="Coming soon" />
    </div>

    <h2 class="section-heading">Data</h2>
    <div class="btn-row">
      <button type="button" class="btn btn-danger" data-action="reset-sample-data">Reset to sample data</button>
    </div>
  `;
}
