import { escapeHtml } from '../utils/dom.js';
import { icon } from './icons.js';

export function renderPromptCard(prompt) {
  const tags = (prompt.tags || []).map((t) => `<span class="tag-chip">#${escapeHtml(t)}</span>`).join('');
  return `
    <article class="prompt-card" data-prompt-id="${prompt.id}">
      <button class="prompt-medallion ${prompt.isFavorite ? 'is-favorite' : ''}" data-action="toggle-favorite" data-id="${prompt.id}"
          aria-label="${prompt.isFavorite ? 'Unfavorite' : 'Favorite'} ${escapeHtml(prompt.title)}" aria-pressed="${prompt.isFavorite}">
          ${prompt.isFavorite ? icon('starFilled') : icon('starOutline')}
      </button>
      <div class="prompt-card-body">
        <span class="prompt-card-title" data-action="open-prompt" data-id="${prompt.id}" tabindex="0" role="button">${escapeHtml(prompt.title)}</span>
        <div class="prompt-card-meta">${escapeHtml(prompt.categoryName || 'Uncategorized')}</div>
        <div class="prompt-card-tags">${tags}</div>
      </div>
      <div class="prompt-card-actions">
        <button class="btn" data-action="copy-prompt" data-id="${prompt.id}" aria-label="Copy prompt">Copy</button>
        <button class="btn" data-action="insert-prompt" data-id="${prompt.id}" aria-label="Insert prompt into active tab">Insert</button>
        <button class="btn" data-action="edit-prompt" data-id="${prompt.id}" aria-label="Edit prompt">Edit</button>
        <button class="btn" data-action="duplicate-prompt" data-id="${prompt.id}" aria-label="Duplicate prompt">Duplicate</button>
        <button class="btn" data-action="optimize-prompt" data-id="${prompt.id}" aria-label="Optimize prompt">Optimize</button>
        <button class="btn btn-danger" data-action="delete-prompt" data-id="${prompt.id}" aria-label="Delete prompt">Delete</button>
      </div>
    </article>
  `;
}
