// utils/helpers.js

/**
 * Formats a number as Kenyan Shillings.
 * formatCurrency(1500) => "KES 1,500"
 * formatCurrency(1000000) => "KES 1,000,000"
 * formatCurrency(0) => "KES 0"
 */
function formatCurrency(amount) {
  // Locale is pinned to 'en-US' so the comma grouping is identical on every
  // machine (an unpinned toLocaleString() follows the host's locale).
  return `KES ${amount.toLocaleString('en-US')}`;
}

/**
 * Validates an email address.
 * Returns { valid: true } or { valid: false, error: "reason" }
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') return { valid: false, error: 'Email is required' };
  const trimmed = email.trim();
  if (trimmed.length === 0) return { valid: false, error: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: 'Invalid email format' };
  return { valid: true };
}

/**
 * Converts a string into a URL-friendly slug.
 * generateSlug("Hello World") => "hello-world"
 * generateSlug("  Nairobi's Best Coffee! ") => "nairobis-best-coffee"
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Calculates the discounted price.
 * calculateDiscount(1000, 10) => 900
 * calculateDiscount(500, 0) => 500
 * Throws if discount is negative or greater than 100.
 */
function calculateDiscount(price, percentage) {
  if (percentage < 0 || percentage > 100) throw new Error('Discount must be between 0 and 100');
  if (price < 0) throw new Error('Price must be positive');
  return price - (price * percentage) / 100;
}

/**
 * Formats an ISO date string to a readable format.
 * formatDate("2025-06-15T10:30:00Z") => "15 Jun 2025"
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

module.exports = { formatCurrency, validateEmail, generateSlug, calculateDiscount, formatDate };
