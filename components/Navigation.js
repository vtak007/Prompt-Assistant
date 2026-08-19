const TABS = [
  { view: 'library', label: 'Library', icon: '📖' },
  { view: 'create', label: 'Create', icon: '✎' },
  { view: 'optimize', label: 'Optimize', icon: '✨' },
  { view: 'import-export', label: 'Import/Export', icon: '⇅' },
  { view: 'search', label: 'Search', icon: '🔍' },
];

export function renderNavigation(state) {
  return TABS.map(
    (tab) => `
    <button class="nav-tab ${state.currentView === tab.view ? 'is-active' : ''}"
      data-action="navigate" data-view="${tab.view}"
      aria-current="${state.currentView === tab.view ? 'page' : 'false'}">
      <span aria-hidden="true">${tab.icon}</span><span>${tab.label}</span>
    </button>`
  ).join('');
}
