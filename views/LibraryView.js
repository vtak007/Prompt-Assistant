import { escapeHtml } from '../utils/dom.js';
import { renderPromptCard } from '../components/PromptCard.js';
import { icon } from '../components/icons.js';

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
          <span class="list-item-label is-accent">${icon('folder')} ${escapeHtml(c.name)}</span>
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="count">${count}</span>
            <button class="icon-btn" data-action="edit-category" data-id="${c.id}" aria-label="Rename category ${escapeHtml(c.name)}" title="Rename category">${icon('pencil')}</button>
            <button class="icon-btn" data-action="delete-category" data-id="${c.id}" aria-label="Delete category ${escapeHtml(c.name)}" title="Delete category">${icon('trash')}</button>
          </span>
        </div>`;
    })
    .join('');

  const tagItems = tagCounts
    .map(([tag, count]) => {
      const selected = libraryFilter.type === 'tag' && libraryFilter.value === tag;
      return `
        <div class="list-item ${selected ? 'is-selected' : ''}" data-action="select-tag" data-tag="${escapeHtml(tag)}" tabindex="0" role="button">
          <span class="list-item-label is-accent">${icon('tag')} ${escapeHtml(tag)}</span>
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="count">${count}</span>
            <button class="icon-btn" data-action="edit-tag" data-tag="${escapeHtml(tag)}" aria-label="Rename tag ${escapeHtml(tag)}" title="Rename tag">${icon('pencil')}</button>
            <button class="icon-btn" data-action="delete-tag" data-tag="${escapeHtml(tag)}" aria-label="Delete tag ${escapeHtml(tag)}" title="Delete tag">${icon('trash')}</button>
          </span>
        </div>`;
    })
    .join('');

  const favoriteItems = favoritePrompts.map(renderPromptCard).join('');

  const promptList =
    prompts.length === 0
      ? `<div class="empty-state">
          <p>No prompts saved yet.</p><p>Create your first prompt to begin building your library.</p>
          <button class="btn btn-primary" data-action="navigate" data-view="create">Create Prompt</button>
        </div>`
      : libraryFilter.type === 'none'
      ? ''
      : filtered.length
      ? filtered.map(renderPromptCard).join('')
      : `<div class="empty-state"><p>No prompts in this filter yet.</p></div>`;

  return `
    <section class="library-section categories-section">
      <h2 class="section-heading">
        <span data-action="toggle-categories" tabindex="0" role="button" aria-expanded="${categoriesExpanded}" style="cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span>${categoriesExpanded ? icon('chevronDown') : icon('chevronRight')}</span>
          <span>Categories</span>
        </span>
        <button class="icon-btn" data-action="add-category" aria-label="Add category" title="Add category">${icon('plus')}</button>
      </h2>
      ${
        categoriesExpanded
          ? categoryItems
          : ''
      }
    </section>

    <section class="library-section tags-section">
      <h2 class="section-heading">
        <span data-action="toggle-tags" tabindex="0" role="button" aria-expanded="${tagsExpanded}" style="cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span>${tagsExpanded ? icon('chevronDown') : icon('chevronRight')}</span>
          <span>Tags</span>
        </span>
      </h2>
      ${tagsExpanded ? `<div class="tag-grid">${tagItems || '<p class="hint">No tags yet.</p>'}</div>` : ''}
    </section>

    <section class="library-section favorites-section">
      <h2 class="section-heading">
        <span data-action="toggle-favorites" tabindex="0" role="button" aria-expanded="${favoritesExpanded}" style="cursor:pointer; display:flex; align-items:center; gap:6px;">
          <span>${favoritesExpanded ? icon('chevronDown') : icon('chevronRight')}</span>
          <span>Favorites</span>
        </span>
      </h2>
      ${favoritesExpanded ? favoriteItems || '<p class="hint">No favorites yet.</p>' : ''}
    </section>

    <section class="filtered-prompts">
      ${promptList}
    </section>
  `;
}
