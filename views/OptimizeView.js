import { escapeHtml } from '../utils/dom.js';
import { OPTIMIZATION_GOALS } from '../services/optimizer.js';

export function renderOptimizeView(state) {
  const source = state.optimizeSourceId ? state.prompts.find((p) => p.id === state.optimizeSourceId) : null;
  const draft = state.optimizeDraft || { prompt: source ? source.content : '', goal: 'general', instructions: '' };

  const goalOptions = OPTIMIZATION_GOALS.map(
    (g) => `<option value="${g.id}" ${draft.goal === g.id ? 'selected' : ''}>${g.label}</option>`
  ).join('');

  const result = state.optimizeResult;

  return `
    <h2 class="section-heading">Optimize Prompt</h2>
    <div class="field">
      <label for="optimize-original">Original Prompt</label>
      <textarea id="optimize-original" data-field="optimize-prompt" rows="6" placeholder="Write or paste your prompt here...">${escapeHtml(draft.prompt)}</textarea>
    </div>
    <div class="field">
      <label for="optimize-goal">Optimization Goal</label>
      <select id="optimize-goal" data-field="optimize-goal">${goalOptions}</select>
    </div>
    <div class="field">
      <label for="optimize-instructions">Additional Instructions</label>
      <textarea id="optimize-instructions" data-field="optimize-instructions" rows="3" placeholder="Any additional instructions...">${escapeHtml(draft.instructions)}</textarea>
    </div>
    <div class="btn-row">
      <button type="button" class="btn btn-primary" data-action="run-optimize" ${state.optimizeLoading ? 'disabled' : ''}>
        ${state.optimizeLoading ? 'Optimizing…' : 'Optimize Prompt'}
      </button>
    </div>

    ${
      result
        ? `
      <section style="margin-top: var(--space-5);">
        <p class="hint">${
          result.provider === 'anthropic'
            ? `Live result from Anthropic (model: ${escapeHtml(result.model || '')}).`
            : 'Preview mode — using built-in mock optimizer.'
        }</p>
        <details style="margin-bottom: var(--space-4);">
          <summary>Original Prompt</summary>
          <p class="hint" style="white-space: pre-wrap;">${escapeHtml(result.original)}</p>
        </details>
        <div class="field">
          <label for="optimize-result">Optimized Prompt</label>
          <textarea id="optimize-result" data-field="optimize-result-text" rows="10">${escapeHtml(result.optimized)}</textarea>
        </div>
        <div class="btn-row" style="flex-wrap: wrap;">
          <button type="button" class="btn" data-action="copy-optimized">Copy</button>
          ${source ? `<button type="button" class="btn" data-action="replace-original">Replace Original</button>` : ''}
          <button type="button" class="btn" data-action="save-as-new">Save as New Prompt</button>
          <button type="button" class="btn" data-action="re-optimize" ${state.optimizeLoading ? 'disabled' : ''}>${state.optimizeLoading ? 'Re-optimizing…' : 'Re-optimize'}</button>
          <button type="button" class="btn" data-action="navigate" data-view="library">Return to Library</button>
        </div>
      </section>`
        : ''
    }
  `;
}
