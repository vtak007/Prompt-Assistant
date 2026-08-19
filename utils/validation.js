export function validatePrompt({ title, categoryId, content }) {
  const errors = {};
  if (!title || !title.trim()) errors.title = 'Title is required.';
  if (!categoryId) errors.categoryId = 'Category is required.';
  if (!content || !content.trim()) errors.content = 'Prompt content is required.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function normalizeTag(tag) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

export function validateCategoryName(name, existingCategories, excludeId = null) {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: 'Category name cannot be blank.' };
  const duplicate = existingCategories.some(
    (c) => c.id !== excludeId && c.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (duplicate) return { valid: false, error: 'A category with this name already exists.' };
  return { valid: true, name: trimmed };
}

export function validateTagName(name, existingTags, excludeTag = null) {
  const normalized = normalizeTag(name || '');
  if (!normalized) return { valid: false, error: 'Tag name cannot be blank.' };
  const duplicate = existingTags.some((t) => t !== excludeTag && t.toLowerCase() === normalized.toLowerCase());
  if (duplicate) return { valid: false, error: 'A tag with this name already exists.' };
  return { valid: true, name: normalized };
}
