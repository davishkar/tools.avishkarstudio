/**
 * Check if a string is valid JSON
 * @param {string} str
 * @returns {{ valid: boolean, error?: string, parsed?: any }}
 */
export function isValidJson(str) {
  if (!str || typeof str !== 'string') {
    return { valid: false, error: 'Input must be a non-empty string' };
  }
  try {
    const parsed = JSON.parse(str);
    return { valid: true, parsed };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

/**
 * Check if a string is a valid email
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Check if a string is valid Base64
 * @param {string} str
 * @returns {boolean}
 */
export function isValidBase64(str) {
  if (!str || typeof str !== 'string') return false;
  try {
    return btoa(atob(str)) === str.replace(/\s+/g, '');
  } catch {
    return false;
  }
}

/**
 * Check if a string is a valid URL
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a value is a valid numeric value
 * @param {any} val
 * @returns {boolean}
 */
export function isValidNumber(val) {
  if (val === null || val === undefined || val === '') return false;
  return !isNaN(Number(val));
}
