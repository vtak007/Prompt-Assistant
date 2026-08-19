import { renderPromptForm } from './CreateView.js';

export function renderEditView(state) {
  const prompt = state.prompts.find((p) => p.id === state.editingPromptId);
  if (!prompt) {
    return '<div class="empty-state"><p>This prompt no longer exists.</p></div>';
  }
  return renderPromptForm(state, { isEdit: true });
}
