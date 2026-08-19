// Injected into the active tab. Must be a standalone function: it cannot
// close over anything from this module's scope, only its own args.
function insertTextIntoActiveElement(text) {
  const el = document.activeElement;
  if (!el) return { ok: false, reason: 'no-target' };

  const tag = el.tagName ? el.tagName.toLowerCase() : '';

  if (tag === 'textarea' || (tag === 'input' && /^(text|search|url|tel|email)$/.test(el.type || 'text'))) {
    const proto = tag === 'textarea' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const newValue = el.value.slice(0, start) + text + el.value.slice(end);
    setter.call(el, newValue);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.selectionStart = el.selectionEnd = start + text.length;
    return { ok: true };
  }

  if (el.isContentEditable) {
    const inserted = document.execCommand && document.execCommand('insertText', false, text);
    if (!inserted) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
      } else {
        el.appendChild(document.createTextNode(text));
      }
    }
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return { ok: true };
  }

  return { ok: false, reason: 'no-target' };
}

export async function insertIntoActiveTab(text) {
  let tab;
  try {
    [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  } catch (err) {
    console.error('[Prompt Assistant] tabs.query failed:', err);
    return { ok: false, reason: 'tab-unavailable' };
  }
  if (!tab || !tab.id) {
    return { ok: false, reason: 'tab-unavailable' };
  }

  try {
    const [{ result } = {}] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: insertTextIntoActiveElement,
      args: [text],
    });
    return result || { ok: false, reason: 'no-target' };
  } catch (err) {
    console.error('[Prompt Assistant] executeScript failed:', err);
    return { ok: false, reason: 'tab-unavailable' };
  }
}
