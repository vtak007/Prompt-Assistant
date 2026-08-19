import { escapeHtml } from '../utils/dom.js';

export function renderImportExportView(state) {
  const { categories, settings } = state;
  const categoryOptions = categories.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');

  return `
    <h2 class="section-heading">Export</h2>
    <div class="field">
      <label for="export-scope">Scope</label>
      <select id="export-scope" data-field="export-scope">
        <option value="all">Entire Library</option>
        <option value="category">Selected Category</option>
        <option value="favorites">Favorites Only</option>
      </select>
    </div>
    <div class="field" data-export-category-field style="display:none;">
      <label for="export-category">Category</label>
      <select id="export-category" data-field="export-category">${categoryOptions}</select>
    </div>
    <div class="field">
      <label><input type="checkbox" data-field="export-notes" ${settings.importExport?.includeNotes ? 'checked' : ''} /> Include notes</label>
    </div>
    <div class="btn-row">
      <button type="button" class="btn btn-primary" data-action="do-export">Export JSON</button>
    </div>

    <h2 class="section-heading" style="margin-top: var(--space-5);">Import</h2>
    <div class="field">
      <label for="import-file">Choose a Prompt Assistant JSON backup file</label>
      <input type="file" id="import-file" data-field="import-file" accept="application/json,.json" />
    </div>
  `;
}
