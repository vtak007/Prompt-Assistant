export function searchPrompts(prompts, { keyword = '', categoryId = '', tagId = '' } = {}) {
  const kw = keyword.trim().toLowerCase();
  return prompts.filter((p) => {
    if (categoryId && p.categoryId !== categoryId) return false;
    if (tagId && !(p.tags || []).includes(tagId)) return false;
    if (kw) {
      const haystack = [p.title, p.content, p.notes, ...(p.tags || [])].join(' ').toLowerCase();
      if (!haystack.includes(kw)) return false;
    }
    return true;
  });
}
