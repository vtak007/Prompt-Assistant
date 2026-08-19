import { setState, getState } from '../store/store.js';

const VALID_VIEWS = ['library', 'create', 'edit', 'optimize', 'import-export', 'search', 'settings'];

function parseHash() {
  const hash = location.hash.replace(/^#\//, '');
  const [view, param] = hash.split('/');
  if (!VALID_VIEWS.includes(view)) return { view: 'library', param: null };
  return { view, param: param || null };
}

function applyHash() {
  const { view, param } = parseHash();
  if (getState().formDirty && view !== getState().currentView) {
    const proceed = confirm('Discard unsaved changes?');
    if (!proceed) {
      location.hash = `#/${getState().currentView}`;
      return;
    }
    setState({ formDirty: false });
  }
  setState({ currentView: view, editingPromptId: view === 'edit' ? param : null });
}

export function initRouter() {
  window.addEventListener('hashchange', applyHash);
  applyHash();
}

export function navigate(view, param) {
  location.hash = param ? `#/${view}/${param}` : `#/${view}`;
}
