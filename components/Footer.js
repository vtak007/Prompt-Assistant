export function renderFooter() {
  return `
    <span>💡 Tip: Click on any prompt to copy it or insert it into the active tab.</span>
    <span style="display:flex; align-items:center; gap:8px;">
      <span>v1.0.0</span>
      <button class="icon-btn" data-action="open-help" aria-label="Help" title="Help">?</button>
    </span>
  `;
}
