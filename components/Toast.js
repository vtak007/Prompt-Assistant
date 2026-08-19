import { escapeHtml } from '../utils/dom.js';

export function renderToast(state) {
  if (!state.toast) return '';
  return `<div class="toast kind-${state.toast.kind}">${escapeHtml(state.toast.message)}</div>`;
}
