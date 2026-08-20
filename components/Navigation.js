import { icon } from './icons.js';

const TABS = [
  { view: 'library', label: 'Library', icon: 'book' },
  { view: 'create', label: 'Create', icon: 'plus' },
  { view: 'optimize', label: 'Optimize', icon: 'sparkle' },
  { view: 'import-export', label: 'Import/Export', icon: 'swap' },
  { view: 'search', label: 'Search', icon: 'search' },
];

export function renderNavigation(state) {
  return TABS.map(
    (tab) => `
    <button class="nav-tab ${state.currentView === tab.view ? 'is-active' : ''}"
      data-action="navigate" data-view="${tab.view}"
      aria-current="${state.currentView === tab.view ? 'page' : 'false'}">
      <span aria-hidden="true">${icon(tab.icon)}</span><span>${tab.label}</span>
    </button>`
  ).join('');
}
