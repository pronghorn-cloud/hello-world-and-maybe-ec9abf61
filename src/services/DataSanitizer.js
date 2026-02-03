export const DataSanitizer = {
  /**
   * Sanitize a string input by removing potentially harmful characters
   * @param {string} input - The string to sanitize
   * @returns {string} The sanitized string
   */
  sanitizeString(input) {
    if (typeof input !== 'string') {
      return ''
    }

    return input
      .trim()
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Escape HTML entities
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      // Remove potential script injections
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
  },

  /**
   * Sanitize a date input
   * @param {string} input - The date string to sanitize
   * @returns {string} The sanitized date string in YYYY-MM-DD format
   */
  sanitizeDate(input) {
    if (typeof input !== 'string') {
      return ''
    }

    const trimmed = input.trim()
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(trimmed)) {
      return ''
    }

    // Verify it's a valid date
    const date = new Date(trimmed)
    if (isNaN(date.getTime())) {
      return ''
    }

    return trimmed
  },

  /**
   * Sanitize an object by applying string sanitization to all string values
   * @param {Object} obj - The object to sanitize
   * @returns {Object} The sanitized object
   */
  sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return {}
    }

    const sanitized = {}
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value)
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }
}
