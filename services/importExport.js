import { SCHEMA_VERSION } from './storage.js';

export function buildExport({ categories, prompts, settings }, { scope, includeNotes, prettyPrint }) {
  let exportPrompts = prompts;
  if (scope.type === 'category') {
    exportPrompts = prompts.filter((p) => p.categoryId === scope.categoryId);
  } else if (scope.type === 'selected') {
    const ids = new Set(scope.ids || []);
    exportPrompts = prompts.filter((p) => ids.has(p.id));
  } else if (scope.type === 'favorites') {
    exportPrompts = prompts.filter((p) => p.isFavorite);
  }

  const usedCategoryIds = new Set(exportPrompts.map((p) => p.categoryId));
  const exportCategories = categories.filter((c) => usedCategoryIds.has(c.id));

  const payload = {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    application: 'Prompt Assistant',
    categories: exportCategories,
    prompts: exportPrompts.map((p) => (includeNotes ? p : { ...p, notes: '' })),
  };

  return JSON.stringify(payload, null, prettyPrint ? 2 : 0);
}

export function downloadJson(jsonString, filename) {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function defaultExportFilename() {
  const date = new Date().toISOString().slice(0, 10);
  return `prompt-assistant-backup-${date}.json`;
}

export function parseImportFile(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { valid: false, error: 'This file is not valid JSON.' };
  }
  if (typeof data.schemaVersion !== 'number') {
    return { valid: false, error: 'This file is missing a schema version and cannot be imported.' };
  }
  if (data.schemaVersion > SCHEMA_VERSION) {
    return { valid: false, error: `This file uses a newer schema version (${data.schemaVersion}) than this version of Prompt Assistant supports.` };
  }
  if (!Array.isArray(data.categories) || !Array.isArray(data.prompts)) {
    return { valid: false, error: 'This file is missing categories or prompts data.' };
  }
  return { valid: true, data };
}

export function buildImportPreview(data, existingPrompts) {
  const existingIds = new Set(existingPrompts.map((p) => p.id));
  const existingByTitleCat = new Set(existingPrompts.map((p) => `${p.title.toLowerCase()}::${p.categoryId}`));
  let duplicates = 0;
  data.prompts.forEach((p) => {
    if (existingIds.has(p.id) || existingByTitleCat.has(`${p.title.toLowerCase()}::${p.categoryId}`)) {
      duplicates += 1;
    }
  });
  return {
    promptsFound: data.prompts.length,
    categoriesFound: data.categories.length,
    duplicatesFound: duplicates,
    newPrompts: data.prompts.length - duplicates,
  };
}
