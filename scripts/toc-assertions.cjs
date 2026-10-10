// Assert actual list ancestry against the mounted heading outline, including skips.
async function assertOutline(page, expect) {
  const outline = await page.evaluate(() => {
    const root = document.querySelector('.markdown-body'), panel = root.querySelector('.knowledge-panel') || root;
    const headings = [...panel.querySelectorAll('h2[id],h3[id],h4[id],h5[id],h6[id]')];
    const stack = [], expected = headings.map(h => {
      const level = Number(h.tagName.slice(1));
      while (stack.length && stack.at(-1).level >= level) stack.pop();
      const parent = stack.at(-1)?.id || null; stack.push({id:h.id,level}); return {id:h.id,parent,level};
    });
    const actual = [...document.querySelectorAll('.knowledge-chapter')].map(a => {
      const item = a.closest('li'), parent = item.parentElement.closest('.knowledge-chapter-item');
      return {id:new URLSearchParams(a.hash.split('?')[1]).get('id'),parent:parent ? new URLSearchParams(parent.querySelector('.knowledge-chapter').hash.split('?')[1]).get('id') : null,level:Number(a.dataset.level)};
    });
    return {expected,actual,roots:expected.filter(h=>!h.parent).length,numbers:document.querySelectorAll('.knowledge-chapter-number').length,controls:[...document.querySelectorAll('.knowledge-branch-toggle')].map(b=>({expanded:b.getAttribute('aria-expanded'),hidden:document.getElementById(b.getAttribute('aria-controls'))?.hidden,tag:document.getElementById(b.getAttribute('aria-controls'))?.tagName}))};
  });
  expect(outline.actual).toEqual(outline.expected); expect(outline.numbers).toBe(outline.roots);
  for (const control of outline.controls) {expect(control.tag).toBe('UL');expect(control.expanded).toBe(String(!control.hidden));}
  return {roots:outline.roots,headings:outline.expected.length};
}
module.exports = {assertOutline};
