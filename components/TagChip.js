import { escapeHtml } from '../utils/dom.js';

export function renderTagChip(tag, { removable = false } = {}) {
  return `
    <span class="tag-chip" data-tag="${escapeHtml(tag)}">
      #${escapeHtml(tag)}
      ${removable ? `<button type="button" data-action="remove-tag" data-tag="${escapeHtml(tag)}" aria-label="Remove tag ${escapeHtml(tag)}">×</button>` : ''}
    </span>
  `;
}
