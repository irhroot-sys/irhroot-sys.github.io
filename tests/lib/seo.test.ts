import { describe, expect, it } from 'vitest';
import { MAX_DESCRIPTION, searchSnippet } from '../../src/lib/seo.js';

describe('search snippets', () => {
  it('leaves a description that already fits untouched', () => {
    expect(searchSnippet('Licensed scrap metal dealer in Dammam.')).toBe('Licensed scrap metal dealer in Dammam.');
  });

  it('keeps whole sentences when one ends late enough', () => {
    const text = `${'A'.repeat(110)} first sentence ends here. ${'B'.repeat(80)}`;
    const snippet = searchSnippet(text);
    expect(snippet.endsWith('ends here.')).toBe(true);
    expect(snippet.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });

  it('otherwise cuts at a word boundary with an ellipsis', () => {
    const text = 'Container service with 10 to 40-yard roll-off containers, flatbeds and specialised transport, planned around site access, loading windows and safety rules for every industrial client in the Eastern Province';
    const snippet = searchSnippet(text);
    expect(snippet.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    expect(snippet.endsWith('…')).toBe(true);
    expect(text.startsWith(snippet.slice(0, -1))).toBe(true);
    expect(snippet).not.toMatch(/[\s,]…$/);
  });

  it('handles Arabic punctuation', () => {
    const text = `${'كلمة '.repeat(25)}نهاية الجملة. ${'تفاصيل '.repeat(20)}`;
    const snippet = searchSnippet(text);
    expect(snippet.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });
});
