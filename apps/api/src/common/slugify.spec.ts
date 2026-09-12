import { slugify } from './slugify';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('strips accents', () => {
    expect(slugify('Café Ñandú')).toBe('cafe-nandu');
  });

  it('drops punctuation and collapses separators', () => {
    expect(slugify('  Next.js___16 !!  ')).toBe('nextjs-16');
  });

  it('returns an empty string when nothing survives', () => {
    expect(slugify('!!!')).toBe('');
  });
});
