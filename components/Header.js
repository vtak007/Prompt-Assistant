import { icon } from './icons.js';

export function renderHeader() {
  return `
    <div class="app-title">
      <span class="logo" aria-hidden="true">${icon('power')}</span>
      <span class="brand-copy"><span>Prompt Whisperer</span><small>Organize. Refine. Unleash.</small></span>
    </div>
    <button class="icon-btn" data-action="open-settings" aria-label="Settings" title="Settings">${icon('gear')}</button>
  `;
}
