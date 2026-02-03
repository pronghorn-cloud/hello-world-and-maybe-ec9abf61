/**
 * DataSanitizer Service
 * Provides methods for sanitizing user input to prevent XSS attacks
 */

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} input - The raw user input
 * @returns {string} - Sanitized string with escaped HTML entities
 */
export const escapeHtml = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  return input.replace(/[&<>"'`=/]/g, (char) => htmlEntities[char]);
};

/**
 * Trims whitespace and normalizes spaces
 * @param {string} input - The raw user input
 * @returns {string} - Trimmed and normalized string
 */
export const normalizeWhitespace = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  return input.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitizes a name field - allows letters, spaces, hyphens, apostrophes
 * @param {string} input - The raw name input
 * @returns {string} - Sanitized name
 */
export const sanitizeName = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  const normalized = normalizeWhitespace(input);
  // Remove any characters that aren't letters, spaces, hyphens, or apostrophes
  return normalized.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
};

/**
 * Full sanitization pipeline for form input
 * @param {string} input - The raw user input
 * @returns {string} - Fully sanitized string
 */
export const sanitizeInput = (input) => {
  const normalized = normalizeWhitespace(input);
  return escapeHtml(normalized);
};

export default {
  escapeHtml,
  normalizeWhitespace,
  sanitizeName,
  sanitizeInput,
};
