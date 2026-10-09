const {
  formatCurrency,
  validateEmail,
  generateSlug,
  calculateDiscount,
  formatDate,
} = require('./helpers');

describe('formatCurrency', () => {
  it('formats numbers with KES prefix and commas', () => {
    expect(formatCurrency(1500)).toBe('KES 1,500');
    expect(formatCurrency(1000000)).toBe('KES 1,000,000');
    expect(formatCurrency(0)).toBe('KES 0');
  });
});

describe('validateEmail', () => {
  it('returns valid for correct email, error for empty/invalid', () => {
    expect(validateEmail('brian@example.com')).toEqual({ valid: true });
    expect(validateEmail('')).toEqual({ valid: false, error: 'Email is required' });
    expect(validateEmail('not-an-email')).toEqual({ valid: false, error: 'Invalid email format' });
  });
});

describe('generateSlug', () => {
  it('converts text to URL-friendly slugs', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
    expect(generateSlug("  Nairobi's Best Coffee! ")).toBe('nairobis-best-coffee');
  });
});

describe('calculateDiscount', () => {
  it('calculates correct discounted price and throws for invalid input', () => {
    expect(calculateDiscount(1000, 10)).toBe(900);
    expect(calculateDiscount(500, 0)).toBe(500);
    expect(() => calculateDiscount(1000, -5)).toThrow('Discount must be between 0 and 100');
  });
});

describe('formatDate', () => {
  it('formats ISO string to readable date', () => {
    expect(formatDate('2025-06-15T10:30:00Z')).toBe('15 Jun 2025');
  });
});
