const listeners = new Set();

let state = {
  // persisted-mirror data
  categories: [],
  prompts: [],
  settings: {},
  // transient UI state
  currentView: 'library',
  editingPromptId: null,
  libraryFilter: { type: 'all', value: null }, // {type: 'all'|'category'|'tag'|'favorites', value}
  searchFilters: { keyword: '', categoryId: '', tagId: '' },
  optimizeSourceId: null,
  activeModal: null,
  toast: null,
  formDirty: false,
  ready: false,
  // Create/Edit form draft (lives here so it survives re-renders of the view)
  formDraft: { title: '', categoryId: '', tags: [], content: '', notes: '', errors: {} },
  importPreview: null,
  importParsedData: null,
  optimizeDraft: { prompt: '', goal: 'general', instructions: '' },
  optimizeResult: null,
  optimizeLoading: false,
};

export function getState() {
  return state;
}

export function setState(patch) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Updates state without notifying subscribers (no re-render). Used for
// cheap flags (e.g. formDirty) set on every keystroke, where a full
// innerHTML re-render would steal focus from the field being typed in.
export function setStateSilent(patch) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
}
