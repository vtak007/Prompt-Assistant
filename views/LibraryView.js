import { escapeHtml } from '../utils/dom.js';
import { renderPromptCard } from '../components/PromptCard.js';

function computeTagCounts(prompts) {
  const counts = {};
  prompts.forEach((p) => (p.tags || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function filterPrompts(prompts, filter) {
  if (filter.type === 'category') return prompts.filter((p) => p.categoryId === filter.value);
  if (filter.type === 'tag') return prompts.filter((p) => (p.tags || []).includes(filter.value));
  if (filter.type === 'favorites') return prompts.filter((p) => p.isFavorite);
  return prompts;
}

export function renderLibraryView(state) {
  const { categories, prompts, libraryFilter } = state;
  const tagCounts = computeTagCounts(prompts);
  const favoritesCount = prompts.filter((p) => p.isFavorite).length;
  const filtered = filterPrompts(prompts, libraryFilter);

  const categoryItems = categories
    .map((c) => {
      const count = prompts.filter((p) => p.categoryId === c.id).length;
      const selected = libraryFilter.type === 'category' && libraryFilter.value === c.id;
      return `
        <div class="list-item ${selected ? 'is-selected' : ''}" data-action="select-category" data-id="${c.id}" tabindex="0" role="button">
          <span>📁 ${escapeHtml(c.name)}</span>
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="count">${count}</span>
            <button class="icon-btn" data-action="edit-category" data-id="${c.id}" aria-label="Rename category ${escapeHtml(c.name)}" title="Rename category">✎</button>
            <button class="icon-btn" data-action="delete-category" data-id="${c.id}" aria-label="Delete category ${escapeHtml(c.name)}" title="Delete category">🗑</button>
          </span>
        </div>`;
    })
    .join('');

  const tagItems = tagCounts
    .map(([tag, count]) => {
      const selected = libraryFilter.type === 'tag' && libraryFilter.value === tag;
      return `
        <div class="list-item ${selected ? 'is-selected' : ''}" data-action="select-tag" data-tag="${escapeHtml(tag)}" tabindex="0" role="button">
          <span># ${escapeHtml(tag)}</span>
          <span class="count">${count}</span>
        </div>`;
    })
    .join('');

  const promptList = filtered.length
    ? filtered.map(renderPromptCard).join('')
    : `<div class="empty-state">
        ${
          prompts.length === 0
            ? `<p>No prompts saved yet.</p><p>Create your first prompt to begin building your library.</p>
               <button class="btn btn-primary" data-action="navigate" data-view="create">Create Prompt</button>`
            : libraryFilter.type === 'favorites'
            ? `<p>You haven't favorited any prompts yet.</p>`
            : `<p>No prompts in this filter yet.</p>`
        }
      </div>`;

  return `
    <section>
      <h2 class="section-heading" style="display:flex; align-items:center; justify-content:space-between;">
        <span>Categories</span>
        <button class="icon-btn" data-action="add-category" aria-label="Add category" title="Add category">+</button>
      </h2>
      <div class="list-item ${libraryFilter.type === 'all' ? 'is-selected' : ''}" data-action="select-all-prompts" tabindex="0" role="button">
        <span>▦ All Prompts</span>
        <span class="count">${prompts.length}</span>
      </div>
      ${categoryItems}
    </section>

    <section style="margin-top: var(--space-5);">
      <h2 class="section-heading">Tags</h2>
      ${tagItems || '<p class="hint">No tags yet.</p>'}
    </section>

    <section style="margin-top: var(--space-5);">
      <div class="list-item ${libraryFilter.type === 'favorites' ? 'is-selected' : ''}" data-action="select-favorites" tabindex="0" role="button">
        <span>☆ Favorites</span>
        <span class="count">${favoritesCount}</span>
      </div>
    </section>

    <section style="margin-top: var(--space-5);">
      ${promptList}
    </section>
  `;
}
