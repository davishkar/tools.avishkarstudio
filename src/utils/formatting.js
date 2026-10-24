/**
 * Format numbers with comma separators
 * @param {number|string} num
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  const val = Number(num);
  return val.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format currency with locale formatting
 * @param {number} amount
 * @param {string} currency
 * @param {string} locale
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'INR', locale = 'en-IN') {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncate long text with ellipsis
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export function truncateText(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/**
 * Convert string to URL-friendly slug
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
