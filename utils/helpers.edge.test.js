// Extra edge-case tests (bonus: raise coverage by hitting error branches)
const { validateEmail, calculateDiscount, generateSlug, formatCurrency } = require('./helpers');

describe('validateEmail edge cases', () => {
  it('rejects null, undefined and non-string input', () => {
    const expected = { valid: false, error: 'Email is required' };
    expect(validateEmail(null)).toEqual(expected);
    expect(validateEmail(undefined)).toEqual(expected);
    expect(validateEmail(12345)).toEqual(expected);
  });

  it('rejects whitespace-only strings', () => {
    expect(validateEmail('   ')).toEqual({ valid: false, error: 'Email is required' });
  });

  it('accepts emails with surrounding whitespace', () => {
    expect(validateEmail('  brian@example.com  ')).toEqual({ valid: true });
  });
});

describe('calculateDiscount edge cases', () => {
  it('throws when discount is above 100', () => {
    expect(() => calculateDiscount(1000, 101)).toThrow('Discount must be between 0 and 100');
  });

  it('throws when price is negative', () => {
    expect(() => calculateDiscount(-1, 10)).toThrow('Price must be positive');
  });

  it('returns 0 for a 100% discount', () => {
    expect(calculateDiscount(1000, 100)).toBe(0);
  });
});

describe('generateSlug edge cases', () => {
  it('collapses repeated spaces and hyphens', () => {
    expect(generateSlug('a   b --- c')).toBe('a-b-c');
  });
});

describe('formatCurrency edge cases', () => {
  it('keeps the thousands separator for large numbers', () => {
    expect(formatCurrency(1234567890)).toBe('KES 1,234,567,890');
  });
});
