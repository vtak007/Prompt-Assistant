import { escapeHtml } from '../utils/dom.js';
import { renderPromptCard } from '../components/PromptCard.js';

function computeTagCounts(prompts) {
  const counts = {};
  prompts.forEach((p) => (p.tags || []).forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
}

function filterPrompts(prompts, filter) {
  let result = prompts;
  if (filter.type === 'category') result = prompts.filter((p) => p.categoryId === filter.value);
  else if (filter.type === 'tag') result = prompts.filter((p) => (p.tags || []).includes(filter.value));
  return [...result].sort((a, b) => a.title.localeCompare(b.title));
}

export function renderLibraryView(state) {
  const { categories, prompts, libraryFilter, categoriesExpanded, tagsExpanded, favoritesExpanded } = state;
  const tagCounts = computeTagCounts(prompts);
  const favoritePrompts = [...prompts].filter((p) => p.isFavorite).sort((a, b) => a.title.localeCompare(b.title));
  const filtered = filterPrompts(prompts, libraryFilter);

  const categoryItems = [...categories]
    .sort((a, b) => a.name.localeCompare(b.name))
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
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="count">${count}</span>
            <button class="icon-btn" data-action="edit-tag" data-tag="${escapeHtml(tag)}" aria-label="Rename tag ${escapeHtml(tag)}" title="Rename tag">✎</button>
            <button class="icon-btn" data-action="delete-tag" data-tag="${escapeHtml(tag)}" aria-label="Delete tag ${escapeHtml(tag)}" title="Delete tag">🗑</button>
          </span>
        </div>`;
    })
    .join('');

  const favoriteItems = favoritePrompts
    .map(
      (p) => `
        <div class="list-item" data-action="open-prompt" data-id="${p.id}" tabindex="0" role="button">
          <span>★ ${escapeHtml(p.title)}</span>
        </div>`
    )
    .join('');

  const promptList =
    prompts.length === 0
      ? `<div class="empty-state">
          <p>No prompts saved yet.</p><p>Create your first prompt to begin building your library.</p>
          <button class="btn btn-primary" data-action="navigate" data-view="create">Create Prompt</button>
        </div>`
      : libraryFilter.type === 'none'
      ? `<div class="empty-state"><p class="hint">Select a category, tag, or favorite above, or use Search to find a prompt.</p></div>`
      : filtered.length
      ? filtered.map(renderPromptCard).join('')
      : `<div class="empty-state"><p>No prompts in this filter yet.</p></div>`;

  return `
    <section>
      <h2 class="section-heading" style="display:flex; align-items:center; justify-content:space-between;">
        <span data-action="toggle-categories" tabindex="0" role="button" aria-expanded="${categoriesExpanded}" style="cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span>${categoriesExpanded ? '▾' : '▸'}</span>
          <span>Categories</span>
        </span>
        <button class="icon-btn" data-action="add-category" aria-label="Add category" title="Add category">+</button>
      </h2>
      ${
        categoriesExpanded
          ? `<div class="list-item ${libraryFilter.type === 'all' ? 'is-selected' : ''}" data-action="select-all-prompts" tabindex="0" role="button">
        <span>▦ All Prompts</span>
        <span class="count">${prompts.length}</span>
      </div>
      ${categoryItems}`
          : ''
      }
    </section>

    <section style="margin-top: var(--space-5);">
      <h2 class="section-heading">
        <span data-action="toggle-tags" tabindex="0" role="button" aria-expanded="${tagsExpanded}" style="cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span>${tagsExpanded ? '▾' : '▸'}</span>
          <span>Tags</span>
        </span>
      </h2>
      ${tagsExpanded ? tagItems || '<p class="hint">No tags yet.</p>' : ''}
    </section>

    <section style="margin-top: var(--space-5);">
      <h2 class="section-heading">
        <span data-action="toggle-favorites" tabindex="0" role="button" aria-expanded="${favoritesExpanded}" style="cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span>${favoritesExpanded ? '▾' : '▸'}</span>
          <span>Favorites</span>
        </span>
      </h2>
      ${favoritesExpanded ? favoriteItems || '<p class="hint">No favorites yet.</p>' : ''}
    </section>

    <section style="margin-top: var(--space-5);">
      ${promptList}
    </section>
  `;
}
