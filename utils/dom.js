export function qs(root, selector) {
  return root.querySelector(selector);
}

export function qsa(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Delegated listener: fires handler(event, matchedEl) when event.target
// is inside an element matching `selector` under `root`.
export function delegate(root, eventType, selector, handler) {
  root.addEventListener(eventType, (event) => {
    const match = event.target.closest(selector);
    if (match && root.contains(match)) {
      handler(event, match);
    }
  });
}

export function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
